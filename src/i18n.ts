import type { Lang } from './data/projects';

export const routes = {
  home: { fr: '/', en: '/en/' },
  work: { fr: '/realisations/', en: '/en/work/' },
  pricing: { fr: '/offres/', en: '/en/pricing/' },
  about: { fr: '/parcours/', en: '/en/about/' },
  contact: { fr: '/contact/', en: '/en/contact/' },
  portfolio: { fr: '/portfolio/', en: '/en/portfolio/' },
  game: { fr: '/jeu/', en: '/en/game/' },
  legal: { fr: '/mentions-legales/', en: '/en/legal/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
} as const;
export type RouteKey = keyof typeof routes;

export const r = (key: RouteKey, lang: Lang) => routes[key][lang];
export const project = (slug: string, lang: Lang) => `${routes.work[lang]}${slug}/`;

/** Translate the current path to the other language. */
export const altPath = (path: string, lang: Lang): string => {
  const other: Lang = lang === 'fr' ? 'en' : 'fr';
  for (const k of Object.keys(routes) as RouteKey[]) {
    const from = routes[k][lang], to = routes[k][other];
    if (path === from) return to;
    if (k === 'work' && path.startsWith(from)) return to + path.slice(from.length);
  }
  return routes.home[other];
};

export const ui = {
  nav: { work: { fr: 'Réalisations', en: 'Work' }, pricing: { fr: 'Offres', en: 'Pricing' }, about: { fr: 'Parcours', en: 'About' }, contact: { fr: 'Contact', en: 'Contact' }, game: { fr: 'Jeu', en: 'Game' }, cta: { fr: 'Réserver un appel', en: 'Book a call' } },
  theme: { fr: 'Changer de thème', en: 'Toggle theme' },
  sound: { fr: 'Activer / couper le son', en: 'Sound on / off' },
  footer: {
    line: { fr: 'Consultant Data & BI freelance · Paris, France', en: 'Freelance Data & BI consultant · Paris, France' },
    legal: { fr: 'Mentions légales', en: 'Legal notice' },
    privacy: { fr: 'Confidentialité', en: 'Privacy' },
    siret: { fr: 'Entreprise individuelle · SIRET 130 405 574 00018', en: 'Sole trader (EI) · SIRET 130 405 574 00018' },
  },
  common: {
    caseStudy: { fr: 'Étude de cas', en: 'Case study' },
    seeProject: { fr: 'Voir le projet', en: 'View project' },
    allProjects: { fr: 'Toutes les réalisations', en: 'All work' },
    mission: { fr: 'Mission', en: 'Mission' }, challenge: { fr: 'Enjeu', en: 'Challenge' }, solution: { fr: 'Solution', en: 'Solution' }, result: { fr: 'Résultat', en: 'Result' },
    dashboard: { fr: 'Dashboard interactif', en: 'Interactive dashboard' },
    dashNote: { fr: 'Exemple illustratif, données fictives et anonymisées. Filtrez, survolez, changez d’onglet, téléchargez les données en Excel.', en: 'Illustrative example, fictional and anonymised data. Filter, hover, switch tabs, download the data as Excel.' },
    back: { fr: '← Retour au portfolio', en: '← Back to portfolio' },
    next: { fr: 'Projet suivant', en: 'Next project' },
    trusted: { fr: 'Ils me font confiance', en: 'Trusted by teams at' },
    available: { fr: 'Disponible à temps partiel pour de nouvelles missions', en: 'Available part-time for new projects' },
  },
};

export const t = <T>(o: Record<Lang, T>, lang: Lang): T => o[lang];
export const calendly = 'https://calendly.com/kevinradja91940/30min';
export const links = {
  linkedin: 'https://www.linkedin.com/in/kevin-radja/',
  malt: 'https://www.malt.fr/profile/kevinradja',
  mail: 'mailto:kevinradja91940@gmail.com',
  whatsapp: 'https://wa.me/33769101556',
};
