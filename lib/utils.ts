import { GameCard as GameCardType } from "@/service/gameService";

export type GameCardProps = {
  game: GameCardType;
};

export function getMetacriticColor(score: number | null): {
  bg: string;
  text: string;
  border: string;
} {
  if (!score) {
    return {
      bg: "bg-neutral-800/80",
      text: "text-slate-400",
      border: "border-slate-700",
    };
  }
  if (score >= 80) {
    return {
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
      border: "border-emerald-500/40",
    };
  }
  if (score >= 60) {
    return {
      bg: "bg-amber-500/20",
      text: "text-amber-400",
      border: "border-amber-500/40",
    };
  }
  return {
    bg: "bg-rose-500/20",
    text: "text-rose-400",
    border: "border-rose-500/40",
  };
}

export function formatYear(dateString: string): string {
  if (!dateString || dateString === "TBA") return "TBA";
  const year = new Date(dateString).getFullYear();
  return isNaN(year) ? dateString : year.toString();
}
