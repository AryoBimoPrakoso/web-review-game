const API_KEY = process.env.RAWG_API_KEY;

export async function getGames() {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page_size=30`,
    {
      next: {
        revalidate: 86400,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return response.json();
}
