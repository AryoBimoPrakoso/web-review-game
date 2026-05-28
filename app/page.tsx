import CardItem from "@/components/CardItem";
import { getGames } from "@/service/gameService"
export default async function Home() {
  const data = await getGames()
  return (
    <div>
      <CardItem games={data.results}/>
    </div>
  );
}
