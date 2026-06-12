/* =============================================================================
 * ladder2-app.js — Unified Ladder orchestrator (Concepts · Products · Use Cases)
 *
 * One page, one engine. Training holds a focus TOGGLE that swaps the active
 * provider (concepts-ladder.js / products-ladder.js / use-cases-ladder.js) and
 * re-renders against the SAME shared engines (/theladder-shared/*). Placement,
 * training conversations, and certification all run through those engines so
 * the three former pages collapse into this single ladder2 experience.
 *
 * Sections wired here: Marketing (stats), Profile (certs/active course/feedback),
 * Assessment (placement → collapse-to-hub), Training (focus toggle + guided
 * conversation), Certification (account gate + identity assurance + proctoring).
 * ========================================================================== */

import { createPlacementEngine } from '/theladder-shared/placement-engine.js';
import { createCertificationEngine } from '/theladder-shared/certification-engine.js?v=2';
import {
  initDataLayer, loadLearnerRecord, saveLearnerProgress,
  recordCompletion, recordCertification,
  getLearnerId, setLearnerId,
  loadTrainingPedagogy, loadTrainingStandard
} from '/theladder-shared/data-layer.js?v=4';
import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth, onAuthStateChanged, sendSignInLinkToEmail,
  signInWithEmailAndPassword, signOut as fbSignOut
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { FIREBASE_CONFIG } from '/ai-academy/js/firebase-config.js?v=4';

import { LADDER_TIERS } from './ladder-data.js?v=2';
import {
  WORKSPACE_LANGUAGE_KEY, WELCOME_LANGUAGE_KEY, WORKSPACE_LANGUAGES,
  workspaceLanguageInfo, workspaceText, formatText
} from './workspace-i18n.js?v=3';
import * as Concepts from './concepts-ladder.js?v=2';
import * as Products from '/theladder-products/products-ladder.js?v=2';
import * as UseCases from '/theladder-use-cases/use-cases-ladder.js?v=2';

const PROXY_URL = '/aesop-api/proxy.php';
const LS_FOCUS = 'aesop-ladder2-focus';
const LS_FEEDBACK = 'aesop-ladder2-feedback';
const LS_AUTH = 'aesop-ladder2-auth';
const LS_EMAIL = 'aesop-ladder2-emailForSignIn';
const LS_ID = 'aesop-learner-id';
const LS_COURSES = 'aesop-ladder2-courses';   // full course conversations, kept on the learner's machine
const LS_ASSESSMENT = 'aesop-ladder2-assessment-draft';
const LS_TRAINING_TEXT_SCALE = 'aesop-ladder2-training-text-scale';
const LS_EVALUATIONS = 'aesop-ladder2-standards-evaluations';
const EVALUATION_SKILLS = {
  education: {
    label: 'Education Standards Evaluation',
    file: '/skills/EDU_eval.md?v=1',
    families: ['ISTE', 'UNESCO AI Competency Framework', 'EU AI Act', 'NIST AI RMF']
  },
  employment: {
    label: 'Employment Standards Evaluation',
    file: '/skills/EMPLOY_eval.md?v=1',
    families: ['O*NET', 'World Economic Forum Skills']
  }
};

// Learner ID model: the Firebase Auth UID is the canonical learner id (Scott's
// decision — "use the new UIDs"). On sign-in the uid becomes the record key
// (learners/{uid}) and is what the Profile shows; there is no AESOP-XXXX scheme.
// A leftover AESOP-#### id from the retired build is NOT a valid learner id; drop it
// from storage so the app never resolves to or displays a stale id.
function storedUid() {
  const v = localStorage.getItem(LS_ID) || '';
  if (/^AESOP-/i.test(v)) { localStorage.removeItem(LS_ID); return ''; }
  return v;
}

// Real Firebase auth (email-link sign-up + password sign-in). Set in
// initFirebaseAuth() after the data layer has created the default app.
let auth = null;

// Education tiers / roles offered as the certification "level".
const EDUCATION_TIERS = [
  'Elementary', 'Middle School', 'High School',
  'Young Adult', 'College', 'Workforce', 'Leadership'
];
const PROFESSIONAL_ROLES = [
  { id: 'ai-developer', label: 'AI Developer', source: 'O*NET 15-1255+', standards: 'O*NET, WEF, NIST AI RMF', description: 'Develop AI applications, write code for AI systems, and implement models.', roleSpec: 'Evaluate programming fluency, AI/ML framework awareness, implementation judgment, testing habits, documentation, and the ability to turn requirements into working AI solutions.' },
  { id: 'machine-learning-engineer', label: 'Machine Learning Engineer', source: 'O*NET 15-1255+', standards: 'O*NET, WEF, NIST AI RMF', description: 'Design, train, validate, optimize, and deploy machine learning systems.', roleSpec: 'Evaluate model design, data preprocessing, feature engineering, evaluation metrics, validation, production ML lifecycle, scalability, and deployment tradeoffs.' },
  { id: 'data-scientist', label: 'Data Scientist', source: 'O*NET 15-2051.00', standards: 'O*NET, WEF, NIST AI RMF', description: 'Analyze data, develop predictive models, and communicate usable insights.', roleSpec: 'Evaluate statistical reasoning, data cleaning, modeling, visualization, business translation, bias awareness, and communication to non-technical stakeholders.' },
  { id: 'ai-operations-engineer', label: 'AI Operations Engineer', source: 'WEF Future of Jobs 2025', standards: 'WEF, NIST AI RMF, ISO/IEC 42001', description: 'Deploy, monitor, maintain, and troubleshoot production AI systems.', roleSpec: 'Evaluate MLOps, monitoring, incident response, model drift, versioning, cloud/container operations, reliability, and operational risk management.' },
  { id: 'ai-product-manager', label: 'AI Product Manager', source: 'WEF Future of Jobs 2025', standards: 'WEF, O*NET Product Management', description: 'Define AI product strategy, prioritize features, and manage roadmaps.', roleSpec: 'Evaluate AI product judgment, use-case feasibility, roadmap decisions, stakeholder communication, user research, responsible AI implications, and outcome metrics.' },
  { id: 'ai-educator', label: 'AI Educator', source: 'O*NET 25-1021.00', standards: 'O*NET, UNESCO, ISTE', description: 'Teach AI concepts, design curriculum, and train learners.', roleSpec: 'Evaluate conceptual accuracy, explanation across levels, curriculum design, assessment design, facilitation, feedback, responsible AI, and learner support.' },
  { id: 'ai-security-specialist', label: 'AI Security Specialist', source: 'O*NET 15-3121.00', standards: 'O*NET, NIST AI RMF, OWASP', description: 'Secure AI systems through threat modeling, testing, and mitigation.', roleSpec: 'Evaluate AI threat knowledge, prompt-injection awareness, data poisoning, model theft, privacy, red teaming, secure architecture, and mitigation strategy.' },
  { id: 'ai-governance-officer', label: 'AI Governance Officer', source: 'WEF Future of Jobs 2025', standards: 'WEF, NIST AI RMF, EU AI Act', description: 'Lead AI policy, compliance, ethics, risk, and governance frameworks.', roleSpec: 'Evaluate governance design, risk assessment, bias and transparency controls, policy implementation, audit trails, regulatory awareness, and stakeholder decision-making.' },
  { id: 'ai-consultant', label: 'AI Consultant', source: 'O*NET 13-1111.00', standards: 'O*NET, WEF, NIST AI RMF', description: 'Advise organizations on AI readiness, strategy, and implementation.', roleSpec: 'Evaluate AI strategy, readiness assessment, roadmap planning, change management, use-case selection, risk framing, and executive communication.' },
  { id: 'executive-leadership', label: 'Executive Leadership', source: 'WEF, NIST AI RMF', standards: 'WEF, NIST AI RMF, EU AI Act', description: 'Set AI vision, transformation strategy, governance, and investment direction.', roleSpec: 'Evaluate strategic AI literacy, business impact, governance accountability, risk ownership, team leadership, ROI judgment, and responsible transformation.' },
  { id: 'data-analyst', label: 'Data Analyst', source: 'O*NET 15-2051.01', standards: 'O*NET, WEF, NIST AI RMF', description: 'Analyze business data, produce reports, and identify trends.', roleSpec: 'Evaluate SQL/data manipulation, cleaning, dashboards, trend analysis, business question framing, reporting accuracy, and practical AI-assisted analysis.' },
  { id: 'ai-solutions-architect', label: 'AI Solutions Architect', source: 'O*NET 15-1299.08', standards: 'O*NET, WEF, NIST AI RMF', description: 'Design enterprise AI systems and integration patterns.', roleSpec: 'Evaluate architecture tradeoffs, cloud AI patterns, data pipelines, security, scalability, integration, cost, reliability, and business-to-technical translation.' },
  { id: 'prompt-engineer', label: 'Prompt Engineer', source: 'WEF 2025 (Emerging)', standards: 'WEF Future of Jobs 2025', description: 'Design, test, optimize, and document prompts for AI systems.', roleSpec: 'Evaluate prompt design, model behavior awareness, iterative testing, prompt injection risk, template versioning, task decomposition, and performance measurement.' },
  { id: 'business-analyst-ai', label: 'Business Analyst (AI)', source: 'O*NET 13-1161.00', standards: 'O*NET, WEF, NIST AI RMF', description: 'Identify AI use cases, assess business impact, and drive adoption.', roleSpec: 'Evaluate workflow mapping, requirements gathering, use-case scoping, feasibility, ROI, stakeholder translation, change management, and KPI design.' }
];
const PROFESSIONAL_ROLE_LABELS = new Set(PROFESSIONAL_ROLES.map((role) => role.label));
const CERTIFICATION_LEVELS = [...EDUCATION_TIERS, ...PROFESSIONAL_ROLES.map((role) => role.label)];
const ADULT_TIERS = new Set(['Young Adult', 'College', 'Workforce', 'Leadership', ...PROFESSIONAL_ROLE_LABELS]);

// Proctoring levels surfaced in Certification (doc-16: external is scaffolded).
const PROCTORING_MODES = [
  { id: 'self', label: 'Self-proctored' },
  { id: 'authenticated', label: 'Authenticated (account-bound)' },
  { id: 'external', label: 'External proctor (scaffold — not yet active)', scaffold: true }
];

// --- Products catalog config (kept local so the live Products files are untouched) ---
const PRODUCTS_CATALOG_URL = '/docs/theladder-products-catalog.md?v=3';
const PRODUCT_CATEGORY_RANGES = [
  { label: 'AI assistants', start: 1, end: 20 },
  { label: 'Workplace + writing', start: 21, end: 35 },
  { label: 'Coding tools', start: 36, end: 61 },
  { label: 'Search + RAG', start: 62, end: 82 },
  { label: 'Vector databases', start: 83, end: 107 },
  { label: 'Data + analytics', start: 108, end: 126 },
  { label: 'Design + slides', start: 127, end: 146 },
  { label: 'Video + audio', start: 147, end: 166 },
  { label: 'Sales + support', start: 167, end: 191 },
  { label: 'Agents + automation', start: 192, end: 210 },
  { label: 'Model APIs + cloud', start: 211, end: 230 },
  { label: 'Regulated AI', start: 231, end: 250 },
  { label: 'HR + recruiting', start: 251, end: 275 },
  { label: 'Education + tutoring', start: 276, end: 300 },
  { label: 'Ecommerce + retail', start: 301, end: 325 },
  { label: 'Finance + accounting', start: 326, end: 350 },
  { label: 'AIOps + incidents', start: 351, end: 375 },
  { label: 'AI governance', start: 376, end: 400 },
  { label: 'Construction + real estate', start: 401, end: 425 },
  { label: 'Manufacturing + supply chain', start: 426, end: 450 },
  { label: 'Science + clinical AI', start: 451, end: 475 },
  { label: 'Personal productivity', start: 476, end: 500 }
];
function parseProductCatalog(markdown) {
  return markdown.split('\n')
    .filter((line) => /^\|\s*\d+\s*\|/.test(line))
    .map((line) => {
      const c = line.split('|').slice(1, -1).map((x) => x.trim());
      return { id: Number(c[0]), name: c[1], type: c[2], reason: c[3], depth: c[4] };
    })
    .filter((p) => Number.isFinite(p.id) && p.name);
}
function inRange(id, range) { return id >= range.start && id <= range.end; }

