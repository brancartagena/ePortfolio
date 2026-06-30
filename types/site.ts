export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  role: string;
  client?: string;
  summary: string;
  tags: string[];
  href?: string;
  image?: string;
};
