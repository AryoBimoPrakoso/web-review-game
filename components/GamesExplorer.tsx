"use client";

import { useState, useMemo } from "react";
import type { GameCard } from "@/service/gameService";
import CardItem from "./CardItem";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

type GamesExplorerProps = {
  games: GameCard[];
};

export default function GamesExplorer({ games }: GamesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [sortBy, setSortBy] = useState<
    "popular" | "metacritic" | "rating" | "year"
  >("popular");

  // Extract all unique genres
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    games.forEach((game) => {
      game.genre.forEach((g) => set.add(g.name));
    });
    return ["All", ...Array.from(set).slice(0, 8)];
  }, [games]);

  // Filter & sort games
  const filteredGames = useMemo(() => {
    let result = [...games];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.genre.some((genre) => genre.name.toLowerCase().includes(q)),
      );
    }

    // Genre filter
    if (selectedGenre !== "All") {
      result = result.filter((g) =>
        g.genre.some((genre) => genre.name === selectedGenre),
      );
    }

    // Sorting
    if (sortBy === "metacritic") {
      result.sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "year") {
      result.sort(
        (a, b) =>
          new Date(b.released).getTime() - new Date(a.released).getTime(),
      );
    }

    return result;
  }, [games, searchQuery, selectedGenre, sortBy]);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGames = filteredGames.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  return (
    <section
      id="explore"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* Section Header - Portfolio Minimalist Style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800/60">
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            {"// EXPLORE GAMES"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Curated Game Directory
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg">
            Discover verified titles, Metacritic ratings, and platform releases
            directly from RAWG.
          </p>
        </div>

        {/* Minimalist Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search game or genre..."
            className="w-full pl-9 pr-8 py-2 rounded-full bg-[#161616] border border-neutral-800 focus:border-neutral-600 text-xs text-white placeholder-neutral-500 transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
        {/* Genre Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {allGenres.map((genre) => {
            const isActive = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => {
                  setSelectedGenre(genre);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1 rounded-full text-xs font-normal whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-medium"
                    : "bg-transparent hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-xs text-neutral-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as "popular" | "metacritic" | "rating" | "year",
              )
            }
            className="bg-[#161616] border border-neutral-800 rounded-full px-3 py-1 text-xs text-neutral-300 focus:border-neutral-600 outline-none cursor-pointer"
          >
            <option value="popular">Popularity</option>
            <option value="metacritic">Top Metacritic</option>
            <option value="rating">Highest Rating</option>
            <option value="year">Newest</option>
          </select>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-5">
        <span>
          Showing{" "}
          <strong className="text-white font-medium">
            {filteredGames.length}
          </strong>{" "}
          games
          {selectedGenre !== "All" && ` in ${selectedGenre}`}
        </span>
        {searchQuery && (
          <span className="italic text-neutral-400">
            Query: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* Game Cards Grid */}
      {filteredGames.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedGames.map((game) => (
              <CardItem key={game.id} game={game} />
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 pt-6">
            {/* Tombol Prev */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-full border border-neutral-800 bg-[#161616] text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous page"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Nomor Halaman */}
            <div className="px-3.5 h-9 rounded-full border border-neutral-800 bg-[#161616] text-xs font-mono text-neutral-300 flex items-center justify-center">
              {currentPage} / {totalPages || 1}
            </div>

            {/* Tombol Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage >= totalPages}
              className="w-9 h-9 rounded-full border border-neutral-800 bg-[#161616] text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next page"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="py-20 flex flex-col items-center justify-center text-center bg-[#161616] border border-neutral-800/80 rounded-2xl p-8">
          <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 mb-3 border border-neutral-800">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1">
            No results found
          </h3>
          <p className="text-xs text-neutral-400 max-w-xs mb-5">
            No games match &ldquo;{searchQuery}&rdquo; in {selectedGenre}.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedGenre("All");
            }}
            className="px-4 py-2 rounded-full text-xs font-medium text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
