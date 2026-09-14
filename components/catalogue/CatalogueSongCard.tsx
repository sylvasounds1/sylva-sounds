"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import type { CatalogueSong } from "@/lib/data";

interface CatalogueSongCardProps {
  song: CatalogueSong;
  isActive: boolean;
  isPlaying: boolean;
  onSelect: (id: string) => void;
}

export function CatalogueSongCard({ song, isActive, isPlaying, onSelect }: CatalogueSongCardProps) {
  const miniBars = useRef(
    Array.from({ length: 12 }, () => ({
      height: 0.3 + Math.random() * 0.7,
      delay: Math.random() * 0.4,
    }))
  ).current;

  const showBars = isActive || isPlaying;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(song.id)}
      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-card border p-4 text-left transition-all duration-300 ${
        isActive
          ? "border-olive-core bg-surface-01 shadow-[0_8px_30px_rgba(92,107,61,0.15)]"
          : "border-beige-deep bg-bg-primary hover:border-olive-muted hover:bg-surface-01"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-1 min-w-0">
        <p className="font-display text-lg font-semibold text-olive-dark truncate">{song.title}</p>
        <p className="mt-0.5 text-sm text-text-secondary truncate">{song.credit}</p>
      </div>

      <div
        className={`flex h-8 items-end gap-[2px] transition-opacity duration-200 ${
          showBars ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        aria-hidden
      >
        {miniBars.map((bar, i) => (
          <motion.span
            key={i}
            className="w-[2px]"
            style={{
              background: isPlaying ? "var(--olive-core)" : "var(--olive-muted)",
              borderRadius: 1,
            }}
            animate={
              isPlaying
                ? { height: [`${bar.height * 8}px`, `${bar.height * 28}px`, `${bar.height * 12}px`] }
                : { height: `${bar.height * 16}px` }
            }
            transition={
              isPlaying
                ? {
                    height: {
                      duration: 0.5 + bar.delay,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: bar.delay,
                    },
                  }
                : {}
            }
          />
        ))}
      </div>

      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
          isActive
            ? "bg-olive-core text-surface-01"
            : "opacity-0 group-hover:opacity-100 bg-olive-muted/20 text-olive-muted"
        }`}
      >
        {isActive && isPlaying ? (
          <Pause size={14} fill="currentColor" />
        ) : (
          <Play size={14} className="ml-0.5" />
        )}
      </span>
    </motion.button>
  );
}
