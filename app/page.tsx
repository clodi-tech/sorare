import { CardRaritySelector } from "@/components/card-rarity-selector";
import { getUser, getUserCards } from "@/lib/actions";

export default async function Home() {
  const user = await getUser("clodi-tech");

  const cards = await getUserCards(user.id);

  const positionCounts = {
    goalkeeper: cards.filter((card) => card.position === "Goalkeeper").length,
    defender: cards.filter((card) => card.position === "Defender").length,
    midfielder: cards.filter((card) => card.position === "Midfielder").length,
    forward: cards.filter((card) => card.position === "Forward").length,
  };

  return (
    <div className="flex gap-4 m-10 flex-col items-center justify-center min-h-screen">
      <h1>Welcome {user.nickname}</h1>
      <CardRaritySelector
        counts={user.footballCardCounts}
        cards={cards}
        positionCounts={positionCounts}
      />
    </div>
  );
}
