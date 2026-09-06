import Image from "next/image";
import { GameCardProps, formatYear } from "@/lib/utils";
import { Star, ArrowUpRight } from "lucide-react";

export default function CardItem({ game }: GameCardProps) {
  const imageSrc = game.background_image || game.hero_image;

  return (
    <div
      id={`game-${game.id}`}
      className="group relative flex flex-col bg-[#181818] hover:bg-[#1f1f1f] border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail Container (16:9) */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={game.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
            No Image
          </div>
        )}

        {/* Subtle shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Metascore Pill (Top Right) */}
        {game.metacritic && (
          <div
            className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[11px] font-medium border border-neutral-700/80 bg-black/70 text-neutral-200 backdrop-blur-md"
            title={`Metacritic Score: ${game.metacritic}`}
          >
            {game.metacritic}
          </div>
        )}

        {/* Release Year (Bottom Left) */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-normal bg-black/70 border border-neutral-800 text-neutral-300 backdrop-blur-md">
          {formatYear(game.released)}
        </div>
      </div>

      {/* Content Info */}
      <div className="flex flex-col flex-1 pt-3 space-y-2">
        {/* Genres / Category */}
        <div className="flex items-center gap-1.5 overflow-hidden text-[11px] text-neutral-400">
          {game.genre.slice(0, 2).map((g) => (
            <span
              key={g.id}
              className="text-neutral-400 bg-neutral-900/60 border border-neutral-800/80 px-2 py-0.5 rounded-full text-[10px]"
            >
              {g.name}
            </span>
          ))}
          {game.parent_platforms?.length > 0 && (
            <span className="text-neutral-500 text-[10px]">
              • {game.parent_platforms[0].platform.name}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors duration-200 line-clamp-1">
          {game.name}
        </h3>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Rating & Detail Action */}
        <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-300">
            <Star className="w-3 h-3 fill-neutral-300 text-neutral-300" />
            <span className="font-medium text-white">{game.rating.toFixed(1)}</span>
            <span className="text-[10px] text-neutral-500">/ 5</span>
          </div>

          <a
            href={`https://rawg.io/games/${game.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-normal text-neutral-400 group-hover:text-white transition-colors"
          >
            RAWG
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
