"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type CardRarity = "limited" | "rare" | "super_rare" | "unique";

interface FootballCard {
  objectID: string;
  rarity: string;
  in_season_eligible: boolean;
  pictureUrl: string;
  price: number;
  floor: number;
  player: {
    slug: string;
    display_name: string;
  };
  active_club: {
    long_name: string;
  };
  active_league: {
    display_name: string;
  };
  position: string;
}

export function CardRaritySelector({
  counts,
  cards,
}: {
  counts: {
    limited: number;
    rare: number;
    superRare: number;
    unique: number;
  };
  cards: FootballCard[];
}) {
  const [selectedRarity, setSelectedRarity] = useState<CardRarity>("limited");

  const handleRarityChange = (value: string) => {
    setSelectedRarity(value as CardRarity);
  };

  return (
    <>
      <ToggleGroup
        type="single"
        value={selectedRarity}
        onValueChange={handleRarityChange}
        className="justify-center"
      >
        <ToggleGroupItem value="limited" aria-label="Limited">
          Limited ({counts.limited})
        </ToggleGroupItem>
        <ToggleGroupItem value="rare" aria-label="Rare">
          Rare ({counts.rare})
        </ToggleGroupItem>
        <ToggleGroupItem value="super_rare" aria-label="Super Rare">
          Super Rare ({counts.superRare})
        </ToggleGroupItem>
        <ToggleGroupItem value="unique" aria-label="Unique">
          Unique ({counts.unique})
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="flex flex-wrap gap-2">
        {cards
          .filter((card: FootballCard) => card.rarity === selectedRarity)
          .map((card: FootballCard) => (
            <div key={card.objectID} className="flex flex-col">
              <span>{card.player.display_name}</span>
              <span>{card.position}</span>
              <span>
                {card.active_club.long_name} - {card.active_league.display_name}
              </span>
              <span>floor @ {card.floor / 100000} ETH</span>
              <span>bought @ {card.price / 100000} ETH</span>
            </div>
          ))}
      </div>

      <div>{JSON.stringify(cards, null, 2)}</div>
    </>
  );
}
