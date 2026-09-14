"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ delay: 0.05 });
    tl.fromTo(".ph-label",  { opacity: 0, y: 10 },  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .fromTo(".ph-title",  { opacity: 0, y: 80, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.95, ease: "power4.out" }, "-=0.2")
      .fromTo(".ph-sub",    { opacity: 0, y: 24 },  { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3");
  }, []);

  return (
    <div ref={ref} className="dark-zone overflow-hidden px-6 pb-20 pt-40 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-36"
        style={{ background: "linear-gradient(to bottom, var(--dark-bg), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <p className="ph-label label-mono mb-6 text-sm opacity-0" style={{ color: "var(--on-dark-label)" }}>
          {label}
        </p>
        <h1
          className="ph-title font-display font-semibold opacity-0"
          style={{
            fontSize: "clamp(5.5rem, 16vw, 13rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            color: "var(--on-dark)",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="ph-sub mt-8 max-w-2xl text-lg leading-relaxed text-on-dark-dim opacity-0 md:text-xl"
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Clean architectural divider — no gradient blob */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(92,107,61,0.3) 25%, rgba(200,176,64,0.55) 50%, rgba(92,107,61,0.3) 75%, transparent)",
        }}
      />
    </div>
  );
}
