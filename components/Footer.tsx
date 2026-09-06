import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-neutral-800/60 bg-[#121212] mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-neutral-800/60">
          <div className="space-y-3 md:col-span-1">
            <span className="text-base font-bold tracking-tight text-white uppercase">
              Review Game
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              An educational portfolio project showcasing video game data,
              Metacritic ratings, and reviews from RAWG API.
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
                href="https://github.com/AryoBimoPrakoso"
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

          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>
                <a
                  href="#explore"
                  className="hover:text-white transition-colors"
                >
                  Trending Games
                </a>
              </li>
              <li>
                <a
                  href="#spotlight"
                  className="hover:text-white transition-colors"
                >
                  Editor&apos;s Choice
                </a>
              </li>
              <li>
                <a
                  href="#explore"
                  className="hover:text-white transition-colors"
                >
                  Top Metacritic
                </a>
              </li>
            </ul>
          </div>

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

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Review Game — Non-commercial
            educational portfolio.
          </p>
          <a
            href="https://aryoobp.vercel.app/"
            target="_blank"
            className="flex items-center gap-1 text-neutral-400"
          >
            Crafted by{" "}
            <svg
              width="38"
              height="10"
              viewBox="0 0 38 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.01601 6.97207C5.70001 6.96007 6.15602 6.82807 6.22801 6.21607L6.74401 1.96807C6.82802 1.30807 6.50401 0.888066 6.00002 0.984066C5.49602 1.08007 5.06401 1.99207 4.88401 2.36407L3.43201 5.34007C3.04801 6.13207 2.37601 6.28807 1.93201 6.28807C1.22401 6.28807 0.648015 5.70007 0.648015 4.95607C0.648015 4.44007 1.00801 3.97207 1.56001 3.52807L3.97202 1.60807C5.01601 0.780066 5.44801 0.468066 6.22801 0.468066C6.94801 0.468066 7.44002 0.984066 7.59602 1.80007L8.68801 7.57207C8.94002 8.91607 8.53202 9.94807 7.29601 9.94807C6.31202 9.94807 5.84401 9.32407 5.84401 8.59207V7.96807C5.84401 7.30807 5.49602 7.22407 5.07601 7.58407L3.90001 8.59207C3.34801 9.06007 2.46001 9.94807 1.47601 9.94807C0.780015 9.94807 1.46627e-05 9.55207 1.46627e-05 8.42407C1.46627e-05 7.46407 0.864015 7.06807 1.92001 7.04407L5.01601 6.97207ZM18.9217 8.43607C18.9217 9.19207 18.5137 9.94807 17.2657 9.94807C16.7857 9.94807 16.1497 9.72007 15.4897 8.91607L12.5257 5.32807C12.2617 4.99207 12.1417 4.74007 12.1417 4.57207C12.1537 4.26007 12.3937 4.17607 12.8377 4.23607L16.4857 4.70407C17.7697 4.87207 18.1897 4.29607 18.1897 3.67207C18.1897 3.08407 17.7337 2.62807 16.8577 2.62807H13.1017C11.8657 2.62807 11.1937 3.36007 11.1937 4.21207C11.1937 4.44007 11.2537 4.68007 11.3497 4.90807L12.5737 7.78807C13.0417 8.89207 12.8977 9.94807 11.5297 9.94807C10.7857 9.94807 9.95767 9.37207 9.95767 7.65607C9.95767 3.57607 11.6737 0.468066 15.3217 0.468066C18.2857 0.468066 18.9937 2.34007 18.9937 3.42007C18.9937 4.23607 18.6937 4.96807 17.0017 5.56807L15.0337 6.26407C14.7457 6.36007 14.5177 6.50407 14.5177 6.79207C14.5177 7.06807 14.7097 7.16407 15.1657 7.16407L17.5297 7.18807C18.3217 7.20007 18.9217 7.69207 18.9217 8.43607ZM26.137 1.66807C26.089 6.62804e-05 28.837 0.108066 28.801 1.74007C28.789 2.23207 28.405 2.86807 28.069 3.40807L25.129 8.23207C24.649 9.02407 23.953 9.94807 23.089 9.94807C21.325 9.94807 21.121 7.38007 23.029 7.38007H24.157C24.973 7.38007 24.901 7.02007 24.721 6.78007L21.025 1.83607C20.689 1.39207 20.257 1.71607 20.425 2.16007L20.965 3.56407C21.193 4.16407 21.025 4.50007 20.641 4.63207C20.473 4.69207 20.161 4.56007 20.029 4.21207C19.597 3.07207 19.837 0.468066 21.589 0.468066C22.273 0.468066 22.597 0.804066 23.125 1.56007L25.537 5.04007C25.993 5.68807 26.245 5.26807 26.233 4.88407L26.137 1.66807ZM33.5885 9.94807C30.8045 9.94807 29.3405 8.32807 29.3405 5.18407C29.3405 2.04007 30.8045 0.468066 33.5885 0.468066C36.3845 0.468066 37.8485 2.04007 37.8485 5.18407C37.8485 8.32807 36.3845 9.94807 33.5885 9.94807ZM36.9605 5.07607C37.3685 4.58407 37.2485 4.04407 36.6725 3.81607L32.1245 1.99207C31.1645 1.60807 30.4085 2.23207 30.7565 3.36007L32.3765 8.53207C32.5685 9.15607 33.3365 9.44407 33.7925 8.90407L36.9605 5.07607Z"
                fill="#F2F0EF"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
