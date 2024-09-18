"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import {
  Hits,
  SearchBox,
  RefinementList,
  Pagination,
} from "react-instantsearch";

const searchClient = algoliasearch(
  "7Z0Z8PASDY",
  "30fdac6793afa5b820c36e7202e4b872"
);

const Hit = ({ hit }: { hit: any }) => {
  return <div>{hit.slug}</div>;
};

export default function Page() {
  return (
    <InstantSearchNext
      indexName="CardsOnSale_LowestPrice"
      searchClient={searchClient}
    >
      <SearchBox />
      <RefinementList attribute="position" />
      <Hits hitComponent={Hit} />
      <Pagination />
    </InstantSearchNext>
  );
}
