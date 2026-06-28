export const WORKSPACE_LANGUAGE_KEY = 'aesop-workspace-language';
export const WELCOME_LANGUAGE_KEY = 'aesop-welcome-language';

export const WORKSPACE_LANGUAGES = [
  { code: 'en', label: 'English', promptLabel: 'English', dir: 'ltr' },
  { code: 'es', label: 'Español', promptLabel: 'Spanish', dir: 'ltr' },
  { code: 'fr', label: 'Français', promptLabel: 'French', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', promptLabel: 'German', dir: 'ltr' },
  { code: 'ar', label: 'العربية', promptLabel: 'Arabic', dir: 'rtl' },
  { code: 'hi', label: 'हिन्दी', promptLabel: 'Hindi', dir: 'ltr' },
  { code: 'ja', label: '日本語', promptLabel: 'Japanese', dir: 'ltr' },
  { code: 'ko', label: '한국어', promptLabel: 'Korean', dir: 'ltr' },
  { code: 'pt', label: 'Português', promptLabel: 'Portuguese', dir: 'ltr' },
  { code: 'zh-TW', label: '繁體中文', promptLabel: 'Traditional Chinese', dir: 'ltr' }
];

const EN = {
  metaTitle: 'The Ladder AI - AESOP AI Academy',
  metaDescription: 'One guided AI learning ladder - concepts, products, and use cases - with placement, training conversations, certification, and transcript evidence.',
  nav: { profile: 'Profile', assessment: 'Assessment', training: 'Training', certification: 'Certification', support: 'Support' },
  marketing: {
    eyebrow: 'How high can you climb?',
    cascade: ['Every AI Concept', 'Every AI Product', 'Every AI Use Case', 'Certified'],
    cta: 'Find your starting rung →',
    trustTitle: 'Why Employers Trust the Ladder',
    trust: [
      'Every credential is examined by two independent models.',
      'Your exam is a real conversation, not just a question bank.',
      'Your exam is measured against audit-grade evidence mapped to standards that matter, like the O*NET and World Economic Forum Future of Jobs Economic Standards & the NIST AI RMF and EU AI Acts.',
      "Your exam results can be downloaded and used as an interview reference by an organization's recruiting team."
    ],
    stairsAlt: 'The Ladder AI levels - Core, Expert, Master',
    broughtBy: 'Brought to you by Aesop AI Academy',
    signupEyebrow: 'Get Certified. Get Noticed.',
    emailPlaceholder: 'Enter your e-mail',
    emailLabel: 'Email address',
    signup: 'Sign Up',
    signinToggle: 'Already have an account? Sign in',
    email: 'Email',
    password: 'Password',
    signin: 'Sign in',
    signedInAs: 'Signed in as',
    signout: 'Sign out'
  },
  profile: {
    eyebrow: 'Your record',
    title: 'Profile',
    lead: "Everything you've earned and where you left off - plus a direct line to support.",
    learnerId: 'Learner ID',
    certsEarned: 'Certifications earned',
    tiersCompleted: 'tiers completed',
    tiersPlacedOut: 'tiers placed out',
    core: 'core',
    expert: 'expert',
    mastery: 'mastery',
    viewRecord: 'View certification record',
    openCourses: 'Open courses',
    noOpenCourses: 'No open courses yet - pick a rung in Training to begin a guided conversation.',
    resume: 'Resume'
  },
  assessment: {
    eyebrow: 'Find your starting rung',
    title: 'Assessment',
    lead: 'A short conversation places you across the training ladder - placing you out of what you already know and assigning the rungs that fit your goals. You only need to take it once, but can reassess later if you wish.',
    panel: 'Placement assessment',
    notPlaced: 'Not placed yet',
    summary: 'Start the assessment to test out of tiers and receive assigned rungs based on capability and interest.',
    conversation: 'Assessment conversation',
    responses: 'responses',
    start: 'Start assessment',
    reset: 'Reset',
    placeholder: 'Answer the placement guide',
    send: 'Send',
    complete: 'Placement complete',
    completeCopy: 'Your placed-out tiers and assigned rungs are saved. Pick up training below.',
    continueTraining: 'Continue to training'
  },
  training: {
    eyebrow: 'Climb rung by rung',
    title: 'Training',
    gateLabel: 'Sign in to train',
    gateTitle: 'Create a free account to save your rungs',
    gateCopy: "Training conversations and progress are saved to your learner record once you're signed in. You can browse the ladder without an account, but progress won't persist.",
    signInBelow: 'Sign in below',
    lead: 'Pick a focus, choose a rung, and learn through a guided conversation. Your focus is a toggle - concepts, products, and use cases share the same engine and the same record.',
    concepts: 'AI Concepts',
    products: 'Products',
    useCases: 'Use Cases',
    navLabel: 'Training navigation',
    tierSelection: 'Training tier selection',
    loadingRungs: 'Loading rungs...',
    chooseTier: 'Choose a tier',
    pickRung: 'Pick a rung to see what the conversation will cover.',
    startConversation: 'Start conversation',
    reset: 'Reset',
    chatPlaceholder: 'Answer the guide or ask for the next challenge here',
    send: 'Send',
    textSize: 'Text size',
    evalOptions: 'Standards evaluation options',
    eduEval: 'Education Standards Evaluation',
    employEval: 'Employment Standards Evaluation',
    runEval: 'Run selected evaluations',
    evalCopy: 'Checks the current training transcript against the selected standards and saves the evaluation evidence for the rung.',
    pickRungToBegin: 'Pick a rung from the list to begin.',
    learnSummary: 'Learn "{item}" through a guided conversation. The guide teaches, challenges, applies, and checks readiness.',
    descriptionFallback: 'Pick a rung to see what the conversation will cover.',
    promptInstruction: 'All learner-facing training responses must be in {language}. Keep technical terms understandable; translate explanations, questions, feedback, criteria, and summaries unless the learner explicitly asks for another language.'
  },
  certification: {
    eyebrow: 'Prove it',
    title: 'Certification',
    lead: 'Choose the rung you want to certify, then begin an adaptive oral exam. An independent second model must confirm the result before any credential is recorded.',
    navLabel: 'Certification rung navigation',
    selection: 'Certification rung selection',
    loadingRungs: 'Loading rungs...',
    chooseTier: 'Choose a tier',
    pickRungExam: 'Pick a rung to see what the exam will cover.',
    certifyThisRung: 'Certify this rung',
    target: 'Choose a rung, then set the learner level or professional role for the exam.',
    level: 'Learner level / professional role',
    masteryLevel: 'Mastery level',
    identity: 'Identity assurance',
    proctoring: 'Proctoring level',
    identityAttest: 'I confirm I am the person taking this attempt and that any credential will represent my own work.',
    account: 'Account',
    accountMsg: 'Adult education tiers and identity-assured certification require a verified account.',
    adultAttest: 'I confirm I am 18 or older (required for adult education tiers).',
    emailPlaceholder: 'name@example.com',
    passwordPlaceholder: 'Password',
    signIn: 'Sign in',
    createAccount: 'Create account',
    signOut: 'Sign out',
    confirmAdult: 'Confirm adult access',
    start: 'Start certification',
    record: 'Certification record',
    examTitle: 'Certification exam',
    examSummary: 'Start certification to begin the examined conversation.',
    inProgress: 'Exam in progress',
    finalize: 'Finalize my determination',
    finalizeCopy: 'Ask the examiner to stop questioning and render the certification determination for this attempt.',
    end: 'End exam',
    endCopy: 'Stop this attempt and return to setup without recording a credential.',
    placeholder: 'Respond to the examiner',
    send: 'Send',
    willExamine: 'Certification will examine this rung: {description}',
    promptInstruction: 'Conduct all learner-facing certification exam language in {language}. Translate instructions, questions, feedback, rubric disclosure, and final learner-facing determination into {language} unless the learner explicitly asks otherwise.'
  },
  support: {
    footerCta: "Still climbing? Let's place you.",
    label: 'Support & feedback',
    title: 'How can we help?',
    topic: 'Topic',
    options: ['Support request', 'Product feedback', 'Content correction', 'Report a problem'],
    email: 'Email (optional)',
    emailPlaceholder: 'name@example.com',
    message: 'Message',
    messagePlaceholder: "Tell us what's going on...",
    send: 'Send',
    sent: 'Thanks - your message has been recorded.',
    footerCopy: 'One AI learning ladder - concepts, products, and use cases - with placement, training, certification, and a verifiable transcript.',
    linksTitle: 'The Ladder AI',
    academy: 'Academy',
    placement: 'Placement',
    training: 'Training',
    certification: 'Certification',
    support: 'Support',
    profile: 'Profile',
    record: 'Certification record'
  },
  auth: {
    invalidEmail: 'Enter a valid email address.',
    unavailable: 'Sign-up is unavailable right now. Please try again shortly.',
    checkEmail: 'Check <b>{email}</b> for a link to verify your email and finish creating your account.',
    sendFailed: 'Could not send the link ({code}). Please try again.',
    signinFailed: 'Sign in failed - check your email and password.',
    signedIn: 'Signed in: {email}',
    accountRequired: 'Account required',
    accountOptional: 'Account optional',
    accountSaved: 'Your certification attempt and transcript evidence will be saved to this account.',
    accountRequiredMsg: 'This certification path requires a signed-in account before certifying.',
    accountOptionalMsg: 'Sign in to save certifications to your transcript (optional for non-adult tiers).',
    pickRungFirst: 'Pick a rung in Training first.',
    startCertFirst: 'Start certification first.'
  }
};

const overrides = {
  es: {
    metaTitle: 'The Ladder AI - Academia de IA AESOP',
    metaDescription: 'Una escalera guiada de aprendizaje de IA: conceptos, productos y casos de uso, con ubicación, entrenamiento, certificación y evidencia de expediente.',
    nav: { profile: 'Perfil', assessment: 'Evaluación', training: 'Entrenamiento', certification: 'Certificación', support: 'Soporte' },
    marketing: { eyebrow: '¿Qué tan alto puedes subir?', cascade: ['Cada concepto de IA', 'Cada producto de IA', 'Cada caso de uso de IA', 'Entrenado y certificado'], cta: 'Encuentra tu peldaño inicial →', trustTitle: 'Por qué los empleadores confían en The Ladder', trust: ['Cada credencial es examinada por dos modelos independientes.', 'Tu examen es una conversación real, no solo un banco de preguntas.', 'Tu examen se mide contra evidencia de auditoría mapeada a estándares importantes, como O*NET, el Foro Económico Mundial, NIST AI RMF y la Ley de IA de la UE.', 'Los resultados pueden descargarse y usarse como referencia de entrevista por equipos de reclutamiento.'], broughtBy: 'Presentado por Aesop AI Academy', signupEyebrow: 'Entrénate. Certifícate. Hazte visible.', emailPlaceholder: 'Ingresa tu correo electrónico', emailLabel: 'Correo electrónico', signup: 'Registrarse', signinToggle: '¿Ya tienes cuenta? Inicia sesión', email: 'Correo', password: 'Contraseña', signin: 'Iniciar sesión', signedInAs: 'Sesión iniciada como', signout: 'Cerrar sesión' },
    profile: { eyebrow: 'Tu registro', title: 'Perfil', lead: 'Todo lo que has obtenido y dónde te quedaste, además de una línea directa a soporte.', learnerId: 'ID de aprendiz', certsEarned: 'Certificaciones obtenidas', tiersCompleted: 'niveles completados', tiersPlacedOut: 'niveles exentos', core: 'básico', expert: 'experto', mastery: 'maestría', viewRecord: 'Ver registro de certificación', openCourses: 'Cursos abiertos', noOpenCourses: 'Aún no hay cursos abiertos: elige un peldaño en Entrenamiento para comenzar una conversación guiada.', resume: 'Reanudar' },
    assessment: { eyebrow: 'Encuentra tu peldaño inicial', title: 'Evaluación', lead: 'Una conversación breve te ubica en la escalera de entrenamiento, eximiéndote de lo que ya sabes y asignando los peldaños adecuados para tus metas.', panel: 'Evaluación de ubicación', notPlaced: 'Aún sin ubicación', summary: 'Inicia la evaluación para eximir niveles y recibir peldaños asignados según capacidad e interés.', conversation: 'Conversación de evaluación', responses: 'respuestas', start: 'Iniciar evaluación', reset: 'Reiniciar', placeholder: 'Responde a la guía de ubicación', send: 'Enviar', complete: 'Ubicación completa', completeCopy: 'Tus niveles exentos y peldaños asignados están guardados. Continúa el entrenamiento abajo.', continueTraining: 'Continuar al entrenamiento' },
    training: { eyebrow: 'Sube peldaño por peldaño', title: 'Entrenamiento', gateLabel: 'Inicia sesión para entrenar', gateTitle: 'Crea una cuenta gratis para guardar tus peldaños', gateCopy: 'Las conversaciones y el progreso se guardan en tu registro cuando inicias sesión.', signInBelow: 'Iniciar sesión abajo', lead: 'Elige un enfoque, selecciona un peldaño y aprende mediante una conversación guiada.', concepts: 'Conceptos de IA', products: 'Productos', useCases: 'Casos de uso', navLabel: 'Navegación de entrenamiento', tierSelection: 'Selección de nivel', loadingRungs: 'Cargando peldaños...', chooseTier: 'Elige un nivel', pickRung: 'Elige un peldaño para ver qué cubrirá la conversación.', startConversation: 'Iniciar conversación', reset: 'Reiniciar', chatPlaceholder: 'Responde a la guía o pide el siguiente reto aquí', send: 'Enviar', textSize: 'Tamaño del texto', evalOptions: 'Opciones de evaluación de estándares', eduEval: 'Evaluación de estándares educativos', employEval: 'Evaluación de estándares laborales', runEval: 'Ejecutar evaluaciones seleccionadas', evalCopy: 'Revisa la transcripción actual contra los estándares seleccionados y guarda evidencia para el peldaño.', pickRungToBegin: 'Elige un peldaño de la lista para comenzar.', learnSummary: 'Aprende "{item}" mediante una conversación guiada.', descriptionFallback: 'Elige un peldaño para ver qué cubrirá la conversación.', promptInstruction: 'Todas las respuestas de entrenamiento para el estudiante deben estar en {language}.' },
    certification: { eyebrow: 'Demuéstralo', title: 'Certificación', lead: 'Elige el peldaño que quieres certificar y comienza un examen oral adaptativo.', navLabel: 'Navegación de peldaños de certificación', selection: 'Selección de peldaño de certificación', loadingRungs: 'Cargando peldaños...', chooseTier: 'Elige un nivel', pickRungExam: 'Elige un peldaño para ver qué cubrirá el examen.', certifyThisRung: 'Certificar este peldaño', target: 'Elige un peldaño y luego define el nivel o rol profesional para el examen.', level: 'Nivel del aprendiz / rol profesional', masteryLevel: 'Nivel de dominio', identity: 'Garantía de identidad', proctoring: 'Nivel de supervisión', identityAttest: 'Confirmo que soy la persona que toma este intento y que cualquier credencial representará mi propio trabajo.', account: 'Cuenta', accountMsg: 'Los niveles adultos y la certificación con identidad requieren una cuenta verificada.', adultAttest: 'Confirmo que tengo 18 años o más.', signIn: 'Iniciar sesión', createAccount: 'Crear cuenta', signOut: 'Cerrar sesión', confirmAdult: 'Confirmar acceso adulto', start: 'Iniciar certificación', record: 'Registro de certificación', examTitle: 'Examen de certificación', examSummary: 'Inicia la certificación para comenzar la conversación examinada.', inProgress: 'Examen en progreso', finalize: 'Finalizar mi determinación', finalizeCopy: 'Pide al examinador que deje de preguntar y emita la determinación de certificación.', end: 'Terminar examen', endCopy: 'Detén este intento y vuelve a la configuración sin registrar credencial.', placeholder: 'Responde al examinador', send: 'Enviar', willExamine: 'La certificación examinará este peldaño: {description}', promptInstruction: 'Todo el lenguaje del examen de certificación dirigido al estudiante debe estar en {language}.' },
    support: { footerCta: '¿Sigues subiendo? Vamos a ubicarte.', label: 'Soporte y comentarios', title: '¿Cómo podemos ayudar?', topic: 'Tema', options: ['Solicitud de soporte', 'Comentarios del producto', 'Corrección de contenido', 'Informar un problema'], email: 'Correo (opcional)', message: 'Mensaje', messagePlaceholder: 'Cuéntanos qué ocurre...', send: 'Enviar', sent: 'Gracias: tu mensaje fue registrado.', footerCopy: 'Una escalera de aprendizaje de IA con ubicación, entrenamiento, certificación y expediente verificable.', placement: 'Ubicación', training: 'Entrenamiento', certification: 'Certificación', support: 'Soporte', profile: 'Perfil', record: 'Registro de certificación' },
    auth: { invalidEmail: 'Ingresa un correo válido.', unavailable: 'El registro no está disponible ahora. Inténtalo pronto.', signinFailed: 'Error al iniciar sesión: revisa tu correo y contraseña.', accountRequired: 'Cuenta requerida', accountOptional: 'Cuenta opcional', pickRungFirst: 'Elige primero un peldaño en Entrenamiento.', startCertFirst: 'Inicia primero la certificación.' }
  },
  fr: {
    metaTitle: 'The Ladder AI - Académie IA AESOP',
    nav: { profile: 'Profil', assessment: 'Évaluation', training: 'Formation', certification: 'Certification', support: 'Assistance' },
    marketing: { eyebrow: 'Jusqu’où pouvez-vous grimper ?', cascade: ['Chaque concept IA', 'Chaque produit IA', 'Chaque cas d’usage IA', 'Formé et certifié'], cta: 'Trouvez votre premier échelon →', trustTitle: 'Pourquoi les employeurs font confiance à The Ladder', signupEyebrow: 'Formez-vous. Certifiez-vous. Faites-vous remarquer.', signup: 'S’inscrire', signinToggle: 'Déjà un compte ? Se connecter', signin: 'Se connecter', signout: 'Se déconnecter' },
    profile: { eyebrow: 'Votre dossier', title: 'Profil', lead: 'Tout ce que vous avez obtenu et l’endroit où vous vous êtes arrêté, avec un accès direct à l’assistance.', learnerId: 'ID apprenant', certsEarned: 'Certifications obtenues', tiersCompleted: 'niveaux terminés', tiersPlacedOut: 'niveaux validés', core: 'socle', expert: 'expert', mastery: 'maîtrise', viewRecord: 'Voir le dossier de certification', openCourses: 'Cours ouverts', resume: 'Reprendre' },
    assessment: { eyebrow: 'Trouvez votre premier échelon', title: 'Évaluation', panel: 'Évaluation de placement', notPlaced: 'Pas encore placé', conversation: 'Conversation d’évaluation', start: 'Démarrer l’évaluation', reset: 'Réinitialiser', send: 'Envoyer', complete: 'Placement terminé', continueTraining: 'Continuer vers la formation' },
    training: { eyebrow: 'Grimpez échelon par échelon', title: 'Formation', gateLabel: 'Connectez-vous pour vous former', concepts: 'Concepts IA', products: 'Produits', useCases: 'Cas d’usage', chooseTier: 'Choisir un niveau', loadingRungs: 'Chargement des échelons...', startConversation: 'Démarrer la conversation', reset: 'Réinitialiser', send: 'Envoyer', textSize: 'Taille du texte', eduEval: 'Évaluation des normes éducatives', employEval: 'Évaluation des normes professionnelles', runEval: 'Lancer les évaluations sélectionnées', promptInstruction: 'Toutes les réponses de formation destinées à l’apprenant doivent être en {language}.' },
    certification: { eyebrow: 'Prouvez-le', title: 'Certification', start: 'Démarrer la certification', record: 'Dossier de certification', examTitle: 'Examen de certification', inProgress: 'Examen en cours', finalize: 'Finaliser ma détermination', end: 'Terminer l’examen', send: 'Envoyer', promptInstruction: 'Tout le langage de l’examen de certification destiné à l’apprenant doit être en {language}.' },
    support: { label: 'Assistance et retours', title: 'Comment pouvons-nous aider ?', topic: 'Sujet', send: 'Envoyer', placement: 'Placement', training: 'Formation', certification: 'Certification', support: 'Assistance', profile: 'Profil', record: 'Dossier de certification' }
  },
  de: {
    nav: { profile: 'Profil', assessment: 'Einstufung', training: 'Training', certification: 'Zertifizierung', support: 'Support' },
    marketing: { eyebrow: 'Wie hoch kannst du steigen?', cascade: ['Jedes KI-Konzept', 'Jedes KI-Produkt', 'Jeder KI-Anwendungsfall', 'Trainiert und zertifiziert'], cta: 'Startstufe finden →', trustTitle: 'Warum Arbeitgeber The Ladder vertrauen', signupEyebrow: 'Trainieren. Zertifizieren. Sichtbar werden.', signup: 'Registrieren', signinToggle: 'Schon ein Konto? Anmelden', signin: 'Anmelden', signout: 'Abmelden' },
    profile: { eyebrow: 'Dein Nachweis', title: 'Profil', learnerId: 'Lernenden-ID', certsEarned: 'Erworbene Zertifizierungen', tiersCompleted: 'Stufen abgeschlossen', tiersPlacedOut: 'Stufen übersprungen', viewRecord: 'Zertifizierungsnachweis ansehen', openCourses: 'Offene Kurse', resume: 'Fortsetzen' },
    assessment: { eyebrow: 'Startstufe finden', title: 'Einstufung', panel: 'Einstufungstest', notPlaced: 'Noch nicht eingestuft', conversation: 'Einstufungsgespräch', start: 'Einstufung starten', reset: 'Zurücksetzen', send: 'Senden', complete: 'Einstufung abgeschlossen', continueTraining: 'Zum Training' },
    training: { eyebrow: 'Stufe für Stufe steigen', title: 'Training', concepts: 'KI-Konzepte', products: 'Produkte', useCases: 'Anwendungsfälle', chooseTier: 'Stufe wählen', startConversation: 'Gespräch starten', reset: 'Zurücksetzen', send: 'Senden', textSize: 'Textgröße', runEval: 'Ausgewählte Bewertungen ausführen', promptInstruction: 'Alle an Lernende gerichteten Trainingsantworten müssen auf {language} sein.' },
    certification: { eyebrow: 'Beweise es', title: 'Zertifizierung', start: 'Zertifizierung starten', record: 'Zertifizierungsnachweis', examTitle: 'Zertifizierungsprüfung', inProgress: 'Prüfung läuft', finalize: 'Meine Entscheidung finalisieren', end: 'Prüfung beenden', send: 'Senden', promptInstruction: 'Die gesamte an Lernende gerichtete Prüfungssprache muss auf {language} sein.' },
    support: { label: 'Support und Feedback', title: 'Wie können wir helfen?', topic: 'Thema', send: 'Senden', placement: 'Einstufung', training: 'Training', certification: 'Zertifizierung', support: 'Support', profile: 'Profil' }
  },
  ar: {
    nav: { profile: 'الملف', assessment: 'التقييم', training: 'التدريب', certification: 'الشهادة', support: 'الدعم' },
    marketing: { eyebrow: 'إلى أي ارتفاع يمكنك الصعود؟', cascade: ['كل مفهوم ذكاء اصطناعي', 'كل منتج ذكاء اصطناعي', 'كل حالة استخدام', 'مدرّب ومعتمد'], cta: 'اعثر على درجتك الأولى ←', trustTitle: 'لماذا يثق أصحاب العمل بالسلم', signupEyebrow: 'تدرّب. احصل على شهادة. كن مرئياً.', signup: 'إنشاء حساب', signinToggle: 'لديك حساب؟ سجّل الدخول', signin: 'تسجيل الدخول', signout: 'تسجيل الخروج' },
    profile: { eyebrow: 'سجلك', title: 'الملف', learnerId: 'معرّف المتعلم', certsEarned: 'الشهادات المكتسبة', tiersCompleted: 'مستويات مكتملة', tiersPlacedOut: 'مستويات متجاوزة', viewRecord: 'عرض سجل الشهادة', openCourses: 'الدورات المفتوحة', resume: 'استئناف' },
    assessment: { eyebrow: 'اعثر على درجتك الأولى', title: 'التقييم', panel: 'تقييم تحديد المستوى', notPlaced: 'لم يتم التحديد بعد', conversation: 'محادثة التقييم', start: 'ابدأ التقييم', reset: 'إعادة ضبط', send: 'إرسال', complete: 'اكتمل التحديد', continueTraining: 'المتابعة إلى التدريب' },
    training: { eyebrow: 'اصعد درجة بعد درجة', title: 'التدريب', concepts: 'مفاهيم الذكاء الاصطناعي', products: 'المنتجات', useCases: 'حالات الاستخدام', chooseTier: 'اختر مستوى', startConversation: 'ابدأ المحادثة', reset: 'إعادة ضبط', send: 'إرسال', textSize: 'حجم النص', runEval: 'تشغيل التقييمات المحددة', promptInstruction: 'يجب أن تكون كل ردود التدريب الموجهة للمتعلم باللغة {language}.' },
    certification: { eyebrow: 'أثبت ذلك', title: 'الشهادة', start: 'ابدأ الشهادة', record: 'سجل الشهادة', examTitle: 'امتحان الشهادة', inProgress: 'الامتحان جارٍ', finalize: 'إنهاء قراري', end: 'إنهاء الامتحان', send: 'إرسال', promptInstruction: 'يجب أن تكون كل لغة امتحان الشهادة الموجهة للمتعلم باللغة {language}.' },
    support: { label: 'الدعم والملاحظات', title: 'كيف يمكننا المساعدة؟', topic: 'الموضوع', send: 'إرسال', placement: 'تحديد المستوى', training: 'التدريب', certification: 'الشهادة', support: 'الدعم', profile: 'الملف' }
  },
  hi: {
    nav: { profile: 'प्रोफ़ाइल', assessment: 'आकलन', training: 'प्रशिक्षण', certification: 'प्रमाणन', support: 'सहायता' },
    marketing: { eyebrow: 'आप कितनी ऊँचाई तक चढ़ सकते हैं?', cascade: ['हर AI अवधारणा', 'हर AI उत्पाद', 'हर AI उपयोग मामला', 'प्रशिक्षित और प्रमाणित'], cta: 'अपनी शुरुआती सीढ़ी खोजें →', signup: 'साइन अप', signin: 'साइन इन', signout: 'साइन आउट' },
    profile: { title: 'प्रोफ़ाइल', learnerId: 'शिक्षार्थी ID', certsEarned: 'प्राप्त प्रमाणन', viewRecord: 'प्रमाणन रिकॉर्ड देखें', openCourses: 'खुले पाठ्यक्रम', resume: 'फिर शुरू करें' },
    assessment: { title: 'आकलन', notPlaced: 'अभी स्थानित नहीं', start: 'आकलन शुरू करें', reset: 'रीसेट', send: 'भेजें', continueTraining: 'प्रशिक्षण जारी रखें' },
    training: { title: 'प्रशिक्षण', concepts: 'AI अवधारणाएँ', products: 'उत्पाद', useCases: 'उपयोग मामले', chooseTier: 'स्तर चुनें', startConversation: 'बातचीत शुरू करें', reset: 'रीसेट', send: 'भेजें', textSize: 'टेक्स्ट आकार', runEval: 'चयनित मूल्यांकन चलाएँ', promptInstruction: 'शिक्षार्थी के लिए सभी प्रशिक्षण उत्तर {language} में होने चाहिए.' },
    certification: { title: 'प्रमाणन', start: 'प्रमाणन शुरू करें', record: 'प्रमाणन रिकॉर्ड', examTitle: 'प्रमाणन परीक्षा', inProgress: 'परीक्षा जारी है', finalize: 'मेरा निर्णय अंतिम करें', end: 'परीक्षा समाप्त करें', send: 'भेजें', promptInstruction: 'शिक्षार्थी के लिए प्रमाणन परीक्षा की सारी भाषा {language} में होनी चाहिए.' },
    support: { label: 'सहायता और प्रतिक्रिया', title: 'हम कैसे मदद करें?', send: 'भेजें', training: 'प्रशिक्षण', certification: 'प्रमाणन', support: 'सहायता', profile: 'प्रोफ़ाइल' }
  },
  ja: {
    nav: { profile: 'プロフィール', assessment: '評価', training: 'トレーニング', certification: '認定', support: 'サポート' },
    marketing: { eyebrow: 'どこまで登れますか？', cascade: ['すべてのAI概念', 'すべてのAI製品', 'すべてのAI活用例', '訓練済み・認定済み'], cta: '開始する段を見つける →', signup: '登録', signin: 'サインイン', signout: 'サインアウト' },
    profile: { title: 'プロフィール', learnerId: '学習者ID', certsEarned: '取得した認定', viewRecord: '認定記録を見る', openCourses: '進行中のコース', resume: '再開' },
    assessment: { title: '評価', notPlaced: '未配置', start: '評価を開始', reset: 'リセット', send: '送信', continueTraining: 'トレーニングへ進む' },
    training: { title: 'トレーニング', concepts: 'AI概念', products: '製品', useCases: '活用例', chooseTier: '階層を選ぶ', startConversation: '会話を開始', reset: 'リセット', send: '送信', textSize: '文字サイズ', runEval: '選択した評価を実行', promptInstruction: '学習者向けのトレーニング応答はすべて{language}で行ってください。' },
    certification: { title: '認定', start: '認定を開始', record: '認定記録', examTitle: '認定試験', inProgress: '試験中', finalize: '判定を確定する', end: '試験を終了', send: '送信', promptInstruction: '学習者向けの認定試験の言語はすべて{language}で行ってください。' },
    support: { label: 'サポートとフィードバック', title: 'どのようにお手伝いできますか？', send: '送信', training: 'トレーニング', certification: '認定', support: 'サポート', profile: 'プロフィール' }
  },
  ko: {
    nav: { profile: '프로필', assessment: '평가', training: '훈련', certification: '인증', support: '지원' },
    marketing: { eyebrow: '얼마나 높이 올라갈 수 있나요?', cascade: ['모든 AI 개념', '모든 AI 제품', '모든 AI 활용 사례', '훈련 및 인증 완료'], cta: '시작 단계 찾기 →', signup: '가입하기', signin: '로그인', signout: '로그아웃' },
    profile: { title: '프로필', learnerId: '학습자 ID', certsEarned: '획득한 인증', viewRecord: '인증 기록 보기', openCourses: '열린 과정', resume: '이어하기' },
    assessment: { title: '평가', notPlaced: '아직 배치되지 않음', start: '평가 시작', reset: '초기화', send: '보내기', continueTraining: '훈련 계속' },
    training: { title: '훈련', concepts: 'AI 개념', products: '제품', useCases: '활용 사례', chooseTier: '단계 선택', startConversation: '대화 시작', reset: '초기화', send: '보내기', textSize: '글자 크기', runEval: '선택한 평가 실행', promptInstruction: '학습자에게 보이는 모든 훈련 응답은 {language}로 작성하세요.' },
    certification: { title: '인증', start: '인증 시작', record: '인증 기록', examTitle: '인증 시험', inProgress: '시험 진행 중', finalize: '판정 확정', end: '시험 종료', send: '보내기', promptInstruction: '학습자에게 보이는 모든 인증 시험 언어는 {language}로 작성하세요.' },
    support: { label: '지원 및 피드백', title: '무엇을 도와드릴까요?', send: '보내기', training: '훈련', certification: '인증', support: '지원', profile: '프로필' }
  },
  pt: {
    nav: { profile: 'Perfil', assessment: 'Avaliação', training: 'Treinamento', certification: 'Certificação', support: 'Suporte' },
    marketing: { eyebrow: 'Até onde você consegue subir?', cascade: ['Todo conceito de IA', 'Todo produto de IA', 'Todo caso de uso de IA', 'Treinado e certificado'], cta: 'Encontre seu degrau inicial →', signup: 'Cadastrar', signin: 'Entrar', signout: 'Sair' },
    profile: { title: 'Perfil', learnerId: 'ID do aluno', certsEarned: 'Certificações obtidas', viewRecord: 'Ver registro de certificação', openCourses: 'Cursos abertos', resume: 'Retomar' },
    assessment: { title: 'Avaliação', notPlaced: 'Ainda não posicionado', start: 'Iniciar avaliação', reset: 'Redefinir', send: 'Enviar', continueTraining: 'Continuar para treinamento' },
    training: { title: 'Treinamento', concepts: 'Conceitos de IA', products: 'Produtos', useCases: 'Casos de uso', chooseTier: 'Escolher nível', startConversation: 'Iniciar conversa', reset: 'Redefinir', send: 'Enviar', textSize: 'Tamanho do texto', runEval: 'Executar avaliações selecionadas', promptInstruction: 'Todas as respostas de treinamento voltadas ao aluno devem estar em {language}.' },
    certification: { title: 'Certificação', start: 'Iniciar certificação', record: 'Registro de certificação', examTitle: 'Exame de certificação', inProgress: 'Exame em andamento', finalize: 'Finalizar minha determinação', end: 'Encerrar exame', send: 'Enviar', promptInstruction: 'Toda a linguagem do exame de certificação voltada ao aluno deve estar em {language}.' },
    support: { label: 'Suporte e feedback', title: 'Como podemos ajudar?', send: 'Enviar', training: 'Treinamento', certification: 'Certificação', support: 'Suporte', profile: 'Perfil' }
  },
  'zh-TW': {
    nav: { profile: '個人檔案', assessment: '評量', training: '訓練', certification: '認證', support: '支援' },
    marketing: { eyebrow: '你能爬多高？', cascade: ['每個 AI 概念', '每個 AI 產品', '每個 AI 使用案例', '完成訓練與認證'], cta: '找到你的起始階梯 →', signup: '註冊', signin: '登入', signout: '登出' },
    profile: { title: '個人檔案', learnerId: '學習者 ID', certsEarned: '已取得認證', viewRecord: '查看認證紀錄', openCourses: '進行中的課程', resume: '繼續' },
    assessment: { title: '評量', notPlaced: '尚未定位', start: '開始評量', reset: '重設', send: '送出', continueTraining: '繼續訓練' },
    training: { title: '訓練', concepts: 'AI 概念', products: '產品', useCases: '使用案例', chooseTier: '選擇層級', startConversation: '開始對話', reset: '重設', send: '送出', textSize: '文字大小', runEval: '執行所選評估', promptInstruction: '所有面向學習者的訓練回覆都必須使用{language}。' },
    certification: { title: '認證', start: '開始認證', record: '認證紀錄', examTitle: '認證考試', inProgress: '考試進行中', finalize: '完成我的判定', end: '結束考試', send: '送出', promptInstruction: '所有面向學習者的認證考試語言都必須使用{language}。' },
    support: { label: '支援與回饋', title: '我們可以如何協助？', send: '送出', training: '訓練', certification: '認證', support: '支援', profile: '個人檔案' }
  }
};

const completionOverrides = {
  fr: {
    marketing: {
      trust: ['Chaque credential est examiné par deux modèles indépendants.', 'Votre examen est une vraie conversation, pas seulement une banque de questions.', 'Votre examen est mesuré avec des preuves auditables reliées à des standards comme O*NET, le Forum économique mondial, le NIST AI RMF et la loi européenne sur l’IA.', 'Vos résultats peuvent être téléchargés et utilisés comme référence d’entretien par une équipe de recrutement.'],
      broughtBy: 'Présenté par Aesop AI Academy',
      emailPlaceholder: 'Saisissez votre e-mail',
      email: 'E-mail',
      password: 'Mot de passe',
      signedInAs: 'Connecté en tant que'
    },
    training: { gateTitle: 'Créez un compte gratuit pour enregistrer vos échelons', gateCopy: 'Les conversations de formation et votre progression sont enregistrées dans votre dossier lorsque vous êtes connecté.', signInBelow: 'Se connecter ci-dessous', lead: 'Choisissez un parcours, sélectionnez un échelon et apprenez grâce à une conversation guidée.', chatPlaceholder: 'Répondez au guide ou demandez le prochain défi ici', evalOptions: 'Options d’évaluation des standards', evalCopy: 'Compare la transcription actuelle aux standards sélectionnés et enregistre les preuves pour cet échelon.', pickRungToBegin: 'Choisissez un échelon dans la liste pour commencer.', learnSummary: 'Apprenez "{item}" grâce à une conversation guidée.', descriptionFallback: 'Choisissez un échelon pour voir ce que couvrira la conversation.' },
    certification: { lead: 'Choisissez l’échelon à certifier, puis commencez un examen oral adaptatif. Un second modèle indépendant doit confirmer le résultat avant l’enregistrement d’un credential.', navLabel: 'Navigation des échelons de certification', selection: 'Sélection de l’échelon de certification', pickRungExam: 'Choisissez un échelon pour voir ce que couvrira l’examen.', certifyThisRung: 'Certifier cet échelon', target: 'Choisissez un échelon, puis définissez le niveau ou le rôle professionnel pour l’examen.', level: 'Niveau apprenant / rôle professionnel', masteryLevel: 'Niveau de maîtrise', identity: 'Assurance d’identité', proctoring: 'Niveau de surveillance', identityAttest: 'Je confirme être la personne qui passe cette tentative et que tout credential représentera mon propre travail.', account: 'Compte', accountMsg: 'Les niveaux adultes et la certification avec identité exigent un compte vérifié.', adultAttest: 'Je confirme avoir 18 ans ou plus.', signIn: 'Se connecter', createAccount: 'Créer un compte', signOut: 'Se déconnecter', confirmAdult: 'Confirmer l’accès adulte', examSummary: 'Démarrez la certification pour commencer la conversation examinée.', finalizeCopy: 'Demandez à l’examinateur d’arrêter les questions et de rendre la détermination.', endCopy: 'Arrêtez cette tentative et revenez à la configuration sans enregistrer de credential.', placeholder: 'Répondez à l’examinateur', willExamine: 'La certification examinera cet échelon : {description}' },
    support: { options: ['Demande d’assistance', 'Retour produit', 'Correction de contenu', 'Signaler un problème'], email: 'E-mail (facultatif)', message: 'Message', messagePlaceholder: 'Dites-nous ce qui se passe...', sent: 'Merci — votre message a été enregistré.', footerCopy: 'Une échelle d’apprentissage IA avec placement, formation, certification et transcript vérifiable.', linksTitle: 'The Ladder AI', academy: 'Académie' }
  },
  de: {
    marketing: { trust: ['Jeder Nachweis wird von zwei unabhängigen Modellen geprüft.', 'Deine Prüfung ist ein echtes Gespräch, keine reine Fragenbank.', 'Deine Prüfung wird an prüfbaren Nachweisen gemessen, die auf Standards wie O*NET, WEF, NIST AI RMF und EU AI Act abgebildet sind.', 'Deine Ergebnisse können heruntergeladen und von Recruiting-Teams als Interviewreferenz genutzt werden.'], broughtBy: 'Präsentiert von Aesop AI Academy', emailPlaceholder: 'E-Mail eingeben', email: 'E-Mail', password: 'Passwort', signedInAs: 'Angemeldet als' },
    profile: { lead: 'Alles, was du erreicht hast und wo du aufgehört hast, plus ein direkter Weg zum Support.', noOpenCourses: 'Noch keine offenen Kurse — wähle im Training eine Stufe, um ein geführtes Gespräch zu beginnen.' },
    training: { gateLabel: 'Zum Training anmelden', gateTitle: 'Kostenloses Konto erstellen, um Stufen zu speichern', gateCopy: 'Trainingsgespräche und Fortschritt werden in deinem Lernendenprofil gespeichert, sobald du angemeldet bist.', signInBelow: 'Unten anmelden', lead: 'Wähle einen Schwerpunkt, eine Stufe und lerne in einem geführten Gespräch.', loadingRungs: 'Stufen werden geladen...', navLabel: 'Trainingsnavigation', tierSelection: 'Auswahl der Trainingsstufe', chatPlaceholder: 'Antworte dem Guide oder frage hier nach der nächsten Herausforderung', evalOptions: 'Optionen für Standardbewertungen', eduEval: 'Bewertung von Bildungsstandards', employEval: 'Bewertung von Arbeitsstandards', evalCopy: 'Prüft das aktuelle Trainingstranskript gegen die ausgewählten Standards und speichert Nachweise für die Stufe.', pickRungToBegin: 'Wähle eine Stufe aus der Liste, um zu beginnen.', learnSummary: 'Lerne "{item}" in einem geführten Gespräch.', descriptionFallback: 'Wähle eine Stufe, um zu sehen, was das Gespräch behandelt.' },
    certification: { lead: 'Wähle die Stufe, die du zertifizieren möchtest, und starte dann eine adaptive mündliche Prüfung. Ein unabhängiges zweites Modell muss das Ergebnis bestätigen, bevor ein Nachweis gespeichert wird.', navLabel: 'Navigation der Zertifizierungsstufen', selection: 'Auswahl der Zertifizierungsstufe', pickRungExam: 'Wähle eine Stufe, um zu sehen, was die Prüfung behandelt.', certifyThisRung: 'Diese Stufe zertifizieren', target: 'Wähle eine Stufe und dann Lernniveau oder Berufsrolle für die Prüfung.', level: 'Lernniveau / Berufsrolle', masteryLevel: 'Kompetenzniveau', identity: 'Identitätssicherung', proctoring: 'Aufsichtsniveau', identityAttest: 'Ich bestätige, dass ich diese Prüfung selbst ablege und der Nachweis meine eigene Arbeit darstellt.', account: 'Konto', accountMsg: 'Erwachsenenstufen und identitätsgesicherte Zertifizierung benötigen ein verifiziertes Konto.', adultAttest: 'Ich bestätige, dass ich mindestens 18 Jahre alt bin.', signIn: 'Anmelden', createAccount: 'Konto erstellen', signOut: 'Abmelden', confirmAdult: 'Erwachsenenzugang bestätigen', examSummary: 'Starte die Zertifizierung, um das Prüfungsgespräch zu beginnen.', finalizeCopy: 'Bitte den Prüfer, die Fragen zu beenden und die Zertifizierungsentscheidung zu treffen.', endCopy: 'Diese Prüfung beenden und zur Einrichtung zurückkehren, ohne einen Nachweis zu speichern.', placeholder: 'Dem Prüfer antworten', willExamine: 'Die Zertifizierung prüft diese Stufe: {description}' },
    support: { options: ['Supportanfrage', 'Produktfeedback', 'Inhaltskorrektur', 'Problem melden'], email: 'E-Mail (optional)', message: 'Nachricht', messagePlaceholder: 'Sag uns, was los ist...', sent: 'Danke — deine Nachricht wurde gespeichert.', footerCopy: 'Eine KI-Lernleiter mit Einstufung, Training, Zertifizierung und überprüfbarem Transcript.', linksTitle: 'The Ladder AI', academy: 'Akademie', record: 'Zertifizierungsnachweis' }
  },
  ar: {
    marketing: { trust: ['تُفحص كل شهادة بواسطة نموذجين مستقلين.', 'امتحانك محادثة حقيقية وليس بنك أسئلة فقط.', 'تُقاس نتيجتك بأدلة قابلة للتدقيق مرتبطة بمعايير مثل O*NET والمنتدى الاقتصادي العالمي وNIST AI RMF وقانون الذكاء الاصطناعي الأوروبي.', 'يمكن تنزيل النتائج واستخدامها كمرجع مقابلة من قبل فرق التوظيف.'], broughtBy: 'مقدم من Aesop AI Academy', emailPlaceholder: 'أدخل بريدك الإلكتروني', email: 'البريد الإلكتروني', password: 'كلمة المرور', signedInAs: 'تم تسجيل الدخول باسم' },
    profile: { lead: 'كل ما أنجزته والمكان الذي توقفت عنده، مع طريق مباشر إلى الدعم.', noOpenCourses: 'لا توجد دورات مفتوحة بعد — اختر درجة في التدريب لبدء محادثة موجهة.' },
    training: { gateLabel: 'سجّل الدخول للتدريب', gateTitle: 'أنشئ حسابًا مجانيًا لحفظ درجاتك', gateCopy: 'تُحفظ محادثات التدريب والتقدم في سجلك عند تسجيل الدخول.', signInBelow: 'تسجيل الدخول أدناه', lead: 'اختر تركيزًا ودرجة وتعلّم عبر محادثة موجهة.', loadingRungs: 'جارٍ تحميل الدرجات...', navLabel: 'تنقل التدريب', tierSelection: 'اختيار مستوى التدريب', chatPlaceholder: 'أجب على الدليل أو اطلب التحدي التالي هنا', evalOptions: 'خيارات تقييم المعايير', eduEval: 'تقييم المعايير التعليمية', employEval: 'تقييم معايير العمل', evalCopy: 'يفحص نص التدريب الحالي مقابل المعايير المحددة ويحفظ أدلة الدرجة.', pickRungToBegin: 'اختر درجة من القائمة للبدء.', learnSummary: 'تعلّم "{item}" عبر محادثة موجهة.', descriptionFallback: 'اختر درجة لترى ما ستغطيه المحادثة.' },
    certification: { lead: 'اختر الدرجة التي تريد اعتمادها ثم ابدأ امتحانًا شفهيًا تكيفيًا. يجب أن يؤكد نموذج مستقل ثانٍ النتيجة قبل تسجيل أي شهادة.', navLabel: 'تنقل درجات الشهادة', selection: 'اختيار درجة الشهادة', pickRungExam: 'اختر درجة لترى ما سيغطيه الامتحان.', certifyThisRung: 'اعتماد هذه الدرجة', target: 'اختر درجة ثم حدد مستوى المتعلم أو الدور المهني للامتحان.', level: 'مستوى المتعلم / الدور المهني', masteryLevel: 'مستوى الإتقان', identity: 'تأكيد الهوية', proctoring: 'مستوى المراقبة', identityAttest: 'أؤكد أنني الشخص الذي يجري هذه المحاولة وأن أي شهادة تمثل عملي الخاص.', account: 'الحساب', accountMsg: 'تتطلب مستويات البالغين والشهادات المؤكدة الهوية حسابًا موثقًا.', adultAttest: 'أؤكد أن عمري 18 عامًا أو أكثر.', signIn: 'تسجيل الدخول', createAccount: 'إنشاء حساب', signOut: 'تسجيل الخروج', confirmAdult: 'تأكيد وصول البالغين', examSummary: 'ابدأ الشهادة لبدء محادثة الامتحان.', finalizeCopy: 'اطلب من الممتحن إيقاف الأسئلة وإصدار القرار.', endCopy: 'أوقف هذه المحاولة والعودة إلى الإعداد دون تسجيل شهادة.', placeholder: 'أجب على الممتحن', willExamine: 'ستفحص الشهادة هذه الدرجة: {description}' },
    support: { options: ['طلب دعم', 'ملاحظات المنتج', 'تصحيح المحتوى', 'الإبلاغ عن مشكلة'], email: 'البريد الإلكتروني (اختياري)', message: 'الرسالة', messagePlaceholder: 'أخبرنا بما يحدث...', sent: 'شكرًا — تم تسجيل رسالتك.', footerCopy: 'سلم تعلم ذكاء اصطناعي مع تحديد مستوى وتدريب وشهادة وسجل قابل للتحقق.', linksTitle: 'The Ladder AI', academy: 'الأكاديمية', record: 'سجل الشهادة' }
  },
  hi: {
    marketing: { trustTitle: 'नियोक्ता The Ladder पर क्यों भरोसा करते हैं', trust: ['हर प्रमाण-पत्र दो स्वतंत्र मॉडलों द्वारा जाँचा जाता है.', 'आपकी परीक्षा एक वास्तविक बातचीत है, सिर्फ प्रश्न बैंक नहीं.', 'आपकी परीक्षा O*NET, WEF, NIST AI RMF और EU AI Act जैसे मानकों से जुड़े ऑडिट-योग्य प्रमाण से मापी जाती है.', 'आपके परिणाम डाउनलोड होकर भर्ती टीमों के लिए साक्षात्कार संदर्भ बन सकते हैं.'], broughtBy: 'Aesop AI Academy द्वारा प्रस्तुत', signupEyebrow: 'प्रशिक्षित हों. प्रमाणित हों. पहचाने जाएँ.', emailPlaceholder: 'अपना ई-मेल दर्ज करें', email: 'ई-मेल', password: 'पासवर्ड', signinToggle: 'पहले से खाता है? साइन इन करें', signedInAs: 'साइन इन किया हुआ' },
    profile: { eyebrow: 'आपका रिकॉर्ड', lead: 'आपने जो अर्जित किया है और जहाँ छोड़ा है — साथ में सहायता तक सीधी पहुँच.', tiersCompleted: 'स्तर पूर्ण', tiersPlacedOut: 'स्तर से छूट', core: 'कोर', expert: 'विशेषज्ञ', mastery: 'मास्टरी', noOpenCourses: 'अभी कोई खुला पाठ्यक्रम नहीं — प्रशिक्षण में कोई सीढ़ी चुनकर निर्देशित बातचीत शुरू करें.' },
    assessment: { eyebrow: 'अपनी शुरुआती सीढ़ी खोजें', lead: 'एक छोटी बातचीत आपको प्रशिक्षण सीढ़ी पर सही जगह रखती है और आपके लक्ष्यों के अनुसार सीढ़ियाँ सौंपती है.', panel: 'प्लेसमेंट आकलन', summary: 'स्तरों से छूट पाने और क्षमता व रुचि के आधार पर सीढ़ियाँ पाने के लिए आकलन शुरू करें.', conversation: 'आकलन बातचीत', responses: 'उत्तर', placeholder: 'प्लेसमेंट गाइड का उत्तर दें', complete: 'प्लेसमेंट पूर्ण', completeCopy: 'आपकी छूट और सौंपे गए रंग सहेजे गए हैं.' },
    training: { gateLabel: 'प्रशिक्षण के लिए साइन इन करें', gateTitle: 'अपनी सीढ़ियाँ बचाने के लिए निःशुल्क खाता बनाएँ', gateCopy: 'साइन इन करने पर प्रशिक्षण बातचीत और प्रगति आपके रिकॉर्ड में सहेजी जाती है.', signInBelow: 'नीचे साइन इन करें', lead: 'फोकस चुनें, सीढ़ी चुनें, और निर्देशित बातचीत से सीखें.', loadingRungs: 'सीढ़ियाँ लोड हो रही हैं...', navLabel: 'प्रशिक्षण नेविगेशन', tierSelection: 'प्रशिक्षण स्तर चयन', chatPlaceholder: 'गाइड का उत्तर दें या अगली चुनौती यहाँ पूछें', evalOptions: 'मानक मूल्यांकन विकल्प', eduEval: 'शैक्षिक मानक मूल्यांकन', employEval: 'कार्यबल मानक मूल्यांकन', evalCopy: 'वर्तमान प्रशिक्षण प्रतिलेख को चयनित मानकों से जाँचता है और प्रमाण सहेजता है.', pickRungToBegin: 'शुरू करने के लिए सूची से एक सीढ़ी चुनें.', learnSummary: '"{item}" को निर्देशित बातचीत से सीखें.', descriptionFallback: 'चुनें कि बातचीत क्या कवर करेगी.' },
    certification: { lead: 'जिस सीढ़ी को प्रमाणित करना है उसे चुनें, फिर अनुकूल मौखिक परीक्षा शुरू करें. कोई भी प्रमाण-पत्र दर्ज होने से पहले स्वतंत्र दूसरा मॉडल परिणाम की पुष्टि करता है.', navLabel: 'प्रमाणन सीढ़ी नेविगेशन', selection: 'प्रमाणन सीढ़ी चयन', pickRungExam: 'परीक्षा क्या कवर करेगी देखने के लिए सीढ़ी चुनें.', certifyThisRung: 'इस सीढ़ी को प्रमाणित करें', target: 'सीढ़ी चुनें, फिर परीक्षा के लिए स्तर या पेशेवर भूमिका सेट करें.', level: 'शिक्षार्थी स्तर / पेशेवर भूमिका', masteryLevel: 'मास्टरी स्तर', identity: 'पहचान आश्वासन', proctoring: 'निगरानी स्तर', identityAttest: 'मैं पुष्टि करता/करती हूँ कि यह मेरा अपना कार्य है.', account: 'खाता', accountMsg: 'वयस्क स्तरों और पहचान-सुनिश्चित प्रमाणन के लिए सत्यापित खाता आवश्यक है.', adultAttest: 'मैं पुष्टि करता/करती हूँ कि मेरी आयु 18 या अधिक है.', signIn: 'साइन इन', createAccount: 'खाता बनाएँ', signOut: 'साइन आउट', confirmAdult: 'वयस्क पहुँच पुष्टि करें', examSummary: 'परीक्षित बातचीत शुरू करने के लिए प्रमाणन शुरू करें.', finalizeCopy: 'परीक्षक से प्रश्न रोककर निर्णय देने को कहें.', endCopy: 'बिना प्रमाण-पत्र दर्ज किए इस प्रयास को रोकें.', placeholder: 'परीक्षक को उत्तर दें', willExamine: 'प्रमाणन इस सीढ़ी की जाँच करेगा: {description}' },
    support: { options: ['सहायता अनुरोध', 'उत्पाद प्रतिक्रिया', 'सामग्री सुधार', 'समस्या रिपोर्ट करें'], email: 'ई-मेल (वैकल्पिक)', message: 'संदेश', messagePlaceholder: 'हमें बताएं क्या हो रहा है...', sent: 'धन्यवाद — आपका संदेश दर्ज हो गया.', footerCopy: 'प्लेसमेंट, प्रशिक्षण, प्रमाणन और सत्यापन योग्य प्रतिलेख वाली AI सीखने की सीढ़ी.', linksTitle: 'The Ladder AI', academy: 'अकादमी', placement: 'प्लेसमेंट', record: 'प्रमाणन रिकॉर्ड' }
  },
  ja: {
    marketing: { trustTitle: '雇用主が The Ladder を信頼する理由', trust: ['すべての資格は2つの独立したモデルで審査されます。', '試験は質問集ではなく、実際の会話です。', '試験は O*NET、WEF、NIST AI RMF、EU AI Act などに対応した監査可能な証拠で評価されます。', '結果はダウンロードでき、採用チームの面接参考資料として使えます。'], broughtBy: 'Aesop AI Academy 提供', signupEyebrow: '学び、認定され、見つけてもらう。', emailPlaceholder: 'メールアドレスを入力', email: 'メール', password: 'パスワード', signinToggle: 'アカウントをお持ちですか？サインイン', signedInAs: 'サインイン中' },
    profile: { eyebrow: 'あなたの記録', lead: '取得したものと中断地点、そしてサポートへの連絡先をまとめて表示します。', tiersCompleted: '完了した階層', tiersPlacedOut: '免除された階層', core: 'コア', expert: 'エキスパート', mastery: 'マスタリー', noOpenCourses: '進行中のコースはまだありません。トレーニングで段を選んで始めてください。' },
    assessment: { eyebrow: '開始段を見つける', lead: '短い会話で、既に知っている部分を免除し、目標に合う段を割り当てます。', panel: '配置評価', summary: '評価を開始して階層を免除し、能力と関心に合う段を受け取ります。', conversation: '評価会話', responses: '件の応答', placeholder: '配置ガイドに回答', complete: '配置完了', completeCopy: '免除階層と割り当て段が保存されました。' },
    training: { gateLabel: 'トレーニングするにはサインイン', gateTitle: '無料アカウントで段を保存', gateCopy: 'サインインすると会話と進捗が学習記録に保存されます。', signInBelow: '下でサインイン', lead: '焦点を選び、段を選択し、ガイド付き会話で学びます。', loadingRungs: '段を読み込み中...', navLabel: 'トレーニングナビゲーション', tierSelection: 'トレーニング階層選択', chatPlaceholder: 'ここでガイドに答えるか次の課題を尋ねる', evalOptions: '標準評価オプション', eduEval: '教育標準評価', employEval: '労働標準評価', evalCopy: '現在の会話を選択した標準と照合し、証拠を保存します。', pickRungToBegin: 'リストから段を選んで開始します。', learnSummary: '「{item}」をガイド付き会話で学びます。', descriptionFallback: '会話内容を見るには段を選んでください。' },
    certification: { lead: '認定したい段を選び、適応型の口頭試験を開始します。記録前に独立した2つ目のモデルが結果を確認します。', navLabel: '認定段ナビゲーション', selection: '認定段選択', pickRungExam: '試験内容を見るには段を選んでください。', certifyThisRung: 'この段を認定', target: '段を選び、試験の学習者レベルまたは職務ロールを設定します。', level: '学習者レベル / 職務ロール', masteryLevel: '習熟レベル', identity: '本人確認', proctoring: '監督レベル', identityAttest: 'この試行は本人の作業であることを確認します。', account: 'アカウント', accountMsg: '成人向け階層と本人確認付き認定には確認済みアカウントが必要です。', adultAttest: '18歳以上であることを確認します。', signIn: 'サインイン', createAccount: 'アカウント作成', signOut: 'サインアウト', confirmAdult: '成人アクセスを確認', examSummary: '認定を開始して試験会話を始めます。', finalizeCopy: '試験官に質問を止めて判定を出すよう依頼します。', endCopy: '資格を記録せずにこの試行を終了します。', placeholder: '試験官に回答', willExamine: '認定ではこの段を確認します: {description}' },
    support: { options: ['サポート依頼', '製品フィードバック', '内容修正', '問題を報告'], email: 'メール（任意）', message: 'メッセージ', messagePlaceholder: '状況を教えてください...', sent: 'ありがとうございます。メッセージを記録しました。', footerCopy: '配置、トレーニング、認定、検証可能な記録を備えたAI学習ラダー。', linksTitle: 'The Ladder AI', academy: 'アカデミー', placement: '配置', record: '認定記録' }
  },
  ko: {
    marketing: { trustTitle: '고용주가 The Ladder를 신뢰하는 이유', trust: ['모든 자격은 두 개의 독립 모델이 검토합니다.', '시험은 단순 문제은행이 아니라 실제 대화입니다.', '시험은 O*NET, WEF, NIST AI RMF, EU AI Act 같은 표준에 매핑된 감사 가능한 증거로 평가됩니다.', '결과는 다운로드해 채용팀의 면접 참고자료로 사용할 수 있습니다.'], broughtBy: 'Aesop AI Academy 제공', signupEyebrow: '훈련받고, 인증받고, 주목받으세요.', emailPlaceholder: '이메일 입력', email: '이메일', password: '비밀번호', signinToggle: '이미 계정이 있나요? 로그인', signedInAs: '로그인 계정' },
    profile: { eyebrow: '내 기록', lead: '획득한 내용과 이어서 할 위치, 지원 연결을 한곳에 표시합니다.', tiersCompleted: '완료한 단계', tiersPlacedOut: '면제된 단계', core: '코어', expert: '전문가', mastery: '마스터리', noOpenCourses: '아직 열린 과정이 없습니다. 훈련에서 단계를 선택해 시작하세요.' },
    assessment: { eyebrow: '시작 단계 찾기', lead: '짧은 대화로 이미 아는 내용은 면제하고 목표에 맞는 단계를 배정합니다.', panel: '배치 평가', summary: '평가를 시작해 단계를 면제받고 역량과 관심에 맞는 단계를 받으세요.', conversation: '평가 대화', responses: '개의 응답', placeholder: '배치 가이드에 답변', complete: '배치 완료', completeCopy: '면제 단계와 배정 단계가 저장되었습니다.' },
    training: { gateLabel: '훈련하려면 로그인', gateTitle: '무료 계정으로 단계를 저장하세요', gateCopy: '로그인하면 훈련 대화와 진행 상황이 학습자 기록에 저장됩니다.', signInBelow: '아래에서 로그인', lead: '초점을 선택하고 단계를 고른 뒤 안내 대화로 학습하세요.', loadingRungs: '단계 불러오는 중...', navLabel: '훈련 탐색', tierSelection: '훈련 단계 선택', chatPlaceholder: '여기서 가이드에 답하거나 다음 도전을 요청하세요', evalOptions: '표준 평가 옵션', eduEval: '교육 표준 평가', employEval: '고용 표준 평가', evalCopy: '현재 훈련 기록을 선택한 표준과 비교하고 증거를 저장합니다.', pickRungToBegin: '목록에서 단계를 선택해 시작하세요.', learnSummary: '"{item}"을 안내 대화로 학습합니다.', descriptionFallback: '대화에서 다룰 내용을 보려면 단계를 선택하세요.' },
    certification: { lead: '인증할 단계를 선택한 뒤 적응형 구술 시험을 시작하세요. 기록 전 독립된 두 번째 모델이 결과를 확인해야 합니다.', navLabel: '인증 단계 탐색', selection: '인증 단계 선택', pickRungExam: '시험 내용을 보려면 단계를 선택하세요.', certifyThisRung: '이 단계 인증', target: '단계를 선택한 다음 시험의 학습자 수준 또는 직무 역할을 설정하세요.', level: '학습자 수준 / 직무 역할', masteryLevel: '숙련 수준', identity: '신원 보증', proctoring: '감독 수준', identityAttest: '이 시도는 본인의 작업임을 확인합니다.', account: '계정', accountMsg: '성인 교육 단계와 신원 보증 인증에는 확인된 계정이 필요합니다.', adultAttest: '18세 이상임을 확인합니다.', signIn: '로그인', createAccount: '계정 만들기', signOut: '로그아웃', confirmAdult: '성인 접근 확인', examSummary: '인증을 시작해 시험 대화를 시작하세요.', finalizeCopy: '시험관에게 질문을 멈추고 인증 판정을 내리도록 요청합니다.', endCopy: '자격을 기록하지 않고 이 시도를 중단합니다.', placeholder: '시험관에게 답변', willExamine: '인증은 이 단계를 평가합니다: {description}' },
    support: { options: ['지원 요청', '제품 피드백', '콘텐츠 수정', '문제 신고'], email: '이메일(선택)', message: '메시지', messagePlaceholder: '무슨 일이 있는지 알려주세요...', sent: '감사합니다. 메시지가 기록되었습니다.', footerCopy: '배치, 훈련, 인증, 검증 가능한 기록을 갖춘 AI 학습 사다리.', linksTitle: 'The Ladder AI', academy: '아카데미', placement: '배치', record: '인증 기록' }
  },
  pt: {
    marketing: { trustTitle: 'Por que empregadores confiam no The Ladder', trust: ['Cada credencial é examinada por dois modelos independentes.', 'Seu exame é uma conversa real, não apenas um banco de perguntas.', 'Seu exame é medido contra evidências auditáveis mapeadas a padrões como O*NET, WEF, NIST AI RMF e a Lei de IA da UE.', 'Os resultados podem ser baixados e usados como referência por equipes de recrutamento.'], broughtBy: 'Apresentado por Aesop AI Academy', signupEyebrow: 'Treine. Certifique-se. Seja notado.', emailPlaceholder: 'Digite seu e-mail', email: 'E-mail', password: 'Senha', signinToggle: 'Já tem conta? Entrar', signedInAs: 'Conectado como' },
    profile: { eyebrow: 'Seu registro', lead: 'Tudo que você conquistou e onde parou, além de acesso direto ao suporte.', tiersCompleted: 'níveis concluídos', tiersPlacedOut: 'níveis dispensados', core: 'básico', expert: 'especialista', mastery: 'maestria', noOpenCourses: 'Ainda não há cursos abertos — escolha um degrau em Treinamento para começar.' },
    assessment: { eyebrow: 'Encontre seu degrau inicial', lead: 'Uma conversa curta posiciona você na escada de treinamento, dispensando o que já sabe e atribuindo degraus alinhados aos seus objetivos.', panel: 'Avaliação de posicionamento', summary: 'Inicie a avaliação para dispensar níveis e receber degraus por capacidade e interesse.', conversation: 'Conversa de avaliação', responses: 'respostas', placeholder: 'Responda ao guia de posicionamento', complete: 'Posicionamento completo', completeCopy: 'Seus níveis dispensados e degraus atribuídos foram salvos.' },
    training: { gateLabel: 'Entre para treinar', gateTitle: 'Crie uma conta grátis para salvar seus degraus', gateCopy: 'Conversas de treinamento e progresso são salvos no seu registro quando você entra.', signInBelow: 'Entrar abaixo', lead: 'Escolha um foco, selecione um degrau e aprenda por conversa guiada.', loadingRungs: 'Carregando degraus...', navLabel: 'Navegação de treinamento', tierSelection: 'Seleção de nível de treinamento', chatPlaceholder: 'Responda ao guia ou peça o próximo desafio aqui', evalOptions: 'Opções de avaliação de padrões', eduEval: 'Avaliação de padrões educacionais', employEval: 'Avaliação de padrões de trabalho', evalCopy: 'Verifica a transcrição atual contra os padrões selecionados e salva evidências.', pickRungToBegin: 'Escolha um degrau da lista para começar.', learnSummary: 'Aprenda "{item}" por conversa guiada.', descriptionFallback: 'Escolha um degrau para ver o que a conversa cobrirá.' },
    certification: { lead: 'Escolha o degrau que deseja certificar e comece um exame oral adaptativo. Um segundo modelo independente deve confirmar o resultado antes de qualquer credencial ser registrada.', navLabel: 'Navegação dos degraus de certificação', selection: 'Seleção do degrau de certificação', pickRungExam: 'Escolha um degrau para ver o que o exame cobrirá.', certifyThisRung: 'Certificar este degrau', target: 'Escolha um degrau e defina o nível ou papel profissional para o exame.', level: 'Nível do aluno / papel profissional', masteryLevel: 'Nível de domínio', identity: 'Garantia de identidade', proctoring: 'Nível de supervisão', identityAttest: 'Confirmo que sou a pessoa fazendo esta tentativa e que a credencial representa meu próprio trabalho.', account: 'Conta', accountMsg: 'Níveis adultos e certificação com identidade exigem conta verificada.', adultAttest: 'Confirmo que tenho 18 anos ou mais.', signIn: 'Entrar', createAccount: 'Criar conta', signOut: 'Sair', confirmAdult: 'Confirmar acesso adulto', examSummary: 'Inicie a certificação para começar a conversa examinada.', finalizeCopy: 'Peça ao examinador para parar as perguntas e emitir a determinação.', endCopy: 'Pare esta tentativa e volte à configuração sem registrar credencial.', placeholder: 'Responda ao examinador', willExamine: 'A certificação examinará este degrau: {description}' },
    support: { options: ['Solicitação de suporte', 'Feedback do produto', 'Correção de conteúdo', 'Relatar problema'], email: 'E-mail (opcional)', message: 'Mensagem', messagePlaceholder: 'Conte-nos o que está acontecendo...', sent: 'Obrigado — sua mensagem foi registrada.', footerCopy: 'Uma escada de aprendizagem de IA com posicionamento, treinamento, certificação e transcrição verificável.', linksTitle: 'The Ladder AI', academy: 'Academia', placement: 'Posicionamento', record: 'Registro de certificação' }
  },
  'zh-TW': {
    marketing: { trustTitle: '雇主為什麼信任 The Ladder', trust: ['每個證書都由兩個獨立模型審查。', '你的考試是真實對話，不只是題庫。', '你的考試會依據可稽核證據評量，並對應 O*NET、WEF、NIST AI RMF 與 EU AI Act 等標準。', '結果可下載，並作為招募團隊的面試參考。'], broughtBy: '由 Aesop AI Academy 提供', signupEyebrow: '接受訓練。取得認證。被看見。', emailPlaceholder: '輸入你的電子郵件', email: '電子郵件', password: '密碼', signinToggle: '已經有帳號？登入', signedInAs: '登入身分' },
    profile: { eyebrow: '你的紀錄', lead: '你已取得的成果、停下的位置，以及直接聯絡支援的入口。', tiersCompleted: '已完成層級', tiersPlacedOut: '已免修層級', core: '核心', expert: '專家', mastery: '精通', noOpenCourses: '目前沒有進行中的課程 — 請在訓練中選擇一個階梯開始引導式對話。' },
    assessment: { eyebrow: '找到你的起始階梯', lead: '一段簡短對話會將你放在適合的訓練階梯上，免修你已掌握的內容，並依目標指派階梯。', panel: '定位評量', summary: '開始評量以測試可免修的層級，並依能力與興趣取得指派階梯。', conversation: '評量對話', responses: '則回應', placeholder: '回答定位指南', complete: '定位完成', completeCopy: '你的免修層級與指派階梯已儲存。' },
    training: { gateLabel: '登入以訓練', gateTitle: '建立免費帳號以儲存你的階梯', gateCopy: '登入後，訓練對話與進度會儲存到你的學習者紀錄。', signInBelow: '在下方登入', lead: '選擇焦點、挑選階梯，並透過引導式對話學習。', loadingRungs: '正在載入階梯...', navLabel: '訓練導覽', tierSelection: '訓練層級選擇', chatPlaceholder: '在這裡回答指南或詢問下一個挑戰', evalOptions: '標準評估選項', eduEval: '教育標準評估', employEval: '職場標準評估', evalCopy: '將目前訓練逐字稿與所選標準比對，並儲存該階梯的證據。', pickRungToBegin: '從清單選擇一個階梯開始。', learnSummary: '透過引導式對話學習「{item}」。', descriptionFallback: '選擇一個階梯以查看對話會涵蓋什麼。' },
    certification: { lead: '選擇你要認證的階梯，然後開始自適應口試。任何證書記錄前，都必須由獨立的第二模型確認結果。', navLabel: '認證階梯導覽', selection: '認證階梯選擇', pickRungExam: '選擇一個階梯以查看考試會涵蓋什麼。', certifyThisRung: '認證此階梯', target: '選擇階梯，然後設定考試的學習者等級或專業角色。', level: '學習者等級 / 專業角色', masteryLevel: '精通等級', identity: '身分保證', proctoring: '監考等級', identityAttest: '我確認我是進行此嘗試的人，任何證書都代表我自己的作品。', account: '帳號', accountMsg: '成人教育層級與身分保證認證需要已驗證帳號。', adultAttest: '我確認我已年滿 18 歲。', signIn: '登入', createAccount: '建立帳號', signOut: '登出', confirmAdult: '確認成人存取', examSummary: '開始認證以進入受檢核的對話。', finalizeCopy: '請考官停止提問並作出此嘗試的認證判定。', endCopy: '停止此嘗試並返回設定，不記錄證書。', placeholder: '回覆考官', willExamine: '認證將檢核此階梯：{description}' },
    support: { options: ['支援請求', '產品回饋', '內容修正', '回報問題'], email: '電子郵件（選填）', message: '訊息', messagePlaceholder: '告訴我們發生了什麼...', sent: '謝謝 — 你的訊息已記錄。', footerCopy: '一座 AI 學習階梯，包含定位、訓練、認證與可驗證逐字稿。', linksTitle: 'The Ladder AI', academy: '學院', placement: '定位', record: '認證紀錄' }
  }
};

function mergeDeep(base, patch = {}) {
  if (Array.isArray(base) || typeof base !== 'object' || base === null) return patch ?? base;
  const out = { ...base };
  Object.entries(patch).forEach(([key, value]) => {
    out[key] = mergeDeep(base[key], value);
  });
  return out;
}

export const WORKSPACE_TRANSLATIONS = Object.fromEntries(
  WORKSPACE_LANGUAGES.map(({ code }) => [code, code === 'en' ? EN : mergeDeep(EN, mergeDeep(overrides[code] || {}, completionOverrides[code] || {}))])
);

export function workspaceLanguageInfo(code) {
  return WORKSPACE_LANGUAGES.find((item) => item.code === code) || WORKSPACE_LANGUAGES[0];
}

export function workspaceText(code) {
  return WORKSPACE_TRANSLATIONS[code] || EN;
}

export function formatText(template, params = {}) {
  return String(template || '').replace(/\{(\w+)\}/g, (_, key) => params[key] ?? '');
}
