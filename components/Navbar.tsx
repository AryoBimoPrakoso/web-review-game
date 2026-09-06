import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#121212]/80 backdrop-blur-md border-b border-neutral-800/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-base sm:text-lg font-bold tracking-tight text-white uppercase group-hover:text-neutral-300 transition-colors">
            Review Game
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-medium text-neutral-400 border border-neutral-800 bg-neutral-900/60">
            Educational Project
          </span>
        </Link>

        {/* Navigation Links - Minimalist like Aryo's portfolio */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-normal text-neutral-400">
          <a
            href="#explore"
            className="hover:text-white transition-colors"
          >
            Trending
          </a>
          <a
            href="#spotlight"
            className="hover:text-white transition-colors"
          >
            Editor&apos;s Choice
          </a>
          <a
            href="#explore"
            className="hover:text-white transition-colors"
          >
            Browse
          </a>
        </nav>

        {/* Right CTA / Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-[11px] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span>RAWG Synced</span>
          </div>
        </div>
      </div>
    </header>
  );
}
