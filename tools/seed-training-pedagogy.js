/* =============================================================================
 * Seed Firestore training pedagogy + per-rung standards.
 *
 * Prerequisites:
 *   npm install firebase-admin --no-save
 *   set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\scott\Downloads\theladderai-firebase-adminsdk-fbsvc-1754dfc17c.json
 *
 * Run:
 *   node tools/seed-training-pedagogy.js
 * ========================================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const PROJECT_ID = 'theladderai';
const ROOT = path.resolve(__dirname, '..');

initializeApp({
  credential: applicationDefault(),
  projectId: PROJECT_ID,
});

const db = getFirestore();

const EDUCATION_LEVELS = [
  'Elementary', 'Middle School', 'High School',
  'Young Adult', 'College', 'Workforce', 'Leadership'
];

const PEDAGOGY = {
  version: 'v1',
  name: 'AESOP guided training pedagogy',
  mode: 'guided_lesson',
  principles: [
    'Training is a guided lesson, not a Q&A chat and not a certification exam.',
    'Every rung has a destination, required vocabulary, topic context, applied practice, and a readiness check.',
    'Training prepares the learner for the same mapped standard used by certification.',
    'The guide teaches one idea at a time, asks one question or task per turn, and closes only after usable understanding.'
  ],
  lessonArc: [
    { id: 'orient', purpose: 'Name the learning destination and surface prior understanding.' },
    { id: 'teach', purpose: 'Teach the core idea with concrete examples and required vocabulary.' },
    { id: 'apply', purpose: 'Give a small realistic task that forces use of the idea.' },
    { id: 'check', purpose: 'Ask the learner to explain, apply, or correct the idea in their own words.' },
    { id: 'close', purpose: 'Mark complete only after the learner demonstrates the rung criteria.' }
  ],
  depthLabels: {
    certification: 'Core',
    expert: 'Expert',
    mastery: 'Mastery'
  },
  updatedAt: new Date().toISOString()
};

function extractConceptTiers() {
  const source = fs.readFileSync(path.join(ROOT, 'components', 'ladder-data.js'), 'utf8');
  const match = source.match(/export const LADDER_TIERS = (\[[\s\S]*?\n\])\.map/);
  if (!match) throw new Error('Could not extract LADDER_TIERS from components/ladder-data.js');
  const tiers = vm.runInNewContext(`(${match[1]})`, {});
  return tiers.map((tier, tierIndex) => ({
    ...tier,
    order: tierIndex + 1,
    topics: tier.topics.map((title, topicIndex) => ({
      id: `T${String(tierIndex + 1).padStart(2, '0')}-L${String(topicIndex + 1).padStart(2, '0')}`,
      title,
      tierId: tier.id,
      order: topicIndex + 1
    }))
  }));
}

function parseMarkdownCatalog(file, cellsToObject) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8')
    .split('\n')
    .filter((line) => /^\|\s*\d+\s*\|/.test(line))
    .map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()))
    .map(cellsToObject)
    .filter(Boolean);
}

function productCategory(id) {
  const ranges = [
    ['AI assistants', 1, 25],
    ['Workplace + writing', 26, 50],
    ['Design + slides', 51, 75],
    ['Video + audio', 76, 100],
    ['Sales + support', 101, 125],
    ['Coding tools', 126, 150],
    ['Search + RAG', 151, 175],
    ['Vector databases', 176, 200],
    ['Data + analytics', 201, 225],
    ['Agents + automation', 226, 250],
    ['Model APIs + cloud', 251, 275],
    ['Regulated AI', 276, 500]
  ];
  return (ranges.find(([, start, end]) => id >= start && id <= end) || ['Products'])[0];
}

function roleCriteria() {
  return Object.fromEntries(EDUCATION_LEVELS.map((level) => [level, {
    languageLevel: level,
    scenarioComplexity: ['Young Adult', 'College', 'Workforce', 'Leadership'].includes(level)
      ? 'professional or organizational scenario'
      : 'age-appropriate learning scenario',
    evidenceExpectation: ['Young Adult', 'College', 'Workforce', 'Leadership'].includes(level)
      ? 'defensible explanation, practical application, and risk-aware judgment'
      : 'clear explanation, simple example, and safe-use awareness'
  }]));
}

function neighboring(items, index) {
  return [items[index - 1], items[index + 1]].filter(Boolean).map((item) => item.title || item.name);
}

function criteria(title, neighbors = []) {
  const neighborText = neighbors.length ? neighbors.join(' and ') : 'nearby rung topics';
  return {
    certification: [
      `Defines "${title}" accurately in plain language.`,
      `Uses required vocabulary while explaining "${title}".`,
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

function depthRecords(criteriaByDepth) {
  return [
    { id: 'certification', label: 'Core', criteria: criteriaByDepth.certification },
    { id: 'expert', label: 'Expert', criteria: criteriaByDepth.expert },
    { id: 'mastery', label: 'Mastery', criteria: criteriaByDepth.mastery }
  ];
}

function conceptStandards() {
  return extractConceptTiers().flatMap((tier) => tier.topics.map((topic, index) => {
    const criteriaByDepth = criteria(topic.title, neighboring(tier.topics, index));
    return {
      id: `concept:${topic.id}`,
      pathway: 'concept',
      focusLabel: 'AI Concepts',
      scope: 'rung',
      title: topic.title,
      activeRung: topic.title,
      certificationSet: `${tier.name}: ${tier.title}`,
      tierId: tier.id,
      tierName: tier.name,
      topics: tier.topics.map((t) => t.title),
      vocabulary: tier.vocabulary || [],
      criteriaByDepth,
      certificationDepths: depthRecords(criteriaByDepth),
      roleCriteria: roleCriteria(),
      version: 'v1',
      updatedAt: new Date().toISOString()
    };
  }));
}

function productStandards() {
  const products = parseMarkdownCatalog('docs/theladder-products-catalog.md', (cells) => ({
    id: Number(cells[0]), name: cells[1], type: cells[2], reason: cells[3], depth: cells[4]
  })).filter((p) => Number.isFinite(p.id) && p.name);
  return products.map((product, index) => {
    const category = productCategory(product.id);
    const peers = products.filter((p) => productCategory(p.id) === category);
    const peerIndex = peers.findIndex((p) => p.id === product.id);
    const criteriaByDepth = criteria(product.name, neighboring(peers, peerIndex));
    return {
      id: `product:${product.id}`,
      pathway: 'product',
      focusLabel: 'Products',
      scope: 'rung',
      title: product.name,
      activeRung: product.name,
      certificationSet: category,
      topics: peers.map((p) => p.name),
      vocabulary: [product.type, category, product.depth].filter(Boolean),
      catalog: product,
      criteriaByDepth,
      certificationDepths: depthRecords(criteriaByDepth),
      roleCriteria: roleCriteria(),
      version: 'v1',
      updatedAt: new Date().toISOString()
    };
  });
}

function useCaseStandards() {
  const useCases = parseMarkdownCatalog('docs/theladder-use-cases-catalog.md', (cells) => ({
    id: Number(cells[0]), name: cells[1], topic: cells[2], outcome: cells[3], depth: cells[4]
  })).filter((u) => Number.isFinite(u.id) && u.name);
  return useCases.map((useCase) => {
    const peers = useCases.filter((u) => u.topic === useCase.topic);
    const peerIndex = peers.findIndex((u) => u.id === useCase.id);
    const criteriaByDepth = criteria(useCase.name, neighboring(peers, peerIndex));
    return {
      id: `use-case:${useCase.id}`,
      pathway: 'use-case',
      focusLabel: 'Use Cases',
      scope: 'rung',
      title: useCase.name,
      activeRung: useCase.name,
      certificationSet: useCase.topic,
      topics: peers.map((u) => u.name),
      vocabulary: [useCase.topic, useCase.depth].filter(Boolean),
      catalog: useCase,
      criteriaByDepth,
      certificationDepths: depthRecords(criteriaByDepth),
      roleCriteria: roleCriteria(),
      version: 'v1',
      updatedAt: new Date().toISOString()
    };
  });
}

async function writeBatch(records) {
  let batch = db.batch();
  let count = 0;
  for (const record of records) {
    batch.set(db.collection('trainingStandards').doc(record.id), record, { merge: true });
    count += 1;
    if (count % 400 === 0) {
      await batch.commit();
      batch = db.batch();
    }
  }
  await batch.commit();
  return count;
}

(async () => {
  await db.collection('trainingPedagogy').doc('default').set(PEDAGOGY, { merge: true });
  const standards = [...conceptStandards(), ...productStandards(), ...useCaseStandards()];
  const count = await writeBatch(standards);
  console.log(`Seeded trainingPedagogy/default and ${count} trainingStandards records.`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
