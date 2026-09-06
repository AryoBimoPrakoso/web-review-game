import Navbar from "@/components/Navbar";
import Hero from "@/components/HeroSwiper";
import GamesExplorer from "@/components/GamesExplorer";
import SpotlightSection from "@/components/SpotlightSection";
import Footer from "@/components/Footer";
import { getGames, GameCard } from "@/service/gameService";
import { Gamepad2, ShieldCheck, Monitor, ArrowUpRight } from "lucide-react";
import GridParticles from "@/components/GridParticles";

export default async function Home() {
  const games: GameCard[] = await getGames();

  const spotlightGame =
    [...games].sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0))[0] ||
    games[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-neutral-200">
      <Navbar />

      <main className="flex-1 w-full">
        <section className="relative w-full">
          <Hero games={games} />
        </section>

        <section className="relative z-10 border-y border-neutral-800/60 bg-[#141414]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    25+ Curated Titles
                  </div>
                  <div className="text-xs text-neutral-400">
                    Trending games list
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Metascore Ratings
                  </div>
                  <div className="text-xs text-neutral-400">
                    Verified critic scores
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Multi-Platform
                  </div>
                  <div className="text-xs text-neutral-400">
                    PC, PS5, Xbox & Switch
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <GridParticles/>

        {spotlightGame && <SpotlightSection game={spotlightGame} />}

        <GamesExplorer games={games} />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
          <div className="relative overflow-hidden rounded-3xl bg-[#181818] border border-neutral-800/80 p-6 sm:p-8 md:p-12">
            <div className="max-w-2xl space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                PORTFOLIO PROJECT
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Designed for speed, clarity, and delight.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                This project was created as an educational showcase to demonstrate frontend craft, modern Next.js 16 conventions, and smooth interactive UI design using the public RAWG video games database.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://rawg.io/apidocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-medium text-xs text-black bg-white hover:bg-neutral-200 transition-all"
                >
                  RAWG Documentation
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
