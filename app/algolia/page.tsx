import { algoliasearch } from "algoliasearch";

const client = algoliasearch("7Z0Z8PASDY", "30fdac6793afa5b820c36e7202e4b872");

export default async function Page() {
  const res = await client.searchSingleIndex({
    indexName: "CardsOnSale_LowestPrice",
    searchParams: {
      filters:
        "on_sale:true AND sale.primary:false AND rarity:limited AND player.slug:rafael-alexandre-conceicao-leao",
      distinct: true,
      hitsPerPage: 10,
    },
  });

  return (
    <div>
      <h1>Rafael Leao</h1>
      {res.hits.map((hit: any) => (
        <div key={hit.objectID}>
          <h2>{hit.name}</h2>
          <p>{hit.price}</p>
        </div>
      ))}
    </div>
  );
}
