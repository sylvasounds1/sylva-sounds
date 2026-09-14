"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { creditsSummary } from "@/lib/data";

/** Copy from client layout doc — not invented campaign/year counters */
export function StatsRow() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.from(".studio-highlight", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-stage="sound"
      className="veil-dark border-y border-[rgba(92,107,61,0.12)] px-6 py-14 lg:px-8"
    >
      <div className="studio-highlight mx-auto max-w-4xl text-center">
        <p
          className="font-display font-semibold leading-tight text-on-dark"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          {creditsSummary.headline}
        </p>
        <p className="mt-4 text-base leading-relaxed text-on-dark-dim md:text-lg lg:text-xl">
          {creditsSummary.subline}
        </p>
      </div>
    </section>
  );
}
