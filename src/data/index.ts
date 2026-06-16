import type {
  NavItem,
  ExperienceItem,
  EducationItem,
  SkillGroup,
  Project,
  ContactLink,
  Metric,
  AtlasModule,
  CaseHighlight,
} from '../types';

/**
 * Build a responsive srcSet for an Atlas screenshot. Each `/projects/atlas/x.webp`
 * has pre-generated 800w/400w WebP variants (`x-800.webp`, `x-400.webp`) so the
 * browser can download a right-sized image instead of the ~1730×1079 original.
 */
export function atlasSrcSet(src: string): string {
  const base = src.replace(/\.webp$/, '');
  return `${base}-800.webp 800w, ${base}-400.webp 400w`;
}

/* ─────────────────────────────────────────────────────────────
   Identity & elevator pitch — reused across all three designs.
   ───────────────────────────────────────────────────────────── */
export const PROFILE = {
  name: 'Mahmoud Kharouf',
  firstName: 'Mahmoud',
  lastName: 'Kharouf',
  role: 'Backend Developer',
  roleLong: 'Backend Developer · Python + Django',
  location: 'Tulkarm, Palestine',
  availability: 'Available for opportunities',
  photo: '/Mahmoud.webp',
  cv: '/Mahmoud%20Kharouf.pdf',
  email: 'KharoufMahmoud@gmail.com',
  /** Short, punchy line for heroes. */
  tagline:
    'I build production-grade business software — from multi-tenant backends to the dashboards that run on top of them.',
  /** Longer summary for the about / intro blocks. */
  summary:
    'Computer Science graduate who shipped a complete, multi-tenant ERP — accounting, HR, inventory, and point-of-sale — as a graduation project. Three years of land surveying before that taught me precision and accountability; I bring the same discipline to clean APIs and reliable systems.',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

/* ─────────────────────────────────────────────────────────────
   Impact metrics — the "catch the eye in 5 seconds" strip.
   ───────────────────────────────────────────────────────────── */
export const METRICS: Metric[] = [
  { id: 'modules', value: '10+', label: 'Integrated ERP modules shipped' },
  { id: 'tenant', value: 'Multi-tenant', label: 'Isolated DB schema per company' },
  { id: 'stack', value: 'Django + DRF', label: 'REST APIs, data & multi-tenant systems' },
  { id: 'field', value: '3 yrs', label: 'Field surveying — precision & rigor' },
];

/* ─────────────────────────────────────────────────────────────
   Atlas ERP — the flagship graduation project.
   Each module is backed by a real product screenshot.
   ───────────────────────────────────────────────────────────── */
export const ATLAS = {
  name: 'Atlas ERP',
  tagline: 'A production-ready, multi-tenant business management platform.',
  description:
    "Atlas is a complete Enterprise Resource Planning system I architected and built end-to-end as my CS graduation project. Each company's data is isolated per tenant behind a secure REST API, with role-based access control, a full Arabic (RTL) interface, and dark mode. It unifies finance, accounting, HR, inventory, and point-of-sale into one platform. Built on SQLite, with a planned migration to PostgreSQL for production scale.",
  githubUrl: 'https://github.com/osaid-B/Main-Application',
  liveUrl: '#',
  cover: '/projects/atlas/dashboard.webp',
  stack: [
    'Django',
    'Django REST Framework',
    'SQLite',
    'PostgreSQL (planned)',
    'React',
    'TypeScript',
    'JWT Auth',
    'RBAC',
    'Multi-Tenant',
  ],
} as const;

export const ATLAS_HIGHLIGHTS: CaseHighlight[] = [
  {
    id: 'multitenant',
    title: 'Multi-tenant architecture',
    detail:
      'Each client company is isolated as its own tenant, keeping data fully segregated while sharing one codebase and deployment. Built on SQLite today, with a planned migration to PostgreSQL for production scale.',
  },
  {
    id: 'rbac',
    title: 'Granular RBAC + JWT auth',
    detail:
      'Stateless JWT authentication paired with role-based permissions that gate every API endpoint and UI action down to the field level.',
  },
  {
    id: 'api',
    title: 'Clean REST API layer',
    detail:
      'A well-structured Django REST Framework API powers the entire frontend — paginated, validated, and documented business endpoints.',
  },
  {
    id: 'rtl',
    title: 'Full Arabic RTL + theming',
    detail:
      'A polished right-to-left Arabic interface with light/dark themes, real-time charts, and a responsive layout across every module.',
  },
];

export const ATLAS_MODULES: AtlasModule[] = [
  {
    id: 'dashboard',
    title: 'Executive Dashboard',
    titleAr: 'لوحة التحكم',
    description:
      'Company-wide KPIs at a glance — revenue, expenses, headcount, and customers — with cash-flow and departmental revenue breakdowns.',
    image: '/projects/atlas/dashboard.webp',
    tags: ['KPIs', 'Cash flow', 'Charts'],
  },
  {
    id: 'analytics',
    title: 'Financial Analytics',
    titleAr: 'التحليلات المالية',
    description:
      'Trend analysis across revenue and cash flow over time, with month-over-month comparisons to spot momentum early.',
    image: '/projects/atlas/analytics.webp',
    tags: ['Trends', 'Reporting', 'Insights'],
  },
  {
    id: 'treasury',
    title: 'Treasury & Banking',
    titleAr: 'الخزينة',
    description:
      'Manage bank accounts, checks, and transfers with running balances and a full ledger of every financial instrument.',
    image: '/projects/atlas/treasury.webp',
    tags: ['Bank accounts', 'Checks', 'Transfers'],
  },
  {
    id: 'invoices',
    title: 'Invoicing',
    titleAr: 'الفواتير',
    description:
      'Customer, supplier, and internal invoices with paid / unpaid / overdue tracking and automatic due-date alerts.',
    image: '/projects/atlas/invoices.webp',
    tags: ['AR / AP', 'Due tracking', 'Statuses'],
  },
  {
    id: 'debts',
    title: 'Debt & Receivables Ledger',
    titleAr: 'سجل الديون',
    description:
      'Track money owed and owing per counterparty, with payment progress bars and settlement status across the business.',
    image: '/projects/atlas/debts.webp',
    tags: ['Receivables', 'Payables', 'Settlement'],
  },
  {
    id: 'employees',
    title: 'HR & Payroll',
    titleAr: 'الموظفون',
    description:
      'Employee records organized by department with salaries, working hours, contact details, and attendance.',
    image: '/projects/atlas/employees.webp',
    tags: ['Records', 'Salaries', 'Attendance'],
  },
  {
    id: 'leaves',
    title: 'Leave Management',
    titleAr: 'الإجازات',
    description:
      'A leave-request workflow with approvals and balances, modeled on Palestinian labor law and policy rules.',
    image: '/projects/atlas/leaves.webp',
    tags: ['Approvals', 'Balances', 'Labor law'],
  },
  {
    id: 'pos',
    title: 'Point of Sale',
    titleAr: 'نقطة البيع',
    description:
      'A fast cashier interface with barcode scanning, live cart, category filters, and multi-branch register support.',
    image: '/projects/atlas/pos.webp',
    tags: ['Barcode', 'Cart', 'Multi-branch'],
  },
  {
    id: 'sales',
    title: 'Sales Records',
    titleAr: 'سجل المبيعات',
    description:
      'Every transaction logged per cashier, with payment-method analytics and revenue attribution across the team.',
    image: '/projects/atlas/sales.webp',
    tags: ['Transactions', 'Payment mix', 'Export'],
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    titleAr: 'المسترجعات',
    description:
      'A refund workflow with approvals plus analytics on return reasons to surface quality and process issues.',
    image: '/projects/atlas/returns.webp',
    tags: ['Refund flow', 'Reason analytics', 'Approvals'],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'atlas-erp',
    period: '2022 – 2026',
    role: 'Backend Developer — Lead',
    org: 'Atlas ERP · Graduation Project',
    description:
      'Architected and built a complete, multi-tenant ERP from design to deployment. Owned the backend API and database schemas, drove frontend development, and coordinated a distributed team using agile practices to ship 10+ integrated business modules.',
    tags: ['Django REST', 'SQLite', 'React', 'Multi-Tenant', 'Team Lead'],
  },
  {
    id: 'land-survey',
    period: '2019 – 2022',
    role: 'Land Surveyor',
    org: 'Field Experience — Tulkarm Region',
    description:
      'Conducted geodetic surveys, boundary demarcation, and topographic data collection with GPS and Total Station instruments. Processed spatial data in AutoCAD and ArcMap and delivered precise technical reports for infrastructure and cadastral projects — three years of discipline built through field precision.',
    tags: ['GPS / GNSS', 'Total Station', 'AutoCAD', 'ArcMap', 'GIS', 'Reporting'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'cs-degree',
    degree: 'B.Sc. Computer Science',
    school: 'Al-Quds Open University',
    period: '2022 – June 2026',
    emoji: '🎓',
  },
  {
    id: 'survey-diploma',
    degree: 'Diploma in Land Surveying',
    school: "Ramallah Women's Training Center",
    period: '2017 – 2019',
    emoji: '📐',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'backend',
    category: 'Backend',
    skills: [
      'Python',
      'Django',
      'Django REST Framework',
      'SQLite',
      'PostgreSQL (learning)',
      'REST API Design',
      'JWT Auth · RBAC',
      'Multi-Tenant Systems',
    ],
  },
  {
    id: 'frontend',
    category: 'Client-Side Basics',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'tools',
    category: 'Tools & Workflow',
    skills: ['Git / GitHub', 'Agile / Scrum', 'VS Code', 'Technical Reporting'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'atlas-erp',
    name: 'Atlas ERP',
    description:
      'A production-ready, multi-tenant ERP with isolated tenant schemas, granular RBAC, a secure REST API, and 10+ integrated business modules.',
    stack: ['Django', 'Django REST', 'SQLite', 'React', 'RBAC', 'Multi-Tenant'],
    image: '/projects/atlas/dashboard.webp',
    githubUrl: 'https://github.com/osaid-B/Main-Application',
    liveUrl: '#',
    status: 'live',
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:KharoufMahmoud@gmail.com',
    icon: 'mail',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/KhMahmoud',
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mahmoudkharouf/',
    icon: 'linkedin',
  },
  {
    id: 'phone',
    label: '+972 566400296',
    href: 'tel:+972566400296',
    icon: 'phone',
  },
];
