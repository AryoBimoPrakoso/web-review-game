"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import type { GameCard } from "@/service/gameService";
import { formatYear } from "@/lib/utils";
import {
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

type HeroProps = {
  games: GameCard[];
};

export default function Hero({ games }: HeroProps) {
  const heroGames = games.slice(0, 6);

  if (!heroGames.length) return null;

  return (
    <div className="relative w-full overflow-hidden group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={800}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: ".hero-prev-btn",
          nextEl: ".hero-next-btn",
        }}
        style={
          {
            "--swiper-pagination-color": "#ffffff",
            "--swiper-theme-color": "#ffffff",
          } as React.CSSProperties
        }
        className="hero-swiper"
      >
        {heroGames.map((game, index) => {
          const imageSrc = game.hero_image || game.background_image;

          return (
            <SwiperSlide
              key={game.id}
              className="relative w-full h-full select-none"
            >
              <div className="absolute inset-0 w-full h-full">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={game.name}
                    fill
                    sizes="100vw"
                    unoptimized={true}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-[#121212]" />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/95 via-[#121212]/70 to-transparent" />

              <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20 md:pb-24 pt-20 sm:pt-24 md:pt-28">
                <div className="max-w-2xl lg:max-w-3xl space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {game.metacritic && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-900/80 border border-neutral-700 text-neutral-200 backdrop-blur-md">
                        Metascore {game.metacritic}
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-normal bg-neutral-900/80 border border-neutral-800 text-neutral-400 backdrop-blur-md">
                      <Calendar className="w-3 h-3 text-neutral-500" />
                      {formatYear(game.released)}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight sm:leading-none drop-shadow-md">
                    {game.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <div className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded-full backdrop-blur-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-white">
                        {game.rating.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-neutral-500">/ 5.0</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {game.genre.slice(0, 3).map((g) => (
                        <span
                          key={g.id}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-normal bg-neutral-900/80 text-neutral-400 border border-neutral-800 backdrop-blur-sm"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {game.parent_platforms?.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
                      <span className="font-normal text-neutral-500">Platforms:</span>
                      <div className="flex flex-wrap gap-1">
                        {game.parent_platforms.map((p) => (
                          <span
                            key={p.platform.id}
                            className="text-neutral-300 bg-neutral-900/60 border border-neutral-800/80 px-2 py-0.5 rounded-full text-[10px]"
                          >
                            {p.platform.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] text-neutral-400 max-w-xl pt-1">
                    Non-commercial educational project for portfolio purpose. Data provided by RAWG API.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={`#game-${game.id}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-medium text-xs text-black bg-white hover:bg-neutral-200 transition-all active:scale-95"
                    >
                      Explore Game
                    </a>
                    <a
                      href={`https://rawg.io/games/${game.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-medium text-xs text-neutral-300 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all active:scale-95"
                    >
                      RAWG Page
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        aria-label="Previous slide"
        className="hero-prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer hidden sm:flex"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Next slide"
        className="hero-next-btn absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer hidden sm:flex"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
