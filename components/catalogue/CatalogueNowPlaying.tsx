"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { triggerPulse } from "@/lib/scrollState";
import type { CatalogueSong } from "@/lib/data";
import { embedSrc } from "@/components/catalogue/useCatalogueAudio";

const BAR_COUNT = 32;

interface CatalogueNowPlayingProps {
  song: CatalogueSong;
  isPlaying: boolean;
  embedTrackId: string;
  embedStart: number;
}

export function CatalogueNowPlaying({ song, isPlaying, embedTrackId, embedStart }: CatalogueNowPlayingProps) {
  const iframeRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const bars = useRef(
    Array.from({ length: BAR_COUNT }, () => ({
      height: 0.2 + Math.random() * 0.8,
      delay: Math.random() * 0.6,
    }))
  ).current;

  useEffect(() => {
    triggerPulse(0.9);
  }, [song.id]);

  useEffect(() => {
    const el = iframeRef.current;
    if (!el || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const spotifyDeepLink = `https://open.spotify.com/track/${song.spotifyTrackId}?t=${song.previewStart}`;

  return (
    <div className="showreel-player">
      <div ref={iframeRef} className="relative w-full max-w-[400px] overflow-hidden rounded-card border border-[rgba(92,107,61,0.2)] bg-black">
        <div className="aspect-square w-full">
          {shouldLoad ? (
            <iframe
              className="h-full w-full"
              src={embedSrc(embedTrackId, embedStart)}
              title={song.title}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-black">
              <span className="text-sm text-on-dark-dim">Loading player...</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-[3px] px-1" aria-hidden>
        {bars.map((bar, i) => (
          <motion.span
            key={`${song.id}-${i}`}
            className="equalizer-bar"
            style={{
              flex: 1,
              minHeight: 4,
              background: "var(--olive-core)",
              borderRadius: 2,
              opacity: 0.75,
            }}
            animate={isPlaying ? { height: [4, `${bar.height * 48 + 4}px`, 4] } : { height: 4 }}
            transition={
              isPlaying
                ? {
                    height: {
                      duration: 0.6 + bar.delay,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: bar.delay,
                    },
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="font-display text-xl font-semibold text-on-dark md:text-2xl">{song.title}</p>
            <p className="text-sm text-on-dark-dim md:text-base">{song.credit}</p>
          </motion.div>
        </AnimatePresence>
        <a
          href={spotifyDeepLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-olive-light underline-offset-4 transition-all duration-300 hover:text-on-dark hover:underline hover:shadow-[0_4px_24px_rgba(92,107,61,0.4)] md:text-base"
        >
          Listen on Spotify ↗
        </a>
      </div>
    </div>
  );
}
