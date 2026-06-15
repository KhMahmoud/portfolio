import { useState } from 'react';
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
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.6, ease: EASE },
};

const GRAD = 'bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300';
const GLASS =
  'rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md';

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className={`bg-clip-text font-mono text-[11px] uppercase tracking-[0.22em] text-transparent ${GRAD}`}>
      {children}
    </span>
  );
}

/* ───────────────────────── Aurora background ───────────────────────── */
function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#06060f]">
      <div className="aurora-blob absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-fuchsia-600/25 blur-[64px]" />
      <div className="aurora-blob-2 absolute -right-40 top-20 h-[40rem] w-[40rem] rounded-full bg-violet-600/25 blur-[64px]" />
      <div className="aurora-blob-3 absolute bottom-0 left-1/3 h-[38rem] w-[38rem] rounded-full bg-cyan-500/20 blur-[64px]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

/* ───────────────────────── Nav ───────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const click = (href: string) => { setOpen(false); scrollTo(href); };

  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4">
      <div className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 pl-5 backdrop-blur-md`}>
        <button onClick={() => scrollTo('#hero')} className={`bg-clip-text font-display text-sm font-bold text-transparent ${GRAD}`}>
          Mahmoud Kharouf
        </button>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button onClick={() => click(item.href)} className="text-[13px] text-white/60 transition-colors hover:text-white">
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <a
          href={PROFILE.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#06060f] transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          CV <ExternalIcon width={13} height={13} />
        </a>
        <button className="text-white/70 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
          </svg>
        </button>
      </div>
      {open && (
        <div className={`mx-auto mt-2 max-w-5xl rounded-2xl border border-white/10 bg-[#0b0b18]/95 p-4 backdrop-blur-md md:hidden`}>
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button onClick={() => click(item.href)} className="text-sm text-white/70 hover:text-white">{item.label}</button>
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
  const { displayed, done } = useTypewriter(PROFILE.roleLong, 55, 500);
  return (
    <section id="hero" className="relative flex min-h-screen items-center px-6 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[11px] uppercase tracking-[0.12em] text-white/60">{PROFILE.availability}</span>
          </div>
          <h1 className="font-display font-bold leading-[1.05] tracking-[-0.03em]" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            <span className="text-white">{PROFILE.firstName}</span>
            <br />
            <span className={`bg-clip-text text-transparent ${GRAD}`}>{PROFILE.lastName}</span>
          </h1>
          <p className="mt-4 min-h-[1.75rem] font-mono text-lg font-medium text-white/80">
            {displayed}
            <span className={`ml-0.5 text-violet-300 ${done ? 'opacity-0' : 'animate-cursor-blink'}`}>|</span>
          </p>
          <p className="mt-5 max-w-[540px] text-[1.02rem] leading-[1.8] text-white/55">{PROFILE.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('#work')}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-[#06060f] transition-transform hover:-translate-y-0.5 ${GRAD}`}
            >
              View Atlas case study <ArrowRightIcon width={15} height={15} />
            </button>
            <button onClick={() => scrollTo('#contact')} className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-[14px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">
              Get in touch
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="relative mx-auto"
        >
          <div className={`absolute -inset-3 rounded-[2rem] opacity-60 blur-2xl ${GRAD}`} />
          <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.06] p-2 backdrop-blur-md">
            <img
              src={PROFILE.photo}
              srcSet="/Mahmoud-400.webp 400w, /Mahmoud-800.webp 800w"
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={PROFILE.name}
              width={1024}
              height={1024}
              loading="eager"
              fetchPriority="high"
              className="h-64 w-64 rounded-[1.6rem] object-cover sm:h-80 sm:w-80"
            />
          </div>
          {/* Location badge — below the image so it never overlaps the photo */}
          <div className="relative mt-2 flex justify-center">
            <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0b0b18]/90 px-4 py-2 backdrop-blur-md">
              <span className={`h-2 w-2 rounded-full ${GRAD}`} />
              <span className="text-[12px] font-medium text-white/80">{PROFILE.location}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Metrics ───────────────────────── */