// =============================================================================
// FOCUS REGISTRY — normalizes the three providers to one interface.
// =============================================================================
const FOCUSES = {
  concepts: {
    id: 'concepts', label: 'AI Concepts', pathway: 'concept',
    async loadCatalog() { return LADDER_TIERS; },
    buildGroups(tiers) {
      return tiers.map((tier) => ({
        id: tier.id,
        label: `${tier.name}: ${tier.title}`,
        raw: tier,
        items: (tier.topics || []).map((t) => ({ id: `topic-${t.id}`, label: t.title, raw: t }))
      }));
    },
    placementDescriptor(tiers) { return Concepts.buildConceptsPlacementDescriptor(tiers); },
    certItemForGroup(group) {
      return { tier: group.raw || { id: group.id, name: group.label.split(':')[0], title: (group.label.split(':')[1] || '').trim(), topics: group.items.map((i) => i.raw) } };
    },
    CERT_DEPTHS: Concepts.CERT_DEPTHS,
    depthForLabel: Concepts.depthForLabel,
    buildBlueprint: ({ item, level, depth }) => Concepts.buildConceptsBlueprint({ tier: item.tier, level, depth }),
    buildCertContext: ({ item, depth, learnerId }) => Concepts.buildConceptsCertContext({ tier: item.tier, depth, learnerId }),
    IDENTITY_LEVELS: Concepts.CONCEPTS_IDENTITY_LEVELS,
    resolveIdentityLevel: Concepts.resolveConceptsIdentityLevel,
    buildIdentityAssurance: Concepts.buildConceptsIdentityAssurance,
    identityLevelById: Concepts.identityLevelById
  },
  products: {
    id: 'products', label: 'Products', pathway: 'product',
    async loadCatalog() {
      const md = await fetch(PRODUCTS_CATALOG_URL).then((r) => r.text());
      return parseProductCatalog(md);
    },
    buildGroups(products) {
      return PRODUCT_CATEGORY_RANGES.map((range) => ({
        id: range.label,
        label: range.label,
        items: products.filter((p) => inRange(p.id, range)).map((p) => ({ id: `product-${p.id}`, label: p.name, raw: p }))
      })).filter((g) => g.items.length);
    },
    placementDescriptor(products) { return Products.buildProductPlacementDescriptor(products, PRODUCT_CATEGORY_RANGES); },
    certItemForGroup(group, item) { return { product: item ? item.raw : group.items[0]?.raw }; },
    CERT_DEPTHS: Products.CERT_DEPTHS,
    depthForLabel: Products.depthForLabel,
    buildBlueprint: ({ item, level, depth }) => Products.buildProductBlueprint({ product: item.product, level, depth }),
    buildCertContext: ({ item, depth, learnerId }) => Products.buildProductCertContext({ product: item.product, depth, learnerId }),
    IDENTITY_LEVELS: Products.PRODUCT_IDENTITY_LEVELS,
    resolveIdentityLevel: Products.resolveProductIdentityLevel,
    buildIdentityAssurance: Products.buildProductIdentityAssurance,
    identityLevelById: Products.identityLevelById
  },
  'use-cases': {
    id: 'use-cases', label: 'Use Cases', pathway: 'use-case',
    async loadCatalog() {
      const md = await fetch(UseCases.USE_CASE_CATALOG_URL).then((r) => r.text());
      return UseCases.parseUseCaseCatalog(md);
    },
    buildGroups(useCases) {
      return UseCases.USE_CASE_TOPIC_RANGES
        .filter((r) => !/^all /i.test(r.label))
        .map((range) => ({
          id: range.label,
          label: range.label,
          items: useCases.filter((u) => inRange(u.id, range)).map((u) => ({ id: String(u.id), label: u.name, raw: u }))
        })).filter((g) => g.items.length);
    },
    placementDescriptor(useCases) { return UseCases.buildUseCasePlacementDescriptor(useCases, UseCases.USE_CASE_TOPIC_RANGES); },
    certItemForGroup(group, item) { return { useCase: item ? item.raw : group.items[0]?.raw }; },
    CERT_DEPTHS: UseCases.CERT_DEPTHS,
    depthForLabel: UseCases.depthForLabel,
    buildBlueprint: ({ item, level, depth }) => UseCases.buildUseCaseBlueprint({ item: item.useCase, level, depth }),
    buildCertContext: ({ item, depth, learnerId }) => UseCases.buildUseCaseCertContext({ item: item.useCase, depth, learnerId }),
    IDENTITY_LEVELS: UseCases.USE_CASE_IDENTITY_LEVELS,
    resolveIdentityLevel: UseCases.resolveUseCaseIdentityLevel,
    buildIdentityAssurance: UseCases.buildUseCaseIdentityAssurance,
    identityLevelById: UseCases.identityLevelById
  }
};

// =============================================================================
// STATE
// =============================================================================
const certificationEngine = createCertificationEngine({ proxyUrl: PROXY_URL });
let placementEngine = null;

const state = {
  focusId: localStorage.getItem(LS_FOCUS) || 'concepts',
  languageCode: initialLanguageCode(),
  catalog: null,
  groups: [],
  activeGroupId: null,
  activeItemId: null,
  trainingPedagogy: null,
  trainingStandards: {},
  placement: null,
  assessMessages: [],
  trainMessages: [],
  certMessages: [],
  activeCert: null,            // { item, level, depth, context, blueprint }
  lastCertSnapshot: null,
  identityGate: { levelId: null, adultAttested: false, identitySigned: false, proctoringId: 'self' },
  authUser: null,              // source of truth is Firebase onAuthStateChanged
  completed: {}                // itemId -> true (per focus, keyed focusId:itemId)
};

const $ = (id) => document.getElementById(id);
const setText = (id, v) => { const e = $(id); if (e) e.textContent = v; };
const focus = () => FOCUSES[state.focusId];
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function initialLanguageCode() {
  const saved = localStorage.getItem(WORKSPACE_LANGUAGE_KEY) || localStorage.getItem(WELCOME_LANGUAGE_KEY) || 'en';
  return WORKSPACE_LANGUAGES.some((item) => item.code === saved) ? saved : 'en';
}
function languageInfo() { return workspaceLanguageInfo(state.languageCode); }
function tx() { return workspaceText(state.languageCode); }
function fmt(template, params = {}) { return formatText(template, params); }
function languagePromptLabel() { return languageInfo().promptLabel; }
function languageDirective(area) {
  const text = tx();
  const template = area === 'certification' ? text.certification.promptInstruction : text.training.promptInstruction;
  return fmt(template, { language: languagePromptLabel() });
}
function focusDisplayLabel(focusId = state.focusId) {
  const labels = {
    concepts: tx().training.concepts,
    products: tx().training.products,
    'use-cases': tx().training.useCases
  };
  return labels[focusId] || FOCUSES[focusId]?.label || focus().label;
}

// Chat textareas: Enter sends the prompt, Shift+Enter inserts a newline.
function enterToSend(textareaId) {
  const ta = $(textareaId);
  if (!ta) return;
  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      ta.form?.requestSubmit();
    }
  });
}

// =============================================================================
// PROXY helper (placement / training / examiner share one body shape)
// =============================================================================
async function askModel({ messages, systemPrompt, maxTokens = 800, model }) {
  const body = { messages, system_prompt: systemPrompt, max_tokens: maxTokens };
  if (model) body.model = model;
  let res;
  try {
    res = await fetch(PROXY_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
  } catch (e) {
    console.warn('[ladder2] AI proxy request failed', e);
    return 'The AI service is temporarily unavailable. Please try again in a moment.';
  }
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; }
  catch (e) {
    console.warn('[ladder2] AI proxy returned non-JSON', { status: res.status, text: text.slice(0, 240) });
    return 'The AI service is temporarily unavailable. Please try again in a moment.';
  }
  if (!res.ok) {
    console.warn('[ladder2] AI proxy returned error', { status: res.status, data });
    return data?.error || 'The AI service is temporarily unavailable. Please try again in a moment.';
  }
  return data?.content?.[0]?.text || data?.error || 'I hit a snag. Please try again.';
}

function isTransientAiMessage(content) {
  return /AI service is temporarily unavailable|could not read the training AI response|could not reach the training AI|training AI returned an error|could not get a training response/i.test(content || '');
}

function renderChat(el, messages, options = {}) {
  if (!el) return;
  el.innerHTML = messages.map((m) => `
    <div class="l2-msg l2-msg--${m.role === 'user' ? 'user' : 'guide'}">
      <span class="l2-msg__role">${m.role === 'user' ? 'You' : 'Guide'}</span>
      <div class="l2-msg__body">${escapeHtml(m.content).replace(/\n/g, '<br>')}</div>
    </div>`).join('');
  if (options.scroll === 'latest-assistant') {
    const assistantMessages = el.querySelectorAll('.l2-msg--guide');
    const target = assistantMessages[assistantMessages.length - 1];
    if (target) {
      const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
      const targetTop = target.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop;
      el.scrollTop = Math.min(maxScroll, Math.max(0, targetTop - 8));
      return;
    }
  }
  el.scrollTop = el.scrollHeight;
}

function validDraftMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => ['user', 'assistant'].includes(m?.role) && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content }));
}

function readAssessmentDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(LS_ASSESSMENT) || 'null');
    if (!draft || draft.version !== 1) return null;
    return {
      focusId: draft.focusId || 'concepts',
      messages: validDraftMessages(draft.messages),
      input: typeof draft.input === 'string' ? draft.input : '',
      savedAt: draft.savedAt || ''
    };
  } catch {
    return null;
  }
}

function saveAssessmentDraft() {
  if (state.placement) {
    localStorage.removeItem(LS_ASSESSMENT);
    return;
  }
  const input = $('l2AssessInput')?.value || '';
  const messages = validDraftMessages(state.assessMessages);
  if (!messages.length && !input.trim()) {
    localStorage.removeItem(LS_ASSESSMENT);
    return;
  }
  localStorage.setItem(LS_ASSESSMENT, JSON.stringify({
    version: 1,
    focusId: state.focusId,
    messages,
    input,
    savedAt: new Date().toISOString()
  }));
}

function restoreAssessmentDraft() {
  if (state.assessMessages.length || state.placement) return;
  const draft = readAssessmentDraft();
  if (!draft || draft.focusId !== state.focusId) return;
  state.assessMessages = draft.messages;
  if ($('l2AssessInput')) $('l2AssessInput').value = draft.input;
  renderChat($('l2AssessLog'), state.assessMessages);
  renderPlacementProgress();
}

function clearAssessmentDraft() {
  localStorage.removeItem(LS_ASSESSMENT);
}

// =============================================================================
// BOOT
// =============================================================================
async function init() {
  setupTheme();
  setupWorkspaceLanguage();
  setupNavActions();
  setupFocusToggle();
  setupAssessment();
  setupTraining();
  setupCertification();
  setupProfile();
  setupAuth();
  renderHeroSignup();   // set the signed-out display state before first paint

  // Seed the data layer with the stored uid (from a prior sign-in) if present; an
  // anonymous visitor has no learner id until they sign in and their uid is adopted.
  // storedUid() also discards any stale AESOP-#### leftover from the old build.
  const storedId = storedUid();
  initDataLayer(storedId ? { learnerId: storedId } : {}).catch((e) => console.warn('data-layer init failed (local-only)', e));
  loadTrainingPedagogy()
    .then((pedagogy) => { state.trainingPedagogy = pedagogy; })
    .catch((e) => console.warn('training pedagogy load failed (local fallback)', e));
  try {
    const rec = storedId ? await loadLearnerRecord(storedId) : null;
    if (rec) hydrate(rec);
  } catch (e) { console.warn('learner record load failed', e); }
  initFirebaseAuth();

  await activateFocus(state.focusId);
  renderAuthGates();
  renderHeroSignup();
  renderMarketing();
  renderLadderL();
  renderProfile();
  applyWorkspaceLanguage();
}

function hydrate(rec) {
  // pull completed counts + active course hints from the durable record
  const progressKeys = { concept: 'ladderProgress', product: 'productProgress', 'use-case': 'useCaseProgress' };
  Object.entries(progressKeys).forEach(([pathway, key]) => {
    const starts = rec?.[key]?.courseStarts || {};
    Object.entries(starts).forEach(([itemId, v]) => {
      if (v?.status === 'completed') state.completed[`${pathway}:${itemId}`] = true;
    });
  });
  state._record = rec;
}

// =============================================================================
// THEME / NAV
// =============================================================================
function setupTheme() {
  const btn = $('l2DarkToggle');
  const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><line x1="12" y1="1.5" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22.5"/><line x1="1.5" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22.5" y2="12"/><line x1="4.4" y1="4.4" x2="6.2" y2="6.2"/><line x1="17.8" y1="17.8" x2="19.6" y2="19.6"/><line x1="4.4" y1="19.6" x2="6.2" y2="17.8"/><line x1="17.8" y1="6.2" x2="19.6" y2="4.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const sync = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    // show the mode you'll switch TO: moon in light, sun in dark
    btn.innerHTML = dark ? SUN : MOON;
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  btn?.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (dark) { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('aesop-theme', 'light'); }
    else { document.documentElement.setAttribute('data-theme', 'dark'); localStorage.setItem('aesop-theme', 'dark'); }
    sync();
  });
  sync();
}

function setNodeText(selector, value) {
  const node = document.querySelector(selector);
  if (node && value !== undefined) node.textContent = value;
}

