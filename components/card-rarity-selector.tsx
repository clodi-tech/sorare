"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type CardRarity = "limited" | "rare" | "super_rare" | "unique";

interface FootballCard {
  objectID: string;
  rarity: string;
  in_season_eligible: boolean;
  pictureUrl: string;
  price: number;
  floor: number;
  pnl: number;
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
  const [selectedRarities, setSelectedRarities] = useState<CardRarity[]>([
    "limited",
  ]);

  const handleRarityChange = (values: string[]) => {
    if (values.length === 0) {
      return;
    } else {
      setSelectedRarities(values as CardRarity[]);
    }
  };

  return (
    <>
      <ToggleGroup
        type="multiple"
        value={selectedRarities}
        onValueChange={handleRarityChange}
        className="justify-center"
      >
        <ToggleGroupItem
          value="limited"
          aria-label="Limited"
          disabled={counts.limited === 0}
        >
          Limited ({counts.limited})
        </ToggleGroupItem>
        <ToggleGroupItem
          value="rare"
          aria-label="Rare"
          disabled={counts.rare === 0}
        >
          Rare ({counts.rare})
        </ToggleGroupItem>
        <ToggleGroupItem
          value="super_rare"
          aria-label="Super Rare"
          disabled={counts.superRare === 0}
        >
          Super Rare ({counts.superRare})
        </ToggleGroupItem>
        <ToggleGroupItem
          value="unique"
          aria-label="Unique"
          disabled={counts.unique === 0}
        >
          Unique ({counts.unique})
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="flex flex-wrap gap-2">
        {cards
          .filter((card: FootballCard) =>
            selectedRarities.includes(card.rarity as CardRarity)
          )
          .map((card: FootballCard) => (
            <Card key={card.objectID} className="flex flex-col">
              <CardHeader>
                <CardTitle>
                  {card.player.display_name} - {card.position}{" "}
                  {card.in_season_eligible && " 2425"}
                </CardTitle>
                <CardDescription>
                  {card.active_club.long_name || "Unknown Club"} -{" "}
                  {card.active_league.display_name || "Unknown League"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                <span>floor @ {card.floor / 100000} ETH</span>
                <span>bought @ {card.price / 100000} ETH</span>
              </CardContent>
              <CardFooter className="flex gap-1">
                <span className="font-medium">pnl</span>
                <span
                  className="font-medium"
                  style={{
                    color: card.pnl > 0 ? "green" : "red",
                  }}
                >
                  {card.pnl}%
                </span>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
}
