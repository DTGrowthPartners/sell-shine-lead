import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Music2,
  ChevronUp,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/cartagena-hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP =
  "https://wa.me/573007189383?text=Hola%20VCC%2C%20quiero%20anunciar%20mi%20propiedad";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ---------------------------------------------------------------- */
/* Video de fondo con loop manual y fundido suave (fade in/out)      */
/* ---------------------------------------------------------------- */
function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE = 0.5;
    let raf = 0;

    const tick = () => {
      const { currentTime, duration } = video;
      if (duration > 0) {
        if (currentTime < FADE) {
          video.style.opacity = String(Math.min(1, currentTime / FADE));
        } else if (duration - currentTime < FADE) {
          video.style.opacity = String(
            Math.max(0, (duration - currentTime) / FADE),
          );
        } else {
          video.style.opacity = "1";
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = "0";
      window.setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener("ended", onEnded);
    video.play().catch(() => {});
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Imagen base: siempre visible detrás; sirve de póster y de fallback */}
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      {!failed && (
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
          muted
          playsInline
          autoPlay
          preload="auto"
          onError={() => setFailed(true)}
        />
      )}
      {/* Velo para legibilidad del texto sobre el video */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-forest-deep/45" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Titular con entrada letra por letra                               */
/* ---------------------------------------------------------------- */
function AnimatedHeading({ lines }: { lines: { text: string; muted?: boolean }[] }) {
  return (
    <h1
      className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-[-0.03em] text-ivory"
      style={{ textWrap: "balance" }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.text.split(" ").map((word, wi) => (
            <span
              key={wi}
              className={`inline-block whitespace-nowrap mr-[0.24em] ${
                line.muted ? "text-brass-soft" : ""
              }`}
            >
              {word.split("").map((ch, ci) => (
                <span key={ci} className="hero-char inline-block will-change-transform">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/* ---------------------------------------------------------------- */
/* Página                                                            */
/* ---------------------------------------------------------------- */
function LandingPage() {
  const root = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".nav-item", { y: -14, opacity: 0, stagger: 0.05, duration: 0.7 })
        .from(
          ".hero-badge",
          { y: 14, opacity: 0, duration: 0.7 },
          "-=0.4",
        )
        .from(
          ".hero-char",
          { x: -18, opacity: 0, stagger: 0.018, duration: 0.5 },
          "-=0.4",
        )
        .from(".hero-sub", { y: 16, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-cta", { y: 16, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.5")
        .from(".hero-tag", { y: 16, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.3");

      // Revelado genérico al hacer scroll (trigger por elemento + once
      // para que nada quede oculto si el layout cambia al cargar imágenes)
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".step-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: (i % 4) * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".preview-card").forEach((el, i) => {
        gsap.from(el, {
          y: 44,
          opacity: 0,
          duration: 0.9,
          delay: (i % 3) * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.from(".float", {
        y: 26,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stage", start: "top 80%", once: true },
      });

      // Parallax sutil en la imagen del showcase
      gsap.to(".stage-media", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".stage",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".cta-word", {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cta-block", start: "top 75%" },
      });
    }, root);

    // Recalcular posiciones de ScrollTrigger cuando terminan de cargar
    // las imágenes/video (el alto de la página cambia y los triggers
    // quedan desfasados si no se refresca)
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
    >
      {/* ============================= NAV ============================= */}
      <header className="fixed top-4 inset-x-0 z-50 px-4">
        <div
          className={`mx-auto max-w-6xl rounded-2xl px-4 py-2.5 flex items-center justify-between transition-colors duration-500 ${
            scrolled
              ? "liquid-glass-light border border-border/70 text-charcoal"
              : "liquid-glass text-ivory"
          }`}
        >
          <a href="#" className="nav-item flex items-center gap-2 pl-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brass text-forest-deep text-xs font-bold tracking-tight">
              V
            </span>
            <span className="text-sm font-semibold tracking-tight">
              VCC
              <span
                className={`font-normal ml-1.5 ${scrolled ? "text-charcoal/50" : "text-ivory/60"}`}
              >
                · Vitrina Comercial Cartagena
              </span>
            </span>
          </a>
          <nav
            className={`hidden md:flex items-center gap-8 text-sm ${
              scrolled ? "text-charcoal/70" : "text-ivory/80"
            }`}
          >
            <a href="#diferencia" className="nav-item hover:text-brass transition-colors">
              Servicio
            </a>
            <a href="#showcase" className="nav-item hover:text-brass transition-colors">
              Así se ve
            </a>
            <a href="#proceso" className="nav-item hover:text-brass transition-colors">
              Proceso
            </a>
            <a href="#faq" className="nav-item hover:text-brass transition-colors">
              Preguntas
            </a>
          </nav>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className={`nav-item inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all hover:scale-[1.03] ${
              scrolled
                ? "bg-forest text-ivory hover:bg-forest-deep"
                : "bg-ivory text-forest-deep hover:bg-brass-soft"
            }`}
          >
            Anunciar
            <span aria-hidden>→</span>
          </a>
        </div>
      </header>

      {/* ============================ HERO ============================= */}
      <section className="relative min-h-svh flex flex-col overflow-hidden bg-forest-deep">
        <HeroVideo />

        <div className="relative z-10 flex-1 flex flex-col justify-end mx-auto w-full max-w-6xl px-6 pb-14 lg:pb-20 pt-40">
          <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
            <div>
              <div className="hero-badge inline-flex items-center gap-2 rounded-full liquid-glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-ivory/85 mb-7">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-brass/60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brass" />
                </span>
                Pauta en Meta Ads · Cartagena
              </div>

              <AnimatedHeading
                lines={[
                  { text: "Vende o arrienda" },
                  { text: "más rápido", muted: true },
                  { text: "con pauta digital." },
                ]}
              />

              <p className="hero-sub mt-6 max-w-xl text-base md:text-lg text-ivory/75 leading-relaxed">
                Ponemos tu negocio, local o propiedad frente a compradores e
                interesados reales en Cartagena con campañas pagadas en Meta
                Ads. Los interesados te escriben directo por WhatsApp.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-forest-deep hover:bg-brass-soft transition-all hover:scale-[1.03]"
                >
                  <WhatsIcon />
                  Anunciar por WhatsApp
                </a>
                <a
                  href="#diferencia"
                  className="hero-cta inline-flex items-center gap-2 rounded-full liquid-glass border border-ivory/20 px-6 py-3.5 text-sm text-ivory hover:bg-ivory hover:text-forest-deep transition-colors"
                >
                  Ver cómo funciona
                  <span aria-hidden>↓</span>
                </a>
              </div>
            </div>

            <div className="hero-tag mt-10 lg:mt-0 flex lg:justify-end">
              <div className="liquid-glass border border-ivory/20 px-6 py-3.5 rounded-2xl">
                <span className="font-display font-semibold text-base md:text-lg text-ivory/90">
                  Negocios. Locales. Propiedades.
                </span>
              </div>
            </div>
          </div>

          <div className="hero-scroll mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest text-ivory/50">
            <span className="flex items-center gap-1.5">
              <Dot /> Meta Ads gestionado
            </span>
            <span className="flex items-center gap-1.5">
              <Dot /> Segmentación local
            </span>
            <span className="flex items-center gap-1.5">
              <Dot /> Leads por WhatsApp
            </span>
          </div>
        </div>
      </section>

      {/* =========================== MARQUEE =========================== */}
      <div className="border-b border-border py-4 overflow-hidden bg-background">
        <div className="flex w-max whitespace-nowrap animate-marquee text-charcoal/40 text-xs uppercase tracking-[0.28em]">
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

      {/* ========================= DIFERENCIA ========================== */}
      <section id="diferencia" className="relative py-24 md:py-32">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="reveal max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-charcoal/60">
              El servicio
            </div>
            <h2 className="mt-6 font-display font-bold text-3xl md:text-5xl leading-[1.08] tracking-tight text-forest-deep">
              Esto no es un portal.
              <br />
              <span className="text-forest/60">Es pauta que sale a buscar.</span>
            </h2>
            <p className="mt-5 text-charcoal/60 text-lg leading-relaxed">
              Tu propiedad no se queda esperando a que alguien la encuentre en
              un listado. La convertimos en una campaña digital que llega a las
              personas correctas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                t: "Pauta real, no avisos",
                d: "Nada de clasificados ni publicaciones gratis. Invertimos en alcance pagado en Meta Ads para que tu oferta aparezca frente a miles de personas en Cartagena.",
              },
              {
                t: "Segmentación local",
                d: "Dirigimos cada peso de la pauta a personas con intención real de comprar o arrendar: por zona, interés y comportamiento.",
              },
              {
                t: "Cierras por WhatsApp",
                d: "Sin formularios ni intermediarios. Cada interesado llega directo a tu chat y tú negocias como siempre lo has hecho.",
              },
            ].map((c, i) => (
              <div
                key={c.t}
                className="reveal group relative rounded-2xl border border-border bg-card p-7 hover:border-brass/60 transition-all hover:-translate-y-1"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-display font-bold text-3xl text-brass">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 ml-4 bg-gradient-to-r from-brass/40 to-transparent" />
                </div>
                <h3 className="text-lg font-semibold text-charcoal">{c.t}</h3>
                <p className="mt-2.5 text-sm text-charcoal/60 leading-relaxed">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== SHOWCASE =========================== */}
      <section id="showcase" className="relative py-10 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight text-forest-deep">
              Así se ve tu propiedad{" "}
              <span className="text-forest/60">en campaña.</span>
            </h2>
          </div>

          <div className="stage relative mx-auto max-w-5xl">
            <div className="relative rounded-3xl border border-border bg-card p-4 md:p-6 shadow-[0_30px_80px_-30px_oklch(0.34_0.06_155_/_0.35)]">
              <div className="relative rounded-2xl overflow-hidden bg-forest-deep aspect-[16/10]">
                <img
                  src={heroImg}
                  alt="Propiedad promocionada por VCC en Cartagena"
                  className="stage-media absolute inset-0 h-[112%] w-full object-cover opacity-90"
                  width={1280}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-forest-deep/70 via-forest-deep/20 to-transparent" />

                {/* Vista previa del anuncio */}
                <div className="float absolute top-5 left-5 md:top-8 md:left-8 w-64 rounded-xl bg-card p-3 shadow-2xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-7 w-7 rounded-full bg-forest text-ivory grid place-items-center text-[10px] font-bold">
                      V
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-charcoal truncate">
                        VCC · Vitrina Cartagena
                      </div>
                      <div className="text-[10px] text-charcoal/50">
                        Contenido patrocinado
                      </div>
                    </div>
                    <div className="text-[9px] rounded-full bg-forest/10 text-forest px-1.5 py-0.5 font-semibold">
                      Ad
                    </div>
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

                {/* Lead de WhatsApp */}
                <div className="float absolute bottom-5 right-5 md:bottom-8 md:right-8 w-72 rounded-xl bg-card p-3 shadow-2xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-7 w-7 rounded-full bg-[#25D366]/15 grid place-items-center">
                      <WhatsIcon color="#25D366" size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold text-charcoal">
                        Nuevo interesado
                      </div>
                      <div className="text-[10px] text-charcoal/50">
                        WhatsApp · hace 2 min
                      </div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-[#25D366]" />
                  </div>
                  <div className="rounded-lg bg-ivory-warm p-2.5 text-[11px] text-charcoal leading-snug">
                    "Hola, vi el anuncio del local en Getsemaní. ¿Sigue
                    disponible?"
                  </div>
                </div>

                {/* Métricas */}
                <div className="float absolute bottom-5 left-5 md:bottom-8 md:left-8 w-52 rounded-xl bg-forest text-ivory p-3 shadow-2xl">
                  <div className="text-[10px] uppercase tracking-widest text-brass mb-1.5">
                    Alcance pagado · 7d
                  </div>
                  <div className="text-2xl font-semibold tracking-tight">
                    12.480
                  </div>
                  <div className="flex items-end gap-1 mt-2 h-8">
                    {[35, 55, 40, 68, 50, 82, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-brass origin-bottom"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== FORMATOS =========================== */}
      <section id="formatos" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-charcoal/60">
              Vista previa del anuncio
            </div>
            <h2 className="mt-6 font-display font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight text-forest-deep">
              Feed, historias{" "}
              <span className="text-forest/60">y reels.</span>
            </h2>
            <p className="mt-4 text-charcoal/60 text-lg">
              Tal como lo muestra el administrador de anuncios de Meta: tu
              propiedad lista para aparecer en cada ubicación.
            </p>
          </div>

          <div className="reveal rounded-3xl border border-border bg-card p-5 md:p-8">
            {/* Barra superior del panel, estilo Ads Manager */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-8 border-b border-border">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-forest text-ivory text-[10px] font-bold">
                  V
                </span>
                <div>
                  <div className="text-sm font-semibold text-charcoal">
                    Vista previa del anuncio
                  </div>
                  <div className="text-[11px] text-charcoal/50">
                    Campaña VCC · Objetivo: interesados por WhatsApp
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <span className="rounded-full bg-forest text-ivory px-3 py-1">
                  Feed
                </span>
                <span className="rounded-full bg-ivory-warm text-charcoal/70 px-3 py-1">
                  Historias
                </span>
                <span className="rounded-full bg-ivory-warm text-charcoal/70 px-3 py-1">
                  Reels
                </span>
                <span className="ml-1 hidden sm:inline text-charcoal/40">
                  + 6 ubicaciones
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10 max-w-3xl mx-auto">
              <div className="preview-card">
                <PhoneFrame>
                  <FeedPreview />
                </PhoneFrame>
                <div className="mt-4 text-center text-[11px] uppercase tracking-widest text-charcoal/50">
                  Feed de Instagram
                </div>
              </div>
              <div className="preview-card">
                <PhoneFrame>
                  <StoryPreview />
                </PhoneFrame>
                <div className="mt-4 text-center text-[11px] uppercase tracking-widest text-charcoal/50">
                  Historias
                </div>
              </div>
              <div className="preview-card">
                <PhoneFrame>
                  <ReelPreview />
                </PhoneFrame>
                <div className="mt-4 text-center text-[11px] uppercase tracking-widest text-charcoal/50">
                  Reels
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal rounded-3xl bg-forest text-ivory px-8 py-12 md:px-14 md:py-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {[
              { v: "48h", l: "de contacto a campaña activa" },
              { v: "100%", l: "de la campaña gestionada por VCC" },
              { v: "24/7", l: "tu anuncio circulando en Meta" },
              { v: "1 chat", l: "todos los interesados en tu WhatsApp" },
            ].map((s) => (
              <div key={s.v} className="text-center lg:text-left">
                <div className="font-display font-bold text-4xl md:text-5xl text-brass-soft">
                  {s.v}
                </div>
                <div className="mt-2 text-sm text-ivory/65 leading-snug max-w-[16ch] mx-auto lg:mx-0">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== PROCESO =========================== */}
      <section id="proceso" className="process relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-charcoal/60">
              Proceso
            </div>
            <h2 className="mt-6 font-display font-bold text-3xl md:text-5xl leading-[1.08] tracking-tight text-forest-deep">
              Anunciar con nosotros{" "}
              <span className="text-forest/60">es simple.</span>
            </h2>
            <p className="mt-4 text-charcoal/60 text-lg">
              Tú aportas la propiedad y el presupuesto de pauta. Nosotros
              construimos, lanzamos y optimizamos la campaña.
            </p>
          </div>

          <div className="process-grid grid md:grid-cols-2 lg:grid-cols-4 gap-5">
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
                  <span className="font-display font-bold text-2xl text-forest/60">
                    {s.n}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ivory-warm text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                    <span aria-hidden>→</span>
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-charcoal">{s.t}</h3>
                <p className="mt-2 text-sm text-charcoal/60 leading-relaxed">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= FAQ ============================= */}
      <section id="faq" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="reveal text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-charcoal/60">
              Preguntas frecuentes
            </div>
            <h2 className="mt-6 font-display font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight text-forest-deep">
              Lo que siempre{" "}
              <span className="text-forest/60">nos preguntan.</span>
            </h2>
          </div>

          <div className="reveal">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "¿VCC es un portal inmobiliario o un marketplace?",
                  a: "No. VCC es un servicio de gestión de pauta digital. No publicamos avisos en un listado: creamos y gestionamos campañas pagadas en Meta Ads para que tu propiedad o negocio llegue activamente a compradores e interesados reales en Cartagena.",
                },
                {
                  q: "¿Quién aporta el presupuesto de la pauta?",
                  a: "El cliente aporta el presupuesto de pauta, que se invierte directamente en Meta Ads. VCC se encarga de la estrategia, los creativos, la segmentación, el lanzamiento y la optimización de la campaña.",
                },
                {
                  q: "¿En cuánto tiempo está corriendo mi campaña?",
                  a: "En menos de 48 horas después de recibir la información y el material de tu propiedad o negocio, tu campaña puede estar activa y generando interesados.",
                },
                {
                  q: "¿Qué necesito para empezar?",
                  a: "Fotos o videos de tu propiedad o negocio, la información básica (ubicación, precio, características) y el presupuesto de pauta. Con eso montamos todo lo demás.",
                },
                {
                  q: "¿Qué tipo de propiedades o negocios anuncian?",
                  a: "Negocios en venta, locales comerciales, oficinas, casas, apartamentos, bodegas, consultorios y espacios comerciales en Cartagena, tanto para venta como para arriendo.",
                },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium text-charcoal hover:text-forest hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-charcoal/60 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section id="contacto" className="relative pb-20 pt-4">
        <div className="mx-auto max-w-6xl px-6">
          <div className="cta-block relative overflow-hidden rounded-3xl bg-forest-deep text-ivory p-10 md:p-20 text-center">
            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, oklch(0.86 0.05 82) 0%, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.86 0.05 82) 0%, transparent 40%)",
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-brass">
                Empieza hoy
              </div>
              <h2 className="mt-6 font-display font-bold text-3xl md:text-6xl leading-[1.08] tracking-tight max-w-3xl mx-auto">
                {"Tu propiedad frente a".split(" ").map((w, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom mr-[0.25em]"
                  >
                    <span className="cta-word inline-block">{w}</span>
                  </span>
                ))}
                <br />
                {"compradores reales.".split(" ").map((w, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom mr-[0.25em]"
                  >
                    <span className="cta-word inline-block text-brass-soft">
                      {w}
                    </span>
                  </span>
                ))}
              </h2>
              <p className="mt-5 max-w-lg mx-auto text-ivory/70">
                En menos de 48 horas tu campaña puede estar corriendo en Meta
                Ads con interesados llegando a tu WhatsApp.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ivory text-forest-deep px-7 py-3.5 text-sm font-semibold hover:bg-brass-soft transition-all hover:scale-[1.03]"
                >
                  <WhatsIcon />
                  Escribir al 300 718 9383
                </a>
                <a
                  href="https://instagram.com/vitrinavcc"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-6 py-3.5 text-sm text-ivory hover:bg-ivory/5 transition-all"
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

      {/* ================= BOTÓN FLOTANTE DE WHATSAPP ================== */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir a VCC por WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform"
      >
        <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-[#25D366]/50" />
        <WhatsIcon size={26} />
      </a>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Mockups de ubicaciones de Meta (Feed, Historias, Reels)           */
/* ---------------------------------------------------------------- */
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[250px] rounded-[1.4rem] bg-charcoal p-[7px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/40">
      {/* Botones laterales */}
      <div className="absolute -right-[2px] top-[22%] h-10 w-[2px] rounded-r bg-black/70" />
      <div className="absolute -left-[2px] top-[18%] h-6 w-[2px] rounded-l bg-black/70" />
      <div className="absolute -left-[2px] top-[28%] h-6 w-[2px] rounded-l bg-black/70" />
      <div className="relative rounded-[1rem] overflow-hidden bg-black aspect-[9/16]">
        {children}
        {/* Cámara perforada */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-2 w-2 rounded-full bg-black ring-1 ring-white/15" />
      </div>
    </div>
  );
}

function AdAvatar({ size = "h-6 w-6" }: { size?: string }) {
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-full bg-brass text-forest-deep text-[9px] font-bold`}
    >
      V
    </span>
  );
}

function FeedPreview() {
  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Barra de la app */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
        <span className="font-display font-semibold text-[13px] text-charcoal">Instagram</span>
        <div className="flex items-center gap-2.5 text-charcoal">
          <Heart className="h-3.5 w-3.5" strokeWidth={1.8} />
          <Send className="h-3.5 w-3.5" strokeWidth={1.8} />
        </div>
      </div>
      {/* Cabecera del post */}
      <div className="flex items-center gap-1.5 px-2.5 pb-1.5">
        <AdAvatar />
        <div className="leading-tight">
          <div className="text-[10px] font-semibold text-charcoal">
            vitrinavcc
          </div>
          <div className="text-[8px] text-charcoal/50">Publicidad</div>
        </div>
        <MoreHorizontal className="ml-auto h-3.5 w-3.5 text-charcoal/60" />
      </div>
      {/* Imagen */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      {/* Barra CTA */}
      <div className="flex items-center justify-between bg-forest px-2.5 py-1.5 text-[9.5px] font-medium text-ivory">
        Enviar mensaje
        <span aria-hidden>›</span>
      </div>
      {/* Acciones */}
      <div className="flex items-center gap-2.5 px-2.5 py-1.5 text-charcoal">
        <Heart className="h-4 w-4" strokeWidth={1.8} />
        <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
        <Send className="h-4 w-4" strokeWidth={1.8} />
        <Bookmark className="ml-auto h-4 w-4" strokeWidth={1.8} />
      </div>
      <div className="px-2.5 pb-2.5 leading-snug">
        <div className="text-[9px] font-semibold text-charcoal">
          1.284 Me gusta
        </div>
        <p className="text-[8.5px] text-charcoal/80 line-clamp-2">
          <span className="font-semibold text-charcoal">vitrinavcc</span> Local
          comercial en el Centro Histórico — 120 m². Escríbenos por WhatsApp.
        </p>
      </div>
    </div>
  );
}

function StoryPreview() {
  return (
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
      {/* Cabecera de la historia */}
      <div className="absolute inset-x-0 top-0 p-2.5">
        <div className="flex gap-1 mb-2">
          <div className="h-0.5 flex-1 rounded-full bg-white/90" />
          <div className="h-0.5 flex-1 rounded-full bg-white/30" />
          <div className="h-0.5 flex-1 rounded-full bg-white/30" />
        </div>
        <div className="flex items-center gap-1.5">
          <AdAvatar />
          <span className="text-[10px] font-semibold text-white">
            vitrinavcc
          </span>
          <span className="text-[8px] text-white/70">Publicidad</span>
          <X className="ml-auto h-3.5 w-3.5 text-white/80" />
        </div>
      </div>
      {/* Texto sobre la imagen */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center">
        <div className="font-display font-semibold text-[15px] leading-tight text-white drop-shadow">
          Local en arriendo,
          <br />
          Centro Histórico.
        </div>
      </div>
      {/* CTA swipe-up */}
      <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col items-center gap-1.5">
        <ChevronUp className="h-4 w-4 text-white" />
        <div className="rounded-full bg-white px-4 py-1.5 text-[10px] font-semibold text-charcoal">
          Más información
        </div>
      </div>
    </div>
  );
}

function ReelPreview() {
  return (
    <div className="absolute inset-0">
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 to-transparent" />
      {/* Barra superior */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2.5 text-white">
        <span className="text-[11px] font-semibold">Reels</span>
        <MoreHorizontal className="h-3.5 w-3.5" />
      </div>
      {/* Acciones laterales */}
      <div className="absolute right-2 bottom-20 flex flex-col items-center gap-3 text-white">
        <div className="flex flex-col items-center gap-0.5">
          <Heart className="h-4.5 w-4.5" strokeWidth={1.8} />
          <span className="text-[8px]">1,2 mil</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.8} />
          <span className="text-[8px]">86</span>
        </div>
        <Send className="h-4.5 w-4.5" strokeWidth={1.8} />
        <MoreHorizontal className="h-4 w-4" />
      </div>
      {/* Info inferior */}
      <div className="absolute bottom-0 left-0 right-10 p-2.5 text-white space-y-1.5">
        <div className="flex items-center gap-1.5">
          <AdAvatar size="h-5 w-5" />
          <span className="text-[10px] font-semibold">vitrinavcc</span>
          <span className="rounded border border-white/60 px-1 text-[7.5px]">
            Publicidad
          </span>
        </div>
        <p className="text-[9px] leading-snug text-white/90 line-clamp-2">
          Local en Getsemaní disponible para arriendo. Interesados por
          WhatsApp.
        </p>
        <div className="flex items-center gap-1 text-[8px] text-white/80">
          <Music2 className="h-2.5 w-2.5" />
          Audio original · VCC
        </div>
        <div className="rounded-md bg-white/95 px-3 py-1.5 text-center text-[9.5px] font-semibold text-charcoal">
          Enviar mensaje
        </div>
      </div>
    </div>
  );
}

function WhatsIcon({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.78 12l-.9 3.3 3.38-.88A7.94 7.94 0 0 0 20 12a7.85 7.85 0 0 0-2.4-5.68ZM12 18.5a6.53 6.53 0 0 1-3.34-.92l-.24-.14-2 .52.53-1.95-.16-.25A6.55 6.55 0 1 1 18.55 12 6.56 6.56 0 0 1 12 18.5Zm3.6-4.9c-.2-.1-1.17-.58-1.35-.64s-.31-.1-.44.1-.5.64-.62.77-.23.14-.43.05a5.36 5.36 0 0 1-1.58-.98 5.9 5.9 0 0 1-1.1-1.36c-.11-.2 0-.3.09-.4s.2-.23.3-.35a1.4 1.4 0 0 0 .2-.34.37.37 0 0 0 0-.35c-.05-.1-.44-1.06-.6-1.45s-.32-.33-.44-.34h-.38a.72.72 0 0 0-.52.24 2.2 2.2 0 0 0-.68 1.62 3.79 3.79 0 0 0 .8 2.03 8.72 8.72 0 0 0 3.34 2.95c.47.2.83.32 1.12.42a2.7 2.7 0 0 0 1.23.08 2 2 0 0 0 1.32-.93 1.63 1.63 0 0 0 .11-.93c-.05-.09-.18-.14-.38-.24Z" />
    </svg>
  );
}

function Dot() {
  return <span className="w-1 h-1 rounded-full bg-brass inline-block" />;
}
