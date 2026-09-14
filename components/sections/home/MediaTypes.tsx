"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { mediaTypes } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const MEDIA_GROUPS = [
  {
    title: "Long-form",
    items: ["Feature Films", "OTT & Web Series", "Documentaries", "TV Shows"],
  },
  {
    title: "Short-form & brand",
    items: ["Trailers & Promos", "Commercials & Brand Films", "Short Films", "Digital Content"],
  },
  {
    title: "Interactive & other",
    items: ["Game sound audio assets", "Explainer Videos", "Podcasts"],
  },
];

export function MediaTypes() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".media-group").forEach((group, i) => {
        gsap.fromTo(
          group,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 90%", once: true },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const allFromData = new Set(mediaTypes);

  return (
    <section ref={sectionRef} data-stage="legacy" className="veil-surface border-t border-beige-deep/50 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Formats"
          title="We Create Audio For"
          subtitle="From theatrical features and OTT series to brand films, trailers, games, and podcasts — full music and post pipelines for every format."
          align="center"
          size="large"
          reveal
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {MEDIA_GROUPS.map((group) => (
            <div key={group.title} className="media-group rounded-card border border-beige-deep bg-bg-primary p-8">
              <h3 className="label-mono mb-6 text-base text-olive-core md:text-lg">{group.title}</h3>
              <ul className="flex flex-col gap-3">
                {group.items
                  .filter((item) => allFromData.has(item))
                  .map((type) => (
                    <li
                      key={type}
                      className="rounded-lg border border-beige-deep/80 bg-surface-01 px-4 py-3.5 text-base font-medium text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-olive-core hover:text-olive-dark hover:shadow-[0_0_18px_rgba(92,107,61,0.22)] md:text-lg"
                    >
                      {type}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
