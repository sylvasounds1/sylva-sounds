"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { featuredWork, catalogueSongs } from "@/lib/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { CreditsSection } from "@/components/sections/home/CreditsSection";
import { CatalogueSongCard } from "@/components/catalogue/CatalogueSongCard";
import { CatalogueNowPlaying } from "@/components/catalogue/CatalogueNowPlaying";
import { useCatalogueAudio } from "@/components/catalogue/useCatalogueAudio";

export default function PortfolioPage() {
  const [activeSongId, setActiveSongId] = useState<string>(catalogueSongs[0]?.id ?? "");

  const activeSong = catalogueSongs.find((s) => s.id === activeSongId) ?? catalogueSongs[0];
  const { play, isPlaying, embed } = useCatalogueAudio(activeSong);

  const handleSongSelect = (id: string) => {
    const song = catalogueSongs.find((s) => s.id === id);
    if (!song) return;
    setActiveSongId(id);
    play(song);
  };

  return (
    <div>
      <PageHeader
        label="Our Work"
        title="Portfolio"
        subtitle="Featured film scores, advertising music & a curated song catalogue."
      />

      {/* Block 2 — Featured Work video grid */}
      <section className="bg-bg-primary px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="label-mono mb-4 text-base md:text-lg">Featured Work</p>
          <h2 className="heading-display mb-10 font-semibold leading-[0.96] tracking-[-0.02em]" style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)" }}>
            Film & Advertising
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWork.map((project) => {
              const card = (
                <div className="group relative overflow-hidden rounded-card">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700"
                      style={{ transition: "transform 700ms cubic-bezier(0.4,0,0.2,1)" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f07]/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {project.videoUrl && (
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f0ece3]/40" style={{ background: "rgba(92,107,61,0.7)" }}>
                          <Play size={20} className="ml-0.5 text-[#f0ece3]" />
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f0ece3] mb-1">{project.type}</p>
                      <h3 className="font-display text-lg font-semibold text-[#f0ece3]">{project.title}</h3>
                    </div>
                  </div>
                </div>
              );

              if (project.videoUrl) {
                return (
                  <a key={project.id} href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                    {card}
                  </a>
                );
              }
              return <div key={project.id}>{card}</div>;
            })}
          </div>
        </div>
      </section>

      {/* Block 3 — Song catalogue */}
      <section className="bg-bg-secondary px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="label-mono mb-4 text-base md:text-lg">Catalogue</p>
            <h2 className="heading-display font-semibold leading-[0.94] tracking-[-0.03em]" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
              Our Catalogue
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* Song list */}
            <div className="flex flex-col gap-3">
              {catalogueSongs.map((song) => (
                <CatalogueSongCard
                  key={song.id}
                  song={song}
                  isActive={song.id === activeSongId}
                  isPlaying={isPlaying && song.id === activeSongId}
                  onSelect={handleSongSelect}
                />
              ))}
            </div>

            {/* Now playing panel */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              {activeSong ? (
                <CatalogueNowPlaying
                  song={activeSong}
                  isPlaying={isPlaying}
                  embedTrackId={embed.trackId}
                  embedStart={embed.start}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Block 4 — Credits */}
      <CreditsSection />
    </div>
  );
}
