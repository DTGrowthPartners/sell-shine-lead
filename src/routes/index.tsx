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
  Check,
  Rocket,
  Store,
  Gem,
  ThumbsUp,
  Share2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroImg from "@/assets/cartagena-hero.jpg";
import ctgCalle from "@/assets/ctg-calle.webp";
import ctgLocal from "@/assets/ctg-local.webp";
import ctgInterior from "@/assets/ctg-interior.webp";
import ctgAzotea from "@/assets/ctg-azotea.webp";
import caso1 from "@/assets/caso-abarrotes-1.webp";
import caso2 from "@/assets/caso-abarrotes-2.webp";
import caso3 from "@/assets/caso-abarrotes-3.webp";
import caso4 from "@/assets/caso-abarrotes-4.webp";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP =
  "https://wa.me/573007189383?text=Hola%20VCC%2C%20quiero%20anunciar%20mi%20propiedad";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ---------------------------------------------------------------- */
/* Video de fondo con loop manual y fundido suave                    */
/* ---------------------------------------------------------------- */
function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  // Video vertical en móvil, horizontal en pantallas grandes
  useEffect(() => {
    setSrc(
      window.matchMedia("(max-width: 767px)").matches
        ? "/hero-movil.mp4"
        : "/hero-horizontal.mp4",
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

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
  }, [src]);

  return (
    <div className="absolute inset-0" aria-hidden>
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      {src && !failed && (
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
          muted
          playsInline
          autoPlay
          preload="auto"
          onError={() => setFailed(true)}
        />
      )}
      {/* Velo cálido para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/30 to-forest-deep/50" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Etiqueta editorial pequeña con línea de latón                     */
/* ---------------------------------------------------------------- */
function Eyebrow({
  children,
  dark,
  center,
}: {
  children: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  const line = dark ? "bg-brass-soft/60" : "bg-brass";
  return (
    <div
      className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] ${
        dark ? "text-brass-soft" : "text-charcoal/55"
      } ${center ? "justify-center" : ""}`}
    >
      <span className={`h-px w-8 ${line}`} />
      {children}
      {center && <span className={`h-px w-8 ${line}`} />}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Titular con entrada letra por letra                               */
/* ---------------------------------------------------------------- */
function AnimatedHeading({
  lines,
}: {
  lines: { text: string; muted?: boolean }[];
}) {
  return (
    <h1
      className="font-display font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-[-0.02em] text-ivory"
      style={{ textWrap: "balance" }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.text.split(" ").map((word, wi) => (
            <span
              key={wi}
              className={`inline-block whitespace-nowrap mr-[0.24em] ${
                line.muted ? "italic text-brass-soft" : ""
              }`}
            >
              {word.split("").map((ch, ci) => (
                <span
                  key={ci}
                  className="hero-char inline-block will-change-transform"
                >
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

      // Entrada del hero: lenta y contenida
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".nav-item", { y: -10, opacity: 0, stagger: 0.06, duration: 0.9 })
        .from(".hero-badge", { y: 12, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(
          ".hero-char",
          { x: -14, opacity: 0, stagger: 0.02, duration: 0.7 },
          "-=0.5",
        )
        .from(".hero-sub", { y: 18, opacity: 0, duration: 1 }, "-=0.5")
        .from(
          ".hero-cta",
          { y: 18, opacity: 0, stagger: 0.12, duration: 0.9 },
          "-=0.6",
        )
        .from(".hero-tag", { y: 18, opacity: 0, duration: 1 }, "-=0.6")
        .from(".hero-meta", { opacity: 0, duration: 1 }, "-=0.4");

      // Revelado al hacer scroll: fade + leve subida, easing suave
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 1.15,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".step-card").forEach((el, i) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 1.1,
          delay: (i % 4) * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".preview-card").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 1.1,
          delay: (i % 3) * 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.from(".float", {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".stage", start: "top 80%", once: true },
      });

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
        y: 26,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cta-block", start: "top 78%", once: true },
      });
    }, root);

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
      <header className="fixed top-0 inset-x-0 z-50">
        <div
          className={`transition-colors duration-500 ${
            scrolled
              ? "liquid-glass-light border-b border-border text-charcoal"
              : "text-ivory"
          }`}
        >
          <div className="mx-auto max-w-6xl px-6 h-16 md:h-[76px] flex items-center justify-between">
            <a href="#" className="nav-item flex items-baseline gap-3">
              <span className="font-display text-2xl tracking-tight">VCC</span>
              <span
                className={`hidden sm:block h-4 w-px self-center ${
                  scrolled ? "bg-charcoal/25" : "bg-ivory/30"
                }`}
              />
              <span
                className={`hidden sm:block text-[10px] uppercase tracking-[0.15em] ${
                  scrolled ? "text-charcoal/55" : "text-ivory/65"
                }`}
              >
                Vitrina Comercial · Cartagena
              </span>
            </a>
            <nav
              className={`hidden md:flex items-center gap-9 text-[13px] ${
                scrolled ? "text-charcoal/65" : "text-ivory/75"
              }`}
            >
              <a href="#servicio" className="nav-item hover:text-brass transition-colors duration-300">
                El servicio
              </a>
              <a href="#caso" className="nav-item hover:text-brass transition-colors duration-300">
                Caso real
              </a>
              <a href="#planes" className="nav-item hover:text-brass transition-colors duration-300">
                Planes
              </a>
              <a href="#proceso" className="nav-item hover:text-brass transition-colors duration-300">
                Proceso
              </a>
              <a href="#faq" className="nav-item hover:text-brass transition-colors duration-300">
                Preguntas
              </a>
            </nav>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className={`nav-item inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-xs font-medium transition-colors duration-300 ${
                scrolled
                  ? "bg-forest text-ivory hover:bg-forest-deep"
                  : "bg-ivory text-forest-deep hover:bg-ivory-warm"
              }`}
            >
              Anunciar
            </a>
          </div>
        </div>
      </header>

      {/* ============================ HERO ============================= */}
      <section className="relative min-h-svh flex flex-col overflow-hidden bg-forest-deep">
        <HeroVideo />

        <div className="relative z-10 flex-1 flex flex-col justify-end mx-auto w-full max-w-6xl px-6 pb-16 lg:pb-24 pt-44">
          <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div>
              <div className="hero-badge mb-8">
                <Eyebrow dark>Pauta en Meta Ads · Cartagena</Eyebrow>
              </div>

              <AnimatedHeading
                lines={[
                  { text: "Vende o arrienda" },
                  { text: "más rápido", muted: true },
                  { text: "con pauta digital." },
                ]}
              />

              <p className="hero-sub mt-8 max-w-xl text-base md:text-lg font-light text-ivory/75 leading-relaxed">
                Campañas en Meta Ads que ponen tu negocio, local o propiedad
                frente a compradores reales en Cartagena. Cada interesado llega
                directo a tu WhatsApp.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta inline-flex items-center gap-2.5 rounded-[10px] bg-ivory px-7 py-3.5 text-sm font-medium text-forest-deep hover:bg-ivory-warm transition-colors duration-300"
                >
                  <WhatsIcon />
                  Anunciar por WhatsApp
                </a>
                <a
                  href="#servicio"
                  className="hero-cta inline-flex items-center gap-2 rounded-[10px] border border-ivory/30 px-6 py-3.5 text-sm text-ivory hover:border-brass-soft hover:text-brass-soft transition-colors duration-300"
                >
                  Ver cómo funciona
                </a>
              </div>
            </div>

            <div className="hero-tag mt-12 lg:mt-0 flex lg:justify-end">
              <div className="liquid-glass border border-ivory/20 px-7 py-4 rounded-xl">
                <span className="font-display italic text-lg md:text-xl text-ivory/90">
                  Negocios. Locales. Propiedades.
                </span>
              </div>
            </div>
          </div>

          <div className="hero-meta mt-14 flex flex-wrap items-center gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.15em] text-ivory/50">
            <span className="flex items-center gap-2">
              <Dot /> Meta Ads gestionado
            </span>
            <span className="flex items-center gap-2">
              <Dot /> Segmentación local
            </span>
            <span className="flex items-center gap-2">
              <Dot /> Leads por WhatsApp
            </span>
          </div>
        </div>
      </section>

      {/* =========================== MARQUEE =========================== */}
      <div className="border-b border-border py-5 overflow-hidden">
        <div className="flex w-max whitespace-nowrap animate-marquee text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
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
                <span key={t} className="mx-10 flex items-center gap-10">
                  {t}
                  <span className="w-1 h-1 rounded-full bg-brass/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ========================= EL SERVICIO ========================= */}
      <section id="servicio" className="relative py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal max-w-2xl">
            <Eyebrow>El servicio</Eyebrow>
            <h2 className="mt-8 font-display font-light text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-charcoal">
              Esto no es un portal.
              <br />
              <span className="italic text-forest">
                Es pauta que sale a buscar.
              </span>
            </h2>
            <p className="mt-7 max-w-xl text-lg font-light text-charcoal/65 leading-relaxed">
              Tu propiedad no espera a que la encuentren en un listado. La
              convertimos en una campaña que llega a las personas correctas.
            </p>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-x-10 gap-y-14">
            {[
              {
                t: "Pauta real, no avisos",
                d: "Nada de clasificados. Invertimos en alcance pagado en Meta Ads para que tu oferta aparezca frente a miles de personas en Cartagena.",
              },
              {
                t: "Segmentación local",
                d: "Cada peso de la pauta se dirige a personas con intención real de comprar o arrendar: por zona, interés y comportamiento.",
              },
              {
                t: "Cierras por WhatsApp",
                d: "Sin formularios ni intermediarios. Cada interesado llega directo a tu chat y tú negocias como siempre.",
              },
            ].map((c, i) => (
              <div key={c.t} className="reveal border-t border-charcoal/20 pt-7">
                <span className="font-display italic text-2xl text-brass">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-lg font-medium text-charcoal">{c.t}</h3>
                <p className="mt-3 text-[15px] font-light text-charcoal/60 leading-relaxed">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== SHOWCASE =========================== */}
      <section className="relative bg-forest text-ivory py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal max-w-2xl mx-auto text-center mb-16">
            <Eyebrow dark center>
              En campaña
            </Eyebrow>
            <h2 className="mt-8 font-display font-light text-4xl md:text-5xl leading-[1.06] tracking-[-0.02em]">
              Así se ve tu propiedad{" "}
              <span className="italic text-brass-soft">en campaña.</span>
            </h2>
          </div>

          <div className="stage relative mx-auto max-w-5xl">
            <div className="relative rounded-xl overflow-hidden border border-ivory/15 bg-forest-deep aspect-[16/10]">
              <img
                src={ctgCalle}
                alt="Calle colonial de Cartagena con balcones y buganvilias, propiedad promocionada por VCC"
                className="stage-media absolute inset-0 h-[112%] w-full object-cover"
                width={1600}
                height={1067}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-forest-deep/70 via-forest-deep/15 to-transparent" />

              {/* Vista previa del anuncio */}
              <div className="float absolute top-5 left-5 md:top-8 md:left-8 w-64 rounded-[10px] bg-ivory p-3 border border-charcoal/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-full bg-forest text-ivory grid place-items-center text-[10px] font-display">
                    V
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium text-charcoal truncate">
                      VCC · Vitrina Cartagena
                    </div>
                    <div className="text-[10px] text-charcoal/50">
                      Contenido patrocinado
                    </div>
                  </div>
                  <div className="text-[9px] rounded-[4px] border border-charcoal/20 text-charcoal/60 px-1.5 py-0.5">
                    Ad
                  </div>
                </div>
                <div className="rounded-[6px] h-20 mb-2 overflow-hidden">
                  <img
                    src={ctgLocal}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-[11px] font-medium text-charcoal leading-tight">
                  Local comercial en Centro Histórico — 120 m²
                </div>
                <button className="mt-2 w-full rounded-[6px] bg-forest text-ivory text-[11px] py-1.5">
                  Enviar mensaje
                </button>
              </div>

              {/* Lead de WhatsApp */}
              <div className="float absolute bottom-5 right-5 md:bottom-8 md:right-8 w-72 rounded-[10px] bg-ivory p-3 border border-charcoal/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-full bg-[#25D366]/15 grid place-items-center">
                    <WhatsIcon color="#25D366" size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-medium text-charcoal">
                      Nuevo interesado
                    </div>
                    <div className="text-[10px] text-charcoal/50">
                      WhatsApp · hace 2 min
                    </div>
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                </div>
                <div className="rounded-[8px] bg-ivory-warm/70 p-2.5 text-[11px] text-charcoal leading-snug">
                  "Hola, vi el anuncio del local en Getsemaní. ¿Sigue
                  disponible?"
                </div>
              </div>

              {/* Métricas */}
              <div className="float absolute bottom-5 left-5 md:bottom-8 md:left-8 w-52 rounded-[10px] bg-forest-deep border border-ivory/15 text-ivory p-3.5">
                <div className="text-[9px] uppercase tracking-[0.15em] text-brass-soft mb-1.5">
                  Alcance pagado · 7d
                </div>
                <div className="font-display font-light text-2xl tracking-tight">
                  12.480
                </div>
                <div className="flex items-end gap-1 mt-2.5 h-8">
                  {[35, 55, 40, 68, 50, 82, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-[2px] bg-brass/80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== FORMATOS =========================== */}
      <section id="formatos" className="relative py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal max-w-2xl mx-auto text-center mb-14">
            <Eyebrow center>Vista previa del anuncio</Eyebrow>
            <h2 className="mt-8 font-display font-light text-4xl md:text-5xl leading-[1.06] tracking-[-0.02em] text-charcoal">
              Feed, historias <span className="italic text-forest">y reels.</span>
            </h2>
            <p className="mt-5 text-lg font-light text-charcoal/60">
              Tal como lo muestra el administrador de anuncios de Meta.
            </p>
          </div>

          <div className="reveal rounded-xl border border-border bg-card p-6 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-[8px] bg-forest text-ivory font-display text-sm">
                  V
                </span>
                <div>
                  <div className="text-sm font-medium text-charcoal">
                    Vista previa del anuncio
                  </div>
                  <div className="text-[11px] text-charcoal/50">
                    Campaña VCC · Objetivo: interesados por WhatsApp
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.12em]">
                <span className="rounded-[6px] bg-forest text-ivory px-3 py-1.5">
                  Feed
                </span>
                <span className="rounded-[6px] bg-ivory-warm/70 text-charcoal/60 px-3 py-1.5">
                  Historias
                </span>
                <span className="rounded-[6px] bg-ivory-warm/70 text-charcoal/60 px-3 py-1.5">
                  Reels
                </span>
                <span className="rounded-[6px] bg-ivory-warm/70 text-charcoal/60 px-3 py-1.5">
                  WhatsApp
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
              {[
                { c: <FacebookPreview />, l: "Feed de Facebook" },
                { c: <FeedPreview />, l: "Feed de Instagram" },
                { c: <StoryPreview />, l: "Historias" },
                { c: <ReelPreview />, l: "Reels" },
                { c: <WhatsAppPreview />, l: "Tu WhatsApp" },
              ].map((p) => (
                <div key={p.l} className="preview-card">
                  <PhoneFrame>{p.c}</PhoneFrame>
                  <div className="mt-5 text-center text-[10px] uppercase tracking-[0.15em] text-charcoal/50">
                    {p.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-border text-center text-sm font-light text-charcoal/55">
              Cada anuncio termina donde importa:{" "}
              <span className="text-charcoal">tu WhatsApp.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= CASO DE ÉXITO ======================= */}
      <section id="caso" className="relative bg-ivory-warm/40 border-y border-border py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="reveal">
              <Eyebrow>Caso de éxito real</Eyebrow>
              <h2 className="mt-8 font-display font-light text-4xl md:text-5xl leading-[1.06] tracking-[-0.02em] text-charcoal">
                De 3 meses sin vender{" "}
                <span className="italic text-forest">
                  a vendido en 48 horas.
                </span>
              </h2>
              <p className="mt-6 text-lg font-light text-charcoal/65 leading-relaxed">
                Tienda de abarrotes esquinera en San Fernando, Cartagena.
                Ticket: <span className="text-charcoal">$60.000.000</span>.
                Creamos la pieza, activamos Meta Ads y llevamos los interesados
                directo al WhatsApp del dueño.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-px bg-charcoal/15 border border-charcoal/15 rounded-[10px] overflow-hidden">
                {[
                  { v: "155", l: "conversaciones por WhatsApp" },
                  { v: "$334", l: "costo por conversación" },
                  { v: "$51.796", l: "inversión total en pauta" },
                  { v: "15.229", l: "impresiones en Meta" },
                ].map((m) => (
                  <div key={m.l} className="bg-ivory p-6">
                    <div className="font-display font-light text-3xl text-forest">
                      {m.v}
                    </div>
                    <div className="mt-1.5 text-xs font-light text-charcoal/60 leading-snug">
                      {m.l}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/573007189383?text=Hola%20VCC%2C%20quiero%20un%20resultado%20como%20el%20de%20la%20tienda%20de%20abarrotes"
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2.5 rounded-[10px] bg-forest px-7 py-3.5 text-sm font-medium text-ivory hover:bg-forest-deep transition-colors duration-300"
              >
                <WhatsIcon />
                Quiero un resultado así
              </a>
            </div>

            <div className="reveal">
              <Carousel opts={{ loop: true }} className="w-full max-w-md mx-auto">
                <CarouselContent>
                  {[
                    {
                      src: caso1,
                      alt: "Caso de éxito VCC: tienda de abarrotes vendida en menos de 48 horas tras 3 meses sin vender",
                    },
                    {
                      src: caso2,
                      alt: "Así se veía la campaña de la tienda de abarrotes en feed de Facebook, feed de Instagram e historias",
                    },
                    {
                      src: caso3,
                      alt: "Resultados reales en el administrador de anuncios: 155 conversaciones con $51.796 de inversión",
                    },
                    {
                      src: caso4,
                      alt: "Antes: 3 meses intentando vender. Después: vendido en menos de 48 horas",
                    },
                  ].map((img, i) => (
                    <CarouselItem key={i}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        width={1000}
                        height={1250}
                        className="w-full rounded-[10px] border border-charcoal/10"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="max-lg:-left-3 rounded-[8px] border-charcoal/20 bg-ivory text-charcoal hover:bg-forest hover:text-ivory" />
                <CarouselNext className="max-lg:-right-3 rounded-[8px] border-charcoal/20 bg-ivory text-charcoal hover:bg-forest hover:text-ivory" />
              </Carousel>
              <div className="mt-5 text-center text-[10px] uppercase tracking-[0.15em] text-charcoal/45">
                Desliza · Capturas reales de la campaña
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="bg-forest text-ivory py-20 md:py-28">
        <div className="reveal mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 lg:divide-x lg:divide-ivory/10">
            {[
              { v: "48h", l: "de contacto a campaña activa" },
              { v: "100%", l: "de la campaña gestionada por VCC" },
              { v: "24/7", l: "tu anuncio circulando en Meta" },
              { v: "1 chat", l: "todos los interesados en tu WhatsApp" },
            ].map((s) => (
              <div key={s.v} className="text-center px-6">
                <div className="font-display font-light text-5xl md:text-6xl text-brass-soft">
                  {s.v}
                </div>
                <div className="mt-3 text-[13px] font-light text-ivory/60 leading-snug max-w-[18ch] mx-auto">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== PLANES ============================ */}
      <section id="planes" className="relative py-28 md:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal max-w-2xl mx-auto text-center mb-16">
            <Eyebrow center>Planes</Eyebrow>
            <h2 className="mt-8 font-display font-light text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-charcoal">
              El plan que{" "}
              <span className="italic text-forest">impulsa tu vitrina.</span>
            </h2>
            <p className="mt-5 text-lg font-light text-charcoal/60">
              Gestión de pauta para vender o arrendar más rápido.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* IMPULSO */}
            <div className="reveal flex flex-col rounded-xl border border-border bg-card p-8">
              <div className="mb-6 grid h-11 w-11 place-items-center rounded-full border border-brass/50 text-brass">
                <Rocket className="h-4.5 w-4.5" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-2xl text-charcoal">Impulso</h3>
              <div className="mt-2 pb-5 border-b border-border flex items-baseline gap-2">
                <span className="font-display font-light text-3xl text-forest">
                  $300.000
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-charcoal/50">
                  15 días
                </span>
              </div>
              <ul className="mt-6 space-y-3.5 text-sm font-light text-charcoal/70 leading-snug flex-1">
                {[
                  "5 imágenes rediseñadas con IA (fotos tomadas por el cliente)",
                  "1 campaña activa · FB + IG + WhatsApp",
                  "Estrategia de enfoque y palabras clave",
                  "CTA directo al WhatsApp del cliente",
                  "Reporte final",
                ].map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-brass" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/573007189383?text=Hola%20VCC%2C%20me%20interesa%20el%20plan%20Impulso"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-[10px] border border-charcoal/25 px-5 py-3 text-sm text-charcoal hover:border-brass hover:text-forest transition-colors duration-300"
              >
                <WhatsIcon size={15} />
                Empezar con Impulso
              </a>
            </div>

            {/* GESTIONADO */}
            <div className="reveal relative flex flex-col rounded-xl border border-forest/70 bg-card p-8">
              <div className="absolute -top-3 left-8 rounded-[6px] bg-forest px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-ivory">
                Más elegido
              </div>
              <div className="mb-6 grid h-11 w-11 place-items-center rounded-full bg-forest text-ivory">
                <Store className="h-4.5 w-4.5" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-2xl text-charcoal">Gestionado</h3>
              <div className="mt-2 pb-5 border-b border-border flex items-baseline gap-2">
                <span className="font-display font-light text-3xl text-forest">
                  $600.000
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-charcoal/50">
                  Mes completo
                </span>
              </div>
              <ul className="mt-6 space-y-3.5 text-sm font-light text-charcoal/70 leading-snug flex-1">
                {[
                  "Hasta 10 imágenes rediseñadas con IA + 1 video con IA",
                  "Hasta 2 campañas activas · FB + IG + WhatsApp",
                  "2-3 scripts de video para que el cliente grabe",
                  "Estrategia y segmentación definida + palabras clave",
                  "CTA directo al WhatsApp del cliente",
                  "Seguimiento semanal + reporte final",
                ].map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-forest" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/573007189383?text=Hola%20VCC%2C%20me%20interesa%20el%20plan%20Gestionado"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-[10px] bg-forest px-5 py-3 text-sm font-medium text-ivory hover:bg-forest-deep transition-colors duration-300"
              >
                <WhatsIcon size={15} />
                Empezar con Gestionado
              </a>
            </div>

            {/* PREMIUM */}
            <div className="reveal flex flex-col rounded-xl border border-brass/40 bg-forest p-8 text-ivory">
              <div className="mb-6 grid h-11 w-11 place-items-center rounded-full border border-brass-soft/60 text-brass-soft">
                <Gem className="h-4.5 w-4.5" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-2xl text-ivory">Premium</h3>
              <div className="mt-2 pb-5 border-b border-ivory/15 flex items-baseline gap-2">
                <span className="font-display font-light text-3xl text-brass-soft">
                  $900.000
                </span>
                <span className="text-[11px] uppercase tracking-[0.12em] text-ivory/55">
                  Mes completo
                </span>
              </div>
              <ul className="mt-6 space-y-3.5 text-sm font-light text-ivory/80 leading-snug flex-1">
                {[
                  "Todo lo de Gestionado",
                  "Hasta 4 campañas activas · FB + IG + WhatsApp",
                  "Hasta 6 scripts de contenido para Ads con ángulos de venta",
                  "Reporte semanal + prioridad en ajustes semanales",
                  "Dirección de campaña el mes completo",
                  "Landing de catálogo en vitrinavcc.com con CTA a su WhatsApp",
                ].map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-brass-soft" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/573007189383?text=Hola%20VCC%2C%20me%20interesa%20el%20plan%20Premium"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-[10px] bg-ivory px-5 py-3 text-sm font-medium text-forest-deep hover:bg-ivory-warm transition-colors duration-300"
              >
                <WhatsIcon size={15} />
                Empezar con Premium
              </a>
            </div>
          </div>

          <div className="reveal mt-12 border-t border-border pt-7 flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-2 text-sm font-light text-charcoal/60 text-center">
            <span>
              El presupuesto de pauta lo pone el cliente ·{" "}
              <span className="text-charcoal">VCC cobra la gestión.</span>
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-brass/70" />
            <span>
              Tus leads, directo en WhatsApp ·{" "}
              <span className="text-charcoal">300 718 9383</span>
            </span>
          </div>
        </div>
      </section>

      {/* =========================== PROCESO =========================== */}
      <section id="proceso" className="relative border-t border-border py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal max-w-2xl mb-16">
            <Eyebrow>Proceso</Eyebrow>
            <h2 className="mt-8 font-display font-light text-4xl md:text-5xl leading-[1.06] tracking-[-0.02em] text-charcoal">
              Anunciar con nosotros{" "}
              <span className="italic text-forest">es simple.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg font-light text-charcoal/60">
              Tú aportas la propiedad y el presupuesto de pauta. Nosotros
              construimos, lanzamos y optimizamos la campaña.
            </p>
          </div>

          <div className="relative">
            {/* Línea de tiempo: vertical en móvil, horizontal en desktop */}
            <div className="lg:hidden absolute left-[5px] top-2 bottom-2 w-px bg-charcoal/15" />
            <div className="hidden lg:block absolute top-[5px] inset-x-0 h-px bg-charcoal/15" />

            <div className="grid lg:grid-cols-4 gap-x-10 gap-y-14">
              {[
                {
                  n: "01",
                  t: "Nos escribes",
                  d: "Cuéntanos por WhatsApp qué necesitas vender o arrendar.",
                  m: "Día 0",
                },
                {
                  n: "02",
                  t: "Montamos la campaña",
                  d: "Creativos, copy y segmentación pensados para Cartagena.",
                  m: "Día 1",
                },
                {
                  n: "03",
                  t: "Corre la pauta",
                  d: "Lanzamos en Meta Ads y optimizamos día a día.",
                  m: "Desde el día 2",
                },
                {
                  n: "04",
                  t: "Tú cierras",
                  d: "Los interesados te escriben directo por WhatsApp.",
                  m: "Cada interesado, en tu chat",
                },
              ].map((s) => (
                <div key={s.n} className="step-card relative pl-10 lg:pl-0 lg:pt-10">
                  {/* Nodo sobre la línea */}
                  <span className="absolute left-0 top-1.5 lg:top-0 h-[11px] w-[11px] rounded-full border border-brass bg-ivory" />
                  <div className="text-[10px] uppercase tracking-[0.15em] text-brass">
                    {s.m}
                  </div>
                  <div className="mt-3 font-display italic text-2xl text-charcoal/30">
                    {s.n}
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-charcoal">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-[15px] font-light text-charcoal/60 leading-relaxed">
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================= FAQ ============================= */}
      <section id="faq" className="relative border-t border-border py-28 md:py-36">
        <div className="mx-auto max-w-2xl px-6">
          <div className="reveal text-center mb-14">
            <Eyebrow center>Preguntas frecuentes</Eyebrow>
            <h2 className="mt-8 font-display font-light text-4xl md:text-5xl leading-[1.06] tracking-[-0.02em] text-charcoal">
              Lo que siempre{" "}
              <span className="italic text-forest">nos preguntan.</span>
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
                  <AccordionTrigger className="text-left text-[15px] font-medium text-charcoal hover:text-forest hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] font-light text-charcoal/60 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section id="contacto" className="cta-block relative bg-forest text-ivory py-28 md:py-40 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <Eyebrow dark center>
            Empieza hoy
          </Eyebrow>
          <h2 className="mt-8 font-display font-light text-4xl md:text-7xl leading-[1.04] tracking-[-0.02em]">
            {"Tu propiedad frente a".split(" ").map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-[0.24em]"
              >
                <span className="cta-word inline-block">{w}</span>
              </span>
            ))}
            <br />
            {"compradores reales.".split(" ").map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-[0.24em]"
              >
                <span className="cta-word inline-block italic text-brass-soft">
                  {w}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-7 max-w-md mx-auto font-light text-ivory/65 leading-relaxed">
            En menos de 48 horas tu campaña puede estar corriendo en Meta Ads,
            con interesados llegando a tu WhatsApp.
          </p>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-[10px] bg-ivory text-forest-deep px-7 py-3.5 text-sm font-medium hover:bg-ivory-warm transition-colors duration-300"
            >
              <WhatsIcon />
              Escribir al 300 718 9383
            </a>
            <a
              href="https://instagram.com/vitrinavcc"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] border border-ivory/30 px-6 py-3.5 text-sm text-ivory hover:border-brass-soft hover:text-brass-soft transition-colors duration-300"
            >
              @vitrinavcc
            </a>
          </div>
        </div>
      </section>

      {/* ============================ FOOTER =========================== */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.15em] text-charcoal/45">
          <div>© {new Date().getFullYear()} Vitrina Comercial Cartagena</div>
          <div className="flex items-center gap-5">
            <span>Cartagena, Colombia</span>
            <span className="w-1 h-1 rounded-full bg-brass/70" />
            <span>Servicio de pauta digital</span>
          </div>
        </div>
      </footer>

      {/* ================= BOTÓN FLOTANTE DE WHATSAPP ================== */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir a VCC por WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-8px_rgba(26,23,20,0.35)] hover:bg-[#1fb355] transition-colors duration-300"
      >
        <WhatsIcon size={24} />
      </a>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Mockups de ubicaciones de Meta (Feed, Historias, Reels)           */
/* ---------------------------------------------------------------- */
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[250px] rounded-[1.4rem] bg-charcoal p-[7px] shadow-[0_20px_50px_-24px_rgba(26,23,20,0.5)]">
      <div className="absolute -right-[2px] top-[22%] h-10 w-[2px] rounded-r bg-black/70" />
      <div className="absolute -left-[2px] top-[18%] h-6 w-[2px] rounded-l bg-black/70" />
      <div className="absolute -left-[2px] top-[28%] h-6 w-[2px] rounded-l bg-black/70" />
      <div className="relative rounded-[1rem] overflow-hidden bg-black aspect-[9/16]">
        {children}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-2 w-2 rounded-full bg-black ring-1 ring-white/15" />
      </div>
    </div>
  );
}

function AdAvatar({ size = "h-6 w-6" }: { size?: string }) {
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-full bg-forest text-ivory text-[9px] font-display`}
    >
      V
    </span>
  );
}

function FacebookPreview() {
  return (
    <div className="absolute inset-0 bg-ivory flex flex-col">
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
        <span className="text-[14px] font-bold tracking-tight text-[#1877F2]">
          facebook
        </span>
        <div className="flex items-center gap-2.5 text-charcoal">
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.6} />
          <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={1.6} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 pb-1">
        <AdAvatar />
        <div className="leading-tight">
          <div className="text-[10px] font-medium text-charcoal">
            Vitrina Comercial Cartagena
          </div>
          <div className="text-[8px] text-charcoal/50">Publicidad · 🌎</div>
        </div>
        <MoreHorizontal className="ml-auto h-3.5 w-3.5 text-charcoal/60" />
      </div>
      <p className="px-2.5 pb-1.5 text-[8.5px] text-charcoal/80 leading-snug">
        Se vende casa colonial en el Centro Histórico. Interesados por
        WhatsApp.
      </p>
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-2 bg-ivory-warm/70 px-2.5 py-1.5">
        <div className="leading-tight min-w-0">
          <div className="text-[7.5px] text-charcoal/50">api.whatsapp.com</div>
          <div className="text-[9px] font-medium text-charcoal truncate">
            Casa colonial en venta
          </div>
        </div>
        <span className="shrink-0 rounded-[5px] bg-forest text-ivory text-[8.5px] px-2.5 py-1">
          WhatsApp
        </span>
      </div>
      <div className="flex items-center justify-around px-2 py-1.5 text-[8px] text-charcoal/65 border-t border-charcoal/10">
        <span className="flex items-center gap-1">
          <ThumbsUp className="h-3 w-3" strokeWidth={1.6} /> Me gusta
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="h-3 w-3" strokeWidth={1.6} /> Comentar
        </span>
        <span className="flex items-center gap-1">
          <Share2 className="h-3 w-3" strokeWidth={1.6} /> Compartir
        </span>
      </div>
    </div>
  );
}

function WhatsAppPreview() {
  return (
    <div className="absolute inset-0 bg-[#EFE7DC] flex flex-col">
      <div className="flex items-center gap-2 bg-forest px-2.5 pt-3.5 pb-2 text-ivory">
        <span aria-hidden className="text-[13px] leading-none">
          ‹
        </span>
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ivory-warm text-forest text-[9px] font-medium">
          C
        </span>
        <div className="flex-1 leading-tight min-w-0">
          <div className="text-[10px] font-medium truncate">Carlos M.</div>
          <div className="text-[8px] text-ivory/70">en línea</div>
        </div>
        <MoreHorizontal className="h-3.5 w-3.5" />
      </div>
      <div className="mx-auto mt-2.5 rounded-[6px] bg-ivory/90 px-2 py-1 text-[7.5px] text-charcoal/60">
        Lead desde tu anuncio en Meta
      </div>
      <div className="flex-1 flex flex-col px-2.5 pt-2.5 gap-1.5 overflow-hidden">
        <div className="max-w-[88%] self-start rounded-[8px] rounded-tl-[2px] bg-white p-2 text-[9px] text-charcoal leading-snug">
          Hola, vi el anuncio del local en el Centro Histórico. ¿Sigue
          disponible?
          <span className="block text-right text-[7px] text-charcoal/40 mt-0.5">
            10:24
          </span>
        </div>
        <div className="max-w-[88%] self-start rounded-[8px] bg-white p-2 text-[9px] text-charcoal leading-snug">
          ¿Se puede visitar mañana en la tarde?
          <span className="block text-right text-[7px] text-charcoal/40 mt-0.5">
            10:25
          </span>
        </div>
        <div className="max-w-[88%] self-end rounded-[8px] rounded-tr-[2px] bg-[#DCF8C6] p-2 text-[9px] text-charcoal leading-snug">
          Claro que sí. ¿Le sirve a las 3 p.m.?
          <span className="block text-right text-[7px] text-charcoal/40 mt-0.5">
            10:26 ✓✓
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 p-2">
        <div className="flex-1 rounded-full bg-white px-3 py-1.5 text-[8.5px] text-charcoal/40">
          Mensaje
        </div>
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
          <Send className="h-3 w-3" strokeWidth={1.8} />
        </span>
      </div>
    </div>
  );
}

function FeedPreview() {
  return (
    <div className="absolute inset-0 bg-ivory flex flex-col">
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
        <span className="font-display italic font-medium text-[14px] text-charcoal">
          Instagram
        </span>
        <div className="flex items-center gap-2.5 text-charcoal">
          <Heart className="h-3.5 w-3.5" strokeWidth={1.6} />
          <Send className="h-3.5 w-3.5" strokeWidth={1.6} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 pb-1.5">
        <AdAvatar />
        <div className="leading-tight">
          <div className="text-[10px] font-medium text-charcoal">vitrinavcc</div>
          <div className="text-[8px] text-charcoal/50">Publicidad</div>
        </div>
        <MoreHorizontal className="ml-auto h-3.5 w-3.5 text-charcoal/60" />
      </div>
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <img
          src={ctgLocal}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between bg-forest px-2.5 py-1.5 text-[9.5px] text-ivory">
        Enviar mensaje
        <span aria-hidden>›</span>
      </div>
      <div className="flex items-center gap-2.5 px-2.5 py-1.5 text-charcoal">
        <Heart className="h-4 w-4" strokeWidth={1.6} />
        <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
        <Send className="h-4 w-4" strokeWidth={1.6} />
        <Bookmark className="ml-auto h-4 w-4" strokeWidth={1.6} />
      </div>
      <div className="px-2.5 pb-2.5 leading-snug">
        <div className="text-[9px] font-medium text-charcoal">
          1.284 Me gusta
        </div>
        <p className="text-[8.5px] text-charcoal/75 line-clamp-2">
          <span className="font-medium text-charcoal">vitrinavcc</span> Local
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
        src={ctgInterior}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
      <div className="absolute inset-x-0 top-0 p-2.5">
        <div className="flex gap-1 mb-2">
          <div className="h-0.5 flex-1 rounded-full bg-white/90" />
          <div className="h-0.5 flex-1 rounded-full bg-white/30" />
          <div className="h-0.5 flex-1 rounded-full bg-white/30" />
        </div>
        <div className="flex items-center gap-1.5">
          <AdAvatar />
          <span className="text-[10px] font-medium text-white">vitrinavcc</span>
          <span className="text-[8px] text-white/70">Publicidad</span>
          <X className="ml-auto h-3.5 w-3.5 text-white/80" />
        </div>
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center">
        <div className="font-display font-light text-[16px] leading-tight text-white drop-shadow">
          Apartamento en venta,
          <br />
          <span className="italic">Centro Histórico.</span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col items-center gap-1.5">
        <ChevronUp className="h-4 w-4 text-white" />
        <div className="rounded-[8px] bg-white px-4 py-1.5 text-[10px] font-medium text-charcoal">
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
        src={ctgAzotea}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2.5 text-white">
        <span className="text-[11px] font-medium">Reels</span>
        <MoreHorizontal className="h-3.5 w-3.5" />
      </div>
      <div className="absolute right-2 bottom-20 flex flex-col items-center gap-3 text-white">
        <div className="flex flex-col items-center gap-0.5">
          <Heart className="h-4.5 w-4.5" strokeWidth={1.6} />
          <span className="text-[8px]">1,2 mil</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.6} />
          <span className="text-[8px]">86</span>
        </div>
        <Send className="h-4.5 w-4.5" strokeWidth={1.6} />
        <MoreHorizontal className="h-4 w-4" />
      </div>
      <div className="absolute bottom-0 left-0 right-10 p-2.5 text-white space-y-1.5">
        <div className="flex items-center gap-1.5">
          <AdAvatar size="h-5 w-5" />
          <span className="text-[10px] font-medium">vitrinavcc</span>
          <span className="rounded-[3px] border border-white/60 px-1 text-[7.5px]">
            Publicidad
          </span>
        </div>
        <p className="text-[9px] leading-snug text-white/90 line-clamp-2">
          Ático con vista a la ciudad amurallada. Interesados por WhatsApp.
        </p>
        <div className="flex items-center gap-1 text-[8px] text-white/80">
          <Music2 className="h-2.5 w-2.5" />
          Audio original · VCC
        </div>
        <div className="rounded-[6px] bg-white/95 px-3 py-1.5 text-center text-[9.5px] font-medium text-charcoal">
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
  return <span className="w-1 h-1 rounded-full bg-brass/70 inline-block" />;
}
