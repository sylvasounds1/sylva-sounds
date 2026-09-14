"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { brandLogos, creditsSummary } from "@/lib/data";

const MARQUEE_SPEED = 25; // px/sec
const BASE_PADDING = 48;

function LogoMark({
  name,
  src,
  scale = 1,
  paddingInline,
}: {
  name: string;
  src: string;
  scale?: number;
  paddingInline: number;
}) {
  return (
    <div
      className="brand-logo-slot group/logo shrink-0 transition-transform duration-300 ease-out hover:-translate-y-1.5"
      style={{ paddingInline }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        draggable={false}
        className="brand-logo-img"
        style={{ transform: `scale(${scale})` }}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

function LogoSet({
  idPrefix,
  slotPadding,
}: {
  idPrefix: string;
  slotPadding: number;
}) {
  return (
    <>
      {brandLogos.map((brand) => (
        <LogoMark
          key={`${idPrefix}-${brand.name}`}
          name={brand.name}
          src={brand.logo}
          scale={brand.scale}
          paddingInline={slotPadding}
        />
      ))}
    </>
  );
}

function calcSlotPadding(naturalSetWidth: number): number {
  const vw = window.innerWidth;
  // One full set must cover the viewport so the loop never shows empty space
  // or two copies of the same logo at once.
  const targetWidth = vw * 1.2;
  if (naturalSetWidth >= targetWidth) return BASE_PADDING;
  const extra = targetWidth - naturalSetWidth;
  return BASE_PADDING + extra / (brandLogos.length * 2);
}

export function ClientLogos() {
  const sectionRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const setARef = useRef<HTMLDivElement>(null);
  const [slotPadding, setSlotPadding] = useState(BASE_PADDING);
  const [marqueeDuration, setMarqueeDuration] = useState(45);

  useLayoutEffect(() => {
    const measure = measureRef.current;
    if (!measure) return;

    const updatePadding = () => {
      const natural = measure.offsetWidth;
      setSlotPadding(calcSlotPadding(natural));
    };

    updatePadding();
    const ro = new ResizeObserver(updatePadding);
    ro.observe(measure);
    window.addEventListener("resize", updatePadding);
    measure.querySelectorAll("img").forEach((img) => {
      img.addEventListener("load", updatePadding);
    });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePadding);
    };
  }, []);

  useLayoutEffect(() => {
    const setA = setARef.current;
    if (!setA) return;
    const width = setA.offsetWidth;
    if (width > 0) setMarqueeDuration(width / MARQUEE_SPEED);
  }, [slotPadding]);

  useLayoutEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".brands-heading", {
        opacity: 0,
        y: 24,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 88%", once: true },
      });
      gsap.from(".brands-marquee-wrap", {
        opacity: 0,
        y: 28,
        duration: 0.95,
        ease: "power3.out",
        delay: 0.08,
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      });
      gsap.from(".brands-stats", {
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.16,
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const marqueeStyle = {
    "--brand-marquee-duration": `${marqueeDuration}s`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      data-stage="sound"
      className="veil-dark relative overflow-hidden border-b border-[rgba(92,107,61,0.18)] py-14 md:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 40%, rgba(92,107,61,0.12) 0%, transparent 65%)",
        }}
      />

      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(122,154,80,0.35) 50%, transparent 100%)",
        }}
      />

      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute flex items-center opacity-0"
        style={{ visibility: "hidden", left: -9999 }}
      >
        {brandLogos.map((brand) => (
          <LogoMark
            key={`m-${brand.name}`}
            name={brand.name}
            src={brand.logo}
            scale={brand.scale}
            paddingInline={BASE_PADDING}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 text-center lg:px-6">
        <p
          className="brands-heading label-mono text-sm font-semibold uppercase tracking-[0.22em] md:text-base"
          style={{ color: "rgba(244, 239, 230, 0.72)" }}
        >
          Brands We&apos;ve Served
        </p>
      </div>

      <div className="brands-marquee-wrap relative mt-10 md:mt-12">
        <div className="overflow-hidden py-4 md:py-6">
          <div className="brand-marquee-track" style={marqueeStyle}>
            <div ref={setARef} className="flex shrink-0 items-center">
              <LogoSet idPrefix="a" slotPadding={slotPadding} />
            </div>
            <div className="flex shrink-0 items-center">
              <LogoSet idPrefix="b" slotPadding={slotPadding} />
            </div>
          </div>
        </div>
      </div>

      <div className="brands-stats relative mx-auto mt-10 max-w-[1320px] px-5 text-center md:mt-12 lg:px-6">
        <p className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-on-dark">
          {creditsSummary.headline}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-on-dark-dim md:text-lg">
          {creditsSummary.subline}
        </p>
      </div>
    </section>
  );
}
