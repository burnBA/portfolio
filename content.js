/* ==========================================================================
   content.js — CONTENU ET TRADUCTIONS DU SITE (FR / EN)
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
      title: "Bruno Alves — Cybersécurité, Systèmes & Réseaux",
      description: "Bruno Alves, étudiant Bachelor Cybersécurité, Systèmes & Réseaux au GIT (Genève). Sécurité Active Directory, pentest, Blue Team, infrastructure et durcissement. Disponible pour une alternance à Genève.",
      locale: "fr_CH"
    },
    en: {
      title: "Bruno Alves — Cybersecurity, Systems & Networks",
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
      "hero.lede": "Étudiant en cybersécurité, déjà éprouvé sur le terrain : infrastructure en production, support en organisation internationale, sécurité de sites sensibles.",
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

      "about.kicker": "01 — À propos",
      "about.title": "Du terrain à la théorie, et retour.",
      "about.p1": "Je fais le lien entre la théorie du Bachelor et les environnements réels. Au showroom HP, j'ai migré environ 150 machines virtuelles et segmenté le réseau en production, sans aucune perte de données. Au siège du CIO, j'ai assuré le support de quelque 600 collaborateurs.",
      "about.p2": "Quatre années de sécurité physique sur des sites sensibles m'ont donné ce que les manuels n'enseignent pas : le réflexe de la gestion d'incident et le sang-froid.",
      "about.p3": "Polyvalent et autonome, je me spécialise en cybersécurité (sécurité Active Directory, pentest, Blue Team, durcissement) tout en restant opérationnel sur l'infrastructure, le réseau et le support.",
      "about.fact.school": "Formation",
      "about.fact.school.v": "Bachelor Cybersécurité, Systèmes & Réseaux · Geneva Institute of Technology (GIT)",
      "about.fact.focus": "Spécialité",
      "about.fact.focus.v": "AD Security · Pentest · Blue Team · Durcissement",
      "about.fact.also": "Polyvalence",
      "about.fact.also.v": "Infrastructure · Réseau · Support",
      "about.fact.seeking": "Recherche",
      "about.fact.seeking.v": "Alternance à Genève · sur site, hybride ou à distance",

      "exp.kicker": "02 — Parcours",
      "exp.title": "Des environnements réels, en production.",
      "exp.intro": "Du plus récent au plus ancien. Filtrez par domaine pour aller à l'essentiel.",
      "exp.filter.label": "Filtrer le parcours par domaine",
      "exp.filter.all": "Tout",
      "exp.filter.cyber": "Cybersécurité",
      "exp.filter.infra": "Infrastructure",
      "exp.filter.support": "Support",
      "exp.filter.field": "Terrain",
      "exp.empty": "Aucune expérience pour ce filtre.",

      "proj.kicker": "03 — Projets",
      "proj.title": "Ce que j'ai construit et sécurisé.",
      "proj.intro": "Projets réalisés en stage ou dans mon lab. Dépliez une carte pour le détail.",
      "proj.status.done": "Terminé",
      "proj.status.wip": "En cours",
      "proj.more": "Voir le détail",
      "proj.less": "Masquer le détail",
      "proj.stack": "Technologies",
      "topo.title": "Topologie · HP Showroom",
      "topo.hint": "Sélectionnez un élément du schéma pour l'explorer.",
      "topo.label": "Schéma interactif de l'infrastructure du showroom HP",
      "topo.zone.vlan": "Segmentation VLAN",
      "topo.zone.virt": "Virtualisation & stockage",
      "topo.swipe": "Faites glisser pour explorer le schéma",

      "skills.kicker": "04 — Compétences",
      "skills.title": "Une boîte à outils orientée infra et sécurité.",
      "skills.intro": "Survolez ou sélectionnez un domaine pour l'éclairer dans la constellation.",
      "skills.map": "Constellation des compétences",

      "lang.kicker": "05 — Langues & intérêts",
      "lang.title": "Cinq langues, plusieurs terrains.",
      "lang.scale": "Niveaux selon le Cadre européen commun de référence (A1 à C2)",
      "lang.oral": "Oral",
      "lang.written": "Écrit",
      "interests.title": "En dehors de l'écran",

      "contact.kicker": "06 — Contact",
      "contact.title": "Une alternance à pourvoir ? Parlons-en.",
      "contact.lede": "Ouvert aux opportunités d'alternance à Genève · sur site, hybride ou à distance.",
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
      "palette.top": "Retour en haut de page",

      "toast.motion.off": "Animations réduites",
      "toast.motion.on": "Animations réactivées",
      "egg.konami": "Accès root accordé. Mode phosphore activé — rejouez le code pour revenir.",
      "egg.sudo": "[sudo] Permission accordée. Prochaine étape : un entretien → bruno.alves@git.swiss",
      "egg.whoami": "bruno — cybersécurité, systèmes & réseaux · en recherche d'alternance à Genève",
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
      "hero.lede": "A cybersecurity student already proven in the field: production infrastructure, support at an international organisation, security for sensitive sites.",
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

      "about.kicker": "01 — About",
      "about.title": "From the field to theory, and back.",
      "about.p1": "I bridge the gap between Bachelor-level theory and real-world environments. At the HP showroom, I migrated around 150 virtual machines and segmented a production network with zero data loss. At IOC headquarters, I supported some 600 staff.",
      "about.p2": "Four years of physical security at sensitive sites taught me what textbooks don't: an instinct for incident handling and the ability to stay calm under pressure.",
      "about.p3": "Versatile and self-driven, I'm specialising in cybersecurity (Active Directory security, pentesting, Blue Team, hardening) while staying hands-on with infrastructure, networking and support.",
      "about.fact.school": "Studies",
      "about.fact.school.v": "Bachelor in Cybersecurity, Systems & Networks · Geneva Institute of Technology (GIT)",
      "about.fact.focus": "Specialism",
      "about.fact.focus.v": "AD Security · Pentesting · Blue Team · Hardening",
      "about.fact.also": "Also covers",
      "about.fact.also.v": "Infrastructure · Networking · Support",
      "about.fact.seeking": "Looking for",
      "about.fact.seeking.v": "Work-study position in Geneva · on-site, hybrid or remote",

      "exp.kicker": "02 — Experience",
      "exp.title": "Real environments, in production.",
      "exp.intro": "Most recent first. Filter by field to get straight to the point.",
      "exp.filter.label": "Filter experience by field",
      "exp.filter.all": "All",
      "exp.filter.cyber": "Cybersecurity",
      "exp.filter.infra": "Infrastructure",
      "exp.filter.support": "Support",
      "exp.filter.field": "Field work",
      "exp.empty": "No experience matches this filter.",

      "proj.kicker": "03 — Projects",
      "proj.title": "What I've built and secured.",
      "proj.intro": "Projects delivered during internships or in my lab. Expand a card for the details.",
      "proj.status.done": "Completed",
      "proj.status.wip": "In progress",
      "proj.more": "Show details",
      "proj.less": "Hide details",
      "proj.stack": "Technologies",
      "topo.title": "Topology · HP Showroom",
      "topo.hint": "Select any element of the diagram to explore it.",
      "topo.label": "Interactive diagram of the HP showroom infrastructure",
      "topo.zone.vlan": "VLAN segmentation",
      "topo.zone.virt": "Virtualisation & storage",
      "topo.swipe": "Swipe to explore the diagram",

      "skills.kicker": "04 — Skills",
      "skills.title": "A toolkit built for infrastructure and security.",
      "skills.intro": "Hover over or select a field to light it up in the constellation.",
      "skills.map": "Skills constellation",

      "lang.kicker": "05 — Languages & interests",
      "lang.title": "Five languages, many terrains.",
      "lang.scale": "Levels based on the Common European Framework of Reference (A1 to C2)",
      "lang.oral": "Spoken",
      "lang.written": "Written",
      "interests.title": "Away from the screen",

      "contact.kicker": "06 — Contact",
      "contact.title": "Got a work-study position? Let's talk.",
      "contact.lede": "Open to work-study opportunities in Geneva · on-site, hybrid or remote.",
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
      "palette.top": "Back to top",

      "toast.motion.off": "Motion reduced",
      "toast.motion.on": "Motion restored",
      "egg.konami": "Root access granted. Phosphor mode on — replay the code to go back.",
      "egg.sudo": "[sudo] Permission granted. Next step: an interview → bruno.alves@git.swiss",
      "egg.whoami": "bruno — cybersecurity, systems & networks · looking for a work-study position in Geneva",
      "egg.ping": "64 bytes from bruno: icmp_seq=1 ttl=64 time=reply within 24 h"
    }
  },

  /* ------------------------------------------------------------------------
     PARCOURS — ordre antichronologique (le premier est le plus récent).
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
      period: { fr: "mai – juin 2026", en: "May – Jun 2026" },
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
      period: { fr: "avr. – mai 2026", en: "Apr – May 2026" },
      mode: { fr: "Sur site", en: "On-site" },
      bullets: {
        fr: [
          "Déploiement du firewall OPNsense et écriture des règles",
          "Segmentation du réseau en VLAN",
          "Migration VMware ESXi → Proxmox VE via QEMU : ≈150 VM, plus de 30 To, migrations à chaud et en fenêtres de week-end",
          "Phase d'essais pour établir le chemin de conversion, puis checklist et sauvegarde systématique avant chaque bascule. Aucune perte de données.",
          "Documentation complète : architecture, plan d'adressage, procédure de reprise"
        ],
        en: [
          "Deployed the OPNsense firewall and wrote its rule set",
          "Segmented the network into VLANs",
          "Migrated VMware ESXi to Proxmox VE via QEMU: ≈150 VMs, 30+ TB, live migrations and weekend maintenance windows",
          "Ran a trial phase to establish the conversion path, then used a migration checklist with a full backup before every cutover. Zero data loss.",
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
      period: { fr: "mars – avr. 2026", en: "Mar – Apr 2026" },
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
      period: { fr: "mars 2022 – févr. 2026", en: "Mar 2022 – Feb 2026" },
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
      period: { fr: "juin 2018 – févr. 2020", en: "Jun 2018 – Feb 2020" },
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
     PROJETS — status : "done" (Terminé) | "wip" (En cours)
     featured: true  → grande carte avec le schéma de topologie interactif
     ------------------------------------------------------------------------ */
  projects: [
    {
      id: "hp-infra",
      status: "done",
      featured: true,
      icon: "server",
      title: {
        fr: "Infrastructure & virtualisation — HP Showroom",
        en: "Infrastructure & virtualisation — HP Showroom"
      },
      summary: {
        fr: "Infrastructure réseau sécurisée sur 4 serveurs physiques HPE ProLiant. Migration de ≈150 VM ESXi vers Proxmox VE. Firewall OPNsense, segmentation VLAN (Utilisateurs / IoT / Imprimantes), stockage TrueNAS iSCSI, téléphonie 3CX sur VM dédiée.",
        en: "A secured network infrastructure on 4 physical HPE ProLiant servers. Migration of ≈150 VMs from ESXi to Proxmox VE. OPNsense firewall, VLAN segmentation (Users / IoT / Printers), TrueNAS iSCSI storage, 3CX telephony on a dedicated VM."
      },
      details: {
        fr: [
          ["Périmètre", "Firewall OPNsense déployé et règles de filtrage écrites ; réseau segmenté en trois VLAN pour isoler utilisateurs, objets connectés et imprimantes."],
          ["Migration", "≈150 VM et plus de 30 To convertis de VMware ESXi vers Proxmox VE via QEMU, à chaud ou en fenêtres de week-end."],
          ["Méthode", "Phase d'essais pour valider le chemin de conversion, checklist de migration, sauvegarde systématique avant chaque bascule."],
          ["Résultat", "Aucune perte de données. Documentation complète : architecture, plan d'adressage, procédure de reprise."]
        ],
        en: [
          ["Perimeter", "Deployed the OPNsense firewall and wrote its filtering rules; split the network into three VLANs to isolate users, IoT devices and printers."],
          ["Migration", "≈150 VMs and 30+ TB converted from VMware ESXi to Proxmox VE via QEMU, live or during weekend windows."],
          ["Method", "Trial phase to validate the conversion path, a migration checklist, and a full backup before every cutover."],
          ["Outcome", "Zero data loss. Complete documentation: architecture, IP addressing plan, recovery procedure."]
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
        fr: "Né du stage Cybersherpa et poursuivi dans mon lab Hermes Workspace auto-hébergé : des agents IA modulaires pour automatiser l'analyse de surface d'attaque et des tâches IT et sécurité, dans le respect du cadre légal suisse.",
        en: "Started during my Cybersherpa internship and continued in my self-hosted Hermes Workspace lab: modular AI agents that automate attack surface analysis and IT and security tasks, within the Swiss legal framework."
      },
      details: {
        fr: [
          ["Architecture", "Chaque capacité est un agent autonome décrit au format ouvert SKILL.md, que l'on peut ajouter, remplacer ou auditer séparément."],
          ["Moteur", "Orchestration par Hermes Agent, pilotage depuis une console Hermes Workspace auto-hébergée."],
          ["Cadre légal", "Le droit suisse (art. 143bis CP, accès indu à un système informatique) est traité comme une contrainte de conception, pas comme une note de bas de page."],
          ["Suite", "Développement poursuivi dans mon lab Hermes Workspace, en élargissant l'automatisation aux tâches IT et sécurité."]
        ],
        en: [
          ["Architecture", "Each capability is a standalone agent described in the open SKILL.md format, so it can be added, swapped or audited on its own."],
          ["Engine", "Orchestrated by Hermes Agent and driven from a self-hosted Hermes Workspace console."],
          ["Legal framework", "Swiss law (art. 143bis of the Criminal Code, unauthorised access to a computer system) is treated as a design constraint, not a footnote."],
          ["Next steps", "Development continues in my Hermes Workspace lab, extending automation to IT and security tasks."]
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
        fr: "Scripts utilitaires pour mon usage personnel et partagés entre pairs : personnalisation automatisée du système sous Windows et Linux, réglages Linux pilotés par une interface scriptée, lanceurs à la demande.",
        en: "Utility scripts for personal use, shared with peers: automated system customisation on Windows and Linux, Linux settings driven from a scripted interface, on-demand launchers."
      },
      details: {
        fr: [
          ["Personnalisation", "Fond d'écran et écran de démarrage personnalisés automatiquement, sous Windows comme sous Linux."],
          ["Réglages Linux", "Customisation des réglages système via une interface scriptée, sans passer par une configuration manuelle."],
          ["Lanceurs", "Lanceurs de scripts selon le besoin, pour exécuter la bonne tâche en un geste."]
        ],
        en: [
          ["Customisation", "Wallpaper and boot screen customised automatically, on both Windows and Linux."],
          ["Linux settings", "System settings customised through a scripted interface instead of manual configuration."],
          ["Launchers", "On-demand script launchers to run the right task in a single step."]
        ]
      },
      stack: ["Python", "PowerShell", "Bash", "Linux", "Windows"]
    }
  ],

  /* ------------------------------------------------------------------------
     TOPOLOGIE HP SHOWROOM (schéma interactif du projet « featured »)
     Coordonnées dans un repère SVG de 560 × 560. w = largeur du nœud.
     ------------------------------------------------------------------------ */
  topology: {
    zones: [
      { id: "vlan", x: 18, y: 330, w: 318, h: 104, label: "topo.zone.vlan" },
      { id: "virt", x: 352, y: 330, w: 190, h: 212, label: "topo.zone.virt" }
    ],
    nodes: [
      { id: "internet", x: 280, y: 52, w: 120, icon: "globe", label: "Internet", sub: "WAN",
        detail: { fr: "Accès extérieur du showroom. Tout le trafic entrant et sortant passe d'abord par le firewall.",
                  en: "The showroom's external access. All inbound and outbound traffic goes through the firewall first." } },
      { id: "opnsense", x: 280, y: 150, w: 150, icon: "shield", label: "OPNsense", sub: "Firewall", accent: "acid",
        detail: { fr: "Firewall déployé pendant le stage et règles de filtrage écrites : c'est le point de contrôle entre Internet et les segments internes.",
                  en: "Firewall deployed during the internship, with its filtering rules written from scratch: the checkpoint between the internet and internal segments." } },
      { id: "switch", x: 280, y: 248, w: 130, icon: "switch", label: "Switch", sub: "VLAN",
        detail: { fr: "Cœur de la segmentation : chaque famille d'équipements est placée dans son propre VLAN.",
                  en: "The core of the segmentation: each family of devices is placed in its own VLAN." } },
      { id: "users", x: 72, y: 372, w: 92, icon: "users", label: { fr: "Utilisateurs", en: "Users" }, sub: "VLAN",
        detail: { fr: "Postes des utilisateurs, séparés des objets connectés et des imprimantes.",
                  en: "User workstations, kept apart from IoT devices and printers." } },
      { id: "iot", x: 177, y: 372, w: 92, icon: "chip", label: "IoT", sub: "VLAN",
        detail: { fr: "Objets connectés isolés : un appareil compromis a une portée limitée sur le reste du réseau.",
                  en: "Isolated IoT devices: a compromised device has limited reach into the rest of the network." } },
      { id: "printers", x: 282, y: 372, w: 92, icon: "printer", label: { fr: "Imprimantes", en: "Printers" }, sub: "VLAN",
        detail: { fr: "Segment dédié aux imprimantes, équipements souvent négligés et pourtant exposés.",
                  en: "A dedicated segment for printers, devices that are often overlooked yet exposed." } },
      { id: "esxi", x: 470, y: 248, w: 128, icon: "box", label: "VMware ESXi", sub: { fr: "source", en: "source" }, ghost: true,
        detail: { fr: "Ancienne plateforme. Phase d'essais pour établir le chemin de conversion, checklist, sauvegarde avant chaque bascule : aucune perte de données.",
                  en: "The legacy platform. A trial phase to establish the conversion path, a checklist and a backup before every cutover: zero data loss." } },
      { id: "proxmox", x: 447, y: 372, w: 156, icon: "server", label: "Proxmox VE", sub: "4 × HPE ProLiant", accent: "violet",
        detail: { fr: "Hyperviseur cible : ≈150 VM converties depuis ESXi via QEMU, plus de 30 To, à chaud ou en fenêtres de week-end.",
                  en: "Target hypervisor: ≈150 VMs converted from ESXi via QEMU, 30+ TB, live or during weekend windows." } },
      { id: "truenas", x: 400, y: 488, w: 84, icon: "disk", label: "TrueNAS", sub: "iSCSI",
        detail: { fr: "Stockage partagé présenté en iSCSI aux hôtes Proxmox.",
                  en: "Shared storage presented to the Proxmox hosts over iSCSI." } },
      { id: "pbx", x: 496, y: 488, w: 84, icon: "phone", label: "3CX", sub: "VM",
        detail: { fr: "Téléphonie IP 3CX, isolée sur une VM dédiée.",
                  en: "3CX IP telephony, isolated on a dedicated VM." } }
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
     COMPÉTENCES — une catégorie = un amas de la constellation.
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
     LANGUES — niveaux CECR. Plusieurs niveaux = oral / écrit distincts.
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
