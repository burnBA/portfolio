/* ==========================================================================
   BA·OS 2K — Traductions
   Le français est la langue source : il est écrit directement dans index.html.
   Ce fichier fournit :
     - BAOS_I18N.en : la version anglaise de chaque clé data-i18n du HTML
       (les valeurs peuvent contenir du HTML simple : <li>, &amp;…) ;
     - BAOS_I18N.ui : les textes générés par script.js (messages, libellés
       dynamiques), en français ET en anglais.
   Pour ajouter un texte traduit : poser data-i18n="ma.cle" dans le HTML,
   puis ajouter "ma.cle" ci-dessous dans `en`.
   ========================================================================== */
window.BAOS_I18N = {
  en: {
    /* --- Navigation & fichiers --- */
    'skip': 'Skip to content',
    'nav.desktop': 'Desktop shortcuts',
    'nav.taskbar': 'Taskbar',
    'nav.sections': 'Sections',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.career': 'Career',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.engagement': 'Involvement',
    'nav.contact': 'Contact',
    'file.hero': 'welcome.exe',
    'file.career': 'career.log',
    'file.projects': 'programs/',
    'file.engagement': 'favorites/',
    'file.contact': 'New message',
    'win.minimize': 'Minimize window',
    'win.maximize': 'Maximize window',
    'win.close': 'Close (the window stays in the taskbar)',

    /* --- Accueil --- */
    'hero.prompt': 'session started · Geneva',
    'hero.role': 'Bachelor student in Cybersecurity, Systems &amp; Networks',
    'hero.sub': 'Infrastructure &amp; hardening · Looking for a work-study position in Geneva',
    'hero.availability': 'Available: on-site · hybrid · remote',
    'hero.factsLabel': 'Highlights',
    'hero.fact1': 'Migrated about 150 VMs to Proxmox VE with zero data loss',
    'hero.fact2': 'Multi-agent attack surface analysis pipeline',
    'hero.fact3': 'IT support for about 600 staff at the IOC',
    'hero.loading': 'Loading profile…',
    'hero.ctaProjects': 'View projects',
    'hero.ctaCareer': 'My career',
    'hero.ctaContact': 'Contact me',

    /* --- À propos --- */
    'about.title': 'About',
    'about.p1': 'I am in the 2nd year of a Bachelor’s degree in cybersecurity, cloud, systems and networks at the Geneva Institute of Technology. Alongside it, I am completing a Swiss federal VET diploma (CFC) as an IT specialist in operations and infrastructure, through 2029. I have lived in Geneva for more than 10 years.',
    'about.p2': 'My path was built while working. I held a job for four years alongside my studies, then completed internships in infrastructure, support and cybersecurity. These experiences confirmed my specialty: systems security, especially Active Directory, penetration testing and defence (Blue Team).',
    'about.p3': 'I am looking for a work-study position, an internship or assignments in Geneva, in cybersecurity as well as general IT. In the long run, I want to work in protecting information systems in Geneva.',
    'props.title': 'System properties',
    'props.user': 'User',
    'props.location': 'Location',
    'props.locationValue': 'Geneva',
    'props.education': 'Education',
    'props.specialty': 'Specialty',
    'props.profile': 'Profile',
    'props.profileValue': 'Cybersecurity &amp; general IT',
    'props.languages': 'Languages',
    'props.languagesValue': 'Portuguese · French · English',
    'props.status': 'Status',
    'props.statusValue': 'Looking for a work-study position',
    'props.open': 'Properties',

    /* --- Parcours --- */
    'career.title': 'Career',
    'career.intro': 'Experience and education, most recent first.',
    'career.work': 'Experience',
    'career.colName': 'Name',
    'career.colOrg': 'Organisation',
    'career.colDate': 'Period',
    'career.education': 'Education',
    'job1.role': 'Cybersecurity &amp; AI Solutions Intern',
    'job1.meta': '50% internship, in a pair · selected through an internal school process',
    'job1.list':
      '<li>Designed a multi-agent attack surface analysis pipeline: detection of an organisation’s exposed entry points and a report ranked by criticality.</li>' +
      '<li>Modular architecture in the open SKILL.md format, Hermes Agent engine and a self-hosted Hermes Workspace console.</li>' +
      '<li>Swiss legal framework built in as a design constraint (art. 143bis of the Swiss Criminal Code).</li>' +
      '<li>Final demonstration to the team.</li>',
    'job2.role': 'Infrastructure &amp; Network Technician Intern',
    'job2.list':
      '<li>Deployed the OPNsense firewall and wrote its rules.</li>' +
      '<li>Segmented the network into 4 VLAN zones, still in production.</li>' +
      '<li>Migrated about 150 VMs (over 30 TB) from VMware ESXi to Proxmox VE via QEMU, live and during weekend windows.</li>' +
      '<li>TrueNAS storage over iSCSI.</li>' +
      '<li>Trial phase to establish the conversion path, then a migration checklist and systematic backups before each cutover: zero data loss.</li>' +
      '<li>Full documentation of the architecture, the addressing plan and the recovery procedure.</li>',
    'job3.role': 'IT Support Technician',
    'job3.org': 'International Olympic Committee · assignment via Stefanini · Lausanne',
    'job3.list':
      '<li>Sole technician at the headquarters Tech Bar (about 600 staff): 20 to 30 requests a day, on-site and remote, in French and English.</li>' +
      '<li>Account and access management with Entra ID / Intune.</li>' +
      '<li>Hardware and software troubleshooting (BIOS, drivers, network).</li>' +
      '<li>Ticket tracking and escalation in ServiceNow.</li>' +
      '<li>Identified a recurring fault and raised user awareness to prevent it.</li>' +
      '<li>Called back for a new assignment.</li>',
    'job4.role': 'Auxiliary Security Officer',
    'job4.org': 'Protectas (Securitas Group) · Geneva',
    'job4.meta': 'About 100 hours a month, alongside my studies',
    'job4.list':
      '<li>Security of sensitive sites: luxury jewellery and watchmaking, banks, accommodation centres.</li>' +
      '<li>Events: Watches &amp; Wonders (four consecutive years), Concours Hippique International.</li>' +
      '<li>Incident handling de-escalated through communication, patrols and fire protocols.</li>' +
      '<li>First aid and fire safety training.</li>',
    'edu1.title': 'Bachelor in cybersecurity, cloud, systems and networks + Swiss federal VET diploma (CFC) as an IT specialist (operations and infrastructure)',
    'edu1.meta': 'Currently in 2nd year',
    'edu2.title': 'General education certificate, communication option',
    'edu2.meta': 'Completed part-time while working',
    'geneva': 'Geneva',

    /* --- Projets --- */
    'projects.title': 'Projects',
    'projects.intro': 'Three projects in infrastructure, security and automation.',
    'projects.filterGroup': 'Filter projects by status',
    'projects.filterLabel': 'Show:',
    'projects.all': 'All',
    'projects.stack': 'Technologies',
    'projects.empty': 'No program matches this filter.',
    'projects.more': 'Show more programs (1)',
    'tag.done': 'Done',
    'tag.wip': 'In progress',
    'stack.agents': 'AI agents',
    'p1.title': 'Multi-agent attack surface analysis pipeline',
    'p1.summary': 'AI agents that spot an organisation’s exposed entry points and produce a report ranked by criticality.',
    'p1.props':
      '<li>Built in a pair during my internship at Cybersherpa.</li>' +
      '<li>Modular architecture in the open SKILL.md format, orchestrated by the Hermes Agent engine and driven from a self-hosted Hermes Workspace console.</li>' +
      '<li>Swiss legal framework (art. 143bis of the Swiss Criminal Code) built in from the design stage as a safeguard.</li>' +
      '<li>Presented in a final demonstration to the team.</li>',
    'p2.title': 'Secure infrastructure &amp; virtualisation migration',
    'p2.summary': 'Firewall, network segmentation and migration of about 150 VMs to Proxmox VE, with zero data loss.',
    'p2.props':
      '<li>At HP Showroom: deployed the OPNsense firewall and segmented the network into 4 VLAN zones.</li>' +
      '<li>Migrated about 150 VMs (over 30 TB) from VMware ESXi to Proxmox VE via QEMU, live and during weekend windows.</li>' +
      '<li>Upfront trial phase and a backup before each cutover.</li>' +
      '<li>TrueNAS storage over iSCSI.</li>' +
      '<li>Architecture, addressing plan and recovery procedure documented.</li>',
    'p3.title': 'IT &amp; security automation lab with AI agents',
    'p3.summary': 'A personal lab to apply AI agents to infrastructure, security and automation.',
    'p3.props': '<li>The architecture and scripts are in place; optimisation is under way.</li>',
    'p4.title': 'Personal system utilities',
    'p4.summary': 'Windows and Linux customisation scripts: wallpaper, boot screen, system settings.',

    /* --- Compétences --- */
    'skills.title': 'Skills',
    'skills.cyber': 'Cybersecurity',
    'skills.terminalLabel': 'Terminal: cybersecurity tools and focus areas',
    'term.whoami': 'Bruno Alves — cybersecurity · AD Security · Pentest · Blue Team',
    'term.ls': 'ls ./tools',
    'term.focus': 'AD hardening · Tiering Model · Attack surface analysis',
    'skills.infra': 'Infrastructure &amp; networks',
    'skills.support': 'Support &amp; cloud',
    'skills.ai': 'AI &amp; automation',
    'skills.dev': 'Dev &amp; scripting',
    'skills.languages': 'Languages',
    'lang.pt': 'Portuguese',
    'lang.fr': 'French',
    'lang.en': 'English',
    'lang.es': 'Spanish',
    'lang.it': 'Italian',
    'level.native': 'Native language',
    'level.fluent': 'Fluent',
    'level.basic': 'Basic knowledge',

    /* --- Engagement --- */
    'engagement.title': 'Involvement &amp; interests',
    'engagement.role': 'Volunteer spokesperson',
    'engagement.org': 'International Youth and Students Movement for the United Nations, an association accredited to the UN',
    'engagement.list':
      '<li>Spoke at dozens of events over three sessions.</li>' +
      '<li>Spokesperson several times in Room XX of the Palais des Nations, in front of delegations, NGOs and UN leadership.</li>' +
      '<li>Topics: youth, climate awareness, the impact of disasters on young people.</li>',
    'engagement.offscreen': 'Away from the screen',
    'interest.1': 'Hiking, climbing &amp; via ferrata',
    'interest.2': 'Team sports &amp; combat sports',
    'interest.3': 'Mechanics &amp; motorsport',

    /* --- Contact & pied de page --- */
    'contact.text': 'Looking for a work-study student, an intern or extra support in cybersecurity or IT in Geneva? Write to me, I’d be happy to talk.',
    'contact.copy': 'Copy',
    'contact.email': 'Send an email',
    'newTab': '(new tab)',
    'footer.made': 'Designed and hand-coded in HTML, CSS and JavaScript.',
    'footer.top': 'Back to top',

    /* --- Barre des tâches, menu, paramètres --- */
    'clock': 'Time in Geneva',
    'start.role': 'Cybersecurity · Systems &amp; networks',
    'start.links': 'Quick links',
    'settings.title': 'Display settings',
    'settings.close': 'Close',
    'settings.theme': 'Theme',
    'settings.auto': 'Automatic (system)',
    'settings.light': 'Lavender (light)',
    'settings.dark': 'Midnight (dark)',
    'settings.effects': 'Effects',
    'settings.crt': 'CRT effects in the terminal (scanlines)',
    'settings.language': 'Language',
    'settings.cancel': 'Cancel'
  },

  /* Textes générés par script.js (les deux langues) */
  ui: {
    fr: {
      title: 'Bruno Alves — Cybersécurité, systèmes & réseaux · Genève',
      description: "Étudiant Bachelor en cybersécurité, systèmes et réseaux à Genève. Infrastructure, durcissement AD, pentest et Blue Team. En recherche d'alternance, de stage ou de missions.",
      langToggle: 'Switch to English',
      langToggleShort: 'EN',
      langToggleLang: 'en',
      themeToDark: 'Passer au thème sombre',
      themeToLight: 'Passer au thème clair',
      maximize: 'Agrandir la fenêtre',
      restore: 'Restaurer la taille de la fenêtre',
      minimize: 'Réduire la fenêtre',
      expand: 'Déplier la fenêtre',
      projectsCount: function (n) { return n + (n > 1 ? ' programmes affichés' : ' programme affiché'); },
      more: 'Afficher plus de programmes (1)',
      less: 'Afficher moins de programmes',
      copied: 'Adresse copiée dans le presse-papiers',
      copyFailed: 'Copie impossible : sélectionnez l’adresse manuellement',
      closed: function (name) { return '« ' + name + ' » fermée : restaurez-la depuis la barre des tâches'; },
      settingsSaved: 'Paramètres appliqués',
      locale: 'fr-CH'
    },
    en: {
      title: 'Bruno Alves — Cybersecurity, systems & networks · Geneva',
      description: 'Bachelor student in cybersecurity, systems and networks in Geneva. Infrastructure, AD hardening, pentesting and Blue Team. Looking for a work-study position, an internship or assignments.',
      langToggle: 'Passer en français',
      langToggleShort: 'FR',
      langToggleLang: 'fr',
      themeToDark: 'Switch to dark theme',
      themeToLight: 'Switch to light theme',
      maximize: 'Maximize window',
      restore: 'Restore window size',
      minimize: 'Minimize window',
      expand: 'Expand window',
      projectsCount: function (n) { return n + (n > 1 ? ' programs shown' : ' program shown'); },
      more: 'Show more programs (1)',
      less: 'Show fewer programs',
      copied: 'Address copied to clipboard',
      copyFailed: 'Copy failed: please select the address manually',
      closed: function (name) { return '“' + name + '” closed: restore it from the taskbar'; },
      settingsSaved: 'Settings applied',
      locale: 'en-GB'
    }
  }
};
