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
  CONTACT_LINKS,
  atlasSrcSet,
} from '../../data';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useLightbox } from '../../hooks/useLightbox';
import { Lightbox } from '../../components/Lightbox';
import { BrowserFrame } from '../../components/BrowserFrame';
import {
  ArrowDownIcon,
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
  transition: { duration: 0.5, ease: EASE },
};

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

/* ───────────────────────── Nav ───────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const click = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-brand-cyan/10 bg-navy/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => scrollTo('#hero')} className="font-mono text-sm font-bold tracking-tight text-brand-cyan">
          MK<span className="text-slate-muted">.dev</span>
        </button>

        <ul className="hidden gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => click(item.href)}
                className="font-body text-[13px] text-slate-text transition-colors hover:text-brand-cyan"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href={PROFILE.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-md border border-brand-cyan/30 px-3.5 py-1.5 font-mono text-[12px] text-brand-cyan transition-colors hover:bg-brand-cyan/10 md:inline-flex"
        >
          CV <ExternalIcon width={13} height={13} />
        </a>

        <button className="text-slate-text md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-brand-cyan/10 bg-navy/95 px-6 py-4 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button onClick={() => click(item.href)} className="font-body text-sm text-slate-text hover:text-brand-cyan">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  const { displayed } = useTypewriter(PROFILE.roleLong, 60, 600);

  const btn =
    'font-body text-[13px] font-medium px-5 py-2.5 rounded-md border transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2';

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 animate-grid-fade opacity-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:gap-16">
          <div className="flex-1 animate-slide-up">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-cyan">
                {PROFILE.availability}
              </span>
            </div>

            <h1 className="mb-4 font-display font-bold leading-[1.02] tracking-[-0.02em]" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)' }}>
              {PROFILE.firstName}
              <br />
              <span className="text-brand-cyan">{PROFILE.lastName}</span>
            </h1>

            <div className="mb-6 min-h-[2.25rem] font-mono text-slate-text" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}>
              <span>{'> '}</span>
              <span className="text-brand-cyan">{displayed}</span>
              <span className="animate-cursor-blink text-brand-cyan">_</span>
            </div>

            <p className="mb-8 max-w-[520px] font-body text-[1rem] leading-[1.8] text-slate-text">{PROFILE.tagline}</p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('#work')}
                className={`${btn} cursor-pointer border-brand-cyan bg-brand-cyan/10 text-brand-cyan hover:bg-brand-cyan/20`}
              >
                View Atlas case study <ArrowRightIcon width={14} height={14} />
              </button>
              <a href={PROFILE.cv} target="_blank" rel="noopener noreferrer" className={`${btn} border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/5`}>
                View CV <ExternalIcon width={14} height={14} />
              </a>
              <button onClick={() => scrollTo('#contact')} className={`${btn} cursor-pointer border-slate-subtle/40 text-slate-text hover:border-brand-cyan/40 hover:text-brand-cyan`}>
                Get in touch
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-full border border-brand-cyan/20" />
              <div className="absolute inset-0 scale-125 rounded-full border border-brand-blue/10" />
              <img
                src={PROFILE.photo}
                srcSet="/Mahmoud-400.webp 400w, /Mahmoud-800.webp 800w"
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={PROFILE.name}
                width={1024}
                height={1024}
                loading="eager"
                fetchPriority="high"
                className="h-56 w-56 rounded-full border-2 border-brand-cyan/30 object-cover md:h-72 md:w-72"
                style={{ filter: 'contrast(1.02) brightness(0.98)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo('#metrics')}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-slate-subtle transition-colors hover:text-brand-cyan"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[10px] tracking-[0.1em]">scroll</span>
        <ArrowDownIcon className="animate-bounce" />
      </button>
    </section>
  );
}

/* ───────────────────────── Metrics ───────────────────────── */
function Metrics() {
  return (
    <section id="metrics" className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brand-cyan/12 bg-brand-cyan/10 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
            className="bg-navy-light p-6"
          >
            <div className="font-display text-2xl font-bold text-brand-cyan sm:text-3xl">{m.value}</div>
            <div className="mt-1 text-[12px] leading-snug text-slate-text">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────── Section label helper ───────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-cyan">{children}</span>
      <div className="h-px flex-1 bg-brand-cyan/10" />
    </div>
  );
}

