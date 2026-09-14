"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import {
  aboutStudio,
  creditsSummary,
  serviceCategories,
  site,
} from "@/lib/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealText } from "@/components/ui/RevealText";
import { NeonButton } from "@/components/ui/NeonButton";

const PROCESS_STAGES = ["Ideation", "Composition", "Production", "Mixing", "Mastering", "Delivery"];

export function AboutContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".about-stat").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: ".about-stats", start: "top 85%", once: true },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <PageHeader
        label="About"
        title="SYLVA SOUNDS"
        subtitle="A music and audio post-production studio crafting sound for Indian cinema, OTT, advertising, and digital media."
      />

      {/* Stats */}
      <section className="about-stats veil-dark border-y border-[rgba(92,107,61,0.2)] px-6 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {aboutStudio.stats.map((stat) => (
            <div key={stat.label} className="about-stat text-center lg:text-left">
              <p className="font-display text-4xl font-semibold text-on-dark md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm text-on-dark-dim md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-bg-primary px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className="label-mono mb-5 text-base">Philosophy</p>
              <RevealText
                text={site.tagline}
                className="heading-display font-semibold leading-[0.92] tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
              />
              <p className="about-reveal mt-8 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
                From original scores and trailer music to full sound post and Dolby Atmos delivery, we partner
                with filmmakers, brands, and production houses to shape audio that serves the story.
              </p>
              <p className="about-reveal mt-6 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
                {creditsSummary.headline} — {creditsSummary.subline.toLowerCase()}
              </p>
            </div>

            <div className="about-reveal relative overflow-hidden rounded-card border border-[rgba(92,107,61,0.15)] bg-surface-01 p-8 md:p-10">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-40"
                style={{ background: "radial-gradient(circle, rgba(92,107,61,0.35) 0%, transparent 70%)" }}
              />
              <p className="font-display text-2xl font-semibold italic leading-snug text-olive-dark md:text-3xl">
                &ldquo;Sound is the invisible architecture of emotion.&rdquo;
              </p>
              <div className="mt-8 flex items-end gap-[3px]" style={{ height: 32 }} aria-hidden>
                {[4, 9, 6, 14, 8, 12, 5, 10, 7, 13, 6, 9, 4, 11, 7].map((h, i) => (
                  <span
                    key={i}
                    className="waveform-bar flex-1 rounded-sm bg-olive-core/60"
                    style={{ height: h * 2, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-olive-muted">
                {aboutStudio.location} · {aboutStudio.reach}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-surface-01 px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="label-mono mb-4 text-base">How we think</p>
          <h2
            className="heading-display mb-14 font-semibold leading-[0.94] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Built for modern media
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {aboutStudio.pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="about-reveal group rounded-card border border-[rgba(92,107,61,0.12)] bg-bg-primary p-8 transition-all duration-300 hover:-translate-y-1 hover:border-olive-muted/40 hover:shadow-lg"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="font-mono text-sm text-olive-core">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-olive-dark">{pillar.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">{pillar.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="border-y border-beige-deep/60 bg-bg-primary px-6 py-16 lg:px-8">
        <div className="about-reveal mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-3">
          {PROCESS_STAGES.map((stage, i) => (
            <span key={stage} className="flex items-center gap-4">
              <span className="font-mono text-sm text-olive-core">{stage}</span>
              {i < PROCESS_STAGES.length - 1 && (
                <span className="hidden h-px w-8 bg-beige-deep sm:block" aria-hidden />
              )}
            </span>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-bg-primary px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="label-mono mb-4 text-base">Capabilities</p>
          <RevealText
            text="What we offer"
            className="heading-display mb-14 font-semibold leading-[0.94] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {serviceCategories.map((category) => (
              <div
                key={category.id}
                className="about-reveal glass group p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-10"
              >
                <h3 className="font-display text-2xl font-semibold text-olive-dark md:text-3xl">{category.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-text-secondary">{category.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {category.items.slice(0, 5).map((item) => (
                    <li
                      key={item}
                      className="rounded-pill border border-[rgba(92,107,61,0.15)] bg-surface-01 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-olive-muted transition-colors group-hover:border-olive-muted/30 group-hover:text-olive-core"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-bg-primary px-6 py-28 text-center lg:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(92,107,61,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="about-reveal relative mx-auto max-w-2xl">
          <p className="label-mono mb-5 text-base">Let&apos;s collaborate</p>
          <h2
            className="heading-display font-semibold leading-[0.94] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
          >
            Ready to shape your sound?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-text-secondary">
            Tell us about your film, campaign, or series. We&apos;ll respond with ideas, timelines, and next steps.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <NeonButton href="/contact" variant="primary">
              Start a Project →
            </NeonButton>
            <NeonButton href="/portfolio" variant="outline">
              Explore Our Work
            </NeonButton>
          </div>
        </div>
      </section>
    </div>
  );
}
