import { CardRaritySelector } from "@/components/card-rarity-selector";
import { getUser, getUserCards } from "@/lib/actions";

export default async function Home() {
  const user = await getUser("romanellis");

  const cards = await getUserCards(user.id);

  return (
    <div className="flex gap-4 m-10 flex-col items-center justify-center min-h-screen">
      <h1>Welcome {user.nickname}</h1>
      <CardRaritySelector counts={user.footballCardCounts} cards={cards} />
    </div>
  );
}
