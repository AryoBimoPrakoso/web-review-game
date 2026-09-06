import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800/60 bg-[#121212] mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800/60">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-base font-bold tracking-tight text-white uppercase">
              Review Game
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              An educational portfolio project showcasing video game data, Metacritic ratings, and reviews from RAWG API.
            </p>
            <div className="flex items-center gap-3 text-neutral-400 pt-1">
              <a
                href="https://rawg.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                title="RAWG API"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>
                <a href="#explore" className="hover:text-white transition-colors">
                  Trending Games
                </a>
              </li>
              <li>
                <a href="#spotlight" className="hover:text-white transition-colors">
                  Editor&apos;s Choice
                </a>
              </li>
              <li>
                <a href="#explore" className="hover:text-white transition-colors">
                  Top Metacritic
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Genres */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300">
              Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>Action &amp; Adventure</li>
              <li>Role-Playing (RPG)</li>
              <li>Shooter &amp; Tactical FPS</li>
              <li>Indie &amp; Strategy</li>
            </ul>
          </div>

          {/* Col 4: Data Source */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300">
              Data &amp; API Source
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Video game data and screenshots provided by{" "}
              <a
                href="https://rawg.io/apidocs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                RAWG.io API
              </a>
              .
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400">
              <span>Next.js 16</span>
              <span className="text-neutral-600">•</span>
              <span>React 19</span>
              <span className="text-neutral-600">•</span>
              <span>Tailwind v4</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Review Game — Non-commercial educational portfolio.</p>
          <div className="flex items-center gap-1 text-neutral-400">
            Crafted for web portfolio
          </div>
        </div>
      </div>
    </footer>
  );
}
