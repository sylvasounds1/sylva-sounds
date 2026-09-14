"use client";

import { useLayoutEffect, useRef } from "react";
import { Music2, Waves, SlidersHorizontal, Mic2 } from "lucide-react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { serviceCategories } from "@/lib/data";
import { RevealText } from "@/components/ui/RevealText";

const ICONS = [Music2, Waves, SlidersHorizontal, Mic2] as const;

export function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-heading-meta",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );

      gsap.utils.toArray<HTMLElement>(".svc-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-stage="production" className="veil-warm border-t border-beige-deep/50 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 border-b border-beige-deep pb-10">
          <p className="svc-heading-meta label-mono mb-4 text-base md:text-lg">What We Do</p>
          <RevealText
            text="Services"
            className="heading-display font-semibold leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((cat, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <a
                key={cat.id}
                href="/services"
                className="svc-card group flex flex-col rounded-card border border-beige-deep bg-surface-01 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-olive-core hover:shadow-[0_12px_40px_rgba(92,107,61,0.18)] md:p-10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-beige-deep bg-bg-primary text-olive-core transition-colors group-hover:border-olive-core/40 group-hover:bg-olive-core/10">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-olive-dark transition-colors group-hover:text-olive-core md:text-3xl">
                  {cat.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">
                  {cat.description}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-beige-deep pt-6">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-base text-text-primary md:text-lg">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-olive-core" />
                      {item}
                    </li>
                  ))}
                </ul>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
