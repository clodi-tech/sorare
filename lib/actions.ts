import { algoliasearch } from "algoliasearch";

const client = algoliasearch("7Z0Z8PASDY", "30fdac6793afa5b820c36e7202e4b872");

export async function getUser(userSlug: string) {
  const query = `{user(slug: "${userSlug}") {id nickname footballCardCounts {limited rare superRare unique}}}`;

  const res = await fetch("https://api.sorare.com/federation/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const {
    data: { user },
  } = await res.json();

  if (!user) {
    return null;
  } else {
    user.id = user.id.replace("User:", "");
    return user;
  }
}

export async function getUserCards(userId: string) {
  const res = await client.searchSingleIndex({
    indexName: "Card",
    searchParams: {
      hitsPerPage: 1000,
      filters: `user.id:${userId} AND sport:football`,
      attributesToRetrieve: [
        "price",
        "rarity",
        "position",
        "in_season_eligible",
        "picture_url",
        "player.display_name",
        "player.slug",
        "active_club.long_name",
        "active_league.display_name",
      ],
    },
  });

  const cardsWithFloor = await Promise.all(
    res.hits.map(async (card: any) => {
      const floor = await getPlayerFloorPrice(
        card.player.slug,
        card.rarity,
        card.in_season_eligible
      );
      return { ...card, floor };
    })
  );

  return cardsWithFloor;
}

async function getPlayerFloorPrice(
  slug: string,
  rarity: string,
  inSeason: boolean
) {
  const res: any = await client.searchSingleIndex({
    indexName: "CardsOnSale_LowestPrice",
    searchParams: {
      filters: `on_sale:true AND sale.primary:false AND rarity:${rarity} AND player.slug:${slug} AND in_season_eligible:${inSeason}`,
      distinct: true,
      hitsPerPage: 1,
    },
  });

  if (!res.hits[0]) {
    return 0;
  }

  return res.hits[0].price;
}