function setNodesText(selector, values) {
  document.querySelectorAll(selector).forEach((node, index) => {
    if (values[index] !== undefined) node.textContent = values[index];
  });
}

function setNodeAttr(selector, attr, value) {
  const node = document.querySelector(selector);
  if (node && value !== undefined) node.setAttribute(attr, value);
}

function setupWorkspaceLanguage() {
  const lang = $('l2Lang');
  if (!lang) return;
  lang.innerHTML = WORKSPACE_LANGUAGES.map((item) =>
    `<option value="${escapeHtml(item.code)}">${escapeHtml(item.label)}</option>`
  ).join('');
  lang.value = state.languageCode;
  lang.addEventListener('change', () => {
    state.languageCode = lang.value;
    localStorage.setItem(WORKSPACE_LANGUAGE_KEY, state.languageCode);
    localStorage.setItem(WELCOME_LANGUAGE_KEY, state.languageCode);
    applyWorkspaceLanguage();
    renderRail();
    renderActiveItem();
    renderAuthGates();
    renderHeroSignup();
    renderMarketing();
    renderProfile();
  });
}

function applyWorkspaceLanguage() {
  const t = tx();
  const info = languageInfo();
  document.documentElement.lang = info.code;
  document.documentElement.dir = info.dir || 'ltr';
  document.body.dir = info.dir || 'ltr';
  document.title = t.metaTitle;
  setNodeAttr('meta[name="description"]', 'content', t.metaDescription);
  setNodeAttr('meta[property="og:title"]', 'content', t.metaTitle);
  setNodeAttr('meta[property="og:description"]', 'content', t.metaDescription);
  setNodeAttr('meta[name="twitter:title"]', 'content', t.metaTitle);
  setNodeAttr('meta[name="twitter:description"]', 'content', t.metaDescription);

  const lang = $('l2Lang');
  if (lang) lang.value = state.languageCode;

  setNodesText('.l2-navlink[href="#profile"]', [t.nav.profile]);
  setNodesText('.l2-navlink[href="#assessment"]', [t.nav.assessment]);
  setNodesText('.l2-navlink[href="#training"]', [t.nav.training]);
  setNodesText('.l2-navlink[href="#certification"]', [t.nav.certification]);
  setNodesText('.l2-navlink[href="#support"]', [t.nav.support]);

  setNodeText('#marketing .eyebrow', t.marketing.eyebrow);
  setNodesText('.hero-cascade-line', t.marketing.cascade.slice(0, 3));
  setNodeText('.hero-cascade-final', t.marketing.cascade[3]);
  setNodeText('.l2-hero-primary-cta', t.marketing.cta);
  setNodeText('.why-trust-title', t.marketing.trustTitle);
  setNodesText('.why-trust-list li', t.marketing.trust);
  setNodeText('.ladder-stairs-caption', t.marketing.broughtBy);
  setNodeText('.l2-signup-eyebrow', t.marketing.signupEyebrow);
  setNodeAttr('#l2SignupEmail', 'placeholder', t.marketing.emailPlaceholder);
  setNodeAttr('#l2SigninEmail', 'placeholder', t.marketing.email);
  setNodeAttr('#l2SigninPw', 'placeholder', t.marketing.password);
  setNodeAttr('#l2TrainingSigninEmail', 'placeholder', t.marketing.email);
  setNodeAttr('#l2TrainingSigninPassword', 'placeholder', t.marketing.password);
  setNodeText('#l2TrainingSigninBtn', t.marketing.signin);
  setNodeText('#l2SignupForm button[type="submit"]', t.marketing.signup);
  setNodeText('#l2SigninToggle', t.marketing.signinToggle);
  setNodeText('#l2SigninForm button[type="submit"]', t.marketing.signin);
  setNodeText('#l2AccountSignOut', t.marketing.signout);
  setNodeText('#l2HeroSignOut', t.marketing.signout);
  const signedInLabel = document.querySelector('#l2SignedIn span');
  if (signedInLabel?.firstChild) signedInLabel.firstChild.textContent = `${t.marketing.signedInAs} `;

  setNodeText('#profile .l2-eyebrow', t.profile.eyebrow);
  setNodeText('#profile .l2-section-title', t.profile.title);
  setNodeText('#profile .l2-section-lead', t.profile.lead);
  setNodeText('.l2-learner-id-label', t.profile.learnerId);
  setNodeText('.hero-cert-label', t.profile.certsEarned);
  setNodesText('.hero-progress-label', [t.profile.tiersCompleted, t.profile.tiersPlacedOut]);
  setNodesText('.hero-cert-name', [t.profile.core, t.profile.expert, t.profile.mastery]);
  setNodeText('.l2-cert-strip .l2-btn', t.profile.viewRecord);
  setNodeText('#l2OpenCoursesCard .l2-card-title', t.profile.openCourses);

  setNodeText('#assessment .l2-eyebrow', t.assessment.eyebrow);
  setNodeText('#assessment .l2-section-title', t.assessment.title);
  setNodeText('#assessment .l2-section-lead', t.assessment.lead);
  setNodeText('#l2PlacementToolbar .placement-summary .panel-label', t.assessment.panel);
  setNodeText('#l2PlacementStatus', t.assessment.notPlaced);
  setNodeText('#l2PlacementSummary', t.assessment.summary);
  setNodeText('#l2PlacementToolbar .assessment-chat-head .panel-label', t.assessment.conversation);
  setNodeText('#l2StartPlacement', t.assessment.start);
  setNodeText('#l2ResetPlacement', t.assessment.reset);
  setNodeAttr('#l2AssessInput', 'placeholder', t.assessment.placeholder);
  setNodeText('#l2AssessSend', t.assessment.send);
  setNodeText('#l2AssessmentDone strong', t.assessment.complete);
  setNodeText('#l2AssessmentDone p', t.assessment.completeCopy);
  setNodeText('#l2AssessmentDone .l2-btn', t.assessment.continueTraining);

  setNodeText('#training .l2-eyebrow', t.training.eyebrow);
  setNodeText('#training .l2-section-title', t.training.title);
  setNodeText('#training .training-left-column > .l2-section-lead', t.training.lead);
  setNodesText('#l2FocusToggle .l2-focus-btn', [t.training.concepts, t.training.products, t.training.useCases]);
  setNodeAttr('.training-nav-panel', 'aria-label', t.training.navLabel);
  setNodeAttr('.training-tier-picker', 'aria-label', t.training.tierSelection);
  setNodeText('#l2StartChat', t.training.startConversation);
  setNodeText('#l2ResetChat', t.training.reset);
  setNodeAttr('#l2ChatInput', 'placeholder', t.training.chatPlaceholder);
  setNodeText('#l2ChatForm button[type="submit"]', t.training.send);
  setNodeText('.training-text-size span', t.training.textSize);
  setNodeAttr('.training-standards-eval', 'aria-label', t.training.evalOptions);
  setNodesText('.training-eval-check span', [t.training.eduEval, t.training.employEval]);
  setNodeText('#l2RunStandardsEval', t.training.runEval);
  setNodeText('.training-eval-action p', t.training.evalCopy);

  setNodeText('#certification .l2-eyebrow', t.certification.eyebrow);
  setNodeText('#certification .l2-section-title', t.certification.title);
  setNodeText('#certification .certification-left-column > .l2-section-lead', t.certification.lead);
  setNodeAttr('.certification-nav-panel', 'aria-label', t.certification.navLabel);
  setNodeAttr('.certification-tier-picker', 'aria-label', t.certification.selection);
  setNodeText('#l2CertSetupPanel > .panel-label', t.certification.certifyThisRung);
  setNodeText('#l2CertTarget', t.certification.target);
  setNodesText('#l2CertSetupPanel .evaluation-field span', [t.certification.level, t.certification.masteryLevel, t.certification.identity, t.certification.proctoring]);
  setNodeText('#l2IdentityAttestLabel span', t.certification.identityAttest);
  setNodeText('#l2AccountGate h3', t.certification.account);
  setNodeText('#l2AccountMsg', t.certification.accountMsg);
  setNodeText('#l2AdultAttestLabel span', t.certification.adultAttest);
  setNodeAttr('#l2AccountEmail', 'placeholder', t.marketing.email);
  setNodeAttr('#l2AccountPassword', 'placeholder', t.marketing.password);
  setNodeText('#l2AccountSignIn', t.marketing.signin);
  setNodeText('#l2AccountCreate', t.certification.createAccount);
  setNodeText('#l2AccountConfirmAdult', t.certification.confirmAdult);
  setNodeText('#l2StartCert', t.certification.start);
  setNodeText('.certification-record-link a', t.certification.record);
  setNodeText('#l2CertExamTitle', t.certification.examTitle);
  setNodeText('#l2CertExamSummary', t.certification.examSummary);
  setNodeText('#l2CertModeBar .panel-label', t.certification.inProgress);
  setNodeText('#l2FinalizeCert', t.certification.finalize);
  setNodeText('#l2FinalizeCert + p', t.certification.finalizeCopy);
  setNodeText('#l2EndCert', t.certification.end);
  setNodeText('#l2EndCert + p', t.certification.endCopy);
  setNodeAttr('#l2CertInput', 'placeholder', t.certification.placeholder);
  setNodeText('#l2CertForm button[type="submit"]', t.certification.send);

  const footerCta = document.querySelector('.l2-footer-cta a');
  if (footerCta) footerCta.textContent = t.support.footerCta;
  setNodeText('.l2-footer-support .panel-label', t.support.label);
  setNodeText('.l2-footer-support h3', t.support.title);
  setNodeText('label[for="l2FeedbackType"]', t.support.topic);
  setNodesText('#l2FeedbackType option', t.support.options);
  setNodeText('label[for="l2FeedbackEmail"]', t.support.email);
  setNodeAttr('#l2FeedbackEmail', 'placeholder', t.support.emailPlaceholder);
  setNodeText('label[for="l2FeedbackMessage"]', t.support.message);
  setNodeAttr('#l2FeedbackMessage', 'placeholder', t.support.messagePlaceholder);
  setNodeText('#l2FeedbackForm button', t.support.send);
  setNodeText('#l2FeedbackSent', t.support.sent);
  setNodeText('.l2-footer-grid p', t.support.footerCopy);
  setNodeText('.l2-footer-col h4', t.support.linksTitle);
  setNodesText('.l2-footer-col:nth-of-type(2) a', [t.support.placement, t.support.training, t.support.certification, t.support.support, t.support.profile]);
  setNodeText('.l2-footer-col:nth-of-type(3) h4', t.support.academy);
  setNodeText('.l2-footer-col:nth-of-type(3) a', t.support.record);
}

function setupNavActions() {
  // hero focus list (marketing right panel)
  const list = $('l2HeroFocusList');
  if (list) {
    list.innerHTML = Object.values(FOCUSES).map((f) =>
      `<button class="l2-btn l2-btn--ghost" data-jump-focus="${f.id}" style="justify-content:flex-start;">${f.label} →</button>`).join('');
    list.querySelectorAll('[data-jump-focus]').forEach((b) => b.addEventListener('click', async () => {
      await activateFocus(b.dataset.jumpFocus);
      document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' });
    }));
  }

  const scrollCertificationAnchor = () => {
    const target = document.getElementById('certification');
    if (!target) return;
    const navHeight = document.querySelector('.nav')?.getBoundingClientRect().height || 48;
    const raisePx = 96 - (navHeight / 2);
    const targetTop = target.getBoundingClientRect().top + window.scrollY + raisePx;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  };

  document.querySelectorAll('a[href="#certification"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      history.pushState(null, '', '#certification');
      scrollCertificationAnchor();
    });
  });
  window.addEventListener('hashchange', () => {
    if (location.hash === '#certification') setTimeout(scrollCertificationAnchor, 0);
  });
  if (location.hash === '#certification') setTimeout(scrollCertificationAnchor, 900);

  // Nav underline driven by a JS class, NOT CSS :hover. :hover is geometric: when a
  // sticky nav word lands under a resting cursor on scroll (or smooth-scroll from a
  // click), it engages with no intent — leaving Profile permanently underlined. Here
  // the underline is set only on a real mouseenter, cleared on mouseleave, and fully
  // suppressed while scrolling (and ~250ms after) so scroll never lights it up.
  // Underline follows deliberate pointer MOVEMENT over a nav word. Not :hover
  // (geometric — sticks when a sticky word lands under the cursor on scroll) and
  // not mouseenter (fires when a word appears under a RESTING cursor, then never
  // gets a mouseleave — that was the "Profile always active" stick). mousemove only
  // fires on real movement: a resting cursor sets nothing, moving off clears it
  // (self-correcting), and scroll suppresses it.
  let navHovered = null, navScrolling = false, navScrollIdle;
  const setNavHover = (link) => {
    if (link === navHovered) return;
    if (navHovered) navHovered.classList.remove('is-navhover');
    navHovered = link;
    if (link) link.classList.add('is-navhover');
  };
  document.addEventListener('mousemove', (e) => {
    if (navScrolling) return;
    setNavHover(e.target.closest ? e.target.closest('.l2-navlink') : null);
  }, { passive: true });
  window.addEventListener('scroll', () => {
    navScrolling = true;
    setNavHover(null);
    clearTimeout(navScrollIdle);
    navScrollIdle = setTimeout(() => { navScrolling = false; }, 250);
  }, { passive: true });
}

