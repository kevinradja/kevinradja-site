// Certifications avec lien de vérification officiel (dates vérifiées sur les pages des émetteurs).
export type Cert = { n: string; en?: string; by: string; y: string; url?: string; c: string; i: string; logo: string };
export const certs: Cert[] = [
  { n: 'Advanced Data Analytics', by: 'Google', y: '2026', url: 'https://www.credly.com/badges/dc6d61e3-4467-4981-96f3-df994d326fd9', c: '#4285F4', i: 'G', logo: '/logos/certs/google.svg' },
  { n: 'Business Intelligence', by: 'Google', y: '2026', c: '#34A853', i: 'G', logo: '/logos/certs/google.svg' },
  { n: 'Project Management', by: 'Google', y: '2026', url: 'https://www.credly.com/badges/d4e64494-a82f-433b-b501-4ce5c5c6632a', c: '#EA4335', i: 'G', logo: '/logos/certs/google.svg' },
  { n: 'Advanced Designer', by: 'Dataiku', y: '2026', url: 'https://verify.skilljar.com/c/w4tpakgv3igc', c: '#2AB1AC', i: 'D', logo: '/logos/certs/dataiku.svg' },
  { n: 'dbt Fundamentals', by: 'dbt Labs', y: '2026', url: 'https://credentials.getdbt.com/aea111ca-b271-48bb-9e83-95b90fdf229e', c: '#FF694B', i: 'dbt', logo: '/logos/certs/dbt.svg' },
  { n: 'Introduction to Snowflake', by: 'Snowflake', y: '2026', c: '#29B5E8', i: '❄', logo: '/logos/certs/snowflake.svg' },
  { n: 'Construire des agents IA', en: 'Building AI Agents', by: 'CodeSignal', y: '2026', url: 'https://codesignal.com/learn/certificates/cmjhd6zyj008hl2049sudxiyq/course-paths/462', c: '#1062FB', i: 'AI', logo: '/logos/certs/codesignal.svg' },
];
