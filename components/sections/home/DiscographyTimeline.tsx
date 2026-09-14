"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { discography } from "@/lib/data";
import { RevealText } from "@/components/ui/RevealText";

export function DiscographyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    let mm: gsap.MatchMedia | null = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

      const tween = gsap.to(track, { x: () => -getDistance(), ease: "none" });

      const st = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => "+=" + getDistance(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tween,
      });

      // The path draws itself as a living line
      const lineST = gsap.fromTo(
        ".disco-line-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: { trigger: pin, start: "top top", end: () => "+=" + getDistance(), scrub: 1 },
        }
      );

      // Each release emerges from the path as the line reaches it
      const nodes = gsap.utils.toArray<HTMLElement>(".disco-node", track);
      const nodeTweens = nodes.map((node) =>
        gsap.fromTo(
          node,
          { opacity: 0, y: 34, scale: 0.7, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              containerAnimation: tween,
              start: "left 78%",
              end: "left 45%",
              scrub: true,
            },
          }
        )
      );

      return () => {
        st.kill();
        tween.kill();
        lineST.scrollTrigger?.kill();
        nodeTweens.forEach((t) => t.scrollTrigger?.kill());
        gsap.set(track, { clearProps: "x" });
        gsap.set(nodes, { clearProps: "all" });
      };
    });

    return () => {
      mm?.revert();
      mm = null;
    };
  }, []);

  return (
    <section ref={sectionRef} data-stage="legacy" className="veil-dark overflow-hidden">
      {/* Mobile vertical living path */}
      <div className="md:hidden px-6 py-20">
        <p className="label-mono mb-4 text-base" style={{ color: "var(--on-dark-label)" }}>
          Discography
        </p>
        <h2 className="heading-display mb-10 font-semibold leading-[0.96] text-on-dark" style={{ fontSize: "clamp(2.6rem, 9vw, 4rem)" }}>
          Selected Releases
        </h2>
        <ul className="relative border-l border-[rgba(240,236,227,0.18)] pl-6">
          {discography.map((d, i) => (
            <li key={i} className="relative mb-8">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-olive-core" />
              <span className="font-mono text-sm text-on-dark-accent">{d.year}</span>
              <p className="font-display text-2xl font-semibold text-on-dark">{d.title}</p>
              <p className="text-sm text-on-dark-dim">{d.role}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop pinned horizontal timeline */}
      <div ref={pinRef} className="relative hidden h-screen md:block">
        <div className="flex h-full flex-col justify-center">
          <div className="mb-16 px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <p className="label-mono mb-4 text-base md:text-lg" style={{ color: "var(--on-dark-label)" }}>
              Discography
            </p>
            <RevealText
              text="Selected Releases"
              className="heading-display font-semibold leading-[0.92] tracking-[-0.03em] text-on-dark"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            />
            <p className="mt-4 text-sm text-on-dark-dim">Placeholder list — final discography coming soon.</p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-[46px] h-px bg-[rgba(240,236,227,0.14)]" />
            <div className="disco-line-fill pointer-events-none absolute left-0 right-0 top-[46px] h-px bg-olive-core" style={{ transform: "scaleX(0)" }} />

            <div ref={trackRef} className="flex items-start gap-16 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[14vw] will-change-transform">
              {discography.map((d, i) => (
                <div key={i} className="disco-node relative w-[260px] shrink-0 pt-[72px] will-change-transform">
                  <span className="absolute left-0 top-[40px] h-3.5 w-3.5 rounded-full border-2 border-olive-core bg-surface-01" />
                  <span className="font-mono text-lg text-on-dark-accent">{d.year}</span>
                  <p className="mt-2 font-display text-3xl font-semibold leading-tight text-on-dark">{d.title}</p>
                  <p className="mt-2 text-base text-on-dark-dim">{d.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
