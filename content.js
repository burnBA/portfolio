/* ==========================================================================
   content.js : CONTENU ET TRADUCTIONS DU SITE (FR / EN)
   --------------------------------------------------------------------------
   Toute la matière éditoriale du portfolio vit ici, dans les deux langues.
   script.js se contente de lire cet objet et de construire les sections.

   ► Ajouter une expérience : copier un objet du tableau `experiences`.
   ► Ajouter un projet       : copier un objet du tableau `projects`.
   ► Ajouter une compétence  : l'ajouter dans `items` de la bonne catégorie.
   ► Texte d'interface       : clés de `ui.fr` / `ui.en` (attribut data-i18n
     dans index.html). Le français de index.html sert au premier affichage
     et au référencement ; il doit rester identique à `ui.fr`.

   Un texte peut être une chaîne simple (identique dans les deux langues)
   ou un objet { fr: "...", en: "..." }.
   ========================================================================== */

window.CONTENT = {

  /* ------------------------------------------------------------------------
     Métadonnées : titre de l'onglet et description (SEO / partage)
     ------------------------------------------------------------------------ */
  meta: {
    fr: {
      title: "Bruno Alves | Cybersécurité, Systèmes & Réseaux",
      description: "Bruno Alves, étudiant Bachelor Cybersécurité, Systèmes & Réseaux au GIT (Genève). Sécurité Active Directory, pentest, Blue Team, infrastructure et durcissement. Disponible pour une alternance à Genève.",
      locale: "fr_CH"
    },
    en: {
      title: "Bruno Alves | Cybersecurity, Systems & Networks",
      description: "Bruno Alves, Bachelor's student in Cybersecurity, Systems & Networks at GIT (Geneva). Active Directory security, pentesting, Blue Team, infrastructure and hardening. Available for a work-study position in Geneva.",
      locale: "en_GB"
    }
  },

  /* ------------------------------------------------------------------------
     Textes d'interface (clés utilisées par data-i18n / data-i18n-attr)
     ------------------------------------------------------------------------ */
  ui: {
    fr: {
      "skip": "Aller au contenu",
      "nav.label": "Navigation principale",
      "nav.about": "À propos",
      "nav.experience": "Parcours",
      "nav.projects": "Projets",
      "nav.skills": "Compétences",
      "nav.languages": "Langues",
      "nav.contact": "Contact",
      "nav.menu": "Menu",
      "nav.close": "Fermer le menu",
      "nav.palette": "Ouvrir la palette de commandes",
      "lang.label": "Langue du site",

      "hero.eyebrow": "Cybersécurité · Systèmes & Réseaux",
      "hero.role": "Étudiant Bachelor Cybersécurité, Systèmes & Réseaux · Infrastructure & durcissement",
      "hero.lede": "Je suis en Bachelor de cybersécurité à Genève. En parallèle, j'ai travaillé sur une infrastructure en production, fait du support au CIO et passé quatre ans dans la sécurité.",
      "hero.available": "Disponible pour une alternance à Genève",
      "hero.cta.projects": "Voir mes projets",
      "hero.cta.contact": "Me contacter",
      "hero.scroll": "Défiler",

      "stat.vm.value": "≈150",
      "stat.vm.label": "VM migrées en production",
      "stat.data.value": "30+ To",
      "stat.data.label": "de données migrées, aucune perte",
      "stat.users.value": "≈600",
      "stat.users.label": "collaborateurs supportés au CIO",
      "stat.years.value": "4 ans",
      "stat.years.label": "de sécurité physique sur sites sensibles",

      "about.kicker": "01 · À propos",
      "about.title": "En quelques mots",
      "about.p1": "Pendant mon stage chez HP, j'ai migré environ 150 machines virtuelles et segmenté le réseau, en production et sans perdre de données. Au siège du CIO, je faisais le support pour environ 600 collaborateurs.",
      "about.p2": "J'ai aussi travaillé quatre ans comme agent de sécurité sur des sites sensibles. J'y ai appris à gérer des incidents et à garder mon calme quand la situation se tend.",
      "about.p3": "Aujourd'hui je me spécialise en cybersécurité (sécurité Active Directory, pentest, Blue Team, durcissement), mais je reste à l'aise sur l'infrastructure, le réseau et le support.",
      "about.fact.school": "Formation",
      "about.fact.school.v": "Bachelor Cybersécurité, Systèmes & Réseaux · Geneva Institute of Technology (GIT)",
      "about.fact.focus": "Spécialité",
      "about.fact.focus.v": "AD Security · Pentest · Blue Team · Durcissement",
      "about.fact.also": "Polyvalence",
      "about.fact.also.v": "Infrastructure · Réseau · Support",
      "about.fact.seeking": "Recherche",
      "about.fact.seeking.v": "Alternance à Genève, sur site, en hybride ou à distance",

      "exp.kicker": "02 · Parcours",
      "exp.title": "Mon parcours",
      "exp.intro": "Du plus récent au plus ancien. Vous pouvez filtrer par domaine.",
      "exp.filter.label": "Filtrer le parcours par domaine",
      "exp.filter.all": "Tout",
      "exp.filter.cyber": "Cybersécurité",
      "exp.filter.infra": "Infrastructure",
      "exp.filter.support": "Support",
      "exp.filter.field": "Terrain",
      "exp.empty": "Aucune expérience pour ce filtre.",

      "proj.kicker": "03 · Projets",
      "proj.title": "Quelques projets",
      "proj.intro": "Des projets faits en stage ou dans mon lab. Ouvrez une carte pour voir le détail.",
      "proj.status.done": "Terminé",
      "proj.status.wip": "En cours",
      "proj.more": "Voir le détail",
      "proj.less": "Masquer le détail",
      "proj.stack": "Technologies",
      "topo.title": "Topologie · Stage chez HP",
      "topo.hint": "Cliquez sur un élément du schéma pour en savoir plus.",
      "topo.label": "Schéma interactif de l'infrastructure (stage chez HP)",
      "topo.zone.vlan": "Segmentation VLAN",
      "topo.zone.virt": "Virtualisation & stockage",
      "topo.swipe": "Faites glisser pour explorer le schéma",

      "skills.kicker": "04 · Compétences",
      "skills.title": "Les outils que j'utilise",
      "skills.intro": "Passez la souris sur un domaine pour le voir dans le schéma.",
      "skills.map": "Constellation des compétences",

      "lang.kicker": "05 · Langues & intérêts",
      "lang.title": "Je parle cinq langues",
      "lang.scale": "Niveaux selon le Cadre européen commun de référence (A1 à C2)",
      "lang.oral": "Oral",
      "lang.written": "Écrit",
      "interests.title": "En dehors de l'écran",

      "contact.kicker": "06 · Contact",
      "contact.title": "Vous cherchez un alternant ?",
      "contact.lede": "Je cherche une alternance à Genève, sur site, en hybride ou à distance. Écrivez-moi, je réponds rapidement.",
      "contact.email": "E-mail",
      "contact.copy": "Copier l'adresse",
      "contact.copied": "Adresse e-mail copiée",
      "contact.copyFail": "Copie impossible : bruno.alves@git.swiss",
      "contact.write": "Écrire un e-mail",
      "contact.github": "GitHub",
      "contact.linkedin": "LinkedIn",
      "contact.newTab": "(nouvel onglet)",

      "footer.rights": "Bruno Alves · Genève",
      "footer.motion.on": "Réduire les animations",
      "footer.motion.off": "Réactiver les animations",
      "footer.top": "Retour en haut",
      "footer.hint": "Astuce : Ctrl + K",

      "palette.title": "Palette de commandes",
      "palette.placeholder": "Rechercher une section, une action…",
      "palette.empty": "Aucun résultat. Essayez « projets » ou « contact ».",
      "palette.group.nav": "Aller à",
      "palette.group.actions": "Actions",
      "palette.group.links": "Liens",
      "palette.group.secret": "Terminal",
      "palette.hint": "↑↓ naviguer · Entrée valider · Échap fermer",
      "palette.lang": "Passer le site en anglais",
      "palette.copy": "Copier l'adresse e-mail",
      "palette.mail": "Écrire un e-mail",
      "palette.motion": "Activer / couper les animations",
      "theme.toLight": "Passer en thème clair",
      "theme.toDark": "Passer en thème foncé",
      "palette.top": "Retour en haut de page",

      "toast.motion.off": "Animations réduites",
      "toast.motion.on": "Animations réactivées",
      "egg.konami": "Accès root accordé. Mode phosphore activé, refaites le code pour revenir.",
      "egg.sudo": "[sudo] Permission accordée. Prochaine étape : un entretien. Écrivez à bruno.alves@git.swiss",
      "egg.whoami": "bruno, cybersécurité, systèmes et réseaux. Cherche une alternance à Genève.",
      "egg.ping": "64 octets depuis bruno : icmp_seq=1 ttl=64 temps=réponse sous 24 h"
    },

    en: {
      "skip": "Skip to content",
      "nav.label": "Main navigation",
      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.skills": "Skills",
      "nav.languages": "Languages",
      "nav.contact": "Contact",
      "nav.menu": "Menu",
      "nav.close": "Close menu",
      "nav.palette": "Open the command palette",
      "lang.label": "Site language",

      "hero.eyebrow": "Cybersecurity · Systems & Networks",
      "hero.role": "Bachelor's student in Cybersecurity, Systems & Networks · Infrastructure & hardening",
      "hero.lede": "I'm doing a Bachelor's in cybersecurity in Geneva. Alongside my studies, I've worked on a production infrastructure, done IT support at the IOC and spent four years in security.",
      "hero.available": "Available for a work-study position in Geneva",
      "hero.cta.projects": "See my projects",
      "hero.cta.contact": "Get in touch",
      "hero.scroll": "Scroll",

      "stat.vm.value": "≈150",
      "stat.vm.label": "VMs migrated in production",
      "stat.data.value": "30+ TB",
      "stat.data.label": "of data migrated, zero loss",
      "stat.users.value": "≈600",
      "stat.users.label": "staff supported at the IOC",
      "stat.years.value": "4 yrs",
      "stat.years.label": "of physical security at sensitive sites",

      "about.kicker": "01 · About",
      "about.title": "In a few words",
      "about.p1": "During my internship at HP, I migrated around 150 virtual machines and segmented the network, in production and without losing any data. At IOC headquarters, I provided IT support for about 600 staff.",
      "about.p2": "I also spent four years as a security officer at sensitive sites. That's where I learned to handle incidents and keep calm when things get tense.",
      "about.p3": "I'm now specialising in cybersecurity (Active Directory security, pentesting, Blue Team, hardening), but I'm still comfortable with infrastructure, networking and support.",
      "about.fact.school": "Studies",
      "about.fact.school.v": "Bachelor in Cybersecurity, Systems & Networks · Geneva Institute of Technology (GIT)",
      "about.fact.focus": "Specialism",
      "about.fact.focus.v": "AD Security · Pentesting · Blue Team · Hardening",
      "about.fact.also": "Also covers",
      "about.fact.also.v": "Infrastructure · Networking · Support",
      "about.fact.seeking": "Looking for",
      "about.fact.seeking.v": "Work-study position in Geneva, on-site, hybrid or remote",

      "exp.kicker": "02 · Experience",
      "exp.title": "My experience",
      "exp.intro": "Most recent first. You can filter by field.",
      "exp.filter.label": "Filter experience by field",
      "exp.filter.all": "All",
      "exp.filter.cyber": "Cybersecurity",
      "exp.filter.infra": "Infrastructure",
      "exp.filter.support": "Support",
      "exp.filter.field": "Field work",
      "exp.empty": "No experience matches this filter.",

      "proj.kicker": "03 · Projects",
      "proj.title": "A few projects",
      "proj.intro": "Projects from my internships or my home lab. Open a card to see the details.",
      "proj.status.done": "Completed",
      "proj.status.wip": "In progress",
      "proj.more": "Show details",
      "proj.less": "Hide details",
      "proj.stack": "Technologies",
      "topo.title": "Topology · HP internship",
      "topo.hint": "Click any part of the diagram to learn more.",
      "topo.label": "Interactive infrastructure diagram (HP internship)",
      "topo.zone.vlan": "VLAN segmentation",
      "topo.zone.virt": "Virtualisation & storage",
      "topo.swipe": "Swipe to explore the diagram",

      "skills.kicker": "04 · Skills",
      "skills.title": "The tools I use",
      "skills.intro": "Hover over a field to see it in the diagram.",
      "skills.map": "Skills constellation",

      "lang.kicker": "05 · Languages & interests",
      "lang.title": "I speak five languages",
      "lang.scale": "Levels based on the Common European Framework of Reference (A1 to C2)",
      "lang.oral": "Spoken",
      "lang.written": "Written",
      "interests.title": "Away from the screen",

      "contact.kicker": "06 · Contact",
      "contact.title": "Looking for a work-study student?",
      "contact.lede": "I'm looking for a work-study position in Geneva, on-site, hybrid or remote. Send me an email, I reply quickly.",
      "contact.email": "Email",
      "contact.copy": "Copy address",
      "contact.copied": "Email address copied",
      "contact.copyFail": "Couldn't copy: bruno.alves@git.swiss",
      "contact.write": "Send an email",
      "contact.github": "GitHub",
      "contact.linkedin": "LinkedIn",
      "contact.newTab": "(new tab)",

      "footer.rights": "Bruno Alves · Geneva",
      "footer.motion.on": "Reduce motion",
      "footer.motion.off": "Restore motion",
      "footer.top": "Back to top",
      "footer.hint": "Tip: Ctrl + K",

      "palette.title": "Command palette",
      "palette.placeholder": "Search a section or an action…",
      "palette.empty": "No results. Try “projects” or “contact”.",
      "palette.group.nav": "Go to",
      "palette.group.actions": "Actions",
      "palette.group.links": "Links",
      "palette.group.secret": "Terminal",
      "palette.hint": "↑↓ navigate · Enter select · Esc close",
      "palette.lang": "Switch the site to French",
      "palette.copy": "Copy email address",
      "palette.mail": "Send an email",
      "palette.motion": "Toggle animations",
      "theme.toLight": "Switch to light theme",
      "theme.toDark": "Switch to dark theme",
      "palette.top": "Back to top",

      "toast.motion.off": "Motion reduced",
      "toast.motion.on": "Motion restored",
      "egg.konami": "Root access granted. Phosphor mode on, enter the code again to go back.",
      "egg.sudo": "[sudo] Permission granted. Next step: an interview. Write to bruno.alves@git.swiss",
      "egg.whoami": "bruno, cybersecurity, systems and networks. Looking for a work-study position in Geneva.",
      "egg.ping": "64 bytes from bruno: icmp_seq=1 ttl=64 time=reply within 24 h"
    }
  },

  /* ------------------------------------------------------------------------
     PARCOURS · ordre antichronologique (le premier est le plus récent).
     tags : cyber | infra | support | field  (alimentent les filtres)
     ------------------------------------------------------------------------ */
  experiences: [
    {
      id: "cybersherpa",
      tags: ["cyber"],
      role: {
        fr: "Stagiaire Cybersécurité & Solutions d'Intelligence Artificielle",
        en: "Cybersecurity & AI Solutions Intern"
      },
      org: "Cybersherpa",
      place: { fr: "Genève", en: "Geneva" },
      period: { fr: "mai à juin 2026", en: "May to Jun 2026" },
      mode: { fr: "Sur site", en: "On-site" },
      bullets: {
        fr: [
          "Conception d'un pipeline multi-agents d'analyse de surface d'attaque",
          "Architecture modulaire au format ouvert SKILL.md",
          "Moteur Hermes Agent et console Hermes Workspace auto-hébergée",
          "Cadre légal suisse intégré comme contrainte de conception (art. 143bis CP)",
          "Démonstration finale devant l'équipe"
        ],
        en: [
          "Designed a multi-agent pipeline for attack surface analysis",
          "Modular architecture built on the open SKILL.md format",
          "Hermes Agent engine with a self-hosted Hermes Workspace console",
          "Swiss legal framework built in as a design constraint (art. 143bis of the Swiss Criminal Code)",
          "Final demo presented to the team"
        ]
      }
    },
    {
      id: "hp",
      tags: ["infra", "cyber"],
      role: {
        fr: "Stagiaire Technicien Infrastructure & Réseau",
        en: "Infrastructure & Network Technician Intern"
      },
      org: "HP",
      place: { fr: "Meyrin", en: "Meyrin" },
      period: { fr: "avr. à mai 2026", en: "Apr to May 2026" },
      mode: { fr: "Sur site", en: "On-site" },
      bullets: {
        fr: [
          "Déploiement du firewall OPNsense et écriture des règles",
          "Segmentation du réseau en VLAN",
          "Migration de VMware ESXi vers Proxmox VE avec QEMU : environ 150 VM et plus de 30 To, à chaud ou le week-end",
          "D'abord des essais pour trouver la bonne méthode de conversion, puis une checklist et une sauvegarde avant chaque bascule. Aucune donnée perdue.",
          "Documentation complète : architecture, plan d'adressage, procédure de reprise"
        ],
        en: [
          "Deployed the OPNsense firewall and wrote its rule set",
          "Segmented the network into VLANs",
          "Migrated from VMware ESXi to Proxmox VE with QEMU: about 150 VMs and over 30 TB, live or over weekends",
          "Started with test runs to find the right conversion method, then used a checklist and a full backup before every cutover. No data lost.",
          "Full documentation: architecture, IP addressing plan, recovery procedure"
        ]
      }
    },
    {
      id: "ioc",
      tags: ["support"],
      role: {
        fr: "Technicien de support informatique",
        en: "IT Support Technician"
      },
      org: { fr: "Comité International Olympique (CIO)", en: "International Olympic Committee (IOC)" },
      place: { fr: "Lausanne", en: "Lausanne" },
      period: { fr: "mars à avr. 2026", en: "Mar to Apr 2026" },
      mode: { fr: "Mission via Stefanini", en: "Assignment via Stefanini" },
      bullets: {
        fr: [
          "Tech Bar du siège : ≈600 collaborateurs, ≈20 interventions par jour, en présentiel et à distance",
          "Comptes et accès Entra ID et Intune, dépannage matériel et logiciel, BIOS, pilotes, incidents réseau",
          "Suivi et escalade des tickets sur ServiceNow, support en français et en anglais"
        ],
        en: [
          "Headquarters Tech Bar: ≈600 staff, ≈20 interventions a day, on-site and remote",
          "Accounts and access in Entra ID and Intune; hardware and software troubleshooting, BIOS, drivers, network incidents",
          "Ticket tracking and escalation in ServiceNow; support in French and English"
        ]
      }
    },
    {
      id: "protectas",
      tags: ["field"],
      role: {
        fr: "Agent de sécurité auxiliaire",
        en: "Auxiliary Security Officer"
      },
      org: "Protectas",
      place: { fr: "Genève", en: "Geneva" },
      period: { fr: "mars 2022 à févr. 2026", en: "Mar 2022 to Feb 2026" },
      mode: { fr: "Temps partiel, en parallèle des études", en: "Part-time, alongside my studies" },
      bullets: {
        fr: [
          "Surveillance de sites sensibles : joailleries et horlogers de luxe, banques, foyers d'hébergement",
          "Événements : Watches & Wonders (quatre années consécutives), Concours Hippique International",
          "Gestion d'incidents : intrusions, désamorçage de situations de violence par la communication",
          "Rondes, protocoles incendie, formations premiers secours et incendie"
        ],
        en: [
          "Guarding sensitive sites: luxury jewellers and watchmakers, banks, residential shelters",
          "Events: Watches & Wonders (four consecutive years), CHI Geneva international horse show",
          "Incident handling: intrusions, de-escalating violent situations through communication",
          "Patrols, fire protocols, first-aid and fire-safety training"
        ]
      }
    },
    {
      id: "iysmun",
      tags: ["field"],
      role: {
        fr: "Bénévole · Porte-parole",
        en: "Volunteer · Spokesperson"
      },
      org: { fr: "IYSMUN (association accréditée auprès des Nations Unies)", en: "IYSMUN (UN-accredited association)" },
      place: { fr: "Genève", en: "Geneva" },
      period: { fr: "juin 2018 à févr. 2020", en: "Jun 2018 to Feb 2020" },
      mode: { fr: "Bénévolat", en: "Volunteering" },
      bullets: {
        fr: [
          "Prises de parole lors de dizaines d'événements sur trois sessions",
          "Porte-parole dans la Salle XX du Palais des Nations, devant délégations, ONG et direction de l'ONU",
          "Thèmes : enjeux sociaux de la jeunesse, conscience climatique, impact des catastrophes sur les jeunes"
        ],
        en: [
          "Spoke at dozens of events across three sessions",
          "Spokesperson in Room XX of the Palais des Nations, addressing delegations, NGOs and UN leadership",
          "Topics: social issues facing young people, climate awareness, the impact of disasters on youth"
        ]
      }
    }
  ],

  /* ------------------------------------------------------------------------
     PROJETS · status : "done" (Terminé) | "wip" (En cours)
     featured: true  → grande carte avec le schéma de topologie interactif
     ------------------------------------------------------------------------ */
  projects: [
    {
      id: "hp-infra",
      status: "done",
      featured: true,
      icon: "server",
      title: {
        fr: "Infrastructure et virtualisation · Stage chez HP",
        en: "Infrastructure and virtualisation · HP internship"
      },
      summary: {
        fr: "Pendant ce stage, j'ai remis à plat l'infrastructure : migration d'environ 150 VM d'ESXi vers Proxmox VE sur 4 serveurs HPE ProLiant, un firewall OPNsense, un réseau découpé en VLAN, du stockage TrueNAS en iSCSI et la téléphonie 3CX sur sa propre VM.",
        en: "During this internship I rebuilt the infrastructure: about 150 VMs migrated from ESXi to Proxmox VE on 4 HPE ProLiant servers, an OPNsense firewall, a network split into VLANs, TrueNAS storage over iSCSI and 3CX telephony on its own VM."
      },
      details: {
        fr: [
          ["Périmètre", "J'ai installé le firewall OPNsense et écrit ses règles. Le réseau est découpé en trois VLAN : utilisateurs, objets connectés et imprimantes."],
          ["Migration", "Environ 150 VM et plus de 30 To passés de VMware ESXi à Proxmox VE avec QEMU, à chaud ou le week-end."],
          ["Méthode", "Des essais pour valider la conversion, puis une checklist et une sauvegarde avant chaque bascule."],
          ["Résultat", "Aucune donnée perdue. J'ai tout documenté : architecture, plan d'adressage et procédure de reprise."]
        ],
        en: [
          ["Perimeter", "I set up the OPNsense firewall and wrote its rules. The network is split into three VLANs: users, IoT devices and printers."],
          ["Migration", "About 150 VMs and over 30 TB moved from VMware ESXi to Proxmox VE with QEMU, live or over weekends."],
          ["Method", "Test runs to validate the conversion, then a checklist and a backup before every cutover."],
          ["Outcome", "No data lost. I documented everything: architecture, IP addressing plan and recovery procedure."]
        ]
      },
      stack: ["Proxmox VE", "VMware ESXi", "OPNsense", "TrueNAS", "HPE ProLiant", "VLAN"]
    },
    {
      id: "attack-surface",
      status: "wip",
      icon: "radar",
      title: {
        fr: "Pipeline multi-agents d'analyse de surface d'attaque",
        en: "Multi-agent attack surface analysis pipeline"
      },
      summary: {
        fr: "J'ai commencé ce projet pendant mon stage chez Cybersherpa et je le continue dans mon lab. Ce sont des agents IA qui automatisent l'analyse de surface d'attaque et d'autres tâches IT et sécurité, en respectant le droit suisse.",
        en: "I started this project during my internship at Cybersherpa and I'm continuing it in my lab. It uses AI agents to automate attack surface analysis and other IT and security tasks, while staying within Swiss law."
      },
      details: {
        fr: [
          ["Architecture", "Chaque fonction est un agent à part, décrit au format ouvert SKILL.md. On peut en ajouter, en remplacer ou en vérifier un sans toucher aux autres."],
          ["Moteur", "Hermes Agent fait tourner les agents, et je les pilote depuis une console Hermes Workspace hébergée chez moi."],
          ["Cadre légal", "Le droit suisse (art. 143bis CP, accès indu à un système informatique) a été pris en compte dès la conception."],
          ["Suite", "Je continue à le développer dans mon lab pour automatiser plus de tâches IT et sécurité."]
        ],
        en: [
          ["Architecture", "Each function is a separate agent described in the open SKILL.md format. You can add, replace or check one without touching the others."],
          ["Engine", "Hermes Agent runs the agents, and I control them from a Hermes Workspace console hosted at home."],
          ["Legal framework", "Swiss law (art. 143bis of the Criminal Code, unauthorised access to a computer system) was taken into account from the start."],
          ["Next steps", "I'm still working on it in my lab to automate more IT and security tasks."]
        ]
      },
      stack: ["Hermes Agent", "Hermes Workspace", "Python", "PowerShell", "SKILL.md"]
    },
    {
      id: "sys-utils",
      status: "done",
      icon: "terminal",
      title: {
        fr: "Utilitaires système personnels",
        en: "Personal system utilities"
      },
      summary: {
        fr: "Des scripts que j'ai écrits pour moi et que je partage avec d'autres étudiants : personnaliser Windows et Linux automatiquement, régler Linux depuis une petite interface, lancer des scripts en un clic.",
        en: "Scripts I wrote for myself and share with other students: customising Windows and Linux automatically, tweaking Linux settings from a small interface, running scripts in one click."
      },
      details: {
        fr: [
          ["Personnalisation", "Le fond d'écran et l'écran de démarrage se règlent tout seuls, sous Windows comme sous Linux."],
          ["Réglages Linux", "Les réglages du système passent par une interface scriptée au lieu d'être faits à la main."],
          ["Lanceurs", "De petits lanceurs pour exécuter un script quand j'en ai besoin."]
        ],
        en: [
          ["Customisation", "The wallpaper and boot screen are set automatically, on both Windows and Linux."],
          ["Linux settings", "System settings go through a scripted interface instead of being changed by hand."],
          ["Launchers", "Small launchers to run a script whenever I need it."]
        ]
      },
      stack: ["Python", "PowerShell", "Bash", "Linux", "Windows"]
    }
  ],

  /* ------------------------------------------------------------------------
     TOPOLOGIE DU STAGE CHEZ HP (schéma interactif du projet « featured »)
     Coordonnées dans un repère SVG de 560 × 560. w = largeur du nœud.
     ------------------------------------------------------------------------ */
  topology: {
    zones: [
      { id: "vlan", x: 18, y: 330, w: 318, h: 104, label: "topo.zone.vlan" },
      { id: "virt", x: 352, y: 330, w: 190, h: 212, label: "topo.zone.virt" }
    ],
    nodes: [
      { id: "internet", x: 280, y: 52, w: 120, icon: "globe", label: "Internet", sub: "WAN",
        detail: { fr: "L'accès à Internet. Tout ce qui entre ou sort passe d'abord par le firewall.",
                  en: "The internet connection. Everything coming in or going out goes through the firewall first." } },
      { id: "opnsense", x: 280, y: 150, w: 150, icon: "shield", label: "OPNsense", sub: "Firewall", accent: "acid",
        detail: { fr: "J'ai installé ce firewall pendant le stage et écrit ses règles. Il contrôle tout ce qui passe entre Internet et le réseau interne.",
                  en: "I installed this firewall during the internship and wrote its rules. It controls everything between the internet and the internal network." } },
      { id: "switch", x: 280, y: 248, w: 130, icon: "switch", label: "Switch", sub: "VLAN",
        detail: { fr: "Le switch met chaque type d'appareil dans son propre VLAN.",
                  en: "The switch puts each type of device in its own VLAN." } },
      { id: "users", x: 72, y: 372, w: 92, icon: "users", label: { fr: "Utilisateurs", en: "Users" }, sub: "VLAN",
        detail: { fr: "Les postes des utilisateurs, séparés des objets connectés et des imprimantes.",
                  en: "User computers, kept apart from IoT devices and printers." } },
      { id: "iot", x: 177, y: 372, w: 92, icon: "chip", label: "IoT", sub: "VLAN",
        detail: { fr: "Les objets connectés sont isolés. Si l'un d'eux est piraté, il ne peut pas atteindre le reste du réseau.",
                  en: "IoT devices are isolated. If one gets hacked, it can't reach the rest of the network." } },
      { id: "printers", x: 282, y: 372, w: 92, icon: "printer", label: { fr: "Imprimantes", en: "Printers" }, sub: "VLAN",
        detail: { fr: "Les imprimantes ont leur propre VLAN. On les oublie souvent, alors qu'elles sont une porte d'entrée classique.",
                  en: "Printers get their own VLAN. People often forget about them, but they're a common way in." } },
      { id: "esxi", x: 470, y: 248, w: 128, icon: "box", label: "VMware ESXi", sub: { fr: "source", en: "source" }, ghost: true,
        detail: { fr: "L'ancienne plateforme. J'ai fait des essais pour trouver la bonne méthode, puis une sauvegarde avant chaque bascule. Aucune donnée perdue.",
                  en: "The old platform. I ran tests to find the right method, then made a backup before every cutover. No data lost." } },
      { id: "proxmox", x: 447, y: 372, w: 156, icon: "server", label: "Proxmox VE", sub: "4 × HPE ProLiant", accent: "violet",
        detail: { fr: "Le nouvel hyperviseur. Environ 150 VM converties depuis ESXi avec QEMU, plus de 30 To, à chaud ou le week-end.",
                  en: "The new hypervisor. About 150 VMs converted from ESXi with QEMU, over 30 TB, live or over weekends." } },
      { id: "truenas", x: 400, y: 488, w: 84, icon: "disk", label: "TrueNAS", sub: "iSCSI",
        detail: { fr: "Le stockage partagé, relié aux serveurs Proxmox en iSCSI.",
                  en: "Shared storage, connected to the Proxmox servers over iSCSI." } },
      { id: "pbx", x: 496, y: 488, w: 84, icon: "phone", label: "3CX", sub: "VM",
        detail: { fr: "La téléphonie IP 3CX, sur sa propre VM.",
                  en: "3CX IP telephony, on its own VM." } }
    ],
    links: [
      ["internet", "opnsense"],
      ["opnsense", "switch"],
      ["switch", "users"],
      ["switch", "iot"],
      ["switch", "printers"],
      ["switch", "proxmox"],
      ["proxmox", "truenas"],
      ["proxmox", "pbx"],
      ["esxi", "proxmox", "migration"]
    ]
  },

  /* ------------------------------------------------------------------------
     COMPÉTENCES · une catégorie = un amas de la constellation.
     Un item peut être une chaîne ou { fr, en }.
     ------------------------------------------------------------------------ */
  skills: [
    {
      id: "cyber",
      icon: "shield",
      label: { fr: "Cybersécurité", en: "Cybersecurity" },
      items: [
        { fr: "Durcissement AD", en: "AD hardening" },
        "Tiering Model", "BloodHound", "Kali Linux", "Wireshark",
        { fr: "Analyse de surface d'attaque", en: "Attack surface analysis" },
        { fr: "Labs contrôlés", en: "Controlled labs" }
      ]
    },
    {
      id: "sysnet",
      icon: "switch",
      label: { fr: "Systèmes & réseaux", en: "Systems & networks" },
      items: ["Windows Server 2025", "Linux", "AD DS", "DNS", "DHCP", "GPO", "OPNsense", "VLAN", "TCP/IP", "Cisco"]
    },
    {
      id: "virt",
      icon: "server",
      label: { fr: "Virtualisation & stockage", en: "Virtualisation & storage" },
      items: ["Proxmox VE", "VMware ESXi", "TrueNAS iSCSI", { fr: "Cluster HA", en: "HA cluster" }]
    },
    {
      id: "endpoint",
      icon: "cloud",
      label: { fr: "Endpoint & cloud", en: "Endpoint & cloud" },
      items: ["Intune", "Entra ID", "Microsoft 365", "Microsoft Security Center", "ServiceNow"]
    },
    {
      id: "auto",
      icon: "terminal",
      label: { fr: "Automatisation & scripting", en: "Automation & scripting" },
      items: ["PowerShell", "Python", "Bash", "SQL", { fr: "Agents IA", en: "AI agents" }]
    }
  ],

  /* ------------------------------------------------------------------------
     LANGUES · niveaux CECR. Plusieurs niveaux = oral / écrit distincts.
     ------------------------------------------------------------------------ */
  languages: [
    { name: { fr: "Portugais", en: "Portuguese" }, note: { fr: "Langue maternelle", en: "Native language" }, levels: [{ level: "C2" }] },
    { name: { fr: "Français", en: "French" }, note: { fr: "Scolarité publique à Genève", en: "Educated in Geneva state schools" }, levels: [{ level: "C2" }] },
    { name: { fr: "Anglais", en: "English" }, note: { fr: "Cambridge Certificate", en: "Cambridge Certificate" }, levels: [{ level: "C2" }] },
    { name: { fr: "Espagnol", en: "Spanish" }, levels: [{ kind: "oral", level: "C1" }, { kind: "written", level: "B2" }] },
    { name: { fr: "Italien", en: "Italian" }, levels: [{ kind: "oral", level: "B2" }, { kind: "written", level: "B1" }] }
  ],

  /* ------------------------------------------------------------------------
     CENTRES D'INTÉRÊT
     ------------------------------------------------------------------------ */
  interests: [
    { icon: "mountain", label: { fr: "Randonnée, escalade & via ferrata", en: "Hiking, climbing & via ferrata" } },
    { icon: "fist", label: { fr: "Sports d'équipe et sports de combat", en: "Team sports and combat sports" } },
    { icon: "gear", label: { fr: "Mécanique et sports automobiles", en: "Mechanics and motorsport" } },
    { icon: "radar", label: { fr: "Veille techno et cybersécurité", en: "Tech and cybersecurity watch" } }
  ],

  /* ------------------------------------------------------------------------
     LIENS DE CONTACT
     ------------------------------------------------------------------------ */
  links: {
    email: "bruno.alves@git.swiss",
    github: "https://github.com/burnBA",
    linkedin: "https://www.linkedin.com/in/bruno-alves-256067211/"
  }
};
