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

/* ─────────────────────────────────────────────────────────────
   Identity & elevator pitch — reused across all three designs.
   ───────────────────────────────────────────────────────────── */
export const PROFILE = {
  name: 'Mahmoud Kharouf',
  firstName: 'Mahmoud',
  lastName: 'Kharouf',
  role: 'Full-Stack Developer',
  roleLong: 'Full-Stack Developer · Django + React',
  location: 'Tulkarm, Palestine',
  availability: 'Available for opportunities',
  photo: '/profile.png',
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
  { id: 'stack', value: 'Django + React', label: 'End-to-end ownership, API to UI' },
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
  cover: '/projects/atlas/dashboard.png',
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
    image: '/projects/atlas/dashboard.png',
    tags: ['KPIs', 'Cash flow', 'Charts'],
  },
  {
    id: 'analytics',
    title: 'Financial Analytics',
    titleAr: 'التحليلات المالية',
    description:
      'Trend analysis across revenue and cash flow over time, with month-over-month comparisons to spot momentum early.',
    image: '/projects/atlas/analytics.png',
    tags: ['Trends', 'Reporting', 'Insights'],
  },
  {
    id: 'treasury',
    title: 'Treasury & Banking',
    titleAr: 'الخزينة',
    description:
      'Manage bank accounts, checks, and transfers with running balances and a full ledger of every financial instrument.',
    image: '/projects/atlas/treasury.png',
    tags: ['Bank accounts', 'Checks', 'Transfers'],
  },
  {
    id: 'invoices',
    title: 'Invoicing',
    titleAr: 'الفواتير',
    description:
      'Customer, supplier, and internal invoices with paid / unpaid / overdue tracking and automatic due-date alerts.',
    image: '/projects/atlas/invoices.png',
    tags: ['AR / AP', 'Due tracking', 'Statuses'],
  },
  {
    id: 'debts',
    title: 'Debt & Receivables Ledger',
    titleAr: 'سجل الديون',
    description:
      'Track money owed and owing per counterparty, with payment progress bars and settlement status across the business.',
    image: '/projects/atlas/debts.png',
    tags: ['Receivables', 'Payables', 'Settlement'],
  },
  {
    id: 'employees',
    title: 'HR & Payroll',
    titleAr: 'الموظفون',
    description:
      'Employee records organized by department with salaries, working hours, contact details, and attendance.',
    image: '/projects/atlas/employees.png',
    tags: ['Records', 'Salaries', 'Attendance'],
  },
  {
    id: 'leaves',
    title: 'Leave Management',
    titleAr: 'الإجازات',
    description:
      'A leave-request workflow with approvals and balances, modeled on Palestinian labor law and policy rules.',
    image: '/projects/atlas/leaves.png',
    tags: ['Approvals', 'Balances', 'Labor law'],
  },
  {
    id: 'pos',
    title: 'Point of Sale',
    titleAr: 'نقطة البيع',
    description:
      'A fast cashier interface with barcode scanning, live cart, category filters, and multi-branch register support.',
    image: '/projects/atlas/pos.png',
    tags: ['Barcode', 'Cart', 'Multi-branch'],
  },
  {
    id: 'sales',
    title: 'Sales Records',
    titleAr: 'سجل المبيعات',
    description:
      'Every transaction logged per cashier, with payment-method analytics and revenue attribution across the team.',
    image: '/projects/atlas/sales.png',
    tags: ['Transactions', 'Payment mix', 'Export'],
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    titleAr: 'المسترجعات',
    description:
      'A refund workflow with approvals plus analytics on return reasons to surface quality and process issues.',
    image: '/projects/atlas/returns.png',
    tags: ['Refund flow', 'Reason analytics', 'Approvals'],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'atlas-erp',
    period: '2022 – 2026',
    role: 'Full-Stack Developer — Lead',
    org: 'Atlas ERP · Graduation Project',
    description:
      'Architected and built a full-stack, multi-tenant ERP from design to deployment. Owned the backend API and database schemas, drove frontend development, and coordinated a distributed team using agile practices to ship 10+ integrated business modules.',
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
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive UI', 'RTL / i18n'],
  },
  {
    id: 'geospatial',
    category: 'Geospatial',
    skills: ['GPS / GNSS', 'Total Station', 'ArcGIS / ArcMap', 'AutoCAD', 'QGIS'],
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
    image: '/projects/atlas/dashboard.png',
    githubUrl: 'https://github.com/osaid-B/Main-Application',
    liveUrl: '#',
    status: 'live',
  },
  {
    id: 'geo-viewer',
    name: 'GIS Web Dashboard',
    description:
      'A browser-based dashboard visualizing land-survey data on interactive maps — combining my surveying background with web development.',
    stack: ['React', 'TypeScript', 'ArcGIS', 'REST API'],
    status: 'planned',
  },
  {
    id: 'survey-tool',
    name: 'Survey Data Manager',
    description:
      'A web app to manage, organize, and export field survey records, built on skills from both Atlas ERP and land surveying.',
    stack: ['React', 'TypeScript', 'AutoCAD Data', 'SQL'],
    status: 'planned',
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
