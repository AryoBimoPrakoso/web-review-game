'use client'

import { useState } from "react"

export default function CardItem({ games }: any) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const currentGames = games.slice(start, end)
  return (
    <div>
      {currentGames.map((game: any) => (
        <h1 key={game.id}>
            {game.name}
        </h1>
      ))}
      <button onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  )
}
