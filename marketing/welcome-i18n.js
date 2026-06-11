const STORAGE_KEY = 'aesop-welcome-language';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ar', label: 'العربية' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'pt', label: 'Português' },
  { code: 'zh-TW', label: '繁體中文' }
];

const EN = {
  title: 'The Ladder AI - Verifiable AI Training',
  description: 'AI training and certification that proves practical capability with placement, guided practice, validated exams, and evidence records.',
  ogDescription: 'Placement, guided AI training, validated certification, and evidence records for learners, teams, and employers.',
  nav: ['How it works', 'Pathways', 'Certification', 'Standards', 'Employers', 'FAQ'],
  findRung: 'Find your starting rung',
  findRungArrow: 'Find your starting rung →',
  hero: {
    eyebrow: 'AI capability you can prove',
    title: 'Train for the AI work companies actually need done.',
    copy: 'The Ladder AI places each learner, guides them through practical conversations, and validates credentials with evidence a school, team, or employer can review.',
    secondary: 'Why certify on The Ladder?'
  },
  signup: {
    aria: 'Learner sign up and sign in',
    eyebrow: 'Get trained. Get certified.',
    title: 'Start learning now.',
    emailPlaceholder: 'Enter your e-mail',
    emailLabel: 'Email address',
    signup: 'Sign Up',
    toggle: 'Already have an account? Sign in',
    signinEmailPlaceholder: 'Email',
    signinEmailLabel: 'Email',
    passwordPlaceholder: 'Password',
    passwordLabel: 'Password',
    signin: 'Sign in',
    signedInAs: 'Signed in as',
    workspace: 'Continue to workspace',
    signout: 'Sign out'
  },
  how: {
    eyebrow: 'How it works',
    title: 'One ladder. Three practical steps.',
    steps: [
      ['Place', 'A short assessment conversation identifies what the learner already understands and where training should begin.'],
      ['Train', 'Guided conversations teach, challenge, and apply each rung across concepts, products, and real use cases.'],
      ['Certify', 'Live exams are reviewed by an independent validation pass before credentials are recorded.']
    ],
    problemEyebrow: 'The problem',
    problemTitle: 'AI fluency is easy to claim and hard to verify.',
    problems: [
      ['Learners need direction.', 'Most people do not know where they stand, what to skip, or what to practice next.'],
      ['Employers need evidence.', 'A badge is not enough unless it explains what was tested and how the result was checked.'],
      ['Schools need structure.', 'AI training has to connect concepts, products, and use cases without turning into a pile of links.']
    ]
  },
  pathways: {
    eyebrow: 'Pathways',
    title: 'Train the whole AI stack.',
    copy: 'Use one structure for AI concepts, products, and workplace use cases.',
    outcomes: [
      ['For learners', 'Know what to learn next, practice with a guide, and leave with evidence of what you can do.'],
      ['For employers', 'Review credentials that connect a result to an exam, standards, and demonstrated capability.'],
      ['For schools and teams', 'Give people a repeatable path through AI concepts, products, and workplace use cases.']
    ],
    cards: [
      ['AI Concepts', 'Prompting, reasoning, evaluation, risk, automation, and practical AI literacy.'],
      ['AI Products', 'The assistants, coding tools, creative suites, research systems, and platforms people use.'],
      ['Use Cases', 'Workflows across education, operations, law, healthcare, creativity, leadership, and public service.']
    ]
  },
  proof: {
    trust: [
      ['Brought to you by', 'AESOP AI Academy'],
      ['Patent pending engine', 'U.S. Provisional Patent Application No. 64/085,986'],
      ['Adaptive oral exams', 'Three mastery pathways'],
      ['Standards-mapped', 'Transcript evidence']
    ],
    eyebrow: 'Certification',
    title: 'Certification is based on performance, not completion alone.',
    copy: 'Each credential is designed to show what was attempted, how the learner responded, what standard was evaluated, and whether the result was independently validated.',
    facts: [
      ['Exam type', 'Live AI oral assessment'],
      ['Validation', 'Independent second-model review'],
      ['Evidence', 'Transcript-ready performance record'],
      ['Levels', 'Core, Expert, and Mastery pathways']
    ]
  },
  standards: {
    eyebrow: 'Standards',
    title: 'Every rung is tied to criteria that can be checked.',
    copy: 'Each rung ends with a standards review of the training evidence. Completed certifications add employment mapping to the learner transcript.',
    cards: [
      ['ISTE Standards Alignment', 'Rung checks look for student-ready digital learning behaviors: responsible AI use, knowledge construction, creative application, and communication with evidence.'],
      ['UNESCO Framework Review', 'Training evidence is reviewed for human-centered AI literacy, ethics, inclusion, and practical readiness across learning and work contexts.'],
      ['EU AI Act Review', 'Rung evaluations check whether learners can recognize risk, limits, transparency duties, and appropriate use when AI systems affect people.'],
      ['NIST AI RMF Alignment', 'Training evidence is compared with govern, map, measure, and manage behaviors so learners can explain risk, evaluation, and mitigation.'],
      ['O*NET Employment Mapping', 'When certification is complete, the transcript connects demonstrated AI capability to work activities, skills, and role evidence employers can review.'],
      ['WEF Skills Mapping', 'Completed certification transcripts also map evidence to workforce skills such as analytical thinking, technology literacy, adaptability, and judgment.']
    ]
  },
  employers: {
    eyebrow: 'Employers',
    title: 'Hire for demonstrated AI capability, not self-reported confidence.',
    copy: 'The Ladder AI turns training into reviewable evidence so managers can see what a learner attempted, how they reasoned, and where they are ready to contribute.',
    outcomes: [
      ['Role-ready signals', 'Credentials connect AI fluency to workplace use cases, not generic course completion.'],
      ['Reviewable evidence', 'Transcript records show the conversation, evaluation criteria, validation pass, and result.'],
      ['Repeatable team training', 'Teams can use the same ladder across onboarding, upskilling, role transitions, and internal mobility.']
    ],
    steps: [
      ['Map the role', 'Choose concepts, products, and use cases that match the work people actually need to do.'],
      ['Certify readiness', 'Validated exams produce a credential that hiring managers, supervisors, and schools can inspect.'],
      ['Evaluate results', 'After certification, print the transcript and use the mapped evidence to guide interview questions, compare role fit, and review readiness.']
    ]
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions visitors will often ask first.',
    items: [
      ['Do I need an account?', 'You can explore the flow first. Saving progress, certification, and evidence records require an account.'],
      ['Is this just another course catalog?', 'No. The product layer is a guided workspace: placement, training conversations, exam configuration, and credential validation.'],
      ['What makes the credential credible?', 'Credentials are tied to live assessment and an independent validation pass, with evidence designed for review.'],
      ['Can teams use this?', 'Yes. The structure is intended for learners, employers, schools, and organizations that need repeatable AI readiness signals.']
    ],
    finalEyebrow: 'Ready to climb?',
    finalTitle: 'Find the rung where your AI training should begin.'
  },
  footer: ['The Ladder AI', 'Certification framework', 'Workspace', '© 2026 AESOP AI Academy'],
  auth: {
    invalidEmail: 'Enter a valid email address.',
    unavailable: 'Sign-up is unavailable right now. Please try again shortly.',
    checkEmail: 'Check <b>{email}</b> for a link to verify your email and finish creating your account.',
    sendFailed: 'Could not send the link ({code}). Please try again.',
    signinFailed: 'Sign in failed - check your email and password.'
  }
};

