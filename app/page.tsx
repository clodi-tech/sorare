import Image from "next/image";
import { CardRaritySelectorComponent } from "@/components/card-rarity-selector";
import { algoliasearch } from "algoliasearch";

const client = algoliasearch("7Z0Z8PASDY", "30fdac6793afa5b820c36e7202e4b872");

async function getPrice(
  rarity: string,
  slug: string,
  inSeasonEligible: boolean
) {
  const res: any = await client.searchSingleIndex({
    indexName: "CardsOnSale_LowestPrice",
    searchParams: {
      filters: `on_sale:true AND sale.primary:false AND rarity:${rarity} AND player.slug:${slug} AND in_season_eligible:${inSeasonEligible}`,
      distinct: true,
      hitsPerPage: 1,
    },
  });

  if (!res.hits[0]) {
    return 0;
  }

  return res.hits[0].price;
}

const query = `
{
  user(slug: "romanellis") {
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
  rarity: string;
  inSeasonEligible: boolean;
  pictureUrl: string;
  player: {
    slug: string;
    displayName: string;
    position: string;
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

  const cardsWithPrices = await Promise.all(
    data.user.footballCards.nodes.map(async (card: FootballCard) => {
      const price = await getPrice(
        card.rarity,
        card.player.slug,
        card.inSeasonEligible
      );
      return { ...card, price };
    })
  );

  return (
    <div className="flex gap-4 flex-col items-center justify-center min-h-screen">
      <h1>Welcome {data.user.nickname}</h1>
      <CardRaritySelectorComponent
        counts={data.user.footballCardCounts}
        cards={cardsWithPrices}
      />
    </div>
  );
}
