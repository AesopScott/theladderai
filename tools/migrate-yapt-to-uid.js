/* =============================================================================
 * migrate-yapt-to-uid.js  —  one-off learner-record migration
 *
 * Context: the canonical learner ID is the Firebase Auth UID (decision
 * 2026-06-10). Scott's certifications were earned under the retired AESOP-XXXX
 * scheme on `learners/AESOP-YAPT`. This copies those cert fields onto his uid
 * record and binds his email, so signing in surfaces his certs.
 *
 * Behaviour: MERGES (does not clobber) the cert/transcript fields + email onto
 * the destination uid doc, and LEAVES the source (AESOP-YAPT) untouched so it
 * can be verified and retired afterwards. Safe to re-run (idempotent set/merge).
 *
 * Prerequisites:
 *   npm i firebase-admin
 *   # auth via a service account for project theladderai:
 *   set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\serviceAccount.json   (Windows)
 *   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json  (POSIX)
 *
 * Run:  node tools/migrate-yapt-to-uid.js
 * ========================================================================== */

const admin = require('firebase-admin');

const PROJECT_ID = 'theladderai';
const SRC = 'AESOP-YAPT';                                // source (legacy) record
const DST = 'iJKSEZbNlBMgNnTjoKl1RfBDFwf1';              // destination uid record
const EMAIL = 'scott@mojoaistudio.com';                 // account email to bind

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: PROJECT_ID,
});

const db = admin.firestore();

(async () => {
  const srcSnap = await db.doc(`learners/${SRC}`).get();
  if (!srcSnap.exists) throw new Error(`source record learners/${SRC} not found`);
  const s = srcSnap.data();

  const certCount = (s.ladderCertifications || []).length;
  console.log(`source ${SRC}: ${certCount} certifications`);

  await db.doc(`learners/${DST}`).set({
    accountEmail: EMAIL,
    accountUid: DST,
    ladderCertifications:     s.ladderCertifications     || [],
    certificationValidations: s.certificationValidations || [],
    studentTranscript:        s.studentTranscript        || {},
    standardsReviews:         s.standardsReviews          || [],
    lastActiveAt: new Date().toISOString(),
  }, { merge: true });

  console.log(`migrated ${certCount} certs + email → learners/${DST}`);
  console.log(`source learners/${SRC} left intact — verify the uid record, then retire it.`);
})()
  .then(() => process.exit(0))
  .catch((err) => { console.error('migration failed:', err); process.exit(1); });