// =============================================================================
// FOCUS TOGGLE
// =============================================================================
function setupFocusToggle() {
  $('l2FocusToggle')?.querySelectorAll('.l2-focus-btn').forEach((btn) => {
    btn.addEventListener('click', () => activateFocus(btn.dataset.focus));
  });
}

async function activateFocus(focusId) {
  if (!FOCUSES[focusId]) focusId = 'concepts';
  state.focusId = focusId;
  localStorage.setItem(LS_FOCUS, focusId);

  // toggle active button
  document.querySelectorAll('#l2FocusToggle .l2-focus-btn').forEach((b) =>
    b.classList.toggle('is-active', b.dataset.focus === focusId));
  setText('l2FocusLabel', focus().label);
  setText('l2CertFocusLabel', focus().label);

  $('l2GroupStatus').textContent = tx().training.loadingRungs;
  state.catalog = await focus().loadCatalog();
  state.groups = focus().buildGroups(state.catalog);
  placementEngine = createPlacementEngine(focus().placementDescriptor(state.catalog));
  restoreAssessmentDraft();

  // reset active selection to first group/item
  state.activeGroupId = state.groups[0]?.id || null;
  state.activeItemId = state.groups[0]?.items[0]?.id || null;
  state.trainMessages = [];

  renderRail();
  renderActiveItem();
  renderCertConfig();
}

// =============================================================================
// TRAINING — rail + guided conversation
// =============================================================================
function setupTraining() {
  $('l2StartChat')?.addEventListener('click', startTrainingChat);
  $('l2ResetChat')?.addEventListener('click', resetTrainingChat);
  $('l2ChatForm')?.addEventListener('submit', submitTrainingChat);
  enterToSend('l2ChatInput');
  setupTrainingTextScale();
  $('l2RunStandardsEval')?.addEventListener('click', runSelectedStandardsEvaluations);
  $('l2CompleteBtn')?.addEventListener('click', markComplete);
}

function setTrainingTextScale(value) {
  const scale = Math.min(1.6, Math.max(1, Number(value) || 1));
  document.body.style.setProperty('--training-chat-scale', String(scale));
  if ($('l2TrainingTextSize')) $('l2TrainingTextSize').value = String(scale);
  try { localStorage.setItem(LS_TRAINING_TEXT_SCALE, String(scale)); } catch {}
}

function setupTrainingTextScale() {
  const slider = $('l2TrainingTextSize');
  const saved = localStorage.getItem(LS_TRAINING_TEXT_SCALE) || '1';
  setTrainingTextScale(saved);
  slider?.addEventListener('input', () => setTrainingTextScale(slider.value));
}

function activeGroup() { return state.groups.find((g) => g.id === state.activeGroupId) || state.groups[0]; }
function activeItem() { const g = activeGroup(); return g?.items.find((i) => i.id === state.activeItemId) || g?.items[0]; }
function trainingDescriptionFor(it) {
  if (!it) return tx().training.descriptionFallback;
  const raw = it.raw || {};
  const description = raw.description || raw.reason || raw.summary || raw.outcome || raw.depth || '';
  if (description) return description;
  return `Learn what "${it.label}" means, where it applies, what can go wrong, and how to use it in a practical AI workflow.`;
}

function listText(items, limit = 18) {
  const cleaned = (items || []).map((item) => String(item || '').trim()).filter(Boolean);
  if (!cleaned.length) return 'Not specified in the catalog.';
  const visible = cleaned.slice(0, limit).join(', ');
  return cleaned.length > limit ? `${visible}, plus ${cleaned.length - limit} more` : visible;
}

function criteriaListText(items) {
  const cleaned = (items || []).map((item) => String(item || '').trim()).filter(Boolean);
  if (!cleaned.length) return '- Not specified in the catalog.';
  return cleaned.map((item) => `- ${item.replace(/[.;]\s*$/, '')}`).join('\n');
}

