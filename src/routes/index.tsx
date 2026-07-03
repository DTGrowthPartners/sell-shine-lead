import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/cartagena-hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP =
  "https://wa.me/573007189383?text=Hola%20VCC%2C%20quiero%20anunciar%20mi%20propiedad";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".nav-item", { y: -14, opacity: 0, stagger: 0.05, duration: 0.7 })
        .from(".hero-badge", { y: 14, opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".hero-word", { y: 28, opacity: 0, stagger: 0.06, duration: 0.9 }, "-=0.4")
        .from(".hero-sub", { y: 16, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-cta", { y: 16, opacity: 0, stagger: 0.08, duration: 0.7 }, "-=0.5")
        .from(".hero-meta", { opacity: 0, y: 12, stagger: 0.06, duration: 0.6 }, "-=0.5")
        .from(".stage", { y: 30, opacity: 0, duration: 1, ease: "power2.out" }, 0.2)
        .from(".phone-frame", { scale: 0.9, opacity: 0, duration: 1, ease: "power3.out" }, 0.3)
        .from(".float", { y: 22, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.6");

      gsap.from(".step-card", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process", start: "top 70%" },
      });
      gsap.from(".process-head > *", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process", start: "top 75%" },
      });

      gsap.from(".cta-word", {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-block", start: "top 75%" },
      });
      gsap.from(".cta-btn", {
        y: 14,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-block", start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-4 inset-x-0 z-50 px-4">
        <div className="mx-auto max-w-6xl rounded-full border border-border/70 bg-card/80 backdrop-blur-lg px-4 py-2.5 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <a href="#" className="nav-item flex items-center gap-2 pl-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-forest text-ivory text-[11px] font-bold tracking-tight">
              V
            </span>
            <span className="text-sm font-semibold tracking-tight text-forest">
              VCC<span className="text-muted-foreground font-normal ml-1">· Cartagena</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-charcoal/70">
            <a href="#servicio" className="nav-item hover:text-forest transition">Servicio</a>
            <a href="#proceso" className="nav-item hover:text-forest transition">Proceso</a>
            <a href="#contacto" className="nav-item hover:text-forest transition">Contacto</a>
          </nav>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="nav-item inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-medium text-ivory hover:bg-forest-deep transition-all"
          >
            Anunciar
            <span aria-hidden>→</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="servicio" className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-charcoal/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-forest/50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-forest" />
            </span>
            Pauta en Meta Ads · Cartagena
          </div>

          <h1 className="mt-8 max-w-4xl mx-auto text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.02] text-forest-deep">
            {"Vende o arrienda tu propiedad".split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <span className="hero-word inline-block">{w}</span>
              </span>
            ))}
            <br />
            {"con campañas que sí llegan.".split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                <span className="hero-word inline-block text-forest/60">{w}</span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-6 max-w-xl mx-auto text-base md:text-lg text-charcoal/65 leading-relaxed">
            Gestionamos campañas pagadas en Meta Ads para llevar tu negocio,
            local o propiedad frente a compradores reales. Los interesados
            te escriben directo por WhatsApp.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-forest px-6 py-3.5 text-sm font-medium text-ivory hover:bg-forest-deep transition-all hover:scale-[1.02] shadow-[0_10px_30px_-10px_oklch(0.34_0.06_155_/_0.5)]"
            >
              <WhatsIcon />
              Anunciar por WhatsApp
            </a>
            <a
              href="#proceso"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3.5 text-sm text-charcoal hover:border-forest transition-all"
            >
              Ver cómo funciona
              <span aria-hidden>↓</span>
            </a>
          </div>

          <div className="hero-meta mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest text-charcoal/50">
            <span className="flex items-center gap-1.5"><Dot /> Meta Ads gestionado</span>
            <span className="flex items-center gap-1.5"><Dot /> Segmentación local</span>
            <span className="flex items-center gap-1.5"><Dot /> Leads por WhatsApp</span>
          </div>
        </div>

        {/* STAGE */}
        <div className="stage relative mx-auto mt-16 md:mt-20 max-w-5xl px-6">
          <div className="relative rounded-3xl border border-border bg-card p-4 md:p-6 shadow-[0_30px_80px_-30px_oklch(0.34_0.06_155_/_0.35)]">
            <div className="relative rounded-2xl overflow-hidden bg-forest-deep aspect-[16/10]">
              <img
                src={heroImg}
                alt="Propiedad promocionada por VCC en Cartagena"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                width={1280}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-forest-deep/70 via-forest-deep/20 to-transparent" />

              {/* Ad preview card */}
              <div className="float absolute top-5 left-5 md:top-8 md:left-8 w-64 rounded-xl bg-card p-3 shadow-2xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-full bg-forest text-ivory grid place-items-center text-[10px] font-bold">V</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-charcoal truncate">VCC · Vitrina Cartagena</div>
                    <div className="text-[10px] text-charcoal/50">Contenido patrocinado</div>
                  </div>
                  <div className="text-[9px] rounded-full bg-forest/10 text-forest px-1.5 py-0.5 font-semibold">Ad</div>
                </div>
                <div className="rounded-md bg-ivory-warm h-20 mb-2 overflow-hidden">
                  <img src={heroImg} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="text-[11px] font-semibold text-charcoal leading-tight">
                  Local comercial en Centro Histórico — 120m²
                </div>
                <button className="mt-2 w-full rounded-md bg-forest text-ivory text-[11px] py-1.5 font-medium">
                  Enviar mensaje
                </button>
              </div>

              {/* WhatsApp lead */}
              <div className="float absolute bottom-5 right-5 md:bottom-8 md:right-8 w-72 rounded-xl bg-card p-3 shadow-2xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-full bg-[#25D366]/15 grid place-items-center">
                    <WhatsIcon color="#25D366" size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-semibold text-charcoal">Nuevo interesado</div>
                    <div className="text-[10px] text-charcoal/50">WhatsApp · hace 2 min</div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-[#25D366]" />
                </div>
                <div className="rounded-lg bg-ivory-warm p-2.5 text-[11px] text-charcoal leading-snug">
                  "Hola, vi el anuncio del local en Getsemaní. ¿Sigue disponible?"
                </div>
              </div>

              {/* Metrics chip */}
              <div className="float absolute bottom-5 left-5 md:bottom-8 md:left-8 w-52 rounded-xl bg-forest text-ivory p-3 shadow-2xl">
                <div className="text-[10px] uppercase tracking-widest text-brass mb-1.5">Alcance pagado · 7d</div>
                <div className="text-2xl font-semibold tracking-tight">12.480</div>
                <div className="flex items-end gap-1 mt-2 h-8">
                  {[35, 55, 40, 68, 50, 82, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-ivory/20"
                      style={{ height: `${h}%` }}
                    >
                      <div className="h-full w-full rounded-sm bg-brass origin-bottom scale-y-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-16 border-y border-border py-4 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee text-charcoal/40 text-xs uppercase tracking-[0.28em]">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex shrink-0">
                {[
                  "Negocios en venta",
                  "Locales en arriendo",
                  "Oficinas",
                  "Casas",
                  "Apartamentos",
                  "Bodegas",
                  "Consultorios",
                  "Espacios comerciales",
                ].map((t) => (
                  <span key={t} className="mx-8 flex items-center gap-8">
                    {t}
                    <span className="w-1 h-1 rounded-full bg-brass" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" className="process relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="process-head max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-charcoal/60">
              Proceso
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-forest-deep">
              Anunciar con nosotros es simple.
            </h2>
            <p className="mt-4 text-charcoal/60">
              Tú aportas la propiedad y el presupuesto de pauta. Nosotros
              construimos, lanzamos y optimizamos la campaña.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                n: "01",
                t: "Nos escribes",
                d: "Cuéntanos por WhatsApp qué necesitas vender o arrendar.",
              },
              {
                n: "02",
                t: "Montamos la campaña",
                d: "Creativos, copy y segmentación pensados para Cartagena.",
              },
              {
                n: "03",
                t: "Corre la pauta",
                d: "Lanzamos en Meta Ads y optimizamos día a día.",
              },
              {
                n: "04",
                t: "Tú cierras",
                d: "Los interesados te escriben directo por WhatsApp.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="step-card group relative rounded-2xl border border-border bg-card p-6 hover:border-forest/40 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono text-forest/70">{s.n}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ivory-warm text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                    <span aria-hidden>→</span>
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-charcoal">{s.t}</h3>
                <p className="mt-2 text-sm text-charcoal/60 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="relative pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="cta-block relative overflow-hidden rounded-3xl bg-forest text-ivory p-10 md:p-20 text-center">
            <div className="absolute inset-0 opacity-[0.08]" style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, oklch(0.86 0.05 82) 0%, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.86 0.05 82) 0%, transparent 40%)",
            }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-brass">
                Empieza hoy
              </div>
              <h2 className="mt-6 text-3xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] max-w-3xl mx-auto">
                {"Tu propiedad frente a compradores reales.".split(" ").map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                    <span className="cta-word inline-block">{w}</span>
                  </span>
                ))}
              </h2>
              <p className="mt-5 max-w-lg mx-auto text-ivory/70">
                En menos de 48 horas tu campaña puede estar corriendo en Meta Ads
                con interesados llegando a tu WhatsApp.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-btn group inline-flex items-center gap-2.5 rounded-full bg-ivory text-forest px-6 py-3.5 text-sm font-semibold hover:bg-brass transition-all hover:scale-[1.02]"
                >
                  <WhatsIcon />
                  Escribir al 300 718 9383
                </a>
                <a
                  href="https://instagram.com/vitrinavcc"
                  target="_blank"
                  rel="noreferrer"
                  className="cta-btn inline-flex items-center gap-2 rounded-full border border-ivory/25 px-5 py-3.5 text-sm text-ivory hover:bg-ivory/5 transition-all"
                >
                  @vitrinavcc
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-charcoal/50 px-2">
            <div>© {new Date().getFullYear()} Vitrina Comercial Cartagena</div>
            <div className="flex items-center gap-4">
              <span>Cartagena, Colombia</span>
              <span className="w-1 h-1 rounded-full bg-brass" />
              <span>Servicio de pauta digital</span>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

function WhatsIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.78 12l-.9 3.3 3.38-.88A7.94 7.94 0 0 0 20 12a7.85 7.85 0 0 0-2.4-5.68ZM12 18.5a6.53 6.53 0 0 1-3.34-.92l-.24-.14-2 .52.53-1.95-.16-.25A6.55 6.55 0 1 1 18.55 12 6.56 6.56 0 0 1 12 18.5Zm3.6-4.9c-.2-.1-1.17-.58-1.35-.64s-.31-.1-.44.1-.5.64-.62.77-.23.14-.43.05a5.36 5.36 0 0 1-1.58-.98 5.9 5.9 0 0 1-1.1-1.36c-.11-.2 0-.3.09-.4s.2-.23.3-.35a1.4 1.4 0 0 0 .2-.34.37.37 0 0 0 0-.35c-.05-.1-.44-1.06-.6-1.45s-.32-.33-.44-.34h-.38a.72.72 0 0 0-.52.24 2.2 2.2 0 0 0-.68 1.62 3.79 3.79 0 0 0 .8 2.03 8.72 8.72 0 0 0 3.34 2.95c.47.2.83.32 1.12.42a2.7 2.7 0 0 0 1.23.08 2 2 0 0 0 1.32-.93 1.63 1.63 0 0 0 .11-.93c-.05-.09-.18-.14-.38-.24Z" />
    </svg>
  );
}

function Dot() {
  return <span className="w-1 h-1 rounded-full bg-brass inline-block" />;
}
