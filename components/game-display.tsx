"use client";

import { Game } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameDisplayProps {
  game: Game;
}

export function GameDisplay({ game }: GameDisplayProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{game.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-4">
          <p className="text-muted-foreground">{game.description}</p>
          {game.strategy_tips && (
            <div>
              <h3 className="font-semibold mb-2">Strategy Tips</h3>
              <p className="text-muted-foreground">{game.strategy_tips}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Difficulty:</span>
            <span className="text-sm text-muted-foreground">
              {"★".repeat(game.difficulty)}
              {"☆".repeat(5 - game.difficulty)}
            </span>
          </div>
        </div>
        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border bg-muted">
          <iframe
            src={game.embed_url}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CardContent>
    </Card>
  );
}