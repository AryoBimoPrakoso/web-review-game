const API_KEY = process.env.RAWG_API_KEY;

export interface GameGenre {
  id: number;
  name: string;
}

export interface GamePlatform {
  platform: {
    id: number;
    name: string;
    slug?: string;
  };
}

export interface GameScreenshot {
  id: number;
  image: string;
}

export type GameCard = {
  id: number;
  name: string;
  slug: string;
  released: string;
  background_image: string;
  hero_image: string;
  rating: number;
  rating_top: number;
  metacritic: number | null;
  genre: GameGenre[];
  parent_platforms: GamePlatform[];
  short_screenshots: GameScreenshot[];
};

interface RawgGameApiResponse {
  results: Array<{
    id: number;
    name: string;
    slug: string;
    released: string;
    background_image: string;
    rating: number;
    rating_top: number;
    metacritic: number | null;
    genres?: Array<{ id: number; name: string }>;
    parent_platforms?: Array<{ platform: { id: number; name: string; slug?: string } }>;
    short_screenshots?: Array<{ id: number; image: string }>;
  }>;
}

export async function getGames(): Promise<GameCard[]> {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page_size=30`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch games from RAWG API");
  }

  const data: RawgGameApiResponse = await response.json();

  const games: GameCard[] = data.results.map((game) => {
    const highResScreenshot =
      game.short_screenshots && game.short_screenshots.length > 1
        ? game.short_screenshots[1].image
        : game.background_image;

    return {
      id: game.id,
      name: game.name,
      slug: game.slug,
      released: game.released || "TBA",
      background_image: game.background_image || "",
      hero_image: highResScreenshot || game.background_image || "",
      rating: game.rating || 0,
      rating_top: game.rating_top || 5,
      metacritic: game.metacritic ?? null,
      genre:
        game.genres?.map((g) => ({
          id: g.id,
          name: g.name,
        })) || [],
      parent_platforms:
        game.parent_platforms?.map((p) => ({
          platform: {
            id: p.platform.id,
            name: p.platform.name,
            slug: p.platform.slug,
          },
        })) || [],
      short_screenshots:
        game.short_screenshots?.map((s) => ({
          id: s.id,
          image: s.image,
        })) || [],
    };
  });

  return games;
}
