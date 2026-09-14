"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import type { CatalogueSong } from "@/lib/data";

interface CatalogueTrackListProps {
  songs: CatalogueSong[];
  activeId: string;
  onSelect: (id: string) => void;
  isPlaying: boolean;
}

function MicroWaveform({ active }: { active: boolean }) {
  const bars = useRef(
    Array.from({ length: 8 }, () => ({
      height: 0.25 + Math.random() * 0.75,
      delay: Math.random() * 0.3,
    }))
  ).current;

  return (
    <span
      className={`flex h-5 items-end gap-[2px] transition-opacity duration-200 ${
        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
      aria-hidden
    >
      {bars.map((bar, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-sm bg-olive-core/70"
          animate={{
            height: active
              ? [`${bar.height * 6 + 4}px`, `${bar.height * 18 + 4}px`, `${bar.height * 8 + 4}px`]
              : [`${bar.height * 10 + 4}px`, `${bar.height * 14 + 4}px`, `${bar.height * 10 + 4}px`],
          }}
          transition={{
            duration: 0.45 + bar.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: bar.delay,
          }}
        />
      ))}
    </span>
  );
}

export function CatalogueTrackList({ songs, activeId, onSelect, isPlaying }: CatalogueTrackListProps) {
  return (
    <ul className="showreel-list flex flex-col">
      {songs.map((song, i) => {
        const isActive = song.id === activeId;
        return (
          <li key={song.id} className="showreel-list-item">
            <button
              type="button"
              onClick={() => onSelect(song.id)}
              className="group flex w-full items-center gap-5 border-b border-[rgba(240,236,227,0.1)] py-5 text-left transition-colors"
            >
              <span
                className={`font-mono text-sm tabular-nums transition-colors ${isActive ? "text-on-dark-accent" : "text-on-dark-dim"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span
                  className={`block font-display text-2xl font-semibold transition-colors md:text-3xl ${
                    isActive ? "text-on-dark-accent" : "text-on-dark group-hover:text-on-dark-accent"
                  }`}
                >
                  {song.title}
                </span>
                <span className="mt-1 block text-sm text-on-dark-dim md:text-base">{song.credit}</span>
              </span>
              <MicroWaveform active={isActive} />
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                  isActive
                    ? "border-olive-core bg-olive-core text-surface-01"
                    : "border-[rgba(240,236,227,0.25)] text-on-dark-dim group-hover:border-on-dark"
                }`}
              >
                {isActive && isPlaying ? (
                  <Pause size={15} fill="currentColor" />
                ) : (
                  <Play size={15} className="ml-0.5" />
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
