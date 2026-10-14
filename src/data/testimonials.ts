import type { L } from './projects';

/* Real client or colleague feedback only, with their agreement.
   The section stays hidden on the site while this list is empty.
   Template:
   {
     quote: { fr: '…', en: '…' },
     name: 'Prénom N.',
     role: { fr: 'Responsable reporting', en: 'Reporting lead' },
     company: { fr: 'Coface', en: 'Coface' },
     project: 'coface-cockpit-ventes',   // slug of the related case study (optional)
   },
*/
export interface Testimonial { quote: L; name: string; role: L; company: L; project?: string }

export const testimonials: Testimonial[] = [
  {
    quote: { fr: 'J’ai suivi le parcours de Kevin chez Google, de son intégration à son rôle dans l’équipe. Les outils de suivi qu’il a développés ont été réellement utilisés par les équipes, et il a toujours su relier la donnée aux besoins du terrain.', en: 'I followed Kevin’s journey at Google, from onboarding to his role in the team. The tracking tools he built were genuinely used by the teams, and he always connected data to real field needs.' },
    name: 'Dominique Forien',
    role: { fr: 'Head of Cloud Customer Engineering', en: 'Head of Cloud Customer Engineering' },
    company: { fr: 'Google', en: 'Google' },
    project: 'google-future-ready',
  },
  {
    quote: { fr: 'J’ai travaillé avec Kevin sur des outils qui ont aidé les équipes GTM et Marketing à piloter l’adoption des solutions conformes au RGPD. Des tableaux de bord clairs, construits vite, et pensés pour ceux qui les utilisent.', en: 'I worked with Kevin on tools that helped GTM and Marketing teams steer the adoption of GDPR-compliant solutions. Clear dashboards, built fast, designed for the people who use them.' },
    name: 'Allan Duval',
    role: { fr: 'Customer Success & Adoption IA', en: 'Customer Success & AI Adoption' },
    company: { fr: 'Microsoft · ex-Google', en: 'Microsoft · ex-Google' },
    project: 'google-future-ready',
  },
  {
    quote: { fr: 'Kevin a structuré le pilotage de la performance commerciale sur 12 pays d’Europe centrale et de l’Est. Ses tableaux de bord nous ont permis de mieux suivre nos objectifs et de renforcer notre présence auprès de nos clients.', en: 'Kevin structured sales performance management across 12 countries in Central and Eastern Europe. His dashboards helped us track our targets better and strengthen our presence with our clients.' },
    name: 'Matei Mihailescu',
    role: { fr: 'Region Director Central & Eastern Europe', en: 'Region Director Central & Eastern Europe' },
    company: { fr: 'Coface', en: 'Coface' },
    project: 'coface-cockpit-ventes',
  },
  {
    quote: { fr: 'Kevin m’a aidée à choisir les bons outils pour mes projets et m’a préparé des notices simples pour les prendre en main. Une approche de conseil concrète, pédagogique et rassurante.', en: 'Kevin helped me choose the right tools for my projects and prepared simple guides to get started with them. A concrete, educational and reassuring consulting approach.' },
    name: 'Nawel Aasli',
    role: { fr: 'Étudiante en Mastère E-Business', en: 'MSc E-Business student' },
    company: { fr: 'EFREI Paris', en: 'EFREI Paris' },
  },
];
