import { useEffect, useState } from 'react';
import { motion, type Transition } from 'framer-motion';
import {
  PROFILE,
  NAV_ITEMS,
  METRICS,
  ATLAS,
  ATLAS_HIGHLIGHTS,
  ATLAS_MODULES,
  EXPERIENCE,
  SKILL_GROUPS,
  EDUCATION,
  PROJECTS,
  CONTACT_LINKS,
} from '../../data';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useLightbox } from '../../hooks/useLightbox';
import { Lightbox } from '../../components/Lightbox';
import { BrowserFrame } from '../../components/BrowserFrame';
import {
  ArrowRightIcon,
  ContactIcon,
  ExternalIcon,
  GitHubIcon,
} from '../../components/icons';

const EASE: Transition['ease'] = [0.22, 1, 0.36, 1];
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.6, ease: EASE },
};

const INK = 'text-stone-900';
const SERIF = 'font-serif';

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

/** Numbered editorial section label: "01 — Selected Work". */
function SectionMark({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="font-mono text-[12px] tracking-[0.1em] text-blue-700">{n}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-400">{children}</span>
      <span className="h-px flex-1 bg-stone-200" />
    </div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const click = (href: string) => { setOpen(false); scrollTo(href); };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-stone-200 bg-stone-50/90 backdrop-blur-md' : 'border-b border-transparent'}`}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <button onClick={() => scrollTo('#hero')} className={`${SERIF} text-[1.05rem] font-semibold ${INK}`}>
          Mahmoud Kharouf
        </button>
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button onClick={() => click(item.href)} className="text-[13px] text-stone-500 transition-colors hover:text-stone-900">
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <a href={PROFILE.cv} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-[12px] font-medium text-stone-50 transition-colors hover:bg-blue-700 md:inline-flex">
          CV <ExternalIcon width={13} height={13} />
        </a>
        <button className="text-stone-700 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-stone-200 bg-stone-50 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}><button onClick={() => click(item.href)} className="text-sm text-stone-600 hover:text-stone-900">{item.label}</button></li>
            ))}
            <li>
              <a href={PROFILE.cv} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900">
                CV <ExternalIcon width={12} height={12} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  const { displayed, done } = useTypewriter(PROFILE.roleLong, 55, 500);
  return (
    <section id="hero" className="mx-auto max-w-5xl px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
      <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr] md:gap-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="order-2 md:order-1">
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">{PROFILE.availability}</span>
          </div>
          <h1 className={`${SERIF} font-semibold leading-[1.04] tracking-[-0.02em] ${INK}`} style={{ fontSize: 'clamp(2.5rem, 9vw, 5rem)' }}>
            {PROFILE.firstName} {PROFILE.lastName}
          </h1>
          <p className="mt-4 min-h-[1.9rem] text-[1.05rem] text-stone-600 sm:text-[1.2rem]">
            {displayed}
            <span className={`ml-0.5 font-mono text-blue-700 ${done ? 'opacity-0' : 'animate-cursor-blink'}`}>|</span>
          </p>
          <p className="mt-6 max-w-[520px] text-[0.98rem] leading-[1.8] text-stone-600 sm:text-[1.05rem] sm:leading-[1.85]">{PROFILE.summary}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => scrollTo('#work')} className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-[13px] font-medium text-stone-50 transition-colors hover:bg-blue-700 sm:px-6 sm:text-[14px]">
              View Atlas case study <ArrowRightIcon width={15} height={15} />
            </button>
            <button onClick={() => scrollTo('#contact')} className="rounded-full border border-stone-300 px-5 py-3 text-[13px] font-medium text-stone-800 transition-colors hover:border-stone-900 sm:px-6 sm:text-[14px]">
              Get in touch
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }} className="relative order-1 mx-auto w-full max-w-[220px] md:order-2 md:max-w-none">
          <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-blue-700/30" />
          <img src={PROFILE.photo} alt={PROFILE.name} className="relative aspect-[4/5] w-full rounded-2xl border border-stone-200 object-cover shadow-sm md:aspect-auto md:h-80 md:w-72" />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Metrics ───────────────────────── */
