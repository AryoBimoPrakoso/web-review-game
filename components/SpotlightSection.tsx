"use client";

import { useState } from "react";
import Image from "next/image";
import type { GameCard } from "@/service/gameService";
import { formatYear } from "@/lib/utils";
import { Star, Calendar, ArrowUpRight } from "lucide-react";

type SpotlightProps = {
  game: GameCard;
};

export default function SpotlightSection({ game }: SpotlightProps) {
  const screenshots = game.short_screenshots?.length
    ? game.short_screenshots
    : [{ id: 1, image: game.hero_image || game.background_image }];

  const [activeImage, setActiveImage] = useState(
    screenshots[1]?.image || screenshots[0]?.image || game.background_image,
  );

  return (
    <section
      id="spotlight"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#181818] border border-neutral-800/80 p-5 sm:p-8 lg:p-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            {"// SPOTLIGHT FEATURE"}
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-xs text-neutral-400">
            Top Metacritic Score
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Game Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {game.metacritic && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-neutral-700 bg-neutral-900 text-neutral-200">
                    Metascore {game.metacritic} / 100
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-normal bg-neutral-900/60 border border-neutral-800 text-neutral-400">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  Released {formatYear(game.released)}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {game.name}
              </h3>
            </div>

            {/* Score & Rating stats */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              <div className="bg-[#141414] border border-neutral-800/80 rounded-xl p-2.5 sm:p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-neutral-200 mb-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {game.rating.toFixed(1)}
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  User Rating
                </div>
              </div>

              <div className="bg-[#141414] border border-neutral-800/80 rounded-xl p-2.5 sm:p-3 text-center">
                <div className="text-xs sm:text-sm font-semibold text-white mb-0.5">
                  {game.metacritic || 95}
                </div>
                <div className="text-[9px] sm:text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Metacritic
                </div>
              </div>

              <div className="bg-[#141414] border border-neutral-800/80 rounded-xl p-2.5 sm:p-3 text-center">
                <div className="text-xs sm:text-sm font-semibold text-white mb-0.5 line-clamp-1">
                  {game.genre[0]?.name || "Action"}
                </div>
                <div className="text-[9px] sm:text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                  Genre
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div className="space-y-1.5">
              <div className="text-xs text-neutral-500 font-normal">
                Supported Platforms:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {game.parent_platforms?.map((p) => (
                  <span
                    key={p.platform.id}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-normal bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    {p.platform.name}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://rawg.io/games/${game.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-medium text-xs text-black bg-white hover:bg-neutral-200 transition-all cursor-pointer"
              >
                View RAWG Details
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Screenshot Preview Gallery */}
          <div className="lg:col-span-6 space-y-3">
            {/* Main Interactive Preview */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
              <Image
                src={activeImage}
                alt={`${game.name} screenshot`}
                fill
                unoptimized={true}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-normal bg-black/70 border border-neutral-800 text-neutral-300 backdrop-blur-md">
                Full HD 1080p Screenshot
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {screenshots.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {screenshots.slice(0, 5).map((shot) => {
                  const isSelected = activeImage === shot.image;
                  return (
                    <button
                      key={shot.id}
                      onClick={() => setActiveImage(shot.image)}
                      className={`relative aspect-video rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        isSelected
                          ? "border-white scale-105"
                          : "border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600"
                      }`}
                    >
                      <Image
                        src={shot.image}
                        alt="Screenshot thumb"
                        fill
                        unoptimized={true}
                        sizes="100px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
