"use client";

import {
  createSkill,
  updateSkill,
  getSkillById,
} from "@/app/action/admin/skills";
import { SkillType } from "@/lib/models/Skill";
import { X, InfoCircle } from "iconoir-react";
import { useEffect, useState } from "react";

const SKILL_CATEGORIES = [
  "Language",
  "Framework",
  "Library",
  "Tool",
  "Database",
  "Cloud",
  "DevOps",
  "Testing",
  "Design",
  "Other",
];

export default function SkillForm({
  editingId,
  onCancel,
}: {
  editingId?: string | null;
  onCancel?: () => void;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState<SkillType>(SkillType.FRONT);
  const [icon, setIcon] = useState("");
  const [level, setLevel] = useState(3);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Charger les données en mode édition
  useEffect(() => {
    if (editingId) {
      loadSkillData(editingId);
    } else {
      resetForm();
    }
  }, [editingId]);

  async function loadSkillData(id: string) {
    setIsLoadingData(true);
    try {
      const skill = await getSkillById(id);
      if (skill) {
        setName(skill.name);
        setType(skill.type);
        setIcon(skill.icon);
        setLevel(skill.level || 3);
        setCategory(skill.category || "");
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la compétence:", error);
      alert("Erreur lors du chargement de la compétence");
    } finally {
      setIsLoadingData(false);
    }
  }

  function resetForm() {
    setName("");
    setType(SkillType.FRONT);
    setIcon("");
    setLevel(3);
    setCategory("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const skillData = {
        name: name.trim(),
        type,
        icon: icon.trim(),
        level,
        category: category.trim() || undefined,
      };

      if (editingId) {
        await updateSkill(editingId, skillData);
        alert("Compétence modifiée avec succès !");
        onCancel?.();
      } else {
        await createSkill(skillData);
        alert("Compétence créée avec succès !");
        resetForm();
      }

      window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'enregistrement de la compétence");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoadingData) {
    return (
      <div className="p-6 border border-neutral-3 rounded-lg bg-white">
        <p className="text-center text-neutral-6">Chargement...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border border-neutral-3 rounded-lg bg-white space-y-4 shadow-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral-8">
          {editingId ? "Modifier la compétence" : "Ajouter une compétence"}
        </h3>
        {editingId && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-neutral-6 hover:text-neutral-8"
          >
            <X width={24} height={24} />
          </button>
        )}
      </div>

      {/* Nom */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Nom de la compétence *
        </label>
        <input
          type="text"
          value={name}
          placeholder="React, TypeScript, Docker..."
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={50}
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Type *
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as SkillType)}
          required
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        >
          <option value={SkillType.FRONT}>Frontend</option>
          <option value={SkillType.BACK}>Backend</option>
          <option value={SkillType.OTHER}>Autre</option>
        </select>
      </div>

      {/* Catégorie */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Catégorie
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        >
          <option value="">Sélectionner une catégorie</option>
          {SKILL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Niveau */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Niveau de maîtrise *
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="5"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="flex-1 h-2 bg-neutral-2 rounded-lg appearance-none cursor-pointer accent-accent-6"
          />
          <span className="text-lg font-semibold text-accent-6 min-w-[3ch]">
            {level}/5
          </span>
        </div>
        <div className="flex justify-between text-xs text-neutral-5 mt-1">
          <span>Débutant</span>
          <span>Intermédiaire</span>
          <span>Expert</span>
        </div>
      </div>

      {/* Icône */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Icône (Iconoir) *
        </label>
        <input
          type="text"
          value={icon}
          placeholder="react, typescript, docker..."
          onChange={(e) =>
            setIcon(e.target.value.toLowerCase().replace(/[^a-z-]/g, ""))
          }
          required
          pattern="[a-z-]+"
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        />
        <div className="flex items-start gap-2 mt-2 p-3 bg-blue-50 rounded">
          <InfoCircle
            width={16}
            height={16}
            className="text-blue-600 mt-0.5 flex-shrink-0"
          />
          <p className="text-xs text-blue-700">
            Utilisez le nom de l&#39;icône depuis{" "}
            <a
              href="https://iconoir.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-900"
            >
              iconoir.com
            </a>{" "}
            (ex: react, css-3, github, figma)
          </p>
        </div>
        {icon && (
          <div className="mt-3 p-3 border border-neutral-3 rounded bg-neutral-1">
            <p className="text-xs text-neutral-6 mb-2">Prévisualisation :</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-1 rounded flex items-center justify-center">
                <span className="text-accent-6 text-xs font-mono">{icon}</span>
              </div>
              <code className="text-sm text-neutral-7">
                &lt;{icon.charAt(0).toUpperCase() + icon.slice(1)} /&gt;
              </code>
            </div>
          </div>
        )}
      </div>

      {/* Boutons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-accent-6 text-white px-6 py-2 rounded hover:bg-accent-7 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? "Enregistrement..." : editingId ? "Modifier" : "Créer"}
        </button>
        {editingId && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="border border-neutral-3 text-neutral-7 px-6 py-2 rounded hover:bg-neutral-1 disabled:opacity-50"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
