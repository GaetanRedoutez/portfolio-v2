"use client";

import {
  createProject,
  getProjectById,
  updateProject,
} from "@/app/action/admin/projects";
import { IProject } from "@/lib/models/Project";
import { X } from "iconoir-react";
import { useEffect, useState } from "react";

const STACK_OPTIONS = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
  "DevOps",
  "Data",
  "Other",
];

export default function ProjectForm({
  editingId,
  onCancel,
}: {
  editingId?: string | null;
  onCancel?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [tech, setTech] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    if (editingId) {
      loadProjectData(editingId);
    } else {
      resetForm();
    }
  }, [editingId]);

  async function loadProjectData(id: string) {
    setIsLoadingData(true);
    try {
      const project = (await getProjectById(id)) as IProject | null;
      if (project) {
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setTech(project.tech || []);
        setGithub(project.github || "");
        setDemo(project.demo || "");
        setImages(project.images || []);
        setFeatured(project.featured || false);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du projet:", error);
      alert("Erreur lors du chargement du projet");
    } finally {
      setIsLoadingData(false);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setStack("");
    setTech([]);
    setTechInput("");
    setGithub("");
    setDemo("");
    setImages([]);
    setImageInput("");
    setFeatured(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const projectData = {
        title,
        description,
        stack,
        tech: tech.filter((t) => t.trim() !== ""),
        github: github.trim() || undefined,
        demo: demo.trim() || undefined,
        images: images.filter((img) => img.trim() !== ""),
        featured,
      };

      if (editingId) {
        await updateProject(editingId, projectData);
        alert("Projet modifié avec succès !");
        onCancel?.();
      } else {
        await createProject(projectData);
        alert("Projet créé avec succès !");
        resetForm();
      }

      window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'enregistrement du projet");
    } finally {
      setIsLoading(false);
    }
  }

  function handleAddTech() {
    if (techInput.trim() && !tech.includes(techInput.trim())) {
      setTech([...tech, techInput.trim()]);
      setTechInput("");
    }
  }

  function handleRemoveTech(techToRemove: string) {
    setTech(tech.filter((t) => t !== techToRemove));
  }

  function handleAddImage() {
    if (imageInput.trim() && !images.includes(imageInput.trim())) {
      setImages([...images, imageInput.trim()]);
      setImageInput("");
    }
  }

  function handleRemoveImage(imageToRemove: string) {
    setImages(images.filter((img) => img !== imageToRemove));
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
          {editingId ? "Modifier le projet" : "Ajouter un projet"}
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

      {/* Titre */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Titre *
        </label>
        <input
          type="text"
          value={title}
          placeholder="Mon super projet"
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Description *
        </label>
        <textarea
          value={description}
          placeholder="Description détaillée du projet..."
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        />
      </div>

      {/* Stack */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Stack *
        </label>
        <select
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          required
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        >
          <option value="">Sélectionner un stack</option>
          {STACK_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Technologies *
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            placeholder="React, TypeScript, etc."
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddTech())
            }
            className="border border-neutral-3 p-2 flex-1 rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="bg-accent-6 text-white px-4 py-2 rounded hover:bg-accent-7"
          >
            Ajouter
          </button>
        </div>
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tech.map((t) => (
              <span
                key={t}
                className="bg-accent-1 text-accent-7 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {t}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(t)}
                  className="hover:text-accent-9"
                >
                  <X width={14} height={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* GitHub */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Lien GitHub
        </label>
        <input
          type="url"
          value={github}
          placeholder="https://github.com/username/repo"
          onChange={(e) => setGithub(e.target.value)}
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        />
      </div>

      {/* Démo */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Lien Démo
        </label>
        <input
          type="url"
          value={demo}
          placeholder="https://mon-projet.com"
          onChange={(e) => setDemo(e.target.value)}
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Images
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={imageInput}
            placeholder="https://example.com/image.jpg"
            onChange={(e) => setImageInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddImage())
            }
            className="border border-neutral-3 p-2 flex-1 rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-accent-6 text-white px-4 py-2 rounded hover:bg-accent-7"
          >
            Ajouter
          </button>
        </div>
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative group border border-neutral-3 rounded p-2 bg-neutral-1"
              >
                <p className="text-sm text-neutral-7 truncate">{img}</p>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X width={12} height={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 text-accent-6 border-neutral-3 rounded focus:ring-accent-6"
          />
          <span className="text-sm font-medium text-neutral-7">
            Projet mis en avant
          </span>
        </label>
      </div>

      {/* Boutons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading || tech.length === 0}
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