function Metrics() {
  return (
    <section className="mx-auto mt-10 max-w-6xl px-6 pb-8 md:mt-0">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
            className={`${GLASS} p-6`}
          >
            <div className={`bg-clip-text font-display text-2xl font-bold text-transparent sm:text-3xl ${GRAD}`}>{m.value}</div>
            <div className="mt-1.5 text-[12px] leading-snug text-white/55">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Atlas case study ───────────────────────── */
function AtlasCase() {
  const { index, open, close, navigate } = useLightbox();
  // First two modules span wider for a bento rhythm.
  const span = (i: number) => (i === 0 || i === 7 ? 'sm:col-span-2' : '');

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div {...fadeUp} className="text-center">
        <Eyebrow>Flagship Project · Graduation</Eyebrow>
        <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold tracking-[-0.03em] text-white">
          {ATLAS.name}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-[1.8] text-white/60">{ATLAS.description}</p>
      </motion.div>

      <motion.div {...fadeUp} className="relative mt-12">
        <div className={`absolute -inset-2 rounded-[2rem] opacity-25 blur-3xl ${GRAD}`} />
        <BrowserFrame
          url="app.atlas-erp · لوحة التحكم"
          className={`relative ${GLASS} shadow-2xl`}
          barClassName="border-b border-white/10 text-white/40"
          urlClassName="bg-white/5 text-white/40"
        >
          <img src={ATLAS.cover} alt="Atlas ERP dashboard" width={1873} height={1080} decoding="async" className="w-full" />
        </BrowserFrame>
      </motion.div>

      {/* Highlights */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ATLAS_HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
            className={`${GLASS} p-6`}
          >
            <h3 className="mb-2 font-display text-[1.05rem] font-semibold text-white">{h.title}</h3>
            <p className="text-[13px] leading-[1.7] text-white/55">{h.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {ATLAS.stack.map((s) => (
          <span key={s} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[12px] text-white/70 backdrop-blur">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a href={ATLAS.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white/10">
          <GitHubIcon width={15} height={15} /> View codebase
        </a>
      </div>

      {/* Bento gallery */}
      <motion.div {...fadeUp} className="mt-16 text-center">
        <Eyebrow>Explore the modules</Eyebrow>
        <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-[1.7] text-white/50">
          Ten integrated modules on one multi-tenant core. Tap any screen to enlarge.
        </p>
      </motion.div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ATLAS_MODULES.map((m, i) => (
          <motion.button
            key={m.id}
            onClick={() => open(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.05 }}
            className={`group ${GLASS} overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/25 ${span(i)}`}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={m.image}
                alt={`Atlas ERP — ${m.title}`}
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06060f]/80 via-transparent to-transparent" />
              <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/80 backdrop-blur">
                {m.titleAr}
              </span>
              <h3 className="absolute bottom-3 left-4 font-display text-[1rem] font-semibold text-white">{m.title}</h3>
            </div>
            <div className="p-5">
              <p className="text-[13px] leading-[1.6] text-white/55">{m.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] text-white/55">{t}</span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox modules={ATLAS_MODULES} index={index} onClose={close} onNavigate={navigate} />
    </section>
  );
}

/* ───────────────────────── Experience ───────────────────────── */
function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div {...fadeUp} className="mb-12 text-center">
        <Eyebrow>Experience</Eyebrow>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.02em] text-white">The journey so far</h2>
      </motion.div>
      <div className="mx-auto max-w-3xl space-y-5">
        {EXPERIENCE.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            className={`${GLASS} p-7`}
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-[1.15rem] font-semibold text-white">{item.role}</h3>
              <span className={`bg-clip-text font-mono text-[12px] font-semibold text-transparent ${GRAD}`}>{item.period}</span>
            </div>
            <p className="mb-3 text-[13px] text-white/55">{item.org}</p>
            <p className="mb-4 text-[14px] leading-[1.75] text-white/65">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] text-white/65">{t}</span>
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
      <motion.div {...fadeUp} className="mb-12 text-center">
        <Eyebrow>Skills</Eyebrow>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.02em] text-white">Technical toolkit</h2>
      </motion.div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
            className={`${GLASS} p-6`}
          >
            <p className={`mb-4 bg-clip-text font-mono text-[11px] uppercase tracking-[0.12em] text-transparent ${GRAD}`}>{g.category}</p>
            <div className="flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <span key={s} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] text-white/70">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Education + pipeline ───────────────────────── */
function EducationAndMore() {
  const planned = PROJECTS.filter((p) => p.status !== 'live');
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <motion.div {...fadeUp} className="mb-8"><Eyebrow>Education</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.02em] text-white">Academic background</h2>
          </motion.div>
          <div className="space-y-4">
            {EDUCATION.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }} className={`${GLASS} flex items-start gap-4 p-6`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-xl">{e.emoji}</div>
                <div>
                  <h3 className="font-display text-[1.05rem] font-semibold text-white">{e.degree}</h3>
                  <p className="text-[13px] text-white/55">{e.school}</p>
                  <p className={`mt-0.5 bg-clip-text font-mono text-[11px] text-transparent ${GRAD}`}>{e.period}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <motion.div {...fadeUp} className="mb-8"><Eyebrow>Next up</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.02em] text-white">In the pipeline</h2>
          </motion.div>
          <div className="space-y-4">
            {planned.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }} className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-6">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <h3 className="font-display text-[1.05rem] font-semibold text-white">{p.name}</h3>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-white/50">Planned</span>
                </div>
                <p className="mb-3 text-[13px] leading-[1.7] text-white/55">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => <span key={s} className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] text-white/55">{s}</span>)}
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
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-32 pt-12">
      <motion.div {...fadeUp} className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-md">
        <div className={`absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-40 blur-3xl ${GRAD}`} />
        <div className="relative">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-[-0.02em] text-white">
            Ready to contribute.
            <br />
            Let's talk.
          </h2>
          <p className="mx-auto mb-9 mt-4 max-w-md text-[14px] leading-[1.7] text-white/55">
            Open to full-stack, backend, or geospatial software roles — based in {PROFILE.location}, available remotely.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CONTACT_LINKS.map((link) => {
              const cls = 'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-white/12';
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
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Root ───────────────────────── */
export function AuroraDesign() {
  return (
    <div className="relative min-h-screen font-body text-white">
      <Aurora />
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
      <footer className="border-t border-white/5 py-6 text-center">
        <p className="text-[12px] text-white/40">{PROFILE.name} · Built with React + TypeScript · {PROFILE.location} · 2026</p>
      </footer>

      <style>{`
        /* translate-only (no scale) so the blurred layers never re-rasterize — pure GPU compositing */
        @keyframes auroraFloat1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,30px); } }
        @keyframes auroraFloat2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px,40px); } }
        @keyframes auroraFloat3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-40px); } }
        .aurora-blob   { animation: auroraFloat1 18s ease-in-out infinite; }
        .aurora-blob-2 { animation: auroraFloat2 22s ease-in-out infinite; }
        .aurora-blob-3 { animation: auroraFloat3 26s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .aurora-blob,.aurora-blob-2,.aurora-blob-3 { animation: none; } }
      `}</style>
    </div>
  );
}
