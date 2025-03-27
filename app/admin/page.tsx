"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Game } from "../types";
import { GameForm } from "@/components/game-form";
import { format } from "date-fns";
import { toast } from "sonner";

export default function AdminPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .order("featured_date", { ascending: false });

    if (error) {
      console.error("Error fetching games:", error);
      return;
    }

    setGames(data || []);
  }

  function handleEdit(game: Game) {
    setSelectedGame(game);
    setIsEditing(true);
  }

  function handleCreate() {
    setSelectedGame(null);
    setIsEditing(true);
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Game Management</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          Add New Game
        </button>
      </div>

      {isEditing ? (
        <GameForm
          game={selectedGame}
          onClose={() => {
            setIsEditing(false);
            setSelectedGame(null);
            fetchGames();
          }}
        />
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Controls</th>
                <th>Difficulty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  <td>
                    {format(new Date(game.featured_date), "PPP")}
                  </td>
                  <td>{game.title}</td>
                  <td>{game.slug}</td>
                  <td className="truncate max-w-xs">
                    {game.description}
                  </td>
                  <td className="text-center">
                    {Array.isArray(game.controls) ? game.controls.length : 0}
                  </td>
                  <td>{"★".repeat(game.difficulty)}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEdit(game)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// 添加额外的样式
const style = {
  "dashboard-header": "flex justify-between items-center mb-6",
  "admin-table-container": "bg-white rounded-lg shadow overflow-hidden",
};