const TRANSLATIONS = {
  en: EN,
  es: {
    title: 'The Ladder AI - Formación verificable en IA',
    description: 'Formación y certificación en IA que demuestra capacidad práctica mediante ubicación, práctica guiada, exámenes validados y registros de evidencia.',
    ogDescription: 'Ubicación, formación guiada en IA, certificación validada y registros de evidencia para estudiantes, equipos y empleadores.',
    nav: ['Cómo funciona', 'Rutas', 'Certificación', 'Estándares', 'Empleadores', 'FAQ'],
    findRung: 'Encuentra tu peldaño inicial',
    findRungArrow: 'Encuentra tu peldaño inicial →',
    hero: {
      eyebrow: 'Capacidad en IA que puedes demostrar',
      title: 'Entrena para el trabajo con IA que las empresas realmente necesitan.',
      copy: 'The Ladder AI ubica a cada estudiante, lo guía mediante conversaciones prácticas y valida credenciales con evidencia que una escuela, un equipo o un empleador puede revisar.',
      secondary: '¿Por qué certificarte en The Ladder?'
    },
    signup: {
      aria: 'Registro e inicio de sesión del estudiante',
      eyebrow: 'Entrénate. Certifícate.',
      title: 'Empieza a aprender ahora.',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      emailLabel: 'Correo electrónico',
      signup: 'Registrarse',
      toggle: '¿Ya tienes una cuenta? Inicia sesión',
      signinEmailPlaceholder: 'Correo electrónico',
      signinEmailLabel: 'Correo electrónico',
      passwordPlaceholder: 'Contraseña',
      passwordLabel: 'Contraseña',
      signin: 'Iniciar sesión',
      signedInAs: 'Sesión iniciada como',
      workspace: 'Continuar al espacio de trabajo',
      signout: 'Cerrar sesión'
    },
    how: {
      eyebrow: 'Cómo funciona',
      title: 'Una escalera. Tres pasos prácticos.',
      steps: [
        ['Ubicar', 'Una breve conversación de evaluación identifica lo que el estudiante ya entiende y dónde debe comenzar la formación.'],
        ['Entrenar', 'Conversaciones guiadas enseñan, desafían y aplican cada peldaño en conceptos, productos y casos de uso reales.'],
        ['Certificar', 'Los exámenes en vivo pasan por una validación independiente antes de registrar las credenciales.']
      ],
      problemEyebrow: 'El problema',
      problemTitle: 'La fluidez en IA es fácil de afirmar y difícil de verificar.',
      problems: [
        ['Los estudiantes necesitan dirección.', 'La mayoría no sabe dónde está, qué puede saltarse ni qué debe practicar después.'],
        ['Los empleadores necesitan evidencia.', 'Una insignia no basta si no explica qué se evaluó y cómo se comprobó el resultado.'],
        ['Las escuelas necesitan estructura.', 'La formación en IA debe conectar conceptos, productos y casos de uso sin convertirse en una pila de enlaces.']
      ]
    },
    pathways: {
      eyebrow: 'Rutas',
      title: 'Entrena toda la pila de IA.',
      copy: 'Usa una sola estructura para conceptos de IA, productos y casos de uso laborales.',
      outcomes: [
        ['Para estudiantes', 'Sabe qué aprender después, practica con una guía y termina con evidencia de lo que puedes hacer.'],
        ['Para empleadores', 'Revisa credenciales que conectan un resultado con un examen, estándares y capacidad demostrada.'],
        ['Para escuelas y equipos', 'Da a las personas una ruta repetible por conceptos, productos y casos de uso laborales de IA.']
      ],
      cards: [
        ['Conceptos de IA', 'Prompts, razonamiento, evaluación, riesgo, automatización y alfabetización práctica en IA.'],
        ['Productos de IA', 'Asistentes, herramientas de programación, suites creativas, sistemas de investigación y plataformas que la gente usa.'],
        ['Casos de uso', 'Flujos de trabajo en educación, operaciones, derecho, salud, creatividad, liderazgo y servicio público.']
      ]
    },
    proof: {
      trust: [
        ['Presentado por', 'AESOP AI Academy'],
        ['Motor con patente pendiente', 'Solicitud provisional de patente de EE. UU. n.º 64/085,986'],
        ['Exámenes orales adaptativos', 'Tres rutas de dominio'],
        ['Mapeado a estándares', 'Evidencia para el expediente']
      ],
      eyebrow: 'Certificación',
      title: 'La certificación se basa en desempeño, no solo en completar.',
      copy: 'Cada credencial está diseñada para mostrar qué se intentó, cómo respondió el estudiante, qué estándar se evaluó y si el resultado fue validado de forma independiente.',
      facts: [
        ['Tipo de examen', 'Evaluación oral de IA en vivo'],
        ['Validación', 'Revisión independiente con un segundo modelo'],
        ['Evidencia', 'Registro de desempeño listo para expediente'],
        ['Niveles', 'Rutas Core, Expert y Mastery']
      ]
    },
    standards: {
      eyebrow: 'Estándares',
      title: 'Cada peldaño está ligado a criterios verificables.',
      copy: 'Cada peldaño termina con una revisión de estándares sobre la evidencia de formación. Las certificaciones completadas agregan mapeo laboral al expediente del estudiante.',
      cards: [
        ['Alineación con estándares ISTE', 'Las revisiones buscan comportamientos de aprendizaje digital: uso responsable de IA, construcción de conocimiento, aplicación creativa y comunicación con evidencia.'],
        ['Revisión del marco UNESCO', 'La evidencia se revisa según alfabetización en IA centrada en las personas, ética, inclusión y preparación práctica para aprender y trabajar.'],
        ['Revisión de la Ley de IA de la UE', 'Las evaluaciones comprueban si los estudiantes reconocen riesgo, límites, deberes de transparencia y uso adecuado cuando la IA afecta a personas.'],
        ['Alineación con NIST AI RMF', 'La evidencia se compara con gobernar, mapear, medir y gestionar para que los estudiantes expliquen riesgo, evaluación y mitigación.'],
        ['Mapeo laboral O*NET', 'Al completar la certificación, el expediente conecta capacidad demostrada en IA con actividades, habilidades y evidencia de rol.'],
        ['Mapeo de habilidades WEF', 'Los expedientes certificados también mapean evidencia a habilidades laborales como pensamiento analítico, alfabetización tecnológica, adaptabilidad y juicio.']
      ]
    },
    employers: {
      eyebrow: 'Empleadores',
      title: 'Contrata por capacidad demostrada en IA, no por confianza autodeclarada.',
      copy: 'The Ladder AI convierte la formación en evidencia revisable para que los gerentes vean qué intentó el estudiante, cómo razonó y dónde está listo para aportar.',
      outcomes: [
        ['Señales listas para el rol', 'Las credenciales conectan la fluidez en IA con casos de uso laborales, no con completar cursos genéricos.'],
        ['Evidencia revisable', 'Los expedientes muestran conversación, criterios de evaluación, validación y resultado.'],
        ['Formación de equipo repetible', 'Los equipos pueden usar la misma escalera para onboarding, mejora de habilidades, cambios de rol y movilidad interna.']
      ],
      steps: [
        ['Mapear el rol', 'Elige conceptos, productos y casos de uso que coincidan con el trabajo real.'],
        ['Certificar preparación', 'Los exámenes validados producen una credencial que gerentes, supervisores y escuelas pueden inspeccionar.'],
        ['Evaluar resultados', 'Tras certificar, imprime el expediente y usa la evidencia mapeada para entrevistas, ajuste al rol y preparación.']
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Preguntas que los visitantes suelen hacer primero.',
      items: [
        ['¿Necesito una cuenta?', 'Puedes explorar el flujo primero. Guardar progreso, certificación y evidencia requiere una cuenta.'],
        ['¿Es solo otro catálogo de cursos?', 'No. La capa de producto es un espacio guiado: ubicación, conversaciones de formación, configuración de examen y validación de credenciales.'],
        ['¿Qué hace creíble la credencial?', 'Las credenciales se vinculan a una evaluación en vivo y una validación independiente, con evidencia diseñada para revisión.'],
        ['¿Pueden usarlo los equipos?', 'Sí. La estructura está pensada para estudiantes, empleadores, escuelas y organizaciones que necesitan señales repetibles de preparación en IA.']
      ],
      finalEyebrow: '¿Listo para subir?',
      finalTitle: 'Encuentra el peldaño donde debe comenzar tu formación en IA.'
    },
    footer: ['The Ladder AI', 'Marco de certificación', 'Espacio de trabajo', '© 2026 AESOP AI Academy'],
    auth: {
      invalidEmail: 'Ingresa un correo electrónico válido.',
      unavailable: 'El registro no está disponible ahora. Inténtalo de nuevo pronto.',
      checkEmail: 'Revisa <b>{email}</b> para verificar tu correo y terminar de crear tu cuenta.',
      sendFailed: 'No se pudo enviar el enlace ({code}). Inténtalo de nuevo.',
      signinFailed: 'No se pudo iniciar sesión. Revisa tu correo y contraseña.'
    }
  },
  fr: {
    title: 'The Ladder AI - Formation IA vérifiable',
    description: 'Formation et certification en IA qui prouvent une capacité pratique grâce au placement, à la pratique guidée, aux examens validés et aux traces de preuve.',
    ogDescription: 'Placement, formation IA guidée, certification validée et preuves pour apprenants, équipes et employeurs.',
    nav: ['Fonctionnement', 'Parcours', 'Certification', 'Normes', 'Employeurs', 'FAQ'],
    findRung: 'Trouvez votre premier échelon',
    findRungArrow: 'Trouvez votre premier échelon →',
    hero: {
      eyebrow: 'Une capacité IA que vous pouvez prouver',
      title: 'Formez-vous au travail IA dont les entreprises ont réellement besoin.',
      copy: 'The Ladder AI place chaque apprenant, le guide par des conversations pratiques et valide les certifications avec des preuves qu’une école, une équipe ou un employeur peut examiner.',
      secondary: 'Pourquoi se certifier sur The Ladder ?'
    },
    signup: {
      aria: 'Inscription et connexion apprenant',
      eyebrow: 'Formez-vous. Certifiez-vous.',
      title: 'Commencez à apprendre maintenant.',
      emailPlaceholder: 'Entrez votre e-mail',
      emailLabel: 'Adresse e-mail',
      signup: 'S’inscrire',
      toggle: 'Vous avez déjà un compte ? Connexion',
      signinEmailPlaceholder: 'E-mail',
      signinEmailLabel: 'E-mail',
      passwordPlaceholder: 'Mot de passe',
      passwordLabel: 'Mot de passe',
      signin: 'Connexion',
      signedInAs: 'Connecté en tant que',
      workspace: 'Continuer vers l’espace de travail',
      signout: 'Se déconnecter'
    },
    how: {
      eyebrow: 'Fonctionnement',
      title: 'Une échelle. Trois étapes pratiques.',
      steps: [
        ['Placer', 'Une courte conversation d’évaluation identifie ce que l’apprenant comprend déjà et où la formation doit commencer.'],
        ['Former', 'Des conversations guidées enseignent, mettent au défi et appliquent chaque échelon aux concepts, produits et cas d’usage réels.'],
        ['Certifier', 'Les examens en direct sont relus par une validation indépendante avant l’enregistrement des certifications.']
      ],
      problemEyebrow: 'Le problème',
      problemTitle: 'La maîtrise de l’IA est facile à affirmer et difficile à vérifier.',
      problems: [
        ['Les apprenants ont besoin d’une direction.', 'La plupart ne savent pas où ils en sont, quoi passer ni quoi pratiquer ensuite.'],
        ['Les employeurs ont besoin de preuves.', 'Un badge ne suffit pas s’il n’explique pas ce qui a été testé et comment le résultat a été vérifié.'],
        ['Les écoles ont besoin de structure.', 'La formation IA doit relier concepts, produits et cas d’usage sans devenir une simple liste de liens.']
      ]
    },
    pathways: {
      eyebrow: 'Parcours',
      title: 'Formez toute la pile IA.',
      copy: 'Utilisez une même structure pour les concepts IA, les produits et les cas d’usage professionnels.',
      outcomes: [
        ['Pour les apprenants', 'Sachez quoi apprendre ensuite, pratiquez avec un guide et repartez avec la preuve de ce que vous savez faire.'],
        ['Pour les employeurs', 'Examinez des certifications reliant un résultat à un examen, à des normes et à une capacité démontrée.'],
        ['Pour les écoles et équipes', 'Offrez un chemin répétable à travers concepts, produits et cas d’usage IA au travail.']
      ],
      cards: [
        ['Concepts IA', 'Prompting, raisonnement, évaluation, risque, automatisation et culture IA pratique.'],
        ['Produits IA', 'Les assistants, outils de code, suites créatives, systèmes de recherche et plateformes utilisés au quotidien.'],
        ['Cas d’usage', 'Flux de travail en éducation, opérations, droit, santé, créativité, leadership et service public.']
      ]
    },
    proof: {
      trust: [
        ['Présenté par', 'AESOP AI Academy'],
        ['Moteur en instance de brevet', 'Demande provisoire de brevet US n° 64/085,986'],
        ['Examens oraux adaptatifs', 'Trois parcours de maîtrise'],
        ['Aligné sur des normes', 'Preuves pour le relevé']
      ],
      eyebrow: 'Certification',
      title: 'La certification repose sur la performance, pas seulement sur l’achèvement.',
      copy: 'Chaque certification montre ce qui a été tenté, comment l’apprenant a répondu, quelle norme a été évaluée et si le résultat a été validé indépendamment.',
      facts: [
        ['Type d’examen', 'Évaluation orale IA en direct'],
        ['Validation', 'Revue indépendante par un second modèle'],
        ['Preuve', 'Dossier de performance prêt pour le relevé'],
        ['Niveaux', 'Parcours Core, Expert et Mastery']
      ]
    },
    standards: {
      eyebrow: 'Normes',
      title: 'Chaque échelon est lié à des critères vérifiables.',
      copy: 'Chaque échelon se termine par une revue des preuves de formation selon des normes. Les certifications terminées ajoutent une cartographie emploi au relevé de l’apprenant.',
      cards: [
        ['Alignement ISTE', 'Les contrôles cherchent des comportements d’apprentissage numérique : usage responsable de l’IA, construction de connaissances, application créative et communication fondée sur des preuves.'],
        ['Revue du cadre UNESCO', 'Les preuves sont évaluées pour la culture IA centrée sur l’humain, l’éthique, l’inclusion et la préparation pratique.'],
        ['Revue de l’AI Act européen', 'Les évaluations vérifient la reconnaissance des risques, limites, devoirs de transparence et usages appropriés lorsque l’IA affecte des personnes.'],
        ['Alignement NIST AI RMF', 'Les preuves sont comparées aux comportements gouverner, cartographier, mesurer et gérer afin d’expliquer risque, évaluation et atténuation.'],
        ['Cartographie O*NET', 'Une fois certifié, le relevé relie la capacité IA démontrée aux activités, compétences et preuves de rôle.'],
        ['Cartographie WEF', 'Les relevés certifiés relient aussi les preuves aux compétences professionnelles : pensée analytique, culture technologique, adaptabilité et jugement.']
      ]
    },
    employers: {
      eyebrow: 'Employeurs',
      title: 'Recrutez sur une capacité IA démontrée, pas sur une confiance déclarée.',
      copy: 'The Ladder AI transforme la formation en preuves examinables pour voir ce qu’un apprenant a tenté, comment il a raisonné et où il est prêt à contribuer.',
      outcomes: [
        ['Signaux prêts pour le rôle', 'Les certifications relient la maîtrise IA à des cas d’usage professionnels, pas à une simple fin de cours.'],
        ['Preuves examinables', 'Les relevés montrent conversation, critères d’évaluation, validation et résultat.'],
        ['Formation d’équipe répétable', 'Les équipes peuvent utiliser la même échelle pour intégration, montée en compétences, transitions de rôle et mobilité interne.']
      ],
      steps: [
        ['Cartographier le rôle', 'Choisissez les concepts, produits et cas d’usage correspondant au travail réel.'],
        ['Certifier la préparation', 'Les examens validés produisent une certification inspectable par managers, superviseurs et écoles.'],
        ['Évaluer les résultats', 'Après certification, imprimez le relevé et utilisez les preuves cartographiées pour guider les entretiens, comparer l’adéquation et examiner la préparation.']
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions que les visiteurs posent souvent en premier.',
      items: [
        ['Ai-je besoin d’un compte ?', 'Vous pouvez d’abord explorer le parcours. Enregistrer progression, certification et preuves nécessite un compte.'],
        ['Est-ce seulement un autre catalogue de cours ?', 'Non. La couche produit est un espace guidé : placement, conversations de formation, configuration d’examen et validation de certification.'],
        ['Qu’est-ce qui rend la certification crédible ?', 'Les certifications sont liées à une évaluation en direct et à une validation indépendante, avec des preuves conçues pour être examinées.'],
        ['Les équipes peuvent-elles l’utiliser ?', 'Oui. La structure vise les apprenants, employeurs, écoles et organisations qui ont besoin de signaux répétables de préparation IA.']
      ],
      finalEyebrow: 'Prêt à monter ?',
      finalTitle: 'Trouvez l’échelon où votre formation IA doit commencer.'
    },
    footer: ['The Ladder AI', 'Cadre de certification', 'Espace de travail', '© 2026 AESOP AI Academy'],
    auth: {
      invalidEmail: 'Entrez une adresse e-mail valide.',
      unavailable: 'L’inscription est indisponible pour le moment. Réessayez bientôt.',
      checkEmail: 'Consultez <b>{email}</b> pour vérifier votre e-mail et terminer la création de votre compte.',
      sendFailed: 'Impossible d’envoyer le lien ({code}). Réessayez.',
      signinFailed: 'Échec de connexion - vérifiez votre e-mail et votre mot de passe.'
    }
  },
  de: {
    title: 'The Ladder AI - Nachweisbares KI-Training',
    description: 'KI-Training und Zertifizierung, die praktische Fähigkeiten durch Einstufung, geführte Übungen, validierte Prüfungen und Nachweise belegen.',
    ogDescription: 'Einstufung, geführtes KI-Training, validierte Zertifizierung und Nachweise für Lernende, Teams und Arbeitgeber.',
    nav: ['So funktioniert es', 'Lernpfade', 'Zertifizierung', 'Standards', 'Arbeitgeber', 'FAQ'],
    findRung: 'Startstufe finden',
    findRungArrow: 'Startstufe finden →',
    hero: {
      eyebrow: 'KI-Kompetenz, die Sie belegen können',
      title: 'Trainieren Sie für die KI-Arbeit, die Unternehmen wirklich brauchen.',
      copy: 'The Ladder AI stuft jeden Lernenden ein, führt durch praktische Gespräche und validiert Nachweise mit Belegen, die Schulen, Teams oder Arbeitgeber prüfen können.',
      secondary: 'Warum auf The Ladder zertifizieren?'
    },
    signup: {
      aria: 'Registrierung und Anmeldung für Lernende',
      eyebrow: 'Trainieren. Zertifizieren.',
      title: 'Jetzt mit dem Lernen beginnen.',
      emailPlaceholder: 'E-Mail eingeben',
      emailLabel: 'E-Mail-Adresse',
      signup: 'Registrieren',
      toggle: 'Schon ein Konto? Anmelden',
      signinEmailPlaceholder: 'E-Mail',
      signinEmailLabel: 'E-Mail',
      passwordPlaceholder: 'Passwort',
      passwordLabel: 'Passwort',
      signin: 'Anmelden',
      signedInAs: 'Angemeldet als',
      workspace: 'Weiter zum Arbeitsbereich',
      signout: 'Abmelden'
    },
    how: {
      eyebrow: 'So funktioniert es',
      title: 'Eine Leiter. Drei praktische Schritte.',
      steps: [
        ['Einstufen', 'Ein kurzes Bewertungsgespräch erkennt, was der Lernende bereits versteht und wo das Training beginnen sollte.'],
        ['Trainieren', 'Geführte Gespräche vermitteln, fordern heraus und wenden jede Stufe auf Konzepte, Produkte und reale Anwendungsfälle an.'],
        ['Zertifizieren', 'Live-Prüfungen werden vor dem Speichern der Nachweise durch eine unabhängige Validierung geprüft.']
      ],
      problemEyebrow: 'Das Problem',
      problemTitle: 'KI-Kompetenz lässt sich leicht behaupten und schwer überprüfen.',
      problems: [
        ['Lernende brauchen Orientierung.', 'Die meisten wissen nicht, wo sie stehen, was sie überspringen können oder was sie als Nächstes üben sollten.'],
        ['Arbeitgeber brauchen Belege.', 'Ein Badge reicht nicht, wenn er nicht erklärt, was geprüft wurde und wie das Ergebnis kontrolliert wurde.'],
        ['Schulen brauchen Struktur.', 'KI-Training muss Konzepte, Produkte und Anwendungsfälle verbinden, ohne zu einer Linkliste zu werden.']
      ]
    },
    pathways: {
      eyebrow: 'Lernpfade',
      title: 'Trainieren Sie den gesamten KI-Stack.',
      copy: 'Eine Struktur für KI-Konzepte, Produkte und berufliche Anwendungsfälle.',
      outcomes: [
        ['Für Lernende', 'Wissen, was als Nächstes zu lernen ist, mit Anleitung üben und mit Belegen für die eigenen Fähigkeiten abschließen.'],
        ['Für Arbeitgeber', 'Nachweise prüfen, die Ergebnis, Prüfung, Standards und demonstrierte Fähigkeit verbinden.'],
        ['Für Schulen und Teams', 'Einen wiederholbaren Weg durch KI-Konzepte, Produkte und berufliche Anwendungsfälle bieten.']
      ],
      cards: [
        ['KI-Konzepte', 'Prompting, Argumentation, Bewertung, Risiko, Automatisierung und praktische KI-Grundbildung.'],
        ['KI-Produkte', 'Assistenten, Coding-Tools, Kreativ-Suiten, Recherche-Systeme und Plattformen, die Menschen nutzen.'],
        ['Anwendungsfälle', 'Workflows in Bildung, Betrieb, Recht, Gesundheitswesen, Kreativität, Führung und öffentlichem Dienst.']
      ]
    },
    proof: {
      trust: [
        ['Bereitgestellt von', 'AESOP AI Academy'],
        ['Patent angemeldete Engine', 'Vorläufige US-Patentanmeldung Nr. 64/085,986'],
        ['Adaptive mündliche Prüfungen', 'Drei Mastery-Pfade'],
        ['An Standards ausgerichtet', 'Nachweise für Transkripte']
      ],
      eyebrow: 'Zertifizierung',
      title: 'Zertifizierung basiert auf Leistung, nicht nur auf Abschluss.',
      copy: 'Jeder Nachweis zeigt, was versucht wurde, wie der Lernende geantwortet hat, welcher Standard bewertet wurde und ob das Ergebnis unabhängig validiert wurde.',
      facts: [
        ['Prüfungstyp', 'Live-mündliche KI-Bewertung'],
        ['Validierung', 'Unabhängige Zweitmodell-Prüfung'],
        ['Nachweis', 'Leistungsdatensatz für Transkripte'],
        ['Stufen', 'Core-, Expert- und Mastery-Pfade']
      ]
    },
    standards: {
      eyebrow: 'Standards',
      title: 'Jede Stufe ist an prüfbare Kriterien gebunden.',
      copy: 'Jede Stufe endet mit einer Standardprüfung der Trainingsnachweise. Abgeschlossene Zertifizierungen ergänzen das Transkript um Beschäftigungszuordnung.',
      cards: [
        ['Ausrichtung an ISTE-Standards', 'Stufenprüfungen suchen nach verantwortlichem KI-Einsatz, Wissensaufbau, kreativer Anwendung und evidenzbasierter Kommunikation.'],
        ['UNESCO-Rahmenprüfung', 'Nachweise werden auf menschenzentrierte KI-Kompetenz, Ethik, Inklusion und praktische Bereitschaft geprüft.'],
        ['Prüfung nach EU AI Act', 'Bewertungen prüfen, ob Lernende Risiken, Grenzen, Transparenzpflichten und angemessene Nutzung erkennen, wenn KI Menschen betrifft.'],
        ['Ausrichtung am NIST AI RMF', 'Nachweise werden mit Govern-, Map-, Measure- und Manage-Verhalten verglichen, damit Lernende Risiko, Bewertung und Minderung erklären können.'],
        ['O*NET-Beschäftigungszuordnung', 'Nach der Zertifizierung verbindet das Transkript nachgewiesene KI-Fähigkeiten mit Tätigkeiten, Skills und Rollenbelegen.'],
        ['WEF-Skill-Zuordnung', 'Zertifizierte Transkripte ordnen Nachweise auch Skills wie analytischem Denken, Technologiekompetenz, Anpassungsfähigkeit und Urteilsvermögen zu.']
      ]
    },
    employers: {
      eyebrow: 'Arbeitgeber',
      title: 'Stellen Sie nach nachgewiesener KI-Fähigkeit ein, nicht nach Selbsteinschätzung.',
      copy: 'The Ladder AI macht Training zu prüfbaren Belegen, damit Führungskräfte sehen, was Lernende versucht haben, wie sie argumentieren und wo sie einsatzbereit sind.',
      outcomes: [
        ['Rollentaugliche Signale', 'Nachweise verbinden KI-Kompetenz mit beruflichen Anwendungsfällen, nicht mit generischem Kursabschluss.'],
        ['Prüfbare Belege', 'Transkripte zeigen Gespräch, Bewertungskriterien, Validierung und Ergebnis.'],
        ['Wiederholbares Teamtraining', 'Teams können dieselbe Leiter für Onboarding, Upskilling, Rollenwechsel und interne Mobilität nutzen.']
      ],
      steps: [
        ['Rolle abbilden', 'Wählen Sie Konzepte, Produkte und Anwendungsfälle, die zur tatsächlichen Arbeit passen.'],
        ['Bereitschaft zertifizieren', 'Validierte Prüfungen erzeugen Nachweise, die Manager, Vorgesetzte und Schulen prüfen können.'],
        ['Ergebnisse bewerten', 'Nach der Zertifizierung das Transkript drucken und die zugeordneten Belege für Interviewfragen, Rollenfit und Bereitschaft nutzen.']
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Fragen, die Besucher zuerst stellen.',
      items: [
        ['Brauche ich ein Konto?', 'Sie können den Ablauf zuerst erkunden. Fortschritt, Zertifizierung und Nachweise zu speichern erfordert ein Konto.'],
        ['Ist das nur ein weiterer Kurskatalog?', 'Nein. Die Produktebene ist ein geführter Arbeitsbereich: Einstufung, Trainingsgespräche, Prüfungskonfiguration und Nachweisvalidierung.'],
        ['Was macht den Nachweis glaubwürdig?', 'Nachweise sind mit Live-Bewertung und unabhängiger Validierung verbunden und für Prüfung konzipiert.'],
        ['Können Teams das nutzen?', 'Ja. Die Struktur ist für Lernende, Arbeitgeber, Schulen und Organisationen gedacht, die wiederholbare KI-Bereitschaftssignale brauchen.']
      ],
      finalEyebrow: 'Bereit zu steigen?',
      finalTitle: 'Finden Sie die Stufe, auf der Ihr KI-Training beginnen sollte.'
    },
    footer: ['The Ladder AI', 'Zertifizierungsrahmen', 'Arbeitsbereich', '© 2026 AESOP AI Academy'],
    auth: {
      invalidEmail: 'Geben Sie eine gültige E-Mail-Adresse ein.',
      unavailable: 'Registrierung ist derzeit nicht verfügbar. Bitte versuchen Sie es bald erneut.',
      checkEmail: 'Prüfen Sie <b>{email}</b>, um Ihre E-Mail zu bestätigen und Ihr Konto fertigzustellen.',
      sendFailed: 'Der Link konnte nicht gesendet werden ({code}). Bitte erneut versuchen.',
      signinFailed: 'Anmeldung fehlgeschlagen - prüfen Sie E-Mail und Passwort.'
    }
  },
  ar: {
    title: 'The Ladder AI - تدريب ذكاء اصطناعي قابل للتحقق',
    description: 'تدريب وشهادة في الذكاء الاصطناعي تثبت القدرة العملية عبر تحديد المستوى، والممارسة الموجهة، والاختبارات الموثقة، وسجلات الأدلة.',
    ogDescription: 'تحديد مستوى، وتدريب موجه في الذكاء الاصطناعي، وشهادات موثقة، وسجلات أدلة للمتعلمين والفرق وأصحاب العمل.',
    nav: ['كيف يعمل', 'المسارات', 'الشهادة', 'المعايير', 'أصحاب العمل', 'الأسئلة الشائعة'],
    findRung: 'اعثر على درجتك الأولى',
    findRungArrow: 'اعثر على درجتك الأولى ←',
    hero: {
      eyebrow: 'قدرة في الذكاء الاصطناعي يمكنك إثباتها',
      title: 'تدرّب على أعمال الذكاء الاصطناعي التي تحتاجها الشركات فعلاً.',
      copy: 'يحدد The Ladder AI مستوى كل متعلم، ويرشده عبر محادثات عملية، ويوثق الشهادات بأدلة يمكن للمدرسة أو الفريق أو صاحب العمل مراجعتها.',
      secondary: 'لماذا تحصل على شهادة في The Ladder؟'
    },
    signup: {
      aria: 'تسجيل المتعلم وتسجيل الدخول',
      eyebrow: 'تدرّب. احصل على الشهادة.',
      title: 'ابدأ التعلم الآن.',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      emailLabel: 'عنوان البريد الإلكتروني',
      signup: 'إنشاء حساب',
      toggle: 'لديك حساب بالفعل؟ سجّل الدخول',
      signinEmailPlaceholder: 'البريد الإلكتروني',
      signinEmailLabel: 'البريد الإلكتروني',
      passwordPlaceholder: 'كلمة المرور',
      passwordLabel: 'كلمة المرور',
      signin: 'تسجيل الدخول',
      signedInAs: 'تم تسجيل الدخول باسم',
      workspace: 'المتابعة إلى مساحة العمل',
      signout: 'تسجيل الخروج'
    },
    how: {
      eyebrow: 'كيف يعمل',
      title: 'سلّم واحد. ثلاث خطوات عملية.',
      steps: [
        ['تحديد المستوى', 'تحدد محادثة تقييم قصيرة ما يفهمه المتعلم بالفعل وأين يجب أن يبدأ التدريب.'],
        ['التدريب', 'تعلّم المحادثات الموجهة كل درجة، وتتحدى المتعلم، وتطبقها عبر المفاهيم والمنتجات وحالات الاستخدام الحقيقية.'],
        ['الشهادة', 'تراجع الاختبارات المباشرة بعملية تحقق مستقلة قبل تسجيل الشهادات.']
      ],
      problemEyebrow: 'المشكلة',
      problemTitle: 'إتقان الذكاء الاصطناعي سهل الادعاء وصعب التحقق.',
      problems: [
        ['المتعلمون يحتاجون إلى توجيه.', 'معظم الناس لا يعرفون أين يقفون، وما الذي يمكنهم تجاوزه، وما الذي ينبغي التدرب عليه بعد ذلك.'],
        ['أصحاب العمل يحتاجون إلى أدلة.', 'الشارة وحدها لا تكفي ما لم تشرح ما تم اختباره وكيف تم التحقق من النتيجة.'],
        ['المدارس تحتاج إلى بنية.', 'يجب أن يربط تدريب الذكاء الاصطناعي بين المفاهيم والمنتجات وحالات الاستخدام دون أن يتحول إلى قائمة روابط.']
      ]
    },
    pathways: {
      eyebrow: 'المسارات',
      title: 'درّب منظومة الذكاء الاصطناعي كاملة.',
      copy: 'استخدم بنية واحدة لمفاهيم الذكاء الاصطناعي ومنتجاته وحالات استخدامه في العمل.',
      outcomes: [
        ['للمتعلمين', 'اعرف ما الذي يجب تعلمه بعد ذلك، وتدرّب مع مرشد، واخرج بدليل على ما تستطيع فعله.'],
        ['لأصحاب العمل', 'راجع شهادات تربط النتيجة باختبار ومعايير وقدرة مثبتة.'],
        ['للمدارس والفرق', 'قدّم مساراً قابلاً للتكرار عبر مفاهيم الذكاء الاصطناعي ومنتجاته وحالات استخدامه في العمل.']
      ],
      cards: [
        ['مفاهيم الذكاء الاصطناعي', 'التوجيهات، والاستدلال، والتقييم، والمخاطر، والأتمتة، ومحو الأمية العملية في الذكاء الاصطناعي.'],
        ['منتجات الذكاء الاصطناعي', 'المساعدون، وأدوات البرمجة، ومجموعات الإبداع، وأنظمة البحث، والمنصات التي يستخدمها الناس.'],
        ['حالات الاستخدام', 'سير العمل في التعليم والعمليات والقانون والصحة والإبداع والقيادة والخدمة العامة.']
      ]
    },
    proof: {
      trust: [
        ['مقدم من', 'AESOP AI Academy'],
        ['محرك ببراءة اختراع قيد الانتظار', 'طلب براءة اختراع أمريكي مؤقت رقم 64/085,986'],
        ['اختبارات شفوية تكيفية', 'ثلاثة مسارات إتقان'],
        ['مرتبط بالمعايير', 'دليل للسجل']
      ],
      eyebrow: 'الشهادة',
      title: 'تعتمد الشهادة على الأداء، لا على الإكمال وحده.',
      copy: 'صُممت كل شهادة لتوضح ما تمت محاولته، وكيف استجاب المتعلم، وما المعيار الذي تم تقييمه، وما إذا كانت النتيجة قد تحققت بشكل مستقل.',
      facts: [
        ['نوع الاختبار', 'تقييم شفوي مباشر بالذكاء الاصطناعي'],
        ['التحقق', 'مراجعة مستقلة بنموذج ثانٍ'],
        ['الدليل', 'سجل أداء جاهز للسجل التعليمي'],
        ['المستويات', 'مسارات Core و Expert و Mastery']
      ]
    },
    standards: {
      eyebrow: 'المعايير',
      title: 'كل درجة مرتبطة بمعايير يمكن التحقق منها.',
      copy: 'تنتهي كل درجة بمراجعة معيارية لأدلة التدريب. وتضيف الشهادات المكتملة ربطاً وظيفياً إلى سجل المتعلم.',
      cards: [
        ['مواءمة معايير ISTE', 'تبحث فحوص الدرجات عن سلوكيات تعلم رقمية جاهزة للطلاب: استخدام مسؤول للذكاء الاصطناعي، وبناء معرفة، وتطبيق إبداعي، وتواصل مدعوم بالأدلة.'],
        ['مراجعة إطار UNESCO', 'تُراجع الأدلة وفق محو أمية ذكاء اصطناعي متمحور حول الإنسان، والأخلاقيات، والشمول، والاستعداد العملي للتعلم والعمل.'],
        ['مراجعة قانون الاتحاد الأوروبي للذكاء الاصطناعي', 'تتحقق التقييمات من قدرة المتعلمين على إدراك المخاطر والحدود وواجبات الشفافية والاستخدام المناسب عندما تؤثر أنظمة الذكاء الاصطناعي في الناس.'],
        ['مواءمة NIST AI RMF', 'تُقارن الأدلة بسلوكيات الحوكمة والتخطيط والقياس والإدارة حتى يشرح المتعلمون المخاطر والتقييم والتخفيف.'],
        ['ربط O*NET الوظيفي', 'عند إكمال الشهادة، يربط السجل القدرة المثبتة في الذكاء الاصطناعي بأنشطة العمل والمهارات وأدلة الدور.'],
        ['ربط مهارات WEF', 'تربط سجلات الشهادات أيضاً الأدلة بمهارات العمل مثل التفكير التحليلي، والثقافة التقنية، والقدرة على التكيف، والحكم.']
      ]
    },
    employers: {
      eyebrow: 'أصحاب العمل',
      title: 'وظّف بناءً على قدرة مثبتة في الذكاء الاصطناعي، لا على ثقة ذاتية فقط.',
      copy: 'يحوّل The Ladder AI التدريب إلى أدلة قابلة للمراجعة كي يرى المديرون ما حاول المتعلم فعله، وكيف فكّر، وأين أصبح جاهزاً للمساهمة.',
      outcomes: [
        ['إشارات جاهزة للدور', 'تربط الشهادات إتقان الذكاء الاصطناعي بحالات استخدام العمل، لا بمجرد إكمال دورة عامة.'],
        ['أدلة قابلة للمراجعة', 'تظهر السجلات المحادثة ومعايير التقييم والتحقق والنتيجة.'],
        ['تدريب فرق قابل للتكرار', 'يمكن للفرق استخدام السلم نفسه للتأهيل، ورفع المهارات، وانتقالات الأدوار، والتنقل الداخلي.']
      ],
      steps: [
        ['ارسم خريطة الدور', 'اختر المفاهيم والمنتجات وحالات الاستخدام التي تطابق العمل المطلوب فعلاً.'],
        ['وثّق الجاهزية', 'تنتج الاختبارات الموثقة شهادة يستطيع المديرون والمشرفون والمدارس فحصها.'],
        ['قيّم النتائج', 'بعد الشهادة، اطبع السجل واستخدم الأدلة المربوطة لتوجيه أسئلة المقابلات ومقارنة ملاءمة الدور ومراجعة الجاهزية.']
      ]
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'أسئلة يطرحها الزوار غالباً أولاً.',
      items: [
        ['هل أحتاج إلى حساب؟', 'يمكنك استكشاف المسار أولاً. يتطلب حفظ التقدم والشهادات وسجلات الأدلة حساباً.'],
        ['هل هذا مجرد كتالوج دورات آخر؟', 'لا. طبقة المنتج هي مساحة عمل موجهة: تحديد مستوى، ومحادثات تدريب، وإعداد اختبار، والتحقق من الشهادات.'],
        ['ما الذي يجعل الشهادة موثوقة؟', 'ترتبط الشهادات بتقييم مباشر ومرحلة تحقق مستقلة، مع أدلة مصممة للمراجعة.'],
        ['هل يمكن للفرق استخدامه؟', 'نعم. صُممت البنية للمتعلمين وأصحاب العمل والمدارس والمنظمات التي تحتاج إلى إشارات جاهزية متكررة للذكاء الاصطناعي.']
      ],
      finalEyebrow: 'هل أنت مستعد للصعود؟',
      finalTitle: 'اعثر على الدرجة التي يجب أن يبدأ منها تدريبك في الذكاء الاصطناعي.'
    },
    footer: ['The Ladder AI', 'إطار الشهادة', 'مساحة العمل', '© 2026 AESOP AI Academy'],
    auth: {
      invalidEmail: 'أدخل عنوان بريد إلكتروني صالحاً.',
      unavailable: 'التسجيل غير متاح حالياً. حاول مرة أخرى قريباً.',
      checkEmail: 'تحقق من <b>{email}</b> للحصول على رابط تأكيد البريد الإلكتروني وإكمال إنشاء حسابك.',
      sendFailed: 'تعذر إرسال الرابط ({code}). حاول مرة أخرى.',
      signinFailed: 'فشل تسجيل الدخول - تحقق من بريدك الإلكتروني وكلمة المرور.'
    }
  },
  hi: {
    title: 'The Ladder AI - सत्यापित AI प्रशिक्षण',
    description: 'AI प्रशिक्षण और प्रमाणन जो प्लेसमेंट, निर्देशित अभ्यास, सत्यापित परीक्षाओं और प्रमाण रिकॉर्ड के साथ व्यावहारिक क्षमता सिद्ध करता है।',
    ogDescription: 'सीखने वालों, टीमों और नियोक्ताओं के लिए प्लेसमेंट, निर्देशित AI प्रशिक्षण, सत्यापित प्रमाणन और प्रमाण रिकॉर्ड।',
    nav: ['यह कैसे काम करता है', 'मार्ग', 'प्रमाणन', 'मानक', 'नियोक्ता', 'FAQ'],
    findRung: 'अपनी शुरुआती सीढ़ी खोजें',
    findRungArrow: 'अपनी शुरुआती सीढ़ी खोजें →',
    hero: {
      eyebrow: 'AI क्षमता जिसे आप साबित कर सकते हैं',
      title: 'उस AI काम के लिए प्रशिक्षण लें जिसकी कंपनियों को वास्तव में जरूरत है।',
      copy: 'The Ladder AI हर सीखने वाले का स्तर तय करता है, उन्हें व्यावहारिक बातचीत से मार्गदर्शन देता है, और ऐसे प्रमाणों के साथ क्रेडेंशियल सत्यापित करता है जिन्हें स्कूल, टीम या नियोक्ता देख सकते हैं।',
      secondary: 'The Ladder पर प्रमाणित क्यों हों?'
    },
    signup: {
      aria: 'सीखने वाले का साइन अप और साइन इन',
      eyebrow: 'प्रशिक्षित हों। प्रमाणित हों।',
      title: 'अभी सीखना शुरू करें।',
      emailPlaceholder: 'अपना ईमेल दर्ज करें',
      emailLabel: 'ईमेल पता',
      signup: 'साइन अप',
      toggle: 'पहले से खाता है? साइन इन करें',
      signinEmailPlaceholder: 'ईमेल',
      signinEmailLabel: 'ईमेल',
      passwordPlaceholder: 'पासवर्ड',
      passwordLabel: 'पासवर्ड',
      signin: 'साइन इन',
      signedInAs: 'इस रूप में साइन इन',
      workspace: 'वर्कस्पेस पर जाएँ',
      signout: 'साइन आउट'
    },
    how: {
      eyebrow: 'यह कैसे काम करता है',
      title: 'एक सीढ़ी। तीन व्यावहारिक कदम।',
      steps: [
        ['स्थान तय करें', 'एक छोटी आकलन बातचीत पहचानती है कि सीखने वाला पहले से क्या समझता है और प्रशिक्षण कहाँ से शुरू होना चाहिए।'],
        ['प्रशिक्षण लें', 'निर्देशित बातचीत हर सीढ़ी को अवधारणाओं, उत्पादों और वास्तविक उपयोग मामलों में सिखाती, चुनौती देती और लागू कराती है।'],
        ['प्रमाणित हों', 'क्रेडेंशियल दर्ज होने से पहले लाइव परीक्षाओं की स्वतंत्र सत्यापन समीक्षा होती है।']
      ],
      problemEyebrow: 'समस्या',
      problemTitle: 'AI दक्षता का दावा करना आसान है, सत्यापित करना कठिन।',
      problems: [
        ['सीखने वालों को दिशा चाहिए।', 'अधिकतर लोग नहीं जानते कि वे कहाँ खड़े हैं, क्या छोड़ सकते हैं या आगे क्या अभ्यास करना चाहिए।'],
        ['नियोक्ताओं को प्रमाण चाहिए।', 'बैज पर्याप्त नहीं है जब तक वह यह न बताए कि क्या परखा गया और परिणाम कैसे जाँचा गया।'],
        ['स्कूलों को संरचना चाहिए।', 'AI प्रशिक्षण को अवधारणाओं, उत्पादों और उपयोग मामलों को जोड़ना होगा, केवल लिंक की सूची नहीं बनना होगा।']
      ]
    },
    pathways: {
      eyebrow: 'मार्ग',
      title: 'पूरे AI स्टैक को प्रशिक्षित करें।',
      copy: 'AI अवधारणाओं, उत्पादों और कार्यस्थल उपयोग मामलों के लिए एक ही संरचना का उपयोग करें।',
      outcomes: [
        ['सीखने वालों के लिए', 'जानें आगे क्या सीखना है, गाइड के साथ अभ्यास करें, और अपनी क्षमता के प्रमाण के साथ आगे बढ़ें।'],
        ['नियोक्ताओं के लिए', 'ऐसे क्रेडेंशियल देखें जो परिणाम को परीक्षा, मानकों और प्रदर्शित क्षमता से जोड़ते हैं।'],
        ['स्कूलों और टीमों के लिए', 'लोगों को AI अवधारणाओं, उत्पादों और कार्यस्थल उपयोग मामलों में दोहराने योग्य मार्ग दें।']
      ],
      cards: [
        ['AI अवधारणाएँ', 'प्रॉम्प्टिंग, तर्क, मूल्यांकन, जोखिम, ऑटोमेशन और व्यावहारिक AI साक्षरता।'],
        ['AI उत्पाद', 'असिस्टेंट, कोडिंग टूल, क्रिएटिव सूट, रिसर्च सिस्टम और वे प्लेटफ़ॉर्म जिन्हें लोग इस्तेमाल करते हैं।'],
        ['उपयोग मामले', 'शिक्षा, संचालन, कानून, स्वास्थ्य, रचनात्मकता, नेतृत्व और सार्वजनिक सेवा में वर्कफ़्लो।']
      ]
    },
    proof: {
      trust: [
        ['प्रस्तुतकर्ता', 'AESOP AI Academy'],
        ['पेटेंट लंबित इंजन', 'यू.एस. प्रोविजनल पेटेंट आवेदन संख्या 64/085,986'],
        ['अनुकूली मौखिक परीक्षाएँ', 'तीन mastery मार्ग'],
        ['मानकों से मैप किया गया', 'ट्रांसक्रिप्ट प्रमाण']
      ],
      eyebrow: 'प्रमाणन',
      title: 'प्रमाणन केवल पूरा करने पर नहीं, प्रदर्शन पर आधारित है।',
      copy: 'हर क्रेडेंशियल यह दिखाने के लिए बनाया गया है कि क्या प्रयास किया गया, सीखने वाले ने कैसे उत्तर दिया, कौन सा मानक मूल्यांकित हुआ और क्या परिणाम स्वतंत्र रूप से सत्यापित हुआ।',
      facts: [
        ['परीक्षा प्रकार', 'लाइव AI मौखिक आकलन'],
        ['सत्यापन', 'स्वतंत्र दूसरे मॉडल की समीक्षा'],
        ['प्रमाण', 'ट्रांसक्रिप्ट-तैयार प्रदर्शन रिकॉर्ड'],
        ['स्तर', 'Core, Expert और Mastery मार्ग']
      ]
    },
    standards: {
      eyebrow: 'मानक',
      title: 'हर सीढ़ी जाँचे जा सकने वाले मानदंडों से जुड़ी है।',
      copy: 'हर सीढ़ी प्रशिक्षण प्रमाण की मानक समीक्षा के साथ समाप्त होती है। पूर्ण प्रमाणन सीखने वाले के ट्रांसक्रिप्ट में रोजगार मैपिंग जोड़ते हैं।',
      cards: [
        ['ISTE मानक संरेखण', 'सीढ़ी जाँच जिम्मेदार AI उपयोग, ज्ञान निर्माण, रचनात्मक अनुप्रयोग और प्रमाण-आधारित संचार जैसे डिजिटल सीखने के व्यवहार देखती है।'],
        ['UNESCO फ्रेमवर्क समीक्षा', 'प्रमाण को मानव-केंद्रित AI साक्षरता, नैतिकता, समावेशन और व्यावहारिक तैयारी के आधार पर देखा जाता है।'],
        ['EU AI Act समीक्षा', 'मूल्यांकन जाँचते हैं कि सीखने वाले जोखिम, सीमाएँ, पारदर्शिता कर्तव्य और उचित उपयोग पहचानते हैं या नहीं।'],
        ['NIST AI RMF संरेखण', 'प्रमाण को govern, map, measure और manage व्यवहारों से मिलाया जाता है ताकि जोखिम, मूल्यांकन और शमन समझाया जा सके।'],
        ['O*NET रोजगार मैपिंग', 'प्रमाणन पूरा होने पर ट्रांसक्रिप्ट प्रदर्शित AI क्षमता को कार्य गतिविधियों, कौशल और भूमिका प्रमाण से जोड़ता है।'],
        ['WEF कौशल मैपिंग', 'पूर्ण प्रमाणन ट्रांसक्रिप्ट प्रमाण को विश्लेषणात्मक सोच, तकनीकी साक्षरता, अनुकूलनशीलता और निर्णय जैसे कौशलों से जोड़ते हैं।']
      ]
    },
    employers: {
      eyebrow: 'नियोक्ता',
      title: 'स्व-घोषित आत्मविश्वास नहीं, प्रदर्शित AI क्षमता के आधार पर नियुक्ति करें।',
      copy: 'The Ladder AI प्रशिक्षण को समीक्षा योग्य प्रमाण में बदलता है ताकि प्रबंधक देख सकें कि सीखने वाले ने क्या प्रयास किया, कैसे सोचा और कहाँ योगदान के लिए तैयार है।',
      outcomes: [
        ['भूमिका-तैयार संकेत', 'क्रेडेंशियल AI दक्षता को कार्यस्थल उपयोग मामलों से जोड़ते हैं, सामान्य कोर्स पूर्णता से नहीं।'],
        ['समीक्षा योग्य प्रमाण', 'ट्रांसक्रिप्ट बातचीत, मूल्यांकन मानदंड, सत्यापन और परिणाम दिखाते हैं।'],
        ['दोहराने योग्य टीम प्रशिक्षण', 'टीमें onboarding, upskilling, भूमिका परिवर्तन और आंतरिक गतिशीलता में उसी सीढ़ी का उपयोग कर सकती हैं।']
      ],
      steps: [
        ['भूमिका मैप करें', 'ऐसी अवधारणाएँ, उत्पाद और उपयोग मामले चुनें जो वास्तविक काम से मेल खाते हों।'],
        ['तैयारी प्रमाणित करें', 'सत्यापित परीक्षाएँ ऐसा क्रेडेंशियल देती हैं जिसे hiring managers, supervisors और schools देख सकते हैं।'],
        ['परिणाम मूल्यांकित करें', 'प्रमाणन के बाद ट्रांसक्रिप्ट प्रिंट करें और मैप किए प्रमाण से इंटरव्यू प्रश्न, भूमिका फिट और तैयारी की समीक्षा करें।']
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'वे प्रश्न जो आगंतुक अक्सर पहले पूछते हैं।',
      items: [
        ['क्या मुझे खाते की जरूरत है?', 'आप पहले प्रवाह देख सकते हैं। प्रगति, प्रमाणन और प्रमाण रिकॉर्ड सहेजने के लिए खाते की जरूरत होती है।'],
        ['क्या यह सिर्फ एक और कोर्स कैटलॉग है?', 'नहीं। उत्पाद परत एक निर्देशित वर्कस्पेस है: प्लेसमेंट, प्रशिक्षण बातचीत, परीक्षा कॉन्फ़िगरेशन और क्रेडेंशियल सत्यापन।'],
        ['क्रेडेंशियल विश्वसनीय क्यों है?', 'क्रेडेंशियल लाइव आकलन और स्वतंत्र सत्यापन से जुड़े होते हैं, और समीक्षा के लिए प्रमाण देते हैं।'],
        ['क्या टीमें इसका उपयोग कर सकती हैं?', 'हाँ। यह संरचना सीखने वालों, नियोक्ताओं, स्कूलों और संगठनों के लिए है जिन्हें दोहराने योग्य AI तैयारी संकेत चाहिए।']
      ],
      finalEyebrow: 'चढ़ने के लिए तैयार?',
      finalTitle: 'वह सीढ़ी खोजें जहाँ आपका AI प्रशिक्षण शुरू होना चाहिए।'
    },
    footer: ['The Ladder AI', 'प्रमाणन ढाँचा', 'वर्कस्पेस', '© 2026 AESOP AI Academy'],
    auth: {
      invalidEmail: 'मान्य ईमेल पता दर्ज करें।',
      unavailable: 'साइन-अप अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद प्रयास करें।',
      checkEmail: 'अपना ईमेल सत्यापित करने और खाता पूरा करने के लिए <b>{email}</b> देखें।',
      sendFailed: 'लिंक नहीं भेजा जा सका ({code})। कृपया फिर प्रयास करें।',
      signinFailed: 'साइन इन विफल - अपना ईमेल और पासवर्ड जाँचें।'
    }
  },
  ja: {
    title: 'The Ladder AI - 証明できるAIトレーニング',
    description: '配置、ガイド付き練習、検証済み試験、証拠記録によって実践的能力を証明するAIトレーニングと認定。',
    ogDescription: '学習者、チーム、雇用者のための配置、ガイド付きAIトレーニング、検証済み認定、証拠記録。',
    nav: ['仕組み', 'パスウェイ', '認定', '基準', '雇用者', 'FAQ'],
    findRung: '開始する段を見つける',
    findRungArrow: '開始する段を見つける →',
    hero: {
      eyebrow: '証明できるAI能力',
      title: '企業が本当に必要とするAI業務のためにトレーニングする。',
      copy: 'The Ladder AIは各学習者を配置し、実践的な会話で導き、学校・チーム・雇用者が確認できる証拠で資格を検証します。',
      secondary: 'The Ladderで認定を受ける理由'
    },
    signup: {
      aria: '学習者の登録とログイン',
      eyebrow: '学ぶ。認定を受ける。',
      title: '今すぐ学習を始める。',
      emailPlaceholder: 'メールアドレスを入力',
      emailLabel: 'メールアドレス',
      signup: '登録',
      toggle: 'すでにアカウントがありますか？ログイン',
      signinEmailPlaceholder: 'メール',
      signinEmailLabel: 'メール',
      passwordPlaceholder: 'パスワード',
      passwordLabel: 'パスワード',
      signin: 'ログイン',
      signedInAs: 'ログイン中:',
      workspace: 'ワークスペースへ進む',
      signout: 'ログアウト'
    },
    how: {
      eyebrow: '仕組み',
      title: '1つのラダー。3つの実践ステップ。',
      steps: [
        ['配置', '短い評価会話で、学習者がすでに理解していることと、どこから始めるべきかを特定します。'],
        ['トレーニング', 'ガイド付き会話が、概念、製品、実際のユースケースに沿って各段を教え、挑戦させ、応用します。'],
        ['認定', 'ライブ試験は、資格が記録される前に独立した検証を受けます。']
      ],
      problemEyebrow: '課題',
      problemTitle: 'AIリテラシーは主張しやすく、検証しにくい。',
      problems: [
        ['学習者には方向性が必要です。', '多くの人は、自分の現在地、飛ばせる内容、次に練習すべき内容を知りません。'],
        ['雇用者には証拠が必要です。', '何が試され、結果がどう確認されたかを説明しないバッジだけでは不十分です。'],
        ['学校には構造が必要です。', 'AIトレーニングは、概念、製品、ユースケースを単なるリンク集にせず結びつける必要があります。']
      ]
    },
    pathways: {
      eyebrow: 'パスウェイ',
      title: 'AIスタック全体をトレーニングする。',
      copy: 'AI概念、製品、職場のユースケースに1つの構造を使います。',
      outcomes: [
        ['学習者へ', '次に何を学ぶべきかを知り、ガイドと練習し、できることの証拠を残せます。'],
        ['雇用者へ', '結果を試験、基準、実証された能力に結びつける資格を確認できます。'],
        ['学校とチームへ', 'AI概念、製品、職場ユースケースを通る再現可能な道筋を提供できます。']
      ],
      cards: [
        ['AI概念', 'プロンプト、推論、評価、リスク、自動化、実践的AIリテラシー。'],
        ['AI製品', 'アシスタント、コーディングツール、クリエイティブスイート、研究システム、利用されるプラットフォーム。'],
        ['ユースケース', '教育、運用、法律、医療、創造、リーダーシップ、公共サービスのワークフロー。']
      ]
    },
    proof: {
      trust: [
        ['提供', 'AESOP AI Academy'],
        ['特許出願中エンジン', '米国仮特許出願番号 64/085,986'],
        ['適応型口頭試験', '3つの習熟パス'],
        ['基準にマッピング', '成績証明用の証拠']
      ],
      eyebrow: '認定',
      title: '認定は修了だけでなく、パフォーマンスに基づきます。',
      copy: '各資格は、何を試みたか、学習者がどう応答したか、どの基準が評価されたか、結果が独立して検証されたかを示すよう設計されています。',
      facts: [
        ['試験タイプ', 'ライブAI口頭評価'],
        ['検証', '独立した第2モデルレビュー'],
        ['証拠', '成績証明に使えるパフォーマンス記録'],
        ['レベル', 'Core、Expert、Masteryパス']
      ]
    },
    standards: {
      eyebrow: '基準',
      title: 'すべての段は確認可能な基準に結びついています。',
      copy: '各段はトレーニング証拠の基準レビューで終わります。完了した認定は、学習者の成績記録に雇用マッピングを追加します。',
      cards: [
        ['ISTE基準との整合', '責任あるAI利用、知識構築、創造的応用、証拠に基づくコミュニケーションなど、学生向けデジタル学習行動を確認します。'],
        ['UNESCOフレームワークレビュー', '人間中心のAIリテラシー、倫理、包摂、学習と仕事での実践的準備を確認します。'],
        ['EU AI Actレビュー', 'AIが人に影響する場面で、リスク、限界、透明性義務、適切な利用を認識できるかを確認します。'],
        ['NIST AI RMF整合', 'govern、map、measure、manageの行動と比較し、リスク、評価、軽減を説明できるようにします。'],
        ['O*NET雇用マッピング', '認定完了時、証明されたAI能力を作業活動、スキル、役割証拠に結びつけます。'],
        ['WEFスキルマッピング', '認定記録は、分析的思考、技術リテラシー、適応力、判断力などの職業スキルにも証拠を結びつけます。']
      ]
    },
    employers: {
      eyebrow: '雇用者',
      title: '自己申告の自信ではなく、実証されたAI能力で採用する。',
      copy: 'The Ladder AIはトレーニングを確認可能な証拠に変え、管理者が学習者の試行、推論、貢献可能な領域を見られるようにします。',
      outcomes: [
        ['役割に対応したシグナル', '資格は一般的なコース修了ではなく、AIリテラシーを職場ユースケースに結びつけます。'],
        ['確認可能な証拠', '記録には会話、評価基準、検証、結果が表示されます。'],
        ['再現可能なチーム研修', 'チームはオンボーディング、スキル向上、役割移行、社内移動に同じラダーを使えます。']
      ],
      steps: [
        ['役割をマッピング', '実際に必要な仕事に合う概念、製品、ユースケースを選びます。'],
        ['準備状況を認定', '検証済み試験は、採用担当者、上司、学校が確認できる資格を生成します。'],
        ['結果を評価', '認定後、記録を印刷し、マッピングされた証拠を面接質問、役割適合、準備状況の確認に使います。']
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: '訪問者が最初によく尋ねる質問。',
      items: [
        ['アカウントは必要ですか？', 'まず流れを試すことができます。進捗、認定、証拠記録の保存にはアカウントが必要です。'],
        ['単なるコースカタログですか？', 'いいえ。製品レイヤーは、配置、トレーニング会話、試験設定、資格検証を備えたガイド付きワークスペースです。'],
        ['資格が信頼できる理由は？', '資格はライブ評価と独立検証に結びつき、レビュー用の証拠を伴います。'],
        ['チームでも使えますか？', 'はい。学習者、雇用者、学校、組織が再現可能なAI準備シグナルを得るための構造です。']
      ],
      finalEyebrow: '登る準備はできましたか？',
      finalTitle: 'AIトレーニングを始めるべき段を見つけましょう。'
    },
    footer: ['The Ladder AI', '認定フレームワーク', 'ワークスペース', '© 2026 AESOP AI Academy'],
    auth: {
      invalidEmail: '有効なメールアドレスを入力してください。',
      unavailable: '現在サインアップできません。しばらくしてからもう一度お試しください。',
      checkEmail: '<b>{email}</b>を確認して、メール認証とアカウント作成を完了してください。',
      sendFailed: 'リンクを送信できませんでした（{code}）。もう一度お試しください。',
      signinFailed: 'ログインに失敗しました - メールとパスワードを確認してください。'
    }
  },
  ko: {
    title: 'The Ladder AI - 검증 가능한 AI 교육',
    description: '배치, 안내형 실습, 검증된 시험, 증거 기록으로 실무 역량을 입증하는 AI 교육과 인증.',
    ogDescription: '학습자, 팀, 고용주를 위한 배치, 안내형 AI 교육, 검증된 인증, 증거 기록.',
    nav: ['작동 방식', '경로', '인증', '표준', '고용주', 'FAQ'],
    findRung: '시작 단계 찾기',
    findRungArrow: '시작 단계 찾기 →',
    hero: {
      eyebrow: '증명할 수 있는 AI 역량',
      title: '기업이 실제로 필요로 하는 AI 업무를 위해 훈련하세요.',
      copy: 'The Ladder AI는 각 학습자를 배치하고, 실용적인 대화를 통해 안내하며, 학교·팀·고용주가 검토할 수 있는 증거로 자격을 검증합니다.',
      secondary: '왜 The Ladder에서 인증을 받을까요?'
    },
    signup: {
      aria: '학습자 가입 및 로그인',
      eyebrow: '훈련받고. 인증받으세요.',
      title: '지금 학습을 시작하세요.',
      emailPlaceholder: '이메일 입력',
      emailLabel: '이메일 주소',
      signup: '가입하기',
      toggle: '이미 계정이 있나요? 로그인',
      signinEmailPlaceholder: '이메일',
      signinEmailLabel: '이메일',
      passwordPlaceholder: '비밀번호',
      passwordLabel: '비밀번호',
      signin: '로그인',
      signedInAs: '로그인:',
      workspace: '워크스페이스로 계속',
      signout: '로그아웃'
    },
    how: {
      eyebrow: '작동 방식',
      title: '하나의 사다리. 세 가지 실천 단계.',
      steps: [
        ['배치', '짧은 평가 대화가 학습자가 이미 이해한 것과 교육을 시작할 지점을 파악합니다.'],
        ['훈련', '안내형 대화가 각 단계를 개념, 제품, 실제 사용 사례에 맞게 가르치고 도전하게 하며 적용합니다.'],
        ['인증', '실시간 시험은 자격이 기록되기 전에 독립 검증을 거칩니다.']
      ],
      problemEyebrow: '문제',
      problemTitle: 'AI 유창성은 주장하기 쉽지만 검증하기 어렵습니다.',
      problems: [
        ['학습자는 방향이 필요합니다.', '대부분은 자신의 위치, 건너뛸 내용, 다음에 연습할 내용을 모릅니다.'],
        ['고용주는 증거가 필요합니다.', '무엇을 시험했고 결과가 어떻게 확인되었는지 설명하지 않는 배지는 충분하지 않습니다.'],
        ['학교에는 구조가 필요합니다.', 'AI 교육은 개념, 제품, 사용 사례를 단순한 링크 목록이 아닌 구조로 연결해야 합니다.']
      ]
    },
    pathways: {
      eyebrow: '경로',
      title: '전체 AI 스택을 훈련하세요.',
      copy: 'AI 개념, 제품, 직장 사용 사례에 하나의 구조를 사용하세요.',
      outcomes: [
        ['학습자에게', '다음에 무엇을 배울지 알고, 안내자와 연습하며, 할 수 있는 일의 증거를 남깁니다.'],
        ['고용주에게', '결과를 시험, 표준, 입증된 역량과 연결하는 자격을 검토합니다.'],
        ['학교와 팀에게', 'AI 개념, 제품, 직장 사용 사례를 통과하는 반복 가능한 경로를 제공합니다.']
      ],
      cards: [
        ['AI 개념', '프롬프트, 추론, 평가, 위험, 자동화, 실용 AI 리터러시.'],
        ['AI 제품', '사람들이 사용하는 어시스턴트, 코딩 도구, 창작 도구, 연구 시스템, 플랫폼.'],
        ['사용 사례', '교육, 운영, 법률, 의료, 창작, 리더십, 공공서비스의 워크플로.']
      ]
    },
    proof: {
      trust: [
        ['제공', 'AESOP AI Academy'],
        ['특허 출원 중 엔진', '미국 임시 특허 출원 번호 64/085,986'],
        ['적응형 구술 시험', '세 가지 숙련 경로'],
        ['표준 매핑', '성적 기록 증거']
      ],
      eyebrow: '인증',
      title: '인증은 완료만이 아니라 수행 능력을 기준으로 합니다.',
      copy: '각 자격은 무엇을 시도했는지, 학습자가 어떻게 응답했는지, 어떤 표준이 평가되었는지, 결과가 독립적으로 검증되었는지를 보여주도록 설계되었습니다.',
      facts: [
        ['시험 유형', '실시간 AI 구술 평가'],
        ['검증', '독립적인 두 번째 모델 검토'],
        ['증거', '성적 기록용 수행 기록'],
        ['수준', 'Core, Expert, Mastery 경로']
      ]
    },
    standards: {
      eyebrow: '표준',
      title: '모든 단계는 확인 가능한 기준과 연결됩니다.',
      copy: '각 단계는 교육 증거의 표준 검토로 끝납니다. 완료된 인증은 학습자 기록에 고용 매핑을 추가합니다.',
      cards: [
        ['ISTE 표준 정렬', '책임 있는 AI 사용, 지식 구성, 창의적 적용, 증거 기반 소통 등 학생 준비형 디지털 학습 행동을 확인합니다.'],
        ['UNESCO 프레임워크 검토', '인간 중심 AI 리터러시, 윤리, 포용, 학습과 업무 맥락의 실무 준비도를 검토합니다.'],
        ['EU AI Act 검토', 'AI 시스템이 사람에게 영향을 줄 때 위험, 한계, 투명성 의무, 적절한 사용을 인식하는지 확인합니다.'],
        ['NIST AI RMF 정렬', 'govern, map, measure, manage 행동과 비교하여 위험, 평가, 완화 설명 능력을 확인합니다.'],
        ['O*NET 고용 매핑', '인증 완료 시 기록은 입증된 AI 역량을 업무 활동, 기술, 역할 증거와 연결합니다.'],
        ['WEF 기술 매핑', '완료된 인증 기록은 분석적 사고, 기술 리터러시, 적응성, 판단력 같은 업무 기술과 증거를 연결합니다.']
      ]
    },
    employers: {
      eyebrow: '고용주',
      title: '자기 보고식 자신감이 아니라 입증된 AI 역량으로 채용하세요.',
      copy: 'The Ladder AI는 교육을 검토 가능한 증거로 바꾸어 관리자가 학습자가 무엇을 시도했고 어떻게 추론했으며 어디에서 기여할 준비가 되었는지 볼 수 있게 합니다.',
      outcomes: [
        ['역할 준비 신호', '자격은 일반 과정 완료가 아니라 AI 유창성을 직장 사용 사례와 연결합니다.'],
        ['검토 가능한 증거', '기록은 대화, 평가 기준, 검증, 결과를 보여줍니다.'],
        ['반복 가능한 팀 교육', '팀은 온보딩, 업스킬링, 역할 전환, 내부 이동에 같은 사다리를 사용할 수 있습니다.']
      ],
      steps: [
        ['역할 매핑', '실제 업무와 맞는 개념, 제품, 사용 사례를 선택합니다.'],
        ['준비도 인증', '검증된 시험은 채용 관리자, 감독자, 학교가 확인할 수 있는 자격을 만듭니다.'],
        ['결과 평가', '인증 후 기록을 인쇄하고 매핑된 증거를 면접 질문, 역할 적합성, 준비도 검토에 사용합니다.']
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: '방문자가 먼저 자주 묻는 질문.',
      items: [
        ['계정이 필요한가요?', '먼저 흐름을 탐색할 수 있습니다. 진행 상황, 인증, 증거 기록 저장에는 계정이 필요합니다.'],
        ['그냥 또 다른 과정 카탈로그인가요?', '아닙니다. 제품 레이어는 배치, 훈련 대화, 시험 설정, 자격 검증이 있는 안내형 워크스페이스입니다.'],
        ['자격을 신뢰할 수 있는 이유는 무엇인가요?', '자격은 실시간 평가와 독립 검증에 연결되며, 검토 가능한 증거를 제공합니다.'],
        ['팀도 사용할 수 있나요?', '예. 이 구조는 반복 가능한 AI 준비 신호가 필요한 학습자, 고용주, 학교, 조직을 위해 설계되었습니다.']
      ],
      finalEyebrow: '올라갈 준비가 되었나요?',
      finalTitle: 'AI 교육을 시작해야 할 단계를 찾으세요.'
    },
    footer: ['The Ladder AI', '인증 프레임워크', '워크스페이스', '© 2026 AESOP AI Academy'],
    auth: {
      invalidEmail: '올바른 이메일 주소를 입력하세요.',
      unavailable: '지금은 가입할 수 없습니다. 잠시 후 다시 시도하세요.',
      checkEmail: '<b>{email}</b>에서 이메일 인증 링크를 확인하고 계정 생성을 완료하세요.',
      sendFailed: '링크를 보낼 수 없습니다({code}). 다시 시도하세요.',
      signinFailed: '로그인 실패 - 이메일과 비밀번호를 확인하세요.'
    }
  },
  pt: {
    title: 'The Ladder AI - Treinamento em IA verificável',
    description: 'Treinamento e certificação em IA que provam capacidade prática com posicionamento, prática guiada, exames validados e registros de evidência.',
    ogDescription: 'Posicionamento, treinamento guiado em IA, certificação validada e registros de evidência para alunos, equipes e empregadores.',
    nav: ['Como funciona', 'Trilhas', 'Certificação', 'Padrões', 'Empregadores', 'FAQ'],
    findRung: 'Encontre seu degrau inicial',
    findRungArrow: 'Encontre seu degrau inicial →',
    hero: {
      eyebrow: 'Capacidade em IA que você pode provar',
      title: 'Treine para o trabalho com IA que as empresas realmente precisam.',
      copy: 'The Ladder AI posiciona cada aluno, guia conversas práticas e valida credenciais com evidências que uma escola, equipe ou empregador pode revisar.',
      secondary: 'Por que certificar no The Ladder?'
    },
    signup: {
      aria: 'Cadastro e login do aluno',
      eyebrow: 'Treine. Certifique-se.',
      title: 'Comece a aprender agora.',
      emailPlaceholder: 'Digite seu e-mail',
      emailLabel: 'Endereço de e-mail',
      signup: 'Cadastrar',
      toggle: 'Já tem uma conta? Entrar',
      signinEmailPlaceholder: 'E-mail',
      signinEmailLabel: 'E-mail',
      passwordPlaceholder: 'Senha',
      passwordLabel: 'Senha',
      signin: 'Entrar',
      signedInAs: 'Conectado como',
      workspace: 'Continuar para o workspace',
      signout: 'Sair'
    },
    how: {
      eyebrow: 'Como funciona',
      title: 'Uma escada. Três etapas práticas.',
      steps: [
        ['Posicionar', 'Uma conversa curta de avaliação identifica o que o aluno já entende e onde o treinamento deve começar.'],
        ['Treinar', 'Conversas guiadas ensinam, desafiam e aplicam cada degrau em conceitos, produtos e casos de uso reais.'],
        ['Certificar', 'Exames ao vivo são revisados por validação independente antes de as credenciais serem registradas.']
      ],
      problemEyebrow: 'O problema',
      problemTitle: 'Fluência em IA é fácil de alegar e difícil de verificar.',
      problems: [
        ['Alunos precisam de direção.', 'A maioria não sabe onde está, o que pular ou o que praticar em seguida.'],
        ['Empregadores precisam de evidência.', 'Um badge não basta se não explicar o que foi testado e como o resultado foi verificado.'],
        ['Escolas precisam de estrutura.', 'Treinamento em IA precisa conectar conceitos, produtos e casos de uso sem virar uma pilha de links.']
      ]
    },
    pathways: {
      eyebrow: 'Trilhas',
      title: 'Treine toda a pilha de IA.',
      copy: 'Use uma estrutura para conceitos de IA, produtos e casos de uso no trabalho.',
      outcomes: [
        ['Para alunos', 'Saiba o que aprender depois, pratique com um guia e saia com evidência do que consegue fazer.'],
        ['Para empregadores', 'Revise credenciais que conectam um resultado a um exame, padrões e capacidade demonstrada.'],
        ['Para escolas e equipes', 'Ofereça um caminho repetível por conceitos, produtos e casos de uso de IA no trabalho.']
      ],
      cards: [
        ['Conceitos de IA', 'Prompts, raciocínio, avaliação, risco, automação e alfabetização prática em IA.'],
        ['Produtos de IA', 'Assistentes, ferramentas de código, suítes criativas, sistemas de pesquisa e plataformas usadas pelas pessoas.'],
        ['Casos de uso', 'Fluxos de trabalho em educação, operações, direito, saúde, criatividade, liderança e serviço público.']
      ]
    },
    proof: {
      trust: [
        ['Criado por', 'AESOP AI Academy'],
        ['Motor com patente pendente', 'Pedido provisório de patente dos EUA nº 64/085,986'],
        ['Exames orais adaptativos', 'Três trilhas de domínio'],
        ['Mapeado a padrões', 'Evidência para transcrição']
      ],
      eyebrow: 'Certificação',
      title: 'A certificação se baseia em desempenho, não apenas em conclusão.',
      copy: 'Cada credencial mostra o que foi tentado, como o aluno respondeu, qual padrão foi avaliado e se o resultado foi validado de forma independente.',
      facts: [
        ['Tipo de exame', 'Avaliação oral ao vivo com IA'],
        ['Validação', 'Revisão independente por segundo modelo'],
        ['Evidência', 'Registro de desempenho pronto para transcrição'],
        ['Níveis', 'Trilhas Core, Expert e Mastery']
      ]
    },
    standards: {
      eyebrow: 'Padrões',
      title: 'Cada degrau está ligado a critérios verificáveis.',
      copy: 'Cada degrau termina com uma revisão de padrões da evidência de treinamento. Certificações concluídas adicionam mapeamento de emprego ao histórico do aluno.',
      cards: [
        ['Alinhamento aos padrões ISTE', 'As verificações procuram comportamentos digitais: uso responsável de IA, construção de conhecimento, aplicação criativa e comunicação com evidência.'],
        ['Revisão do framework UNESCO', 'A evidência é revisada para alfabetização em IA centrada no humano, ética, inclusão e prontidão prática.'],
        ['Revisão do EU AI Act', 'As avaliações verificam se alunos reconhecem risco, limites, deveres de transparência e uso adequado quando a IA afeta pessoas.'],
        ['Alinhamento ao NIST AI RMF', 'A evidência é comparada com governar, mapear, medir e gerenciar para explicar risco, avaliação e mitigação.'],
        ['Mapeamento O*NET', 'Ao concluir a certificação, o histórico conecta capacidade demonstrada em IA a atividades, habilidades e evidência de função.'],
        ['Mapeamento de habilidades WEF', 'Históricos certificados também mapeiam evidências a pensamento analítico, letramento tecnológico, adaptabilidade e julgamento.']
      ]
    },
    employers: {
      eyebrow: 'Empregadores',
      title: 'Contrate por capacidade demonstrada em IA, não por confiança autodeclarada.',
      copy: 'The Ladder AI transforma treinamento em evidência revisável para que gestores vejam o que o aluno tentou, como raciocinou e onde está pronto para contribuir.',
      outcomes: [
        ['Sinais prontos para função', 'Credenciais conectam fluência em IA a casos de uso no trabalho, não à conclusão genérica de cursos.'],
        ['Evidência revisável', 'Históricos mostram conversa, critérios de avaliação, validação e resultado.'],
        ['Treinamento de equipe repetível', 'Equipes podem usar a mesma escada em onboarding, upskilling, transições de função e mobilidade interna.']
      ],
      steps: [
        ['Mapear a função', 'Escolha conceitos, produtos e casos de uso que correspondam ao trabalho real.'],
        ['Certificar prontidão', 'Exames validados produzem uma credencial que gestores, supervisores e escolas podem inspecionar.'],
        ['Avaliar resultados', 'Após a certificação, imprima o histórico e use a evidência mapeada para entrevistas, ajuste à função e prontidão.']
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Perguntas que visitantes costumam fazer primeiro.',
      items: [
        ['Preciso de uma conta?', 'Você pode explorar o fluxo primeiro. Salvar progresso, certificação e evidências requer uma conta.'],
        ['É só outro catálogo de cursos?', 'Não. A camada de produto é um workspace guiado: posicionamento, conversas de treinamento, configuração de exame e validação de credenciais.'],
        ['O que torna a credencial confiável?', 'Credenciais são ligadas a avaliação ao vivo e validação independente, com evidência feita para revisão.'],
        ['Equipes podem usar?', 'Sim. A estrutura é para alunos, empregadores, escolas e organizações que precisam de sinais repetíveis de prontidão em IA.']
      ],
      finalEyebrow: 'Pronto para subir?',
      finalTitle: 'Encontre o degrau onde seu treinamento em IA deve começar.'
    },
    footer: ['The Ladder AI', 'Framework de certificação', 'Workspace', '© 2026 AESOP AI Academy'],
    auth: {
      invalidEmail: 'Digite um e-mail válido.',
      unavailable: 'O cadastro não está disponível agora. Tente novamente em breve.',
      checkEmail: 'Verifique <b>{email}</b> para confirmar seu e-mail e terminar de criar sua conta.',
      sendFailed: 'Não foi possível enviar o link ({code}). Tente novamente.',
      signinFailed: 'Falha ao entrar - verifique seu e-mail e senha.'
    }
  },
  'zh-TW': {
    title: 'The Ladder AI - 可驗證的 AI 訓練',
    description: '透過定位、引導練習、驗證考試與證據紀錄，證明實務能力的 AI 訓練與認證。',
    ogDescription: '為學習者、團隊與雇主提供定位、引導式 AI 訓練、驗證認證與證據紀錄。',
    nav: ['運作方式', '路徑', '認證', '標準', '雇主', '常見問題'],
    findRung: '找到你的起始階梯',
    findRungArrow: '找到你的起始階梯 →',
    hero: {
      eyebrow: '可以證明的 AI 能力',
      title: '為企業真正需要的 AI 工作而訓練。',
      copy: 'The Ladder AI 會為每位學習者定位，透過實務對話引導訓練，並用學校、團隊或雇主可審查的證據驗證憑證。',
      secondary: '為什麼在 The Ladder 認證？'
    },
    signup: {
      aria: '學習者註冊與登入',
      eyebrow: '接受訓練。取得認證。',
      title: '立即開始學習。',
      emailPlaceholder: '輸入你的電子郵件',
      emailLabel: '電子郵件地址',
      signup: '註冊',
      toggle: '已經有帳號？登入',
      signinEmailPlaceholder: '電子郵件',
      signinEmailLabel: '電子郵件',
      passwordPlaceholder: '密碼',
      passwordLabel: '密碼',
      signin: '登入',
      signedInAs: '已登入為',
      workspace: '前往工作區',
      signout: '登出'
    },
    how: {
      eyebrow: '運作方式',
      title: '一座階梯。三個實務步驟。',
      steps: [
        ['定位', '短暫的評估對話會找出學習者已理解的內容，以及訓練應從哪裡開始。'],
        ['訓練', '引導式對話會教學、挑戰並應用每一階，涵蓋概念、產品與真實使用案例。'],
        ['認證', '即時考試會在憑證記錄前經過獨立驗證。']
      ],
      problemEyebrow: '問題',
      problemTitle: 'AI 流暢度很容易宣稱，卻很難驗證。',
      problems: [
        ['學習者需要方向。', '大多數人不知道自己在哪裡、能跳過什麼、下一步該練習什麼。'],
        ['雇主需要證據。', '徽章本身不夠，除非它說明測了什麼，以及結果如何被檢查。'],
        ['學校需要結構。', 'AI 訓練必須連結概念、產品與使用案例，而不是變成一堆連結。']
      ]
    },
    pathways: {
      eyebrow: '路徑',
      title: '訓練完整的 AI 堆疊。',
      copy: '用同一套結構涵蓋 AI 概念、產品與工作場景使用案例。',
      outcomes: [
        ['給學習者', '知道下一步該學什麼，跟著引導練習，並留下自己能力的證據。'],
        ['給雇主', '審查能把結果連到考試、標準與已展示能力的憑證。'],
        ['給學校與團隊', '提供可重複的路徑，涵蓋 AI 概念、產品與工作使用案例。']
      ],
      cards: [
        ['AI 概念', '提示、推理、評估、風險、自動化與實務 AI 素養。'],
        ['AI 產品', '人們使用的助理、程式工具、創作套件、研究系統與平台。'],
        ['使用案例', '教育、營運、法律、醫療、創意、領導與公共服務中的工作流程。']
      ]
    },
    proof: {
      trust: [
        ['由此提供', 'AESOP AI Academy'],
        ['專利申請中引擎', '美國臨時專利申請號 64/085,986'],
        ['自適應口試', '三種精熟路徑'],
        ['對應標準', '成績紀錄證據']
      ],
      eyebrow: '認證',
      title: '認證依據表現，而不只是完成課程。',
      copy: '每個憑證都設計成能顯示嘗試了什麼、學習者如何回應、評估了哪個標準，以及結果是否經過獨立驗證。',
      facts: [
        ['考試類型', '即時 AI 口語評估'],
        ['驗證', '獨立第二模型審查'],
        ['證據', '可放入成績紀錄的表現紀錄'],
        ['層級', 'Core、Expert 與 Mastery 路徑']
      ]
    },
    standards: {
      eyebrow: '標準',
      title: '每一階都連到可以檢查的標準。',
      copy: '每一階會以訓練證據的標準審查作結。完成的認證會把就業對應加入學習者紀錄。',
      cards: [
        ['ISTE 標準對齊', '階梯檢查會尋找適合學生的數位學習行為：負責任的 AI 使用、知識建構、創意應用，以及以證據溝通。'],
        ['UNESCO 架構審查', '訓練證據會依人本 AI 素養、倫理、包容與學習工作中的實務準備度審查。'],
        ['EU AI Act 審查', '評估會檢查學習者在 AI 影響人時，是否能辨識風險、限制、透明義務與適當使用。'],
        ['NIST AI RMF 對齊', '證據會與 govern、map、measure、manage 行為比較，讓學習者能解釋風險、評估與緩解。'],
        ['O*NET 就業對應', '完成認證後，紀錄會把已展示的 AI 能力連到工作活動、技能與角色證據。'],
        ['WEF 技能對應', '完成認證的紀錄也會把證據連到分析思考、科技素養、適應力與判斷等工作技能。']
      ]
    },
    employers: {
      eyebrow: '雇主',
      title: '依據已展示的 AI 能力招聘，而不是自我聲稱的信心。',
      copy: 'The Ladder AI 將訓練轉為可審查證據，讓管理者看見學習者嘗試了什麼、如何推理，以及在哪些地方已準備好貢獻。',
      outcomes: [
        ['角色就緒訊號', '憑證把 AI 流暢度連到職場使用案例，而不是一般課程完成。'],
        ['可審查證據', '紀錄顯示對話、評估標準、驗證過程與結果。'],
        ['可重複的團隊訓練', '團隊可在入職、提升技能、角色轉換與內部流動中使用同一座階梯。']
      ],
      steps: [
        ['對應角色', '選擇符合實際工作需求的概念、產品與使用案例。'],
        ['認證準備度', '驗證考試會產生招聘主管、督導與學校可檢查的憑證。'],
        ['評估結果', '認證後列印紀錄，使用對應證據引導面試問題、比較角色適配度並審查準備度。']
      ]
    },
    faq: {
      eyebrow: '常見問題',
      title: '訪客通常會先問的問題。',
      items: [
        ['我需要帳號嗎？', '你可以先探索流程。儲存進度、認證與證據紀錄需要帳號。'],
        ['這只是另一個課程目錄嗎？', '不是。產品層是一個引導式工作區：定位、訓練對話、考試設定與憑證驗證。'],
        ['憑證為何可信？', '憑證連到即時評估與獨立驗證，並附有可供審查的證據。'],
        ['團隊可以使用嗎？', '可以。這套結構是為需要可重複 AI 準備度訊號的學習者、雇主、學校與組織而設計。']
      ],
      finalEyebrow: '準備好攀登了嗎？',
      finalTitle: '找到你的 AI 訓練應該開始的階梯。'
    },
    footer: ['The Ladder AI', '認證架構', '工作區', '© 2026 AESOP AI Academy'],
    auth: {
      invalidEmail: '請輸入有效的電子郵件地址。',
      unavailable: '目前無法註冊。請稍後再試。',
      checkEmail: '請查看 <b>{email}</b>，驗證電子郵件並完成帳號建立。',
      sendFailed: '無法傳送連結（{code}）。請再試一次。',
      signinFailed: '登入失敗 - 請檢查你的電子郵件與密碼。'
    }
  }
};

function tx(code) {
  return TRANSLATIONS[code] || EN;
}

function setText(selector, value, root = document) {
  const node = root.querySelector(selector);
  if (node) node.textContent = value;
}

function setAttr(selector, attr, value, root = document) {
  const node = root.querySelector(selector);
  if (node) node.setAttribute(attr, value);
}

function setPairs(nodes, values) {
  nodes.forEach((node, index) => {
    const value = values[index];
    if (!node || !value) return;
    const h = node.querySelector('h3, strong, dt');
    const p = node.querySelector('p, small, dd');
    if (h) h.textContent = value[0];
    if (p) p.textContent = value[1];
  });
}

function setTrust(values) {
  document.querySelectorAll('.trust-strip span').forEach((node, index) => {
    const value = values[index];
    if (!value) return;
    node.querySelector('strong').textContent = value[0];
    node.querySelector('small').textContent = value[1];
  });
}

function setMeta(name, value) {
  document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', value);
}

function setProperty(prop, value) {
  document.querySelector(`meta[property="${prop}"]`)?.setAttribute('content', value);
}

function currentLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return LANGUAGES.some((item) => item.code === saved) ? saved : 'en';
}

function populateSelect(select, language) {
  if (!select) return;
  select.innerHTML = LANGUAGES.map((item) => `<option value="${item.code}">${item.label}</option>`).join('');
  select.value = language;
}

function applyLanguage(language) {
  const t = tx(language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.title = t.title;
  setMeta('description', t.description);
  setProperty('og:title', t.title);
  setProperty('og:description', t.ogDescription);
  setMeta('twitter:title', t.title);
  setMeta('twitter:description', t.ogDescription);

  document.querySelectorAll('.nav-links a').forEach((node, index) => { node.textContent = t.nav[index] || node.textContent; });
  setText('.nav-cta', t.findRung);
  setText('.hero-content .eyebrow', t.hero.eyebrow);
  setText('#heroTitle', t.hero.title);
  setText('.hero-copy', t.hero.copy);
  setText('.hero-actions .button.primary', t.findRungArrow);
  setText('.hero-actions .button.secondary', t.hero.secondary);

  setAttr('#l2Signup', 'aria-label', t.signup.aria);
  setText('.hero-signup-eyebrow', t.signup.eyebrow);
  setText('.hero-signup h2', t.signup.title);
  setAttr('#l2SignupEmail', 'placeholder', t.signup.emailPlaceholder);
  setAttr('#l2SignupEmail', 'aria-label', t.signup.emailLabel);
  setText('#l2SignupForm button', t.signup.signup);
  setText('#l2SigninToggle', t.signup.toggle);
  setAttr('#l2SigninEmail', 'placeholder', t.signup.signinEmailPlaceholder);
  setAttr('#l2SigninEmail', 'aria-label', t.signup.signinEmailLabel);
  setAttr('#l2SigninPw', 'placeholder', t.signup.passwordPlaceholder);
  setAttr('#l2SigninPw', 'aria-label', t.signup.passwordLabel);
  setText('#l2SigninForm button', t.signup.signin);
  const signedIn = document.querySelector('#l2SignedIn span');
  if (signedIn) signedIn.innerHTML = `${t.signup.signedInAs} <strong id="l2SignedInEmail">${document.querySelector('#l2SignedInEmail')?.textContent || ''}</strong>`;
  setText('.hero-workspace-link', t.signup.workspace);
  setText('#l2HeroSignOut', t.signup.signout);

  setText('#how .section-copy.centered .eyebrow', t.how.eyebrow);
  setText('#howTitle', t.how.title);
  setPairs(document.querySelectorAll('.steps article'), t.how.steps);
  setText('.problem .section-copy .eyebrow', t.how.problemEyebrow);
  setText('#problemTitle', t.how.problemTitle);
  setPairs(document.querySelectorAll('.problem-grid article'), t.how.problems);

  setText('#pathways .outcomes .eyebrow', t.pathways.eyebrow);
  setText('#pathwaysTitle', t.pathways.title);
  setText('#pathways .outcomes > div:first-child > p:not(.eyebrow)', t.pathways.copy);
  setPairs(document.querySelectorAll('#pathways .outcome-list article'), t.pathways.outcomes);
  setPairs(document.querySelectorAll('.pathway-grid a'), t.pathways.cards);

  setTrust(t.proof.trust);
  setText('#certification .proof-card .eyebrow', t.proof.eyebrow);
  setText('#proofTitle', t.proof.title);
  setText('#certification .proof-card > div > p:not(.eyebrow)', t.proof.copy);
  setPairs(document.querySelectorAll('.proof-list > div'), t.proof.facts);

  setText('#standards .eyebrow', t.standards.eyebrow);
  setText('#standardsTitle', t.standards.title);
  setText('#standards .section-copy.centered > p:not(.eyebrow)', t.standards.copy);
  setPairs(document.querySelectorAll('.standards-grid article'), t.standards.cards);

  setText('#employers .outcomes .eyebrow', t.employers.eyebrow);
  setText('#employersTitle', t.employers.title);
  setText('#employers .outcomes > div:first-child > p:not(.eyebrow)', t.employers.copy);
  setPairs(document.querySelectorAll('#employers .outcome-list article'), t.employers.outcomes);
  setPairs(document.querySelectorAll('.employer-grid article'), t.employers.steps);

  setText('#faq .section-copy.centered .eyebrow', t.faq.eyebrow);
  setText('#faqTitle', t.faq.title);
  setPairs(document.querySelectorAll('.faq-grid article'), t.faq.items);
  setText('.final-cta .eyebrow', t.faq.finalEyebrow);
  setText('#finalTitle', t.faq.finalTitle);
  setText('.final-cta .button.primary', t.findRungArrow);

  document.querySelectorAll('.footer > *').forEach((node, index) => { node.textContent = t.footer[index] || node.textContent; });
  document.dispatchEvent(new CustomEvent('welcome:languagechange', { detail: { language } }));
}

function authText(key, params = {}) {
  const t = tx(currentLanguage()).auth[key] || EN.auth[key] || key;
  return Object.entries(params).reduce((out, [name, value]) => out.replaceAll(`{${name}}`, value), t);
}

function setupWelcomeI18n() {
  const select = document.querySelector('.nav-language-select');
  const language = currentLanguage();
  populateSelect(select, language);
  applyLanguage(language);
  select?.addEventListener('change', () => {
    const next = select.value;
    if (!LANGUAGES.some((item) => item.code === next)) return;
    localStorage.setItem(STORAGE_KEY, next);
    applyLanguage(next);
  });
}

window.welcomeI18n = { languages: LANGUAGES, applyLanguage, authText, currentLanguage };
setupWelcomeI18n();
