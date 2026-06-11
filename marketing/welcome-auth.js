import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { FIREBASE_CONFIG } from '/ai-academy/js/firebase-config.js';

const LS_EMAIL = 'aesop-ladder2-emailForSignIn';
const LS_ID = 'aesop-learner-id';

const $ = (id) => document.getElementById(id);

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function setStatus(message = '', kind = '') {
  const node = $('l2SignupMsg');
  if (!node) return;
  node.hidden = !message;
  node.dataset.state = kind;
  if (kind === 'ok') node.innerHTML = message;
  else node.textContent = message;
}

function setShown(id, shown, mode) {
  const node = $(id);
  if (!node) return;
  node.hidden = !shown;
  node.style.display = shown ? mode : 'none';
}

function setSigninExpanded(expanded) {
  const toggle = $('l2SigninToggle');
  setShown('l2SigninForm', expanded, 'flex');
  if (toggle) toggle.setAttribute('aria-expanded', String(expanded));
  if (expanded) $('l2SigninEmail')?.focus();
}

function showSignedIn(user) {
  const signedIn = Boolean(user);

  setShown('l2SignupForm', !signedIn, 'flex');
  setShown('l2SigninToggle', !signedIn, 'inline-block');
  setSigninExpanded(false);
  setShown('l2SignedIn', signedIn, 'flex');

  if (signedIn) {
    localStorage.setItem(LS_ID, user.uid);
    const email = $('l2SignedInEmail');
    if (email) email.textContent = user.email || '';
  }
}

async function sendVerification(auth) {
  const clean = String($('l2SignupEmail')?.value || '').trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) {
    setStatus('Enter a valid email address.', 'error');
    return;
  }

  try {
    await sendSignInLinkToEmail(auth, clean, {
      url: `${location.origin}/components/create-account.html`,
      handleCodeInApp: true
    });
    localStorage.setItem(LS_EMAIL, clean);
    setStatus(`Check <b>${escapeHtml(clean)}</b> for a link to verify your email and finish creating your account.`, 'ok');
  } catch (error) {
    setStatus(`Could not send the link (${error.code || 'error'}). Please try again.`, 'error');
  }
}

async function passwordSignIn(auth) {
  const email = String($('l2SigninEmail')?.value || '').trim();
  const password = $('l2SigninPw')?.value || '';
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setStatus('', '');
    window.location.href = '/workspace/';
  } catch {
    setStatus('Sign in failed - check your email and password.', 'error');
  }
}

function setupMarketingAuth() {
  let auth = null;
  try {
    const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
    auth = getAuth(app);
  } catch {
    setStatus('Sign-up is unavailable right now. Please try again shortly.', 'error');
    return;
  }

  onAuthStateChanged(auth, showSignedIn);

  $('l2SignupForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    sendVerification(auth);
  });

  $('l2SigninToggle')?.addEventListener('click', () => {
    const form = $('l2SigninForm');
    if (!form) return;
    setSigninExpanded(form.hidden);
  });

  $('l2SigninForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    passwordSignIn(auth);
  });

  $('l2HeroSignOut')?.addEventListener('click', () => {
    firebaseSignOut(auth).catch(() => {});
  });
}

setupMarketingAuth();