function criteriaDepthLabel(depth) {
  const raw = String(depth || '').trim();
  if (!raw || raw === 'certification') return 'Core';
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function criteriaDepthTextFromMap(criteriaByDepth) {
  const source = criteriaByDepth || {};
  const entries = [
    ['Core', source.certification || source.core || source.Core],
    ['Expert', source.expert || source.Expert],
    ['Mastery', source.mastery || source.Mastery]
  ].filter(([, criteria]) => Array.isArray(criteria) && criteria.length);
  const fallback = Object.entries(source)
    .filter(([depth]) => !['certification', 'core', 'Core', 'expert', 'Expert', 'mastery', 'Mastery'].includes(depth))
    .map(([depth, criteria]) => [criteriaDepthLabel(depth), criteria]);
  return [...entries, ...fallback]
    .map(([label, criteria]) => `${label}:\n${criteriaListText(criteria)}`)
    .join('\n\n');
}

function criteriaDepthTextFromStandards(depths) {
  return (depths || [])
    .map((depth) => `${criteriaDepthLabel(depth.label)}:\n${criteriaListText(depth.criteria || [])}`)
    .join('\n\n');
}

function groupTopicsFor(group) {
  const rawTopics = group?.raw?.topics || [];
  const topics = rawTopics.length ? rawTopics : (group?.items || []).map((item) => item.raw || item.label);
  return topics.map((topic) => topic?.title || topic?.name || topic).filter(Boolean);
}

function vocabularyFor(it, group) {
  const raw = it?.raw || {};
  const fromGroup = group?.raw?.vocabulary || [];
  const fromItem = raw.vocabulary || raw.keywords || [];
  const derived = [raw.type, raw.topic, raw.depth].filter(Boolean);
  return [...new Set([...fromGroup, ...fromItem, ...derived].map((term) => String(term || '').trim()).filter(Boolean))];
}

function selectedLevelLabel() {
  return $('l2CertTierSelect')?.value || EDUCATION_TIERS[0];
}

function professionalRoleForLabel(label) {
  return PROFESSIONAL_ROLES.find((role) => role.label === label) || null;
}

function certificationLevelOptionsHtml(selected = '') {
  const edu = EDUCATION_TIERS.map((t) => `<option value="${escapeHtml(t)}" ${t === selected ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('');
  const roles = PROFESSIONAL_ROLES.map((role) => `<option value="${escapeHtml(role.label)}" ${role.label === selected ? 'selected' : ''}>${escapeHtml(role.label)}</option>`).join('');
  return `<optgroup label="Learner levels">${edu}</optgroup><optgroup label="Professional roles">${roles}</optgroup>`;
}

function standardIdFor(it, group) {
  if (focus().id === 'concepts') return `concept:${it?.raw?.id || it?.id || group?.id || 'unknown'}`;
  if (focus().id === 'products') return `product:${it?.raw?.id || it?.id || 'unknown'}`;
  if (focus().id === 'use-cases') return `use-case:${it?.raw?.id || it?.id || 'unknown'}`;
  return `${focus().pathway}:${it?.id || group?.id || 'unknown'}`;
}

function neighboringTopicsFor(it, group) {
  const topics = groupTopicsFor(group);
  const index = topics.findIndex((topic) => topic === it?.label);
  if (index < 0) return topics.filter((topic) => topic !== it?.label).slice(0, 3);
  return [topics[index - 1], topics[index + 1]].filter(Boolean);
}

function criteriaByDepthFor(it, group) {
  const title = it?.label || 'this rung';
  const neighbors = neighboringTopicsFor(it, group);
  const neighborText = neighbors.length ? neighbors.join(' and ') : 'nearby rung topics';
  return {
    certification: [
      `Defines "${title}" accurately in plain language.`,
      `Uses the most relevant tier vocabulary while explaining "${title}".`,
      `Distinguishes "${title}" from ${neighborText}.`,
      `Applies "${title}" to one bounded, realistic AI workflow.`,
      `Identifies one limitation, risk, or human-review checkpoint for "${title}".`
    ],
    expert: [
      `Transfers "${title}" to an unfamiliar or higher-stakes scenario.`,
      `Compares "${title}" with ${neighborText} and defends when to use each.`,
      `Handles edge cases, ambiguity, or failure modes related to "${title}".`,
      `Explains tradeoffs for "${title}" at the selected education or role level.`,
      `Gives feedback or coaching that would help another learner improve on "${title}".`
    ],
    mastery: [
      `Synthesizes "${title}" with multiple topics in the same certification set.`,
      `Produces portfolio-quality reasoning, design, or evidence involving "${title}".`,
      `Maps "${title}" to standards, governance, risk, or organizational impact.`,
      `Anticipates second-order effects and failure modes around "${title}".`,
      `Can teach, lead, or review others against the "${title}" standard.`
    ]
  };
}

function defaultRoleCriteria() {
  const educationCriteria = EDUCATION_TIERS.map((level) => [level, {
    languageLevel: level,
    scenarioComplexity: ADULT_TIERS.has(level) ? 'professional or organizational scenario' : 'age-appropriate learning scenario',
    evidenceExpectation: ADULT_TIERS.has(level)
      ? 'defensible explanation, practical application, and risk-aware judgment'
      : 'clear explanation, simple example, and safe-use awareness'
  }]);
  const professionalCriteria = PROFESSIONAL_ROLES.map((role) => [role.label, {
    languageLevel: role.label,
    scenarioComplexity: `${role.label} workplace scenario`,
    evidenceExpectation: 'role-relevant explanation, applied judgment, defensible tradeoffs, and transcript-ready evidence',
    employmentStandards: role.standards,
    source: role.source,
    roleDescription: role.description,
    roleSpec: role.roleSpec
  }]);
  return Object.fromEntries([...educationCriteria, ...professionalCriteria]);
}

function localTrainingStandardFor(it, group) {
  const id = standardIdFor(it, group);
  const topics = groupTopicsFor(group);
  const vocabulary = vocabularyFor(it, group);
  const depthMap = criteriaByDepthFor(it, group);
  return {
    id,
    version: 'local-fallback-v1',
    pathway: focus().pathway,
    focusLabel: focus().label,
    scope: 'rung',
    title: it?.label || group?.label || focus().label,
    certificationSet: group?.label || focus().label,
    activeRung: it?.label || '',
    topics,
    vocabulary,
    certificationDepths: (focus().CERT_DEPTHS || []).map((depth) => ({
      id: depth.id,
      label: depth.label,
      outcome: depth.outcome,
      evidence: depth.evidence,
      passingStandard: depth.passingStandard,
      criteria: depthMap[depth.id] || depthMap.certification
    })),
    criteriaByDepth: depthMap,
    roleCriteria: defaultRoleCriteria(),
    updatedAt: new Date().toISOString()
  };
}

async function trainingStandardFor(it, group) {
  const fallback = localTrainingStandardFor(it, group);
  const id = fallback.id;
  if (state.trainingStandards[id]) return state.trainingStandards[id];
  try {
    const remote = await loadTrainingStandard(id);
    state.trainingStandards[id] = remote || fallback;
  } catch {
    state.trainingStandards[id] = fallback;
  }
  return state.trainingStandards[id];
}

function certificationMapFor(it, group) {
  const depthLines = (focus().CERT_DEPTHS || []).map((depth) =>
    `${depth.label}: ${depth.outcome || depth.passingStandard || 'certification depth'}`
  );
  try {
    const certItem = focus().certItemForGroup(group, it);
    const depth = focus().CERT_DEPTHS[0];
    const blueprint = focus().buildBlueprint({ item: certItem, level: selectedLevelLabel(), depth });
    return [
      `Certification item: ${blueprint.itemLabel}`,
      `Mapped standards: ${blueprint.standards}`,
      `Education/role level now selected: ${blueprint.educationTierLabel}`,
      `Available education/role levels: ${CERTIFICATION_LEVELS.join(', ')}`,
      `Depths tested: ${depthLines.join(' | ')}`
    ].join('\n');
  } catch {
    return [
      `Certification item: ${it?.label || group?.label || focus().label}`,
      `Education/role levels: ${CERTIFICATION_LEVELS.join(', ')}`,
      `Depths tested: ${depthLines.join(' | ')}`
    ].join('\n');
  }
}

function approximateTrainingTimeFor(it) {
  const raw = it?.raw || {};
  const explicit = raw.estimatedTime || raw.estimated_time || raw.timeEstimate || raw.duration || raw.timeToComplete;
  if (explicit) return String(explicit);
  return 'about 10-15 minutes for the guided lesson, or 20-30 minutes if you pause to practice and revise your answers';
}

function trainingContextFor(it, group, standard = null) {
  const raw = it?.raw || {};
  const groupLabel = group?.label || focus().label;
  const topics = standard?.topics || groupTopicsFor(group);
  const vocabulary = standard?.vocabulary || vocabularyFor(it, group);
  const depthCriteria = standard?.certificationDepths?.length
    ? criteriaDepthTextFromStandards(standard.certificationDepths)
    : criteriaDepthTextFromMap(standard?.criteriaByDepth || criteriaByDepthFor(it, group));
  const roleCriteria = standard?.roleCriteria?.[selectedLevelLabel()] || defaultRoleCriteria()[selectedLevelLabel()];
  const detailLines = [
    raw.type ? `Type/product family: ${raw.type}` : '',
    raw.topic ? `Topic/category: ${raw.topic}` : '',
    raw.outcome ? `Outcome: ${raw.outcome}` : '',
    raw.depth ? `Depth: ${raw.depth}` : '',
    raw.reason ? `Why this matters: ${raw.reason}` : '',
    raw.summary ? `Summary: ${raw.summary}` : '',
    raw.description ? `Description: ${raw.description}` : ''
  ].filter(Boolean);

  return {
    title: it?.label || 'this rung',
    groupLabel,
    description: trainingDescriptionFor(it),
    topics,
    vocabulary,
    standardId: standard?.id || standardIdFor(it, group),
    depthCriteria,
    roleCriteria,
    certificationMap: certificationMapFor(it, group),
    approximateTime: approximateTrainingTimeFor(it),
    details: detailLines.length ? detailLines.join('\n') : 'No extended catalog notes are available for this rung; infer a practical beginner-to-capable lesson from the rung title and tier context.'
  };
}

function buildTrainingSystemPrompt(it, group, standard = null) {
  const ctx = trainingContextFor(it, group, standard);
  const pedagogy = state.trainingPedagogy
    ? `Global pedagogy: ${state.trainingPedagogy.name || 'AESOP guided training pedagogy'}\nPrinciples: ${listText(state.trainingPedagogy.principles || [], 8)}\nLesson arc: ${listText((state.trainingPedagogy.lessonArc || []).map((step) => `${step.id}: ${step.purpose}`), 8)}`
    : 'Global pedagogy: use the AESOP guided lesson arc below.';
  return `You are the AESOP AI Academy training guide for a guided lesson, not an examiner and not a generic Q&A assistant.

Preferred language: ${languagePromptLabel()}.
${languageDirective('training')}

${pedagogy}

Training focus: ${focus().label}
Tier/category: ${ctx.groupLabel}
Rung: ${ctx.title}
Training standard ID: ${ctx.standardId}
Rung description: ${ctx.description}
Required vocabulary for this tier/rung:
${listText(ctx.vocabulary)}
Specific topics in this certification set:
${listText(ctx.topics)}
Certification map:
${ctx.certificationMap}
Depth-specific criteria:
${ctx.depthCriteria}
Selected education/role criteria:
${JSON.stringify(ctx.roleCriteria)}
Catalog context:
${ctx.details}
Approximate completion time:
${ctx.approximateTime}

Your job is to lead the learner somewhere specific: by the end, they should be able to explain the rung in their own words, recognize when it applies, name at least one limitation or risk, and use it in a practical AI workflow.

Before the lesson begins, follow this readiness sequence:
1. The first assistant message must only preview the lesson content and required vocabulary, then ask whether the learner is ready to begin.
2. When the learner says they are ready, show the test criteria they will need to satisfy as readable bullet lists grouped under Core, Expert, and Mastery.
3. After the criteria, show the approximate time to complete this rung.
4. Then ask one short readiness question before beginning the lesson.
5. Begin the actual lesson only after that readiness gate is complete.
If the conversation already contains "Test criteria:" and "Approximate time to complete this rung:" and the learner says they are ready, do not repeat the criteria; begin the lesson.

Run a short guided lesson with this arc:
1. Orient: state the destination in plain language after the readiness sequence is complete, and ask one diagnostic question only if needed.
2. Teach: explain one core idea at a time using a concrete example.
3. Apply: give the learner a small scenario or task that makes them use the idea.
4. Check and close: ask them to explain or apply the idea back. Mark complete only after they show usable understanding.

Teaching rules:
- Do not begin the lesson in the first assistant message.
- If the learner has not confirmed readiness yet, ask whether they are ready instead of teaching.
- Never present test criteria as a single semicolon-separated paragraph; use one criterion per line.
- Lead the learner through the path. Do not wait for them to choose the curriculum.
- Do not behave like a certification exam. Be instructional, warm, and practical.
- Do not answer as a one-off Q&A unless the answer moves the lesson forward.
- Explicitly teach the most relevant vocabulary terms for this rung, and connect the rung back to the broader tier topics that certification will test.
- Call out when a point matters for Core, Expert, or Mastery depth, especially when the learner is near that level.
- Adapt examples and expectations to the selected education/role level.
- Ask one question or give one task per turn.
- Keep responses concise enough for chat: usually 2-5 short paragraphs.
- If the learner gives a vague answer, teach the next missing piece and ask a better follow-up.
- If the learner asks an unrelated question, answer briefly if useful, then bridge back to this rung.
- Use COURSE_COMPLETE on its own final line only when the learner has demonstrated the target understanding.`;
}

function trainingOpeningFor(it, group, standard = null) {
  const ctx = trainingContextFor(it, group, standard);
  return `Let's preview "${ctx.title}" before the lesson begins.

Lesson content:
${listText(ctx.topics, 6)}

Required vocabulary:
${listText(ctx.vocabulary, 8)}

When you are ready, I will show the test criteria, the approximate time to complete this rung, and then ask one quick ready-to-begin question before we start the lesson. Are you ready?`;
}

function isReadyResponse(content) {
  return /\b(ready|yes|yep|yeah|sure|start|begin|let'?s go|go ahead)\b/i.test(content || '');
}

function shouldShowPreLessonBriefing(messages, content) {
  if (!isReadyResponse(content)) return false;
  const assistantMessages = (messages || []).filter((message) => message.role === 'assistant');
  if (assistantMessages.length !== 1) return false;
  const opening = assistantMessages[0]?.content || '';
  return opening.includes('before the lesson begins') && opening.includes('Are you ready?');
}

function preLessonBriefingFor(it, group, standard = null) {
  const ctx = trainingContextFor(it, group, standard);
  return `Great. Here is what you will be tested against before the lesson begins.

Test criteria:
${ctx.depthCriteria}

Approximate time to complete this rung:
${ctx.approximateTime}

When you are ready to begin the lesson, say "ready."`;
}

function upgradeSavedTrainingMessages(messages, it, group, standard) {
  const upgraded = (messages || []).slice();
  if (upgraded[0]?.role === 'assistant' && /where would you like to start\?/i.test(upgraded[0].content || '')) {
    upgraded[0] = { role: 'assistant', content: trainingOpeningFor(it, group, standard) };
  }
  const oldCriteriaIndex = upgraded.findIndex((message) =>
    message.role === 'assistant'
    && /Great\. Here is what you will be tested against before the lesson begins\./.test(message.content || '')
    && /;\s+\w/.test(message.content || '')
  );
  if (oldCriteriaIndex >= 0) {
    upgraded[oldCriteriaIndex] = { role: 'assistant', content: preLessonBriefingFor(it, group, standard) };
  }
  return upgraded;
}

// =============================================================================
// COURSE CONVERSATION STORE
// Full guided-conversation content is kept locally (localStorage) per course so
// an open course can be resumed exactly where the learner left off, and the
// Profile section can list every open (started, not completed) course.
// =============================================================================
function courseKey(pathway, itemId) { return `${pathway}:${itemId}`; }
function loadCourses() {
  try { return JSON.parse(localStorage.getItem(LS_COURSES) || '{}') || {}; }
  catch { return {}; }
}
function saveCourses(map) {
  try { localStorage.setItem(LS_COURSES, JSON.stringify(map)); }
  catch (e) { console.warn('[ladder2] course save failed', e); }
}
function deleteActiveChat() {
  const it = activeItem(); if (!it) return;
  const map = loadCourses();
  delete map[courseKey(focus().pathway, it.id)];
  saveCourses(map);
}
// Persist the ACTIVE course's full conversation. status: 'open' | 'completed'.
function persistActiveChat(status) {
  const it = activeItem(); if (!it) return;
  const map = loadCourses();
  const key = courseKey(focus().pathway, it.id);
  const prev = map[key] || {};
  map[key] = {
    focusId: state.focusId,
    pathway: focus().pathway,
    itemId: it.id,
    groupId: state.activeGroupId,
    title: it.label,
    messages: state.trainMessages.slice(),   // complete conversation content
    status: status || prev.status || 'open',
    updatedAt: new Date().toISOString()
  };
  saveCourses(map);
}
// Open courses = started, not yet completed; most-recently active first.
function openCourses() {
  return Object.values(loadCourses())
    .filter((c) => c && c.status !== 'completed' && Array.isArray(c.messages) && c.messages.length)
    .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
}
// Saved (resumable) conversation for a course, or null.
function savedChatFor(pathway, itemId) {
  const c = loadCourses()[courseKey(pathway, itemId)];
  if (!c || !Array.isArray(c.messages) || !c.messages.length || c.status === 'completed') return null;
  const messages = c.messages.filter((m) => !isTransientAiMessage(m.content));
  return messages.length ? messages : null;
}

function setTrainingEvalStatus(message, isError = false) {
  const el = $('l2StandardsEvalStatus');
  if (!el) return;
  el.textContent = message || '';
  el.classList.toggle('is-error', Boolean(isError));
}

async function loadEvaluationSkill(kind) {
  const skill = EVALUATION_SKILLS[kind];
  if (!skill) throw new Error('Unknown evaluation skill.');
  try {
    const res = await fetch(skill.file, { cache: 'no-store' });
    if (res.ok) {
      const text = await res.text();
      if (text.trim()) return text.trim();
    }
  } catch (error) {
    console.warn('[ladder2] evaluation skill load failed', error);
  }
  return `Run an advisory ${skill.label} against the transcript. Use only candidate evidence language. Do not issue credit, certification, grades, or official mastery. Preserve exact learner evidence snippets and identify gaps. Standards families: ${skill.families.join(', ')}.`;
}

function evaluationTranscriptForModel(messages) {
  return (messages || [])
    .filter((message) => ['user', 'assistant'].includes(message?.role) && String(message.content || '').trim())
    .map((message, index) => ({
      index,
      role: message.role === 'user' ? 'learner' : 'guide',
      content: String(message.content).slice(0, 2400)
    }));
}

function loadLocalEvaluations() {
  try { return JSON.parse(localStorage.getItem(LS_EVALUATIONS) || '[]') || []; }
  catch { return []; }
}

function saveLocalEvaluation(record) {
  try {
    const records = loadLocalEvaluations();
    localStorage.setItem(LS_EVALUATIONS, JSON.stringify([record, ...records].slice(0, 100)));
  } catch (error) {
    console.warn('[ladder2] local evaluation save failed', error);
  }
}

function safeFilePart(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72) || 'evaluation';
}

function downloadLocalArtifact(filename, content, type = 'application/json') {
  try {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    console.warn('[ladder2] local artifact download failed', error);
  }
}

function evaluationStatusFromResult(result) {
  const text = String(result || '').toLowerCase();
  if (isTransientAiMessage(text)) return 'failed';
  if (/\boverall rating:\s*none\b/.test(text) || /\bneeds more learner evidence\b|\bno learner-authored evidence\b/.test(text)) {
    return 'needs_more_evidence';
  }
  return 'completed';
}

function buildEvaluationMarkdown(record) {
  return `# ${record.label}

Status: ${record.status}
Kind: ${record.kind}
Source: ${record.source}
Rung: ${record.context.rung}
Created: ${record.createdAt}
Completed: ${record.completedAt || ''}
Skill file: ${record.skillFile}

## Advisory Notice

This is candidate standards evidence only. It is not official credit, certification, verified mastery, hiring readiness, or an official qualification.

## Evaluator Result

${record.result || 'No evaluator result was returned.'}
`;
}

async function runTrainingStandardsEvaluation(kind, input) {
  const skill = EVALUATION_SKILLS[kind];
  const it = activeItem();
  if (!skill || !it) {
    if (input) input.checked = false;
    return;
  }
  const learnerTurns = state.trainMessages.filter((message) => message.role === 'user');
  if (!learnerTurns.length) {
    setTrainingEvalStatus('Start the training conversation and collect learner evidence before running an evaluation.', true);
    input.checked = false;
    return;
  }

  const controls = [...document.querySelectorAll('[data-training-eval]')];
  controls.forEach((control) => { control.disabled = true; });
  setTrainingEvalStatus(`Running ${skill.label}...`);

  try {
    const standard = await trainingStandardFor(it, activeGroup());
    const skillPrompt = await loadEvaluationSkill(kind);
    const ctx = trainingContextFor(it, activeGroup(), standard);
    const trainingSystemPrompt = buildTrainingSystemPrompt(it, activeGroup(), standard);
    const certBlueprint = state.activeCert?.blueprint || state.lastCertSnapshot?.blueprint || null;
    const certificationSystemPrompt = certBlueprint
      ? certificationEngine.buildExaminerSystemPrompt(certBlueprint)
      : '';
    const transcript = evaluationTranscriptForModel(state.trainMessages);
    const certificationMessages = state.certMessages.length ? state.certMessages : (state.lastCertSnapshot?.messages || []);
    const certificationTranscript = evaluationTranscriptForModel(certificationMessages);
    const source = certificationTranscript.some((message) => message.role === 'learner') ? 'training+certification' : 'training';
    const createdAt = new Date().toISOString();
    const evaluationId = `${kind}:${source}:${focus().pathway}:${it.id}:${createdAt}`;
    const prompt = `${skillPrompt}

Evaluation context:
- Evaluation kind: ${skill.label}
- Standards families: ${skill.families.join(', ')}
- Evaluation source: ${source}
- Training focus: ${focus().label}
- Tier/category: ${ctx.groupLabel}
- Rung: ${ctx.title}
- Training standard ID: ${ctx.standardId}

Return a concise advisory report with:
1. Candidate evidence found, with exact learner snippets.
2. Standards families implicated.
3. Gaps or follow-up evidence needed.
4. A clear advisory notice that this is not official credit, certification, or verified mastery.`;
    const result = await askModel({
      messages: [{
        role: 'user',
        content: JSON.stringify({
          evaluationId,
          evaluationKind: kind,
          source,
          rung: ctx.title,
          trainingPrompt: trainingSystemPrompt,
          certificationPrompt: certificationSystemPrompt,
          transcript,
          certificationTranscript
        }, null, 2)
      }],
      systemPrompt: prompt,
      maxTokens: 900
    });
    const completedAt = new Date().toISOString();
    const status = evaluationStatusFromResult(result);
    const record = {
      id: evaluationId,
      kind,
      label: skill.label,
      source,
      status,
      advisoryOnly: true,
      skillFile: skill.file,
      standardsFamilies: skill.families,
      createdAt,
      completedAt,
      context: {
        focus: focus().label,
        pathway: focus().pathway,
        group: ctx.groupLabel,
        rung: ctx.title,
        itemId: it.id,
        trainingStandardId: ctx.standardId
      },
      packet: {
        trainingPrompt: trainingSystemPrompt,
        certificationPrompt: certificationSystemPrompt,
        evaluatorPrompt: prompt,
        trainingTranscript: transcript,
        certificationTranscript
      },
      result
    };
    saveLocalEvaluation(record);
    const fileBase = `${createdAt.replace(/[:.]/g, '-')}_${source}_${kind}_${safeFilePart(it.label)}`;
    downloadLocalArtifact(`${fileBase}_packet.json`, JSON.stringify(record, null, 2));
    downloadLocalArtifact(`${fileBase}_result.md`, buildEvaluationMarkdown(record), 'text/markdown');
    state.trainMessages.push({ role: 'assistant', content: `${skill.label}\n\n${result}` });
    renderChat($('l2ChatLog'), state.trainMessages, { scroll: 'latest-assistant' });
    persistActiveChat('open');
    setTrainingEvalStatus(status === 'needs_more_evidence'
      ? `${skill.label} complete: needs more learner evidence.`
      : `${skill.label} complete: local packet and result downloaded.`);
  } catch (error) {
    console.warn('[ladder2] standards evaluation failed', error);
    input.checked = false;
    setTrainingEvalStatus(`Could not run ${skill.label}. Please try again.`, true);
  } finally {
    controls.forEach((control) => { control.disabled = false; });
  }
}

async function runSelectedStandardsEvaluations() {
  const selected = [...document.querySelectorAll('[data-training-eval]:checked')];
  if (!selected.length) {
    setTrainingEvalStatus('Select at least one standards evaluation, then run it.', true);
    return;
  }

  const runButton = $('l2RunStandardsEval');
  if (runButton) runButton.disabled = true;
  setTrainingEvalStatus(`Running ${selected.length} selected evaluation${selected.length === 1 ? '' : 's'}...`);
  try {
    for (const input of selected) {
      await runTrainingStandardsEvaluation(input.dataset.trainingEval, input);
    }
  } finally {
    if (runButton) runButton.disabled = false;
  }
}

function renderRungPicker(ids) {
  const rail = $(ids.rail);
  const selectedRungs = $(ids.selectedRungs);
  if (!rail || !selectedRungs) return;
  const total = state.groups.reduce((n, g) => n + g.items.length, 0);
  const done = Object.keys(state.completed).filter((k) => k.startsWith(`${focus().pathway}:`)).length;
  setText(ids.focusLabel, focusDisplayLabel());
  setText(ids.status, `${done}/${total} - ${focusDisplayLabel()}`);
  const activeIndex = Math.max(0, state.groups.findIndex((g) => g.id === state.activeGroupId));
  const active = state.groups[activeIndex];
  const summary = $(ids.summary);
  if (summary) summary.textContent = active ? `Tier ${activeIndex + 1}: ${active.label}` : tx().training.chooseTier;
  rail.innerHTML = state.groups.map((g, i) =>
    `<button class="l2-tier-option ${g.id === state.activeGroupId ? 'is-active' : ''}" data-group="${g.id}" type="button">
      <span class="l2-rail-num">${i + 1}</span>
      <span class="l2-tier-meta">
        <small>${g.items.length}</small>
        <strong>${escapeHtml(g.label)}</strong>
      </span>
    </button>`).join('');
  rail.querySelectorAll('[data-group]').forEach((b) => b.addEventListener('click', () => {
    state.activeGroupId = b.dataset.group;
    const g = activeGroup();
    state.activeItemId = g.items[0]?.id || null;
    state.trainMessages = [];
    if ($(ids.dropdown)) $(ids.dropdown).open = false;
    renderRail(); renderActiveItem();
  }));
  selectedRungs.innerHTML = active
    ? active.items.map((it) =>
      `<button class="l2-rail-item ${it.id === state.activeItemId ? 'is-active' : ''}" data-item="${it.id}" type="button">${escapeHtml(it.label)}</button>`).join('')
    : '';
  selectedRungs.querySelectorAll('[data-item]').forEach((b) => b.addEventListener('click', () => {
    state.activeItemId = b.dataset.item;
    state.trainMessages = [];
    renderRail(); renderActiveItem();
  }));
}

function renderRail() {
  renderRungPicker({
    rail: 'l2GroupRail',
    selectedRungs: 'l2SelectedRungs',
    status: 'l2GroupStatus',
    focusLabel: 'l2FocusLabel',
    summary: 'l2SelectedTierSummary',
    dropdown: 'l2TierDropdown'
  });
  renderRungPicker({
    rail: 'l2CertGroupRail',
    selectedRungs: 'l2CertSelectedRungs',
    status: 'l2CertGroupStatus',
    focusLabel: 'l2CertFocusLabel',
    summary: 'l2CertSelectedTierSummary',
    dropdown: 'l2CertTierDropdown'
  });
}

function renderActiveItem() {
  const g = activeGroup(); const it = activeItem();
  if ($('l2ActiveGroupLabel')) $('l2ActiveGroupLabel').textContent = g ? g.label : focusDisplayLabel();
  if ($('l2ActiveItemTitle')) $('l2ActiveItemTitle').textContent = it ? it.label : 'Select a rung';
  if ($('l2ChatSummary')) {
    $('l2ChatSummary').textContent = it
      ? fmt(tx().training.learnSummary, { item: it.label })
      : tx().training.pickRungToBegin;
  }
  if ($('l2RungDescription')) $('l2RungDescription').textContent = trainingDescriptionFor(it);
  if ($('l2CertRungDescription')) $('l2CertRungDescription').textContent = it
    ? fmt(tx().certification.willExamine, { description: trainingDescriptionFor(it) })
    : tx().certification.pickRungExam;
  renderChat($('l2ChatLog'), state.trainMessages);
  renderCertTarget();
}

async function startTrainingChat() {
  const it = activeItem();
  if (!it) return;
  // resume the saved conversation for this course if one exists, else open fresh
  const saved = savedChatFor(focus().pathway, it.id);
  const standard = await trainingStandardFor(it, activeGroup());
  state.trainMessages = saved
    ? upgradeSavedTrainingMessages(saved, it, activeGroup(), standard)
    : [{ role: 'assistant', content: trainingOpeningFor(it, activeGroup(), standard) }];
  renderChat($('l2ChatLog'), state.trainMessages);
  persistActiveChat('open');   // course is now open (appears in Profile → Open courses)
  renderProfile();
}

function resetTrainingChat() {
  const it = activeItem();
  if (!it) return;
  deleteActiveChat();
  state.trainMessages = [];
  delete state.completed[`${focus().pathway}:${it.id}`];
  if ($('l2ChatInput')) $('l2ChatInput').value = '';
  renderChat($('l2ChatLog'), state.trainMessages);
  renderRail();
  renderMarketing();
  renderProfile();
}

async function submitTrainingChat(e) {
  e.preventDefault();
  const input = $('l2ChatInput');
  if (!input) return;
  const content = input.value.trim();
  if (!content) return;
  const it = activeItem();
  if (!state.trainMessages.length) await startTrainingChat();
  state.trainMessages.push({ role: 'user', content });
  const standard = await trainingStandardFor(it, activeGroup());
  if (shouldShowPreLessonBriefing(state.trainMessages, content)) {
    state.trainMessages.push({ role: 'assistant', content: preLessonBriefingFor(it, activeGroup(), standard) });
    input.value = '';
    renderChat($('l2ChatLog'), state.trainMessages, { scroll: 'latest-assistant' });
    persistActiveChat('open');
    return;
  }
  const messagesForModel = state.trainMessages.slice();
  state.trainMessages.push({ role: 'assistant', content: 'Thinking...' });
  input.value = '';
  renderChat($('l2ChatLog'), state.trainMessages);
  let isDone = false;
  let transientFailure = false;
  try {
    const raw = await askModel({
      messages: messagesForModel,
      systemPrompt: buildTrainingSystemPrompt(it, activeGroup(), standard),
      maxTokens: 900
    });
    isDone = raw.includes('COURSE_COMPLETE');
    const visible = raw.replace(/COURSE_COMPLETE\s*$/gm, '').replace(/<!--[\s\S]*?-->/g, '').trim() || 'I hit a snag. Please try again.';
    transientFailure = isTransientAiMessage(visible);
    state.trainMessages[state.trainMessages.length - 1] = { role: 'assistant', content: visible };
  } catch (err) {
    console.warn('[ladder2] training chat failed', err);
    transientFailure = true;
    state.trainMessages[state.trainMessages.length - 1] = {
      role: 'assistant',
      content: 'The AI service is temporarily unavailable. Please try again in a moment.'
    };
  }
  renderChat($('l2ChatLog'), state.trainMessages, { scroll: 'latest-assistant' });
  if (!transientFailure) persistActiveChat(isDone ? 'completed' : 'open');   // keep the full conversation on disk
  if (isDone) markComplete();
}

function markComplete() {
  const it = activeItem(); if (!it) return;
  const key = `${focus().pathway}:${it.id}`;
  state.completed[key] = true;
  persistActiveChat('completed');   // retain the conversation, drop it from Open courses
  recordCompletion({
    pathway: focus().pathway, itemId: it.id, itemType: focus().label,
    itemName: it.label, level: '', status: 'completed', source: 'ai_verified',
    completedAt: new Date().toISOString()
  }).catch((err) => console.warn('recordCompletion failed (kept local)', err));
  saveLearnerProgress(focus().pathway, { version: 'v1', lastItemId: it.id, lastItemLabel: it.label }).catch(() => {});
  renderRail(); renderMarketing(); renderProfile();
}

// =============================================================================
// ASSESSMENT — placement conversation, collapse to hub on complete
// =============================================================================
function setupAssessment() {
  $('l2StartPlacement')?.addEventListener('click', startPlacement);
  $('l2ResetPlacement')?.addEventListener('click', () => {
    state.assessMessages = []; state.placement = null;
    clearAssessmentDraft();
    document.body.classList.remove('placement-complete');
    $('l2PlacementStatus').textContent = tx().assessment.notPlaced;
    if ($('l2AssessInput')) $('l2AssessInput').value = '';
    renderChat($('l2AssessLog'), state.assessMessages);
    renderPlacementProgress();
  });
  $('l2AssessForm')?.addEventListener('submit', submitAssessment);
  $('l2AssessInput')?.addEventListener('input', saveAssessmentDraft);
  enterToSend('l2AssessInput');
}

function startPlacement() {
  if (!placementEngine) return;
  state.assessMessages = [{ role: 'assistant', content: placementEngine.placementOpener() }];
  renderChat($('l2AssessLog'), state.assessMessages);
  $('l2AssessInput')?.focus();
  renderPlacementProgress();
  saveAssessmentDraft();
}

function learnerTurns() { return state.assessMessages.filter((m) => m.role === 'user').length; }

async function submitAssessment(e) {
  e.preventDefault();
  if (!placementEngine) return;
  const input = $('l2AssessInput');
  const content = input.value.trim();
  if (!content) return;
  if (!state.assessMessages.length) startPlacement();
  state.assessMessages.push({ role: 'user', content });
  input.value = '';
  renderChat($('l2AssessLog'), state.assessMessages);
  renderPlacementProgress();
  saveAssessmentDraft();
  const raw = await askModel({
    messages: state.assessMessages,
    systemPrompt: placementEngine.buildSystemPrompt({ languageLabel: languagePromptLabel() }),
    maxTokens: 800
  });
  const { placement, visibleText } = placementEngine.parsePlacementResponse(raw);
  state.assessMessages.push({ role: 'assistant', content: visibleText });
  renderChat($('l2AssessLog'), state.assessMessages, { scroll: 'latest-assistant' });
  renderPlacementProgress();
  saveAssessmentDraft();
  if (placementEngine.shouldApplyPlacement(placement, learnerTurns())) applyPlacement(placement);
}

function applyPlacement(placement) {
  state.placement = placement;
  $('l2PlacementStatus').textContent = tx().assessment.complete;
  $('l2PlacementSummary').textContent = placement.reasoning || tx().assessment.completeCopy;
  document.body.classList.add('placement-complete');
  clearAssessmentDraft();
  saveLearnerProgress(focus().pathway, {
    version: 'v1',
    placement: { ...placement }
  }).catch(() => {});
  renderMarketing();
}

function renderPlacementProgress() {
  $('l2AssessTurns').textContent = `${learnerTurns()} ${tx().assessment.responses}`;
  const pct = Math.min(100, Math.round((learnerTurns() / 6) * 100));
  const bar = $('l2AssessProgressBar');
  if (bar) bar.style.width = `${pct}%`;
}

// =============================================================================
// CERTIFICATION — config, gates, examiner conversation, validation, record
// =============================================================================
function setupCertification() {
  $('l2CertTierSelect')?.addEventListener('change', () => { renderAuthGates(); renderCertConfig(); });
  $('l2CertDepthSelect')?.addEventListener('change', renderCertTarget);
  $('l2IdentitySelect')?.addEventListener('change', () => {
    state.identityGate.levelId = $('l2IdentitySelect').value;
    renderIdentityGate();
  });
  $('l2ProctoringSelect')?.addEventListener('change', () => { state.identityGate.proctoringId = $('l2ProctoringSelect').value; });
  $('l2IdentityAttest')?.addEventListener('change', () => { state.identityGate.identitySigned = $('l2IdentityAttest').checked; renderIdentityGate(); });
  $('l2AdultAttest')?.addEventListener('change', () => { state.identityGate.adultAttested = $('l2AdultAttest').checked; renderAuthGates(); });
  $('l2TrainingSigninForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    passwordSignIn($('l2TrainingSigninEmail')?.value, $('l2TrainingSigninPassword')?.value, 'l2TrainingSigninMsg');
  });
  $('l2AccountForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    signIn(false);
  });
  $('l2AccountCreate')?.addEventListener('click', () => signIn(true));
  $('l2AccountSignOut')?.addEventListener('click', signOut);
  $('l2StartCert')?.addEventListener('click', startCertification);
  $('l2CertForm')?.addEventListener('submit', submitCertChat);
  enterToSend('l2CertInput');
  $('l2FinalizeCert')?.addEventListener('click', () => finalizeCertification(true));
  $('l2EndCert')?.addEventListener('click', endCertification);
}

function renderCertConfig() {
  const tierSel = $('l2CertTierSelect');
  if (tierSel) {
    const current = CERTIFICATION_LEVELS.includes(tierSel.value) ? tierSel.value : EDUCATION_TIERS[0];
    tierSel.innerHTML = certificationLevelOptionsHtml(current);
    tierSel.value = current;
  }
  const depthSel = $('l2CertDepthSelect');
  depthSel.innerHTML = focus().CERT_DEPTHS.map((d) => `<option value="${d.label}">${d.label}</option>`).join('');

  const idSel = $('l2IdentitySelect');
  idSel.innerHTML = focus().IDENTITY_LEVELS.map((lvl) => `<option value="${lvl.id}">${lvl.label}</option>`).join('');
  if (!state.identityGate.levelId) state.identityGate.levelId = focus().IDENTITY_LEVELS[0]?.id;
  idSel.value = state.identityGate.levelId;

  const procSel = $('l2ProctoringSelect');
  procSel.innerHTML = PROCTORING_MODES.map((p) => `<option value="${p.id}">${p.label}</option>`).join('');
  procSel.value = state.identityGate.proctoringId;

  renderIdentityGate();
  renderCertTarget();
}

function selectedDepth() { return focus().depthForLabel($('l2CertDepthSelect').value); }
function selectedLevel() { return $('l2CertTierSelect').value || EDUCATION_TIERS[0]; }

function renderCertTargetLegacy() {
  const it = activeItem();
  const depth = selectedDepth();
  $('l2CertTarget').textContent = it
    ? `${it.label} — ${selectedLevel()}, ${depth ? depth.label : ''}`
    : 'Choose a rung in Training, then set your level here.';
}

function renderCertTarget() {
  const it = activeItem();
  const depth = selectedDepth();
  const role = professionalRoleForLabel(selectedLevel());
  $('l2CertTarget').textContent = it
    ? `${it.label} - ${selectedLevel()}, ${depth ? depth.label : ''}${role ? ` (${role.standards})` : ''}`
    : 'Choose a rung, then set the learner level or professional role for the exam.';
}

function renderIdentityGate() {
  const gate = { ...state.identityGate, account: state.authUser };
  let resolved;
  try { resolved = focus().resolveIdentityLevel(gate); } catch { resolved = null; }
  const requiresSig = resolved?.requiresSignature;
  // proctoring field visible for the external/authenticated choice or when sig required
  const showProc = true;
  $('l2ProctoringField').hidden = !showProc;
  // attestation visible when the chosen level needs a signature
  $('l2IdentityAttestLabel').hidden = !requiresSig;
  const notice = $('l2IdentityNotice');
  if (resolved) {
    notice.hidden = false;
    notice.textContent = (focus().identityLevelById(state.identityGate.levelId)?.description) ||
      (resolved.requiresSignature ? 'This level requires an identity attestation.' : 'Self-attested level.');
  }
}

// --- simplified account gate (prototype auth: local identity bound to email) ---
function renderAuthGates() {
  const t = tx();
  const signedIn = Boolean(state.authUser);
  const adultTier = ADULT_TIERS.has(selectedLevel());

  // Training gate: show when an account would be needed to persist
  const trainGate = $('l2TrainingGate');
  if (trainGate) trainGate.hidden = signedIn;

  // Certification account gate
  const acctGate = $('l2AccountGate');
  const acctForm = $('l2AccountForm');
  const status = $('l2AccountStatus');
  const msg = $('l2AccountMsg');
  if (acctGate) acctGate.hidden = signedIn;
  if (status) status.textContent = signedIn ? fmt(t.auth.signedIn, { email: state.authUser.email }) : adultTier ? t.auth.accountRequired : t.auth.accountOptional;
  if (msg) msg.textContent = signedIn
    ? t.auth.accountSaved
    : adultTier ? t.auth.accountRequiredMsg
      : t.auth.accountOptionalMsg;
  if (acctForm) acctForm.hidden = signedIn;
  $('l2AccountSignOut').hidden = !signedIn;
  $('l2AdultAttestLabel').hidden = !adultTier || signedIn;
}

// --- real Firebase auth: email-link sign-up + password sign-in --------------
function initFirebaseAuth() {
  try {
    // Reuse the app the data layer created; never double-init (it would clash).
    const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
    auth = getAuth(app);
    onAuthStateChanged(auth, onAuthChange);
  } catch (e) {
    console.warn('[ladder2] Firebase auth unavailable', e);
  }
}

async function onAuthChange(user) {
  if (user) {
    state.authUser = { email: user.email, uid: user.uid, emailVerified: user.emailVerified };
    // UID-canonical: the Firebase uid IS the learner id. Adopt it and load its record.
    try {
      localStorage.setItem(LS_ID, user.uid);
      setLearnerId(user.uid);
      const rec = await loadLearnerRecord(user.uid);
      if (rec) hydrate(rec);
    } catch (e) {
      console.warn('[ladder2] learner-id resolution failed', e);
    }
  } else {
    state.authUser = null;   // keep the stored uid on sign-out; do not clear it
  }
  localStorage.removeItem(LS_AUTH);   // retire the old local-prototype token
  renderAuthGates();
  renderHeroSignup();
  renderProfile();
  renderMarketing();
}

function setStatus(id, message, kind) {
  const n = $(id);
  if (!n) return;
  n.hidden = !message;
  n.dataset.state = kind || '';
  if (kind === 'ok') n.innerHTML = message; else n.textContent = message;
}

// Send the passwordless verification link; it lands on create-account.html,
// which finishes sign-in (email verified) and collects a password.
async function sendVerification(email, statusId) {
  const clean = String(email || '').trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) {
    setStatus(statusId, tx().auth.invalidEmail, 'error');
    return;
  }
  if (!auth) {
    setStatus(statusId, tx().auth.unavailable, 'error');
    return;
  }
  try {
    const actionCodeSettings = { url: 'https://theladderai.com/components/create-account.html', handleCodeInApp: true };
    await sendSignInLinkToEmail(auth, clean, actionCodeSettings);
    localStorage.setItem(LS_EMAIL, clean);
    setStatus(statusId, fmt(tx().auth.checkEmail, { email: escapeHtml(clean) }), 'ok');
  } catch (e) {
    setStatus(statusId, fmt(tx().auth.sendFailed, { code: e.code || 'error' }), 'error');
  }
}

async function passwordSignIn(email, password, statusId) {
  if (!auth) return;
  try {
    await signInWithEmailAndPassword(auth, String(email).trim(), password);
    setStatus(statusId, '', '');
  } catch (e) {
    setStatus(statusId, tx().auth.signinFailed, 'error');
  }
}

// Certification-gate buttons reuse the same auth: Create -> email link, Sign in -> password.
function signIn(creating) {
  if (creating) { sendVerification($('l2AccountEmail')?.value, 'l2AccountError'); return; }
  passwordSignIn($('l2AccountEmail')?.value, $('l2AccountPassword')?.value, 'l2AccountError');
}

function signOut() {
  if (auth) fbSignOut(auth).catch(() => {});
}

// Hero sign-up / sign-in form (bottom of the marketing section).
function setupAuth() {
  $('l2SignupForm')?.addEventListener('submit', (e) => { e.preventDefault(); sendVerification($('l2SignupEmail')?.value, 'l2SignupMsg'); });
  $('l2SigninToggle')?.addEventListener('click', (e) => { e.preventDefault(); const f = $('l2SigninForm'); if (f) f.style.display = (f.style.display === 'flex') ? 'none' : 'flex'; });
  $('l2SigninForm')?.addEventListener('submit', (e) => { e.preventDefault(); passwordSignIn($('l2SigninEmail')?.value, $('l2SigninPw')?.value, 'l2SignupMsg'); });
  $('l2HeroSignOut')?.addEventListener('click', signOut);
}

function renderHeroSignup() {
  const signedIn = Boolean(state.authUser);
  $('l2Signup')?.classList.toggle('is-signed-in', signedIn);
  // The forms / signed-in box use display:flex (and the link inline-block) in CSS,
  // which overrides the [hidden] attribute — so toggle inline display directly.
  const setDisp = (id, shown, mode) => {
    const n = $(id);
    if (!n) return;
    n.hidden = !shown;
    n.style.display = shown ? mode : 'none';
  };
  setDisp('l2SignupForm', !signedIn, 'flex');
  setDisp('l2SigninToggle', !signedIn, 'inline-block');
  setDisp('l2SigninForm', false, 'flex');       // collapsed by default; the toggle opens it
  setDisp('l2SignedIn', signedIn, 'flex');       // sign-out only when actually signed in
  if (signedIn) setText('l2SignedInEmail', state.authUser.email || '');
  // The learner id is the Firebase uid (UID-canonical); stale AESOP-#### ids are dropped.
  setText('l2LearnerId', state.authUser?.uid || getLearnerId() || storedUid() || '—');
}

async function startCertification() {
  const it = activeItem();
  if (!it) { alert(tx().auth.pickRungFirst); return; }
  const adultTier = ADULT_TIERS.has(selectedLevel());
  if (adultTier && !state.authUser) { document.getElementById('l2AccountGate')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }

  const depth = selectedDepth();
  const selectedRole = professionalRoleForLabel(selectedLevel());
  const certItem = focus().certItemForGroup(activeGroup(), it);
  const blueprint = focus().buildBlueprint({ item: certItem, level: selectedLevel(), depth });
  const standard = await trainingStandardFor(it, activeGroup());
  blueprint.languageLabel = languagePromptLabel();
  blueprint.languageExpectation = languageDirective('certification');
  blueprint.depthId = depth.id;
  blueprint.trainingStandardId = standard.id;
  blueprint.requiredVocabulary = standard.vocabulary || [];
  blueprint.specificTopics = standard.topics || [];
  blueprint.criteriaByDepth = standard.criteriaByDepth || {};
  blueprint.roleCriteria = standard.roleCriteria?.[selectedLevel()] || null;
  blueprint.professionalRole = selectedRole;
  if (selectedRole) {
    blueprint.roleCriteria = { ...defaultRoleCriteria()[selectedRole.label], ...(blueprint.roleCriteria || {}) };
    blueprint.employmentStandards = selectedRole.standards;
    blueprint.professionalRoleSpec = selectedRole.roleSpec;
  }
  blueprint.activeRung = it.label;
  blueprint.certificationSet = standard.certificationSet || activeGroup()?.label || focus().label;
  const context = focus().buildCertContext({ item: certItem, depth, learnerId: state.authUser?.uid || '' });
  context.languageLabel = languagePromptLabel();
  context.trainingStandardId = standard.id;
  context.requiredVocabulary = standard.vocabulary || [];
  context.specificTopics = standard.topics || [];
  context.criteriaByDepth = standard.criteriaByDepth || {};
  context.roleCriteria = standard.roleCriteria?.[selectedLevel()] || null;
  context.professionalRole = selectedRole;
  if (selectedRole) {
    context.roleCriteria = { ...defaultRoleCriteria()[selectedRole.label], ...(context.roleCriteria || {}) };
    context.employmentStandards = selectedRole.standards;
    context.professionalRoleSpec = selectedRole.roleSpec;
  }
  context.identityAssurance = focus().buildIdentityAssurance(new Date().toISOString(), { ...state.identityGate, account: state.authUser });
  context.proctoringMode = state.identityGate.proctoringId;

  state.activeCert = { item: it, level: selectedLevel(), depth, blueprint, context };
  state.certMessages = [{ role: 'user', content: 'I am ready to begin the certification exam.' }];
  if ($('l2CertSetupPanel')) $('l2CertSetupPanel').hidden = true;
  if ($('l2CertExamPanel')) $('l2CertExamPanel').hidden = false;
  $('l2CertModeBar').hidden = false;
  $('l2CertExamSummary').textContent = `Examining: ${it.label} - ${selectedLevel()}, ${depth.label}. An independent model validates the result before any credential is recorded.`;
  renderChat($('l2CertLog'), []);
  await callExaminer();
}

async function callExaminer() {
  if (!state.activeCert) return;
  const raw = await askModel({
    messages: state.certMessages,
    systemPrompt: certificationEngine.buildExaminerSystemPrompt(state.activeCert.blueprint),
    maxTokens: 900
  });
  const { certificationResult, rubricDimensions, visibleText } = certificationEngine.parseExaminerResponse(raw);
  state.certMessages.push({ role: 'assistant', content: visibleText });
  renderChat($('l2CertLog'), state.certMessages.filter((m) => m.content), { scroll: 'latest-assistant' });
  state._pendingResult = certificationResult;
  state._pendingRubric = rubricDimensions;
  if (certificationResult) finalizeCertification(false);
}

async function submitCertChat(e) {
  e.preventDefault();
  if (!state.activeCert) { alert(tx().auth.startCertFirst); return; }
  const input = $('l2CertInput');
  const content = input.value.trim();
  if (!content) return;
  state.certMessages.push({ role: 'user', content });
  input.value = '';
  renderChat($('l2CertLog'), state.certMessages.filter((m) => m.content));
  await callExaminer();
}

async function finalizeCertification(askForDetermination) {
  if (!state.activeCert) return;
  if (askForDetermination && !state._pendingResult) {
    state.certMessages.push({ role: 'user', content: 'Please render your final determination now with the rubric evaluation and result marker.' });
    await callExaminer();
    return;
  }
  if (!state._pendingResult) return;
  appendSystemNote('Validating with an independent second model…');
  const outcome = await certificationEngine.recordCertificationResult({
    context: state.activeCert.context,
    result: state._pendingResult,
    conversationMessages: state.certMessages,
    hooks: {
      buildIdentityAssurance: (earnedAt) => focus().buildIdentityAssurance(earnedAt, { ...state.identityGate, account: state.authUser }),
      onCredential: (record) => {
        const packet = certificationEngine.buildEvidencePacket({
          context: state.activeCert.context, result: state._pendingResult,
          rubricDimensions: state._pendingRubric, validation: record.validation,
          extra: { proctoringMode: state.identityGate.proctoringId }
        });
        packet.pathway = focus().pathway;
        recordCertification(packet, record.validation).catch((err) => console.warn('recordCertification failed', err));
      }
    }
  });
  reportOutcome(outcome);
}

function reportOutcome(outcome) {
  const map = {
    awarded: '✅ Credential awarded — validated by an independent model and written to your transcript.',
    not_awarded: 'Validation passed, but the result did not meet the certification bar this time.',
    validation_failed: '⚠️ The independent validator did not confirm the result, so no credential was recorded.',
    retry_offered: 'You may answer a few follow-up questions to complete validation.'
  };
  appendSystemNote(map[outcome?.outcome] || 'Certification flow complete.');
  if (outcome?.outcome === 'awarded') { renderMarketing(); renderProfile(); }
  state._pendingResult = null; state._pendingRubric = null;
}

function appendSystemNote(text) {
  const el = $('l2CertLog');
  el.insertAdjacentHTML('beforeend', `<div class="l2-msg l2-msg--system"><div class="l2-msg__body">${escapeHtml(text)}</div></div>`);
  el.scrollTop = el.scrollHeight;
}

function endCertification() {
  if (state.activeCert || state.certMessages.length) {
    state.lastCertSnapshot = {
      activeCert: state.activeCert,
      blueprint: state.activeCert?.blueprint || null,
      context: state.activeCert?.context || null,
      messages: state.certMessages.slice(),
      endedAt: new Date().toISOString()
    };
  }
  state.activeCert = null; state.certMessages = []; state._pendingResult = null;
  if ($('l2CertSetupPanel')) $('l2CertSetupPanel').hidden = false;
  if ($('l2CertExamPanel')) $('l2CertExamPanel').hidden = true;
  $('l2CertModeBar').hidden = true;
  $('l2CertExamSummary').textContent = 'Start a certification above to begin the examined conversation.';
  renderChat($('l2CertLog'), []);
}

// =============================================================================
// MARKETING / PROFILE
// =============================================================================
function totalCompleted() { return Object.keys(state.completed).length; }
function certCount() { return (state._record?.ladderCertifications || []).length; }
function completedConceptTierIds() {
  const completed = new Set();
  (state.placement?.grantedTierIds || []).forEach((id) => completed.add(id));
  LADDER_TIERS.forEach((tier) => {
    const items = (tier.topics || []).map((topic) => `concept:topic-${topic.id}`);
    if (items.length && items.every((key) => state.completed[key])) completed.add(tier.id);
  });
  return completed;
}

function renderMarketing() {
  // Marketing hero stats/ribbons were removed; these setters are no-ops if the
  // elements are absent. Kept guarded so the live progress shows if re-added.
  const completedTiers = completedConceptTierIds();
  setText('l2StatCourses', `${completedTiers.size} / ${LADDER_TIERS.length}`);
  setText('l2StatTiers', String(state.placement?.grantedTierIds?.length || 0));
  const certs = state._record?.ladderCertifications || [];
  // Bucket each cert by depth. Prefer the explicit depth field (depthId/depthLabel);
  // older certs that predate those fields are inferred from the title.
  const depthOf = (c) => {
    const d = (c.depthId || c.depthLabel || c.testDepth || c.certificationTier || '').toLowerCase();
    if (d.includes('master')) return 'master';
    if (d.includes('expert')) return 'expert';
    if (d.includes('core') || d.includes('cert')) return 'core';
    const t = (c.title || '').toLowerCase();
    if (/\bmaster/.test(t)) return 'master';
    if (/\bexpert/.test(t)) return 'expert';
    return 'core';
  };
  const byDepth = (cat) => certs.filter((c) => depthOf(c) === cat).length;
  setText('l2StatCertified', String(byDepth('core')));
  setText('l2StatExpert', String(byDepth('expert')));
  setText('l2StatMastery', String(byDepth('master')));
  setText('l2HeroCertCount', String(certs.length));
}

// Replace the "L" in the LADDER wordmark with an actual ladder (two rails +
// rungs forming the stem, plus the L's foot). Pure DOM + inline SVG so no CSS
// file is touched; scales with the headline via em units, inherits the navy.
function renderLadderL() {
  const h1 = document.querySelector('#marketing h1');
  if (!h1 || h1.dataset.ladderL) return;
  const node = [...h1.childNodes].find((n) => n.nodeType === 3 && n.textContent.includes('L'));
  if (!node) return;
  const txt = node.textContent;
  const idx = txt.indexOf('L');
  if (idx < 0) return;
  h1.setAttribute('aria-label', h1.textContent.trim());   // keep "The Ladder AI" for screen readers
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 62 100');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'height:0.72em;width:auto;vertical-align:baseline;fill:currentColor;margin:0 0.04em;';
  svg.innerHTML =
    '<rect x="6" y="0" width="9" height="84"/>' +       // left rail
    '<rect x="26" y="0" width="9" height="84"/>' +      // right rail
    '<rect x="13" y="11" width="15" height="7"/>' +     // rungs (evenly spaced, clear of the foot)
    '<rect x="13" y="28" width="15" height="7"/>' +
    '<rect x="13" y="45" width="15" height="7"/>' +
    '<rect x="13" y="62" width="15" height="7"/>' +
    '<rect x="6" y="79" width="56" height="21"/>';      // foot of the L (matches the E's bar thickness)
  const frag = document.createDocumentFragment();
  frag.append(document.createTextNode(txt.slice(0, idx)), svg, document.createTextNode(txt.slice(idx + 1)));
  h1.replaceChild(frag, node);
  h1.dataset.ladderL = '1';
}

function setupProfile() {
  $('l2FeedbackForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = {
      type: $('l2FeedbackType').value,
      email: $('l2FeedbackEmail').value.trim(),
      message: $('l2FeedbackMessage').value.trim(),
      at: new Date().toISOString(),
      focus: state.focusId
    };
    if (!entry.message) return;
    const log = JSON.parse(localStorage.getItem(LS_FEEDBACK) || '[]');
    log.push(entry);
    localStorage.setItem(LS_FEEDBACK, JSON.stringify(log));
    $('l2FeedbackForm').reset();
    const sent = $('l2FeedbackSent'); sent.hidden = false;
    setTimeout(() => { sent.hidden = true; }, 4000);
  });
}

function renderProfile() {
  setText('l2ProfileCertCount', String(certCount()));
  renderOpenCourses();
}

// Profile → Open courses: a bulleted list of started-but-unfinished courses,
// title only, each with a Resume button that restores the full conversation.
function renderOpenCourses() {
  const wrap = $('l2OpenCourses');
  if (!wrap) return;
  const list = openCourses();
  if (!list.length) {
    wrap.innerHTML = `<p class="l2-open-empty">${escapeHtml(tx().profile.noOpenCourses)}</p>`;
    return;
  }
  wrap.innerHTML = '<ul class="l2-open-list">' + list.map((c) =>
    `<li class="l2-open-item">
       <span class="l2-open-title">${escapeHtml(c.title)}</span>
       <button class="l2-open-resume" type="button"
         data-focus="${escapeHtml(c.focusId)}" data-group="${escapeHtml(c.groupId || '')}" data-item="${escapeHtml(c.itemId)}">${escapeHtml(tx().profile.resume)}</button>
     </li>`).join('') + '</ul>';
  wrap.querySelectorAll('.l2-open-resume').forEach((b) => b.addEventListener('click', () =>
    resumeCourse(b.dataset.focus, b.dataset.group, b.dataset.item)));
}

// Restore focus, rung, and the saved conversation, then jump to Training.
async function resumeCourse(focusId, groupId, itemId) {
  await activateFocus(focusId);                 // loads catalog/groups (resets selection + chat)
  if (state.groups.some((g) => g.id === groupId)) state.activeGroupId = groupId;
  state.activeItemId = itemId;
  renderRail();
  renderActiveItem();
  const saved = savedChatFor(focus().pathway, itemId) || [];
  state.trainMessages = saved;
  renderChat($('l2ChatLog'), state.trainMessages);
  document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' });
}

init();
