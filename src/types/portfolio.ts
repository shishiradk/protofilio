export interface PortfolioData {
  navbar: { text: string; link: string; icon: string }[];
  hero: { title: string; description: string; cvLink: string; blogLink: string; image: string };
  hire: { text: string; color: string; visible: boolean; glow: boolean };
  about: { title: string; name: string; description: string; intro: string };
  skills: { icon: string; title: string; desc: string }[];
  experience: { company: string; role: string; duration: string; desc: string }[];
  projects: { id: string; title: string; desc: string; tags: string[]; featured: boolean; demo: string; code: string }[];
  socials: { linkedin: string; github: string; kaggle: string; twitter: string; instagram: string };
  footer: { text: string; year: string };
  adminPassword: string;
}
