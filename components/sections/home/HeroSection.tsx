"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { site } from "@/lib/data";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      // Atmospheric entrance — the world is nearly silent, then copy emerges
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
          ".hero-line",
          { y: 90, skewY: 4 },
          { y: 0, skewY: 0, duration: 1.1, stagger: 0.14, ease: "power4.out" }
        )
        .fromTo(".hero-sub", { y: 26 }, { y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }, "-=0.5");

      // As you begin scrolling, the hero dissolves upward into the world —
      // the ribbon (driven globally by scroll progress) grows to take over.
      gsap.to(contentRef.current, {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-28"
    >
      {/* Warm legibility vignette over the living world */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 58% at 50% 45%, rgba(244,239,230,0.78) 0%, rgba(244,239,230,0.34) 48%, transparent 78%)",
        }}
      />

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
        <h1 className="font-display leading-[0.88] tracking-[-0.04em]">
          <span
            className="hero-line block"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 500, color: "var(--text-primary)" }}
          >
            SYLVA
          </span>
          <span
            className="hero-line block"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 500, color: "var(--olive-core)" }}
          >
            SOUNDS
          </span>
        </h1>

        <p className="hero-sub mt-8 font-display text-xl font-medium italic md:text-2xl lg:text-3xl" style={{ color: "var(--text-secondary)" }}>
          {site.tagline}
        </p>

        <p className="hero-sub mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg lg:text-xl" style={{ color: "var(--text-secondary)" }}>
          {site.description}
        </p>

        <div className="hero-sub mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-olive-core px-10 py-4 text-base font-semibold tracking-wide text-surface-01 transition-all duration-300 hover:bg-olive-dark hover:shadow-[0_4px_32px_rgba(92,107,61,0.4)]"
          >
            Start a Project
          </a>
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-full border border-olive-core/35 px-10 py-4 text-base font-semibold tracking-wide text-text-primary transition-all duration-300 hover:border-olive-core hover:bg-olive-core/5"
          >
            Explore Our Work ↗
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "rgba(92,107,61,0.55)" }}>
          scroll
        </span>
        <div
          className="animate-pulse-arrow h-12 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(92,107,61,0.5), transparent)" }}
        />
      </div>
    </section>
  );
}
