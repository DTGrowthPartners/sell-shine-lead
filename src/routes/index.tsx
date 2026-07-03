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
      // Hero curtain reveal
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".nav-item", { y: -20, opacity: 0, stagger: 0.06, duration: 0.9 })
        .from(".eyebrow", { y: 20, opacity: 0, duration: 1 }, "-=0.5")
        .from(".headline-word", {
          yPercent: 110,
          opacity: 0,
          stagger: 0.08,
          duration: 1.1,
        }, "-=0.7")
        .from(".sub", { y: 24, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.6")
        .from(".hero-meta", { opacity: 0, y: 16, stagger: 0.08, duration: 0.7 }, "-=0.5")
        .from(".hero-visual", { scale: 1.15, opacity: 0, duration: 1.6, ease: "power3.out" }, 0.1)
        .from(".float-card", { y: 40, opacity: 0, stagger: 0.15, duration: 0.9 }, "-=0.8");

      // Parallax on hero image
      gsap.to(".hero-visual img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Process section reveal
      gsap.from(".process-step", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-section", start: "top 70%" },
      });
      gsap.from(".process-line", {
        scaleX: 0,
        duration: 1.4,
        ease: "power2.inOut",
        transformOrigin: "left center",
        scrollTrigger: { trigger: ".process-section", start: "top 60%" },
      });

      // CTA section
      gsap.from(".cta-line", {
        yPercent: 110,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
      });
      gsap.from(".cta-button", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 70%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 flex items-center justify-between">
          <a href="#" className="nav-item flex items-center gap-2 font-serif text-2xl tracking-tight text-forest">
            <span className="inline-block w-2 h-2 rounded-full bg-brass" />
            VCC<span className="text-brass text-sm align-super">®</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-sm text-charcoal/70">
            <a href="#servicio" className="nav-item hover:text-forest transition">Servicio</a>
            <a href="#proceso" className="nav-item hover:text-forest transition">Proceso</a>
            <a href="#contacto" className="nav-item hover:text-forest transition">Contacto</a>
          </nav>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="nav-item group inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm text-ivory hover:bg-forest-deep transition-all"
          >
            WhatsApp
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="servicio" className="hero-section relative min-h-screen pt-32 pb-24 md:pb-32 grain overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-6 items-end">
          {/* LEFT */}
          <div className="lg:col-span-7 relative z-10">
            <div className="eyebrow flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-forest/70 mb-8">
              <span className="w-8 hairline" />
              Vitrina Comercial Cartagena
            </div>

            <h1 className="font-serif text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-[-0.02em] text-forest-deep">
              <span className="block overflow-hidden">
                <span className="headline-word inline-block">Vende</span>{" "}
                <span className="headline-word inline-block">o</span>{" "}
                <span className="headline-word inline-block">arrienda</span>
              </span>
              <span className="block overflow-hidden">
                <span className="headline-word inline-block italic text-brass">más&nbsp;rápido</span>{" "}
                <span className="headline-word inline-block">con</span>
              </span>
              <span className="block overflow-hidden">
                <span className="headline-word inline-block">pauta digital.</span>
              </span>
            </h1>

            <p className="sub mt-8 max-w-xl text-base md:text-lg text-charcoal/70 leading-relaxed">
              Gestionamos campañas en Meta Ads para poner tu negocio, local o
              propiedad frente a compradores e interesados reales en Cartagena.
              La conversación llega directo a tu WhatsApp.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="hero-cta group inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 text-ivory text-sm font-medium hover:bg-forest-deep transition-all hover:scale-[1.02]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.78 12l-.9 3.3 3.38-.88A7.94 7.94 0 0 0 20 12a7.85 7.85 0 0 0-2.4-5.68ZM12 18.5a6.53 6.53 0 0 1-3.34-.92l-.24-.14-2 .52.53-1.95-.16-.25A6.55 6.55 0 1 1 18.55 12 6.56 6.56 0 0 1 12 18.5Zm3.6-4.9c-.2-.1-1.17-.58-1.35-.64s-.31-.1-.44.1-.5.64-.62.77-.23.14-.43.05a5.36 5.36 0 0 1-1.58-.98 5.9 5.9 0 0 1-1.1-1.36c-.11-.2 0-.3.09-.4s.2-.23.3-.35a1.4 1.4 0 0 0 .2-.34.37.37 0 0 0 0-.35c-.05-.1-.44-1.06-.6-1.45s-.32-.33-.44-.34h-.38a.72.72 0 0 0-.52.24 2.2 2.2 0 0 0-.68 1.62 3.79 3.79 0 0 0 .8 2.03 8.72 8.72 0 0 0 3.34 2.95c.47.2.83.32 1.12.42a2.7 2.7 0 0 0 1.23.08 2 2 0 0 0 1.32-.93 1.63 1.63 0 0 0 .11-.93c-.05-.09-.18-.14-.38-.24Z" />
                </svg>
                Anunciar por WhatsApp
              </a>
              <a
                href="#proceso"
                className="hero-cta group inline-flex items-center gap-2 rounded-full border border-forest/25 px-6 py-4 text-sm text-forest hover:bg-forest hover:text-ivory transition-all"
              >
                Ver cómo funciona
                <span className="transition-transform group-hover:translate-x-1">↓</span>
              </a>
            </div>

            <div className="hero-meta mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                <span className="text-xs uppercase tracking-widest text-charcoal/60">
                  Meta Ads gestionado
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                <span className="text-xs uppercase tracking-widest text-charcoal/60">
                  Interesados por WhatsApp
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                <span className="text-xs uppercase tracking-widest text-charcoal/60">
                  Segmentación local
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT visual */}
          <div className="lg:col-span-5 relative">
            <div className="hero-visual relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl">
              <img
                src={heroImg}
                alt="Propiedad colonial en Cartagena promocionada por VCC"
                className="absolute inset-0 h-[115%] w-full object-cover"
                width={1280}
                height={1600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-ivory/90 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-widest text-forest">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brass opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brass" />
                </span>
                Campaña activa
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-ivory/90 text-xs uppercase tracking-widest">Propiedad en promoción</div>
                <div className="font-serif text-ivory text-2xl">Centro Histórico · Cartagena</div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="float-card absolute -left-6 md:-left-16 top-16 w-56 rounded-xl bg-card p-4 shadow-xl border border-border/60">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#25D366]/15 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.78 12l-.9 3.3 3.38-.88A7.94 7.94 0 0 0 20 12a7.85 7.85 0 0 0-2.4-5.68Z"/></svg>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-charcoal/50">Nuevo interesado</div>
              </div>
              <div className="text-sm text-charcoal">
                "Hola, vi el anuncio del local en Getsemaní..."
              </div>
              <div className="mt-2 text-[10px] text-charcoal/40">hace 2 min</div>
            </div>

            <div className="float-card absolute -right-4 md:-right-10 bottom-24 w-52 rounded-xl bg-forest text-ivory p-4 shadow-xl">
              <div className="text-[10px] uppercase tracking-widest text-brass mb-2">Alcance pagado</div>
              <div className="font-serif text-3xl leading-none">12.480</div>
              <div className="text-[11px] text-ivory/70 mt-1">personas · últimos 7 días</div>
              <div className="mt-3 h-1 bg-ivory/15 rounded overflow-hidden">
                <div className="h-full w-3/4 bg-brass rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Marquee bottom */}
        <div className="absolute bottom-0 inset-x-0 border-t border-forest/10 py-4 overflow-hidden bg-ivory-warm/40">
          <div className="flex whitespace-nowrap animate-marquee text-forest/50 text-xs uppercase tracking-[0.3em]">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex shrink-0">
                {["Negocios en venta", "Locales en arriendo", "Oficinas", "Casas", "Apartamentos", "Bodegas", "Consultorios", "Espacios comerciales"].map(
                  (t) => (
                    <span key={t} className="mx-8 flex items-center gap-8">
                      {t}
                      <span className="w-1 h-1 rounded-full bg-brass" />
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" className="process-section relative py-28 md:py-40 bg-forest text-ivory overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-brass mb-4">Proceso</div>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight max-w-2xl">
                Vender con nosotros es <span className="italic text-brass">simple.</span>
              </h2>
            </div>
            <p className="max-w-sm text-ivory/70 text-sm leading-relaxed">
              Tú aportas la propiedad y el presupuesto de pauta. Nosotros
              construimos, lanzamos y optimizamos la campaña que trae los
              interesados.
            </p>
          </div>

          <div className="process-line hairline mb-14 opacity-60" />

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { n: "01", t: "Nos escribes", d: "Cuéntanos qué necesitas vender o arrendar por WhatsApp." },
              { n: "02", t: "Montamos la campaña", d: "Creativos, copy y segmentación pensada para Cartagena." },
              { n: "03", t: "Corre la pauta", d: "Lanzamos en Meta Ads y optimizamos día a día." },
              { n: "04", t: "Tú cierras", d: "Los interesados te escriben directo por WhatsApp." },
            ].map((s) => (
              <div key={s.n} className="process-step group">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-serif text-5xl text-brass">{s.n}</span>
                  <span className="h-px flex-1 bg-ivory/20 group-hover:bg-brass transition-colors" />
                </div>
                <h3 className="font-serif text-2xl mb-3">{s.t}</h3>
                <p className="text-sm text-ivory/60 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="cta-section relative py-32 md:py-48 overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 md:px-10 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-brass mb-8">
            Cartagena · Meta Ads
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em] text-forest-deep">
            <span className="block overflow-hidden"><span className="cta-line inline-block">Tu propiedad frente</span></span>
            <span className="block overflow-hidden"><span className="cta-line inline-block italic text-brass">a compradores reales.</span></span>
          </h2>
          <p className="mt-10 max-w-xl mx-auto text-charcoal/70">
            Escríbenos hoy y en menos de 48 horas tu campaña puede estar corriendo
            en Meta Ads con interesados llegando a tu WhatsApp.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="cta-button group inline-flex items-center gap-3 rounded-full bg-forest px-8 py-5 text-ivory hover:bg-forest-deep transition-all hover:scale-[1.02]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.78 12l-.9 3.3 3.38-.88A7.94 7.94 0 0 0 20 12a7.85 7.85 0 0 0-2.4-5.68Zm-5.6 12.18a6.53 6.53 0 0 1-3.34-.92l-.24-.14-2 .52.53-1.95-.16-.25A6.55 6.55 0 1 1 18.55 12 6.56 6.56 0 0 1 12 18.5Z" />
              </svg>
              Escribir al 300 718 9383
            </a>
            <a
              href="https://instagram.com/vitrinavcc"
              target="_blank"
              rel="noreferrer"
              className="cta-button inline-flex items-center gap-2 rounded-full border border-forest/25 px-6 py-5 text-sm text-forest hover:bg-forest hover:text-ivory transition-all"
            >
              @vitrinavcc
            </a>
          </div>
        </div>

        <footer className="mt-24 border-t border-border/60">
          <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-xs text-charcoal/50">
            <div>© {new Date().getFullYear()} Vitrina Comercial Cartagena</div>
            <div className="flex items-center gap-6">
              <span>Cartagena, Colombia</span>
              <span className="w-1 h-1 rounded-full bg-brass" />
              <span>Servicio de pauta digital</span>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
