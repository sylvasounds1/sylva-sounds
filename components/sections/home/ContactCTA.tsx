"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGSAP } from "@/lib/gsap";
import { site } from "@/lib/data";
import { RevealText } from "@/components/ui/RevealText";

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.from("[data-cta]", {
        opacity: 0,
        y: 80,
        duration: 1.1,
        stagger: 0.18,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-stage="collaboration" className="veil-dark relative overflow-hidden px-6 py-32 lg:px-8">
      {/* Radial glow instead of repetitive waveform bars */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(92,107,61,0.18) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-3xl text-center">
        <p data-cta className="label-mono mb-5 text-olive-light">
          Let&apos;s Talk
        </p>
        <RevealText
          text="Ready to shape your sound?"
          className="mx-auto font-display font-semibold leading-[0.96] tracking-[-0.025em] text-on-dark"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        />
        <p data-cta className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-on-dark-dim md:text-xl">
          Tell us about your film, campaign, or series. We&apos;ll respond with ideas, timelines, and next steps.
        </p>
        <div data-cta className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-olive-core px-8 py-4 text-sm font-semibold tracking-wide text-surface-01 transition-all duration-300 hover:bg-olive-dark hover:shadow-[0_4px_24px_rgba(92,107,61,0.4)] active:scale-[0.98]"
          >
            Contact Us
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="text-sm font-medium text-olive-light underline-offset-4 hover:text-on-dark hover:underline"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
