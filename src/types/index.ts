export interface NavItem {
  label: string;
  href: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  org: string;
  description: string;
  tags: string[];
  image?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  emoji: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export type ProjectStatus = 'live' | 'wip' | 'planned';

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  status: ProjectStatus;
}

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  icon: 'github' | 'mail' | 'linkedin' | 'phone' | 'external';
}

/** A single headline statistic shown in the impact / metrics strip. */
export interface Metric {
  id: string;
  value: string;
  label: string;
}

/** One feature module of the Atlas ERP, each backed by a real screenshot. */
export interface AtlasModule {
  id: string;
  /** English module name. */
  title: string;
  /** Arabic label as it appears in the live product (RTL). */
  titleAr: string;
  /** One-line description of what the module does. */
  description: string;
  /** Path to the screenshot in /public. */
  image: string;
  /** Short capability tags. */
  tags: string[];
}

/** A single highlighted engineering achievement on the Atlas case study. */
export interface CaseHighlight {
  id: string;
  title: string;
  detail: string;
}