function Metrics() {
  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-6">
      <div className="grid grid-cols-2 divide-stone-200 border-y border-stone-200 sm:grid-cols-4 sm:divide-x">
        {METRICS.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }} className="px-2 py-7 text-center sm:px-5">
            <div className={`${SERIF} text-3xl font-semibold ${INK}`}>{m.value}</div>
            <div className="mx-auto mt-1.5 max-w-[14ch] text-[12px] leading-snug text-stone-500">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Atlas case study ───────────────────────── */
function AtlasCase() {
  const { index, open, close, navigate } = useLightbox();

  return (
    <section id="work" className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <motion.div {...fadeUp}>
        <SectionMark n="01">Selected Work</SectionMark>
        <div className="grid items-end gap-6 md:grid-cols-[1.6fr_1fr]">
          <h2 className={`${SERIF} text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.02em] ${INK}`}>
            {ATLAS.name}
            <span className="block text-[1.1rem] font-normal italic text-stone-500">{ATLAS.tagline}</span>
          </h2>
          <p className="text-[14px] leading-[1.8] text-stone-600">{ATLAS.description}</p>
        </div>
      </motion.div>

      <motion.figure {...fadeUp} className="mt-10">
        <BrowserFrame
          url="app.atlas-erp · لوحة التحكم"
          className="rounded-xl border border-stone-200 bg-white shadow-md"
          barClassName="border-b border-stone-200 bg-stone-100 text-stone-400"
          urlClassName="bg-white text-stone-400"
        >
          <img src={ATLAS.cover} alt="Atlas ERP dashboard" className="w-full" />
        </BrowserFrame>
        <figcaption className="mt-3 text-center font-mono text-[11px] tracking-wide text-stone-400">
          Fig. 1 — Executive dashboard · real-time KPIs, cash flow & departmental analytics
        </figcaption>
      </motion.figure>

      {/* Highlights */}
      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
        {ATLAS_HIGHLIGHTS.map((h, i) => (
          <motion.div key={h.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }} className="border-t border-stone-200 pt-5">
            <span className="font-mono text-[11px] text-blue-700">{String(i + 1).padStart(2, '0')}</span>
            <h3 className={`mt-1 ${SERIF} text-[1.2rem] font-semibold ${INK}`}>{h.title}</h3>
            <p className="mt-2 text-[14px] leading-[1.75] text-stone-600">{h.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2">
        {ATLAS.stack.map((s) => (
          <span key={s} className="rounded-full border border-stone-300 px-3 py-1 text-[12px] text-stone-600">{s}</span>
        ))}
      </div>
      <div className="mt-6">
        <a href={ATLAS.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[14px] font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-700">
          <GitHubIcon width={15} height={15} /> View the codebase
        </a>
      </div>

      {/* Gallery */}
      <motion.div {...fadeUp} className="mt-20">
        <SectionMark n="02">The Modules</SectionMark>
        <p className="mb-10 max-w-2xl text-[15px] leading-[1.8] text-stone-600">
          Ten integrated modules — finance, accounting, HR, inventory, and point-of-sale — all running on one multi-tenant core. Select any screen to view it in full.
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {ATLAS_MODULES.map((m, i) => (
            <motion.button
              key={m.id}
              onClick={() => open(i)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE, delay: (i % 2) * 0.06 }}
              className="group text-left"
            >
              <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden border-b border-stone-100">
                  <img src={m.image} alt={`Atlas ERP — ${m.title}`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className={`${SERIF} text-[1.25rem] font-semibold ${INK}`}>{m.title}</h3>
                <span className="font-mono text-[12px] text-stone-400">{m.titleAr}</span>
              </div>
              <p className="mt-1.5 text-[14px] leading-[1.7] text-stone-600">{m.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {m.tags.map((t) => <span key={t} className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] text-stone-500">{t}</span>)}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <Lightbox modules={ATLAS_MODULES} index={index} onClose={close} onNavigate={navigate} />
    </section>
  );
}

/* ───────────────────────── Experience ───────────────────────── */
function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <motion.div {...fadeUp}>
        <SectionMark n="03">Experience</SectionMark>
      </motion.div>
      <div>
        {EXPERIENCE.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            className="grid gap-4 border-t border-stone-200 py-9 md:grid-cols-[180px_1fr]"
          >
            <p className="font-mono text-[13px] text-stone-400">{item.period}</p>
            <div>
              <h3 className={`${SERIF} text-[1.45rem] font-semibold ${INK}`}>{item.role}</h3>
              <p className="mt-0.5 text-[14px] text-blue-700">{item.org}</p>
              <p className="mt-3 max-w-2xl text-[15px] leading-[1.8] text-stone-600">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((t) => <span key={t} className="rounded-full border border-stone-300 px-3 py-1 text-[12px] text-stone-600">{t}</span>)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Skills + Education ───────────────────────── */
function SkillsAndEducation() {
  const planned = PROJECTS.filter((p) => p.status !== 'live');
  return (
    <section id="skills" className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <motion.div {...fadeUp}>
        <SectionMark n="04">Capabilities</SectionMark>
      </motion.div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div key={g.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }} className="border-t border-stone-200 pt-5">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-700">{g.category}</p>
            <ul className="space-y-2.5">
              {g.skills.map((s) => <li key={s} className="text-[14px] text-stone-700">{s}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp} id="education" className="mt-24 scroll-mt-24">
        <SectionMark n="05">Education &amp; Next</SectionMark>
      </motion.div>
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {EDUCATION.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }} className="flex items-start gap-4 border-t border-stone-200 pt-5">
            <span className="text-2xl">{e.emoji}</span>
            <div>
              <h3 className={`${SERIF} text-[1.2rem] font-semibold ${INK}`}>{e.degree}</h3>
              <p className="text-[14px] text-stone-600">{e.school}</p>
              <p className="mt-0.5 font-mono text-[12px] text-stone-400">{e.period}</p>
            </div>
          </motion.div>
        ))}
        {planned.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }} className="border-t border-dashed border-stone-300 pt-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className={`${SERIF} text-[1.2rem] font-semibold ${INK}`}>{p.name}</h3>
              <span className="rounded-full border border-stone-300 px-2.5 py-0.5 text-[10px] text-stone-400">Planned</span>
            </div>
            <p className="mt-2 text-[14px] leading-[1.7] text-stone-600">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="border-t border-stone-200 bg-stone-100/60">
      <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 sm:py-28">
        <motion.div {...fadeUp}>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-400">06 — Contact</span>
          <h2 className={`mx-auto mt-4 max-w-2xl ${SERIF} text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] ${INK}`}>
            Ready to contribute.
            <br />
            Let's talk.
          </h2>
          <p className="mx-auto mb-10 mt-5 max-w-md text-[15px] leading-[1.7] text-stone-600">
            Open to full-stack, backend, or geospatial software roles — based in {PROFILE.location}, available remotely.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CONTACT_LINKS.map((link) => {
              const cls = 'inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-[13px] font-medium text-stone-800 transition-colors hover:border-stone-900 hover:bg-stone-900 hover:text-stone-50';
              if (link.icon === 'mail') {
                return (
                  <button key={link.id} onClick={copy} className={cls}>
                    <ContactIcon type={link.icon} width={15} height={15} />
                    {copied ? 'Copied!' : link.label}
                  </button>
                );
              }
              return (
                <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  <ContactIcon type={link.icon} width={15} height={15} />
                  {link.label}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Root ───────────────────────── */
export function EditorialDesign() {
  return (
    <div className="min-h-screen bg-stone-50 font-body text-stone-900">
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <AtlasCase />
        <Experience />
        <SkillsAndEducation />
        <Contact />
      </main>
      <footer className="bg-stone-50 py-7 text-center">
        <p className="font-mono text-[11px] tracking-[0.04em] text-stone-400">
          {PROFILE.name} · Built with React + TypeScript · {PROFILE.location} · 2026
        </p>
      </footer>
    </div>
  );
}