/* ───────────────────────── Atlas case study ───────────────────────── */
function AtlasCase() {
  const { index, open, close, navigate } = useLightbox();

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div {...fadeUp}>
        <Label>Flagship Project · Graduation</Label>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold tracking-[-0.02em]">{ATLAS.name}</h2>
          <span className="rounded border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[11px] text-emerald-400">
            ● Live · production-ready
          </span>
        </div>
        <p className="max-w-3xl font-body text-[1.05rem] leading-[1.85] text-slate-text">{ATLAS.description}</p>
      </motion.div>

      {/* Cover */}
      <motion.div {...fadeUp} className="mt-10">
        <BrowserFrame
          url="app.atlas-erp · لوحة التحكم"
          className="rounded-2xl border border-brand-cyan/15 bg-navy-light shadow-2xl shadow-brand-blue/10"
          barClassName="border-b border-brand-cyan/10 bg-navy text-slate-subtle"
          urlClassName="bg-navy/60 text-slate-muted"
        >
          <img src={ATLAS.cover} srcSet={atlasSrcSet(ATLAS.cover)} sizes="(max-width: 768px) 100vw, 50vw" alt="Atlas ERP dashboard" width={1873} height={1080} decoding="async" className="w-full" />
        </BrowserFrame>
      </motion.div>

      {/* Highlights */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ATLAS_HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
            className="rounded-xl border border-brand-cyan/12 bg-navy-light p-5 transition-colors hover:border-brand-cyan/30"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-brand-cyan">▹</span>
              <h3 className="font-display text-[1rem] font-semibold">{h.title}</h3>
            </div>
            <p className="text-[13px] leading-[1.7] text-slate-text">{h.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Stack + links */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {ATLAS.stack.map((s) => (
          <span key={s} className="rounded border border-brand-cyan/20 bg-brand-blue/10 px-2.5 py-1 font-mono text-[11px] text-brand-cyan">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={ATLAS.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-slate-subtle/30 px-4 py-2 font-mono text-[12px] text-slate-text transition-colors hover:border-brand-cyan/40 hover:text-brand-cyan">
          <GitHubIcon width={14} height={14} /> View codebase
        </a>
      </div>

      {/* Module gallery */}
      <motion.div {...fadeUp} className="mt-16">
        <Label>Explore the modules</Label>
        <p className="mb-8 max-w-2xl text-[14px] leading-[1.7] text-slate-text">
          Ten integrated modules, all running on the same multi-tenant core. Click any screen to enlarge.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ATLAS_MODULES.map((m, i) => (
            // No per-card whileInView reveal: its IntersectionObserver could
            // fail to fire on some mobile browsers, leaving cards at opacity:0
            // (blank screenshots). Always-visible; hover stays CSS.
            <button
              key={m.id}
              onClick={() => open(i)}
              className="group overflow-hidden rounded-xl border border-brand-cyan/12 bg-navy-light text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/30"
            >
              {/* padding-bottom 62.5% = a 16:10 box without relying on CSS
                  aspect-ratio (which some mobile browsers fail to resolve,
                  collapsing the image to 0 height → blank). */}
              <div className="relative overflow-hidden border-b border-brand-cyan/10 bg-navy pb-[62.5%]">
                <img
                  src={m.image}
                  srcSet={atlasSrcSet(m.image)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={`Atlas ERP — ${m.title}`}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute right-2 top-2 rounded bg-navy/80 px-1.5 py-0.5 font-mono text-[10px] text-brand-cyan backdrop-blur">
                  {m.titleAr}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-[0.95rem] font-semibold">{m.title}</h3>
                <p className="mt-1 text-[12px] leading-[1.6] text-slate-text">{m.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.tags.map((t) => (
                    <span key={t} className="rounded bg-brand-blue/10 px-2 py-0.5 font-mono text-[10px] text-brand-cyan/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
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
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div {...fadeUp}>
        <Label>Experience</Label>
        <h2 className="mb-12 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.02em]">
          What I've built &amp; done
        </h2>
      </motion.div>
      <div className="relative max-w-3xl">
        <div className="absolute bottom-0 left-[3px] top-2 w-px bg-gradient-to-b from-brand-cyan/40 to-transparent" />
        {EXPERIENCE.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
            className="relative pb-12 pl-8 last:pb-0"
          >
            <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_0_4px_rgba(56,189,248,0.12)]" />
            <p className="mb-1 font-mono text-[11px] tracking-[0.08em] text-brand-cyan">{item.period}</p>
            <h3 className="mb-0.5 font-display text-[1.1rem] font-semibold">{item.role}</h3>
            <p className="mb-3 text-[13px] text-slate-text">{item.org}</p>
            <p className="mb-4 text-[14px] leading-[1.75] text-slate-text">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="rounded border border-brand-cyan/20 bg-brand-blue/10 px-2.5 py-1 font-mono text-[11px] text-brand-cyan">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Skills ───────────────────────── */
function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div {...fadeUp}>
        <Label>Skills</Label>
        <h2 className="mb-12 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.02em]">Technical toolkit</h2>
      </motion.div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
            className="rounded-xl border border-brand-cyan/12 bg-navy-light p-5 transition-colors hover:border-brand-cyan/25"
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-brand-cyan">{g.category}</p>
            <ul className="space-y-2">
              {g.skills.map((s) => (
                <li key={s} className="flex items-center gap-2 text-[13px] text-slate-200">
                  <span className="font-mono text-[10px] text-slate-subtle">—</span>
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Education + side projects ───────────────────────── */
function EducationAndMore() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <div>
          <motion.div {...fadeUp}>
            <Label>Education</Label>
            <h2 className="mb-8 font-display text-[clamp(1.4rem,2.5vw,1.9rem)] font-semibold tracking-[-0.02em]">Academic background</h2>
          </motion.div>
          <div className="space-y-4">
            {EDUCATION.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
                className="flex items-start gap-4 rounded-xl border border-brand-cyan/12 bg-navy-light p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/15 text-xl">{e.emoji}</div>
                <div>
                  <h3 className="font-display text-[1rem] font-semibold">{e.degree}</h3>
                  <p className="text-[13px] text-slate-text">{e.school}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-brand-cyan">{e.period}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-32 pt-24">
      <Label>Contact</Label>
      <motion.div
        {...fadeUp}
        className="rounded-2xl border border-brand-cyan/12 bg-navy-light p-10 text-center"
      >
        <h2 className="mb-3 font-display text-[1.8rem] font-semibold leading-tight">
          Ready to contribute.
          <br />
          Let's talk.
        </h2>
        <p className="mx-auto mb-10 max-w-md text-[14px] leading-[1.7] text-slate-text">
          Open to full-stack, backend, or geospatial software roles — based in {PROFILE.location}, available remotely.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {CONTACT_LINKS.map((link) => {
            const cls =
              'flex items-center gap-2 rounded-md border border-brand-cyan/25 px-5 py-3 font-mono text-[12px] text-brand-cyan transition-colors hover:border-brand-cyan hover:bg-brand-cyan/10';
            if (link.icon === 'mail') {
              return (
                <button key={link.id} onClick={copy} className={`${cls} cursor-pointer`}>
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
    </section>
  );
}

/* ───────────────────────── Root ───────────────────────── */
export function TerminalDesign() {
  return (
    <div className="min-h-screen bg-navy font-body text-slate-200">
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <AtlasCase />
        <Experience />
        <Skills />
        <EducationAndMore />
        <Contact />
      </main>
      <footer className="border-t border-brand-cyan/8 py-6 text-center">
        <p className="font-mono text-[11px] tracking-[0.04em] text-slate-subtle">
          {PROFILE.name} · Built with React + TypeScript · {PROFILE.location} · 2026
        </p>
      </footer>
    </div>
  );
}
