export type TrustItem =
  | {
      type: 'number';
      count: number;
      suffix: string;
      label: string;
      duration?: number;
    }
  | { type: 'text'; value: string; label: string; confirm?: boolean };

export interface Service {
  index: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface Partner {
  name: string;
  logo?: string;
  url?: string;
  placeholder?: boolean;
}

export interface Reference {
  tag: string;
  client: string;
  project: string;
  period: string;
  url?: string;
  placeholder?: boolean;
}

export interface NewsItem {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  url: string;
  thumb?: string;
}

export interface Reason {
  num: string;
  icon: string;
  title: string;
  desc: string;
}

export interface ContactConfig {
  phone: string;
  email: string;
  address: string;
  mailtoSubject?: string;
  introPdfUrl?: string;
}

export interface CompanyInfo {
  name: string;
  ceo: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
}

export interface NavItem {
  label: string;
  href: string;
  cta?: boolean;
}

export interface LinkGroup {
  title: string;
  links: { label: string; href: string }[];
}
