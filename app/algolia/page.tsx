import { algoliasearch } from "algoliasearch";

const client = algoliasearch("7Z0Z8PASDY", "30fdac6793afa5b820c36e7202e4b872");

export default async function Page() {
  const res = await client.searchSingleIndex({
    indexName: "CardsOnSale_LowestPrice",
    searchParams: {
      filters: "on_sale:true",
      distinct: true,
      query: "Rafael Leao",
      hitsPerPage: 1000,
    },
  });

  return <div>{JSON.stringify(res)}</div>;
}
