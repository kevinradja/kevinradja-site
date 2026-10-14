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

export const testimonials: Testimonial[] = [];
