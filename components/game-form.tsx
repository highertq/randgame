"use client";

import { useState } from "react";
import { Game } from "@/app/types";
import { supabase } from "@/lib/supabase";
import { Trash } from "lucide-react";
import { toast } from "sonner";

// 定义游戏控制类型
type GameControl = {
  label: string;
  action: string;
};

interface GameFormProps {
  game?: Game | null;
  onClose: () => void;
}

export function GameForm({ game, onClose }: GameFormProps) {
  // 将游戏控制初始化为数组
  const initialControls = Array.isArray(game?.controls) 
    ? game.controls 
    : [
        { label: "Mouse", action: "Point and click to screw/unscrew bolts" },
        { label: "Touch", action: "Tap to screw/unscrew bolts" },
        { label: "Timer", action: "Watch the clock and plan your moves" },
        { label: "Power-ups", action: "Use special tools when available" }
      ];

  const [formData, setFormData] = useState({
    featured_date: game?.featured_date || new Date().toISOString().split("T")[0],
    title: game?.title || "",
    slug: game?.slug || "",
    description: game?.description || "",
    embed_url: game?.embed_url || "",
    strategy_tips: game?.strategy_tips || "",
    difficulty: game?.difficulty || 3,
  });

  // 添加对controls的管理状态
  const [controls, setControls] = useState<GameControl[]>(initialControls);

  // 更新表单数据
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "difficulty" ? parseInt(value) : value,
    });
  };

  // 添加新的控制项
  const addControl = () => {
    setControls([...controls, { label: "", action: "" }]);
  };

  // 更新特定控制项
  const updateControl = (index: number, field: 'label' | 'action', value: string) => {
    const updatedControls = [...controls];
    updatedControls[index][field] = value;
    setControls(updatedControls);
  };

  // 删除控制项
  const removeControl = (index: number) => {
    if (controls.length > 1) {
      setControls(controls.filter((_, i) => i !== index));
    } else {
      toast.error("You must have at least one control");
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 合并controls到formData
    const dataToSubmit = {
      ...formData,
      controls: controls,
    };

    const { error } = game
      ? await supabase
          .from("games")
          .update(dataToSubmit)
          .eq("id", game.id)
      : await supabase.from("games").insert([dataToSubmit]);

    if (error) {
      toast.error("Error saving game");
      console.error("Error saving game:", error);
      return;
    }

    toast.success("Game saved successfully");
    onClose();
  }

  return (
    <div className="admin-form-card">
      <div className="admin-form-header">
        <h2>{game ? "Edit Game" : "Add New Game"}</h2>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="featured_date">Featured Date</label>
          <input
            id="featured_date"
            name="featured_date"
            type="date"
            className="form-control"
            value={formData.featured_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            name="slug"
            className="form-control"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description || ""}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="embed_url">Game URL (embed)</label>
          <input
            id="embed_url"
            name="embed_url"
            className="form-control"
            value={formData.embed_url}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Controls Section */}
        <div className="controls-section">
          <div className="controls-header">
            <label>Game Controls</label>
            <button 
              type="button" 
              className="add-control-btn"
              onClick={addControl}
            >
              Add Control
            </button>
          </div>
          
          {controls.map((control, index) => (
            <div key={index} className="control-item">
              <div className="form-group">
                <label htmlFor={`control-label-${index}`}>Label</label>
                <input
                  id={`control-label-${index}`}
                  className="form-control"
                  value={control.label}
                  onChange={(e) => updateControl(index, 'label', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`control-action-${index}`}>Action</label>
                <input
                  id={`control-action-${index}`}
                  className="form-control"
                  value={control.action}
                  onChange={(e) => updateControl(index, 'action', e.target.value)}
                />
              </div>
              <button 
                type="button" 
                className="delete-control-btn"
                onClick={() => removeControl(index)}
                title="Remove control"
              >
                <Trash size={20} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="form-group">
          <label htmlFor="strategy_tips">Strategy Tips</label>
          <textarea
            id="strategy_tips"
            name="strategy_tips"
            className="form-control"
            value={formData.strategy_tips || ""}
            onChange={handleChange}
            rows={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty (1-5)</label>
          <input
            id="difficulty"
            name="difficulty"
            type="number"
            className="form-control"
            min="1"
            max="5"
            value={formData.difficulty}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}