"use client";

export const dynamic = "force-dynamic";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Hits, SearchBox } from "react-instantsearch";

const searchClient = algoliasearch(
  "7Z0Z8PASDY",
  "30fdac6793afa5b820c36e7202e4b872"
);

export default function Page() {
  return (
    <InstantSearchNext
      indexName="CardsOnSale_LowestPrice"
      searchClient={searchClient}
    >
      <SearchBox />
      <Hits />
    </InstantSearchNext>
  );
}
