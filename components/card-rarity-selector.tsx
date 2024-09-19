"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";

type CardRarity = "limited" | "rare" | "super_rare" | "unique";

interface FootballCard {
  slug: string;
  averageScore: number;
  rarity: string;
  inSeasonEligible: boolean;
  pictureUrl: string;
  price: number;
  player: {
    slug: string;
    displayName: string;
    position: string;
  };
}

export function CardRaritySelectorComponent({
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
            <div key={card.slug}>
              <Image
                src={card.pictureUrl}
                alt={card.player.displayName}
                width={77.1}
                height={124.8}
              />
              <h2>{card.price / 100000} ETH</h2>
            </div>
          ))}
      </div>
    </>
  );
}
