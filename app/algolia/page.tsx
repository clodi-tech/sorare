import { algoliasearch } from "algoliasearch";

const client = algoliasearch("7Z0Z8PASDY", "30fdac6793afa5b820c36e7202e4b872");

export default async function Page() {
  const res = await client.searchSingleIndex({
    indexName: "Card",
    searchParams: {
      filters:
        "user.id:512dcf61-fcff-479f-8126-97636bb6a961 AND sport:football",
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

  return (
    <div>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
}
