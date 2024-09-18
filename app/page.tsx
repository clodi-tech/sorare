import Image from "next/image";

const query = `
{
  user(slug: "clodi-tech") {
    nickname
    footballCardCounts {
      limited
      rare
      superRare
      unique
    }
    footballCards(rarities: [limited, rare, super_rare, unique]) {
      nodes {
        slug
        averageScore(type: LAST_FIFTEEN_SO5_AVERAGE_SCORE)
        rarity
        inSeasonEligible
        pictureUrl
        player {
          slug
          displayName
          position
        }
      }
    }
  }
}
  `;

interface FootballCard {
  slug: string;
  averageScore: number;
  pictureUrl: string;
  player: {
    displayName: string;
  };
}

export default async function Home() {
  const response = await fetch("https://api.sorare.com/federation/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const { data } = await response.json();

  return (
    <div className="flex gap-4 flex-col items-center justify-center min-h-screen">
      <h1>Welcome {data.user.nickname}</h1>
      <div className="flex gap-2">
        <h2>Limited: {data.user.footballCardCounts.limited}</h2>
        <h2>Rare: {data.user.footballCardCounts.rare}</h2>
        <h2>Super Rare: {data.user.footballCardCounts.superRare}</h2>
        <h2>Unique: {data.user.footballCardCounts.unique}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.user.footballCards.nodes.map((card: FootballCard) => (
          <div key={card.slug}>
            <Image
              src={card.pictureUrl}
              alt={card.player.displayName}
              width={100}
              height={100}
            />
            <h2>{card.averageScore}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
