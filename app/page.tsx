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
    cards(sport: FOOTBALL, rarities: [limited, rare, super_rare, unique]) {
      nodes {
        name
      }
    }
  }
}
  `;

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <h1>Nickname: {data.user.nickname}</h1>
        <h2>Limited: {data.user.footballCardCounts.limited}</h2>
        <h2>Rare: {data.user.footballCardCounts.rare}</h2>
        <h2>Super Rare: {data.user.footballCardCounts.superRare}</h2>
        <h2>Unique: {data.user.footballCardCounts.unique}</h2>
      </div>
      <div>
        {data.user.cards.nodes.map((card: any) => (
          <h2 key={card.name}>{card.name}</h2>
        ))}
      </div>
    </div>
  );
}
