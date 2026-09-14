"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, registerGSAP } from "@/lib/gsap";
import { creditPosters, creditsSummary } from "@/lib/data";

function rotate<T>(items: T[], offset: number): T[] {
  if (!items.length) return items;
  const step = offset % items.length;
  return [...items.slice(step), ...items.slice(0, step)];
}

const layers = {
  back: rotate(creditPosters, 0),
  mid: rotate(creditPosters, 3),
  front: rotate(creditPosters, 6),
};

export function CreditsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(".credits-layer-back", { xPercent: 6 }, { xPercent: -14, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.4 } });
      gsap.fromTo(".credits-layer-mid", { xPercent: -8 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.fromTo(".credits-layer-front", { xPercent: 10 }, { xPercent: -18, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.7 } });

      gsap.fromTo(
        ".credits-monument",
        { opacity: 0, scale: 0.82, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-stage="legacy" className="relative flex min-h-[100vh] items-center overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-8">
        <div className="credits-layer-back flex gap-6 will-change-transform" style={{ filter: "blur(5px)", opacity: 0.22 }}>
          {layers.back.map((poster, i) => (
            <PosterCard key={`bk-${poster.id}-${i}`} src={poster.image} alt={poster.title} className="h-56 w-80 scale-110" />
          ))}
        </div>
        <div className="credits-layer-mid flex gap-6 will-change-transform" style={{ opacity: 0.45 }}>
          {layers.mid.map((poster, i) => (
            <PosterCard key={`md-${poster.id}-${i}`} src={poster.image} alt={poster.title} className="h-48 w-72" />
          ))}
        </div>
        <div className="credits-layer-front flex gap-6 will-change-transform" style={{ opacity: 0.8 }}>
          {layers.front.map((poster, i) => (
            <PosterCard key={`fr-${poster.id}-${i}`} src={poster.image} alt={poster.title} className="h-40 w-60" />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(244,239,230,0.92) 0%, rgba(244,239,230,0.7) 40%, rgba(244,239,230,0.3) 75%, transparent 100%)" }} />

      <div className="credits-monument relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="label-mono mb-5 text-base md:text-lg">Credits</p>
        <h2 className="heading-display font-semibold leading-[0.96] tracking-[-0.02em]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}>
          {creditsSummary.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl lg:text-2xl">
          {creditsSummary.subline}
        </p>
      </div>
    </section>
  );
}

function PosterCard({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-card shadow-lg ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="320px" />
    </div>
  );
}
