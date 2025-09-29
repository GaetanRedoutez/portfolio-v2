"use client";

import {
  createParcours,
  updateParcours,
  getParcoursById,
} from "@/app/action/admin/parcours";
import { IParcours } from "@/lib/models/Parcours";
import { X, InfoCircle } from "iconoir-react";
import { useEffect, useState } from "react";

const PARCOURS_TYPES = [
  { value: "experience", label: "Expérience professionnelle" },
  { value: "education", label: "Formation / Éducation" },
  { value: "certification", label: "Certification" },
];

export default function ParcoursForm({
  editingId,
  onCancel,
}: {
  editingId?: string | null;
  onCancel?: () => void;
}) {
  const [titleFr, setTitleFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [subtitleFr, setSubtitleFr] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("experience");
  const [current, setCurrent] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Charger les données en mode édition
  useEffect(() => {
    if (editingId) {
      loadParcoursData(editingId);
    } else {
      resetForm();
    }
  }, [editingId]);

  async function loadParcoursData(id: string) {
    setIsLoadingData(true);
    try {
      const parcours = (await getParcoursById(id)) as IParcours | null;
      if (parcours) {
        setTitleFr(parcours.title.fr);
        setTitleEn(parcours.title.en);
        setSubtitleFr(parcours.subtitle.fr);
        setSubtitleEn(parcours.subtitle.en);
        setDescriptionFr(parcours.description?.fr || "");
        setDescriptionEn(parcours.description?.en || "");
        setDateStart(parcours.date.start);
        setDateEnd(parcours.date.end || "");
        setCompany(parcours.company || "");
        setLocation(parcours.location || "");
        setType(parcours.type || "experience");
        setCurrent(parcours.current || false);
        setSkills(parcours.skills || []);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du parcours:", error);
      alert("Erreur lors du chargement du parcours");
    } finally {
      setIsLoadingData(false);
    }
  }

  function resetForm() {
    setTitleFr("");
    setTitleEn("");
    setSubtitleFr("");
    setSubtitleEn("");
    setDescriptionFr("");
    setDescriptionEn("");
    setDateStart("");
    setDateEnd("");
    setCompany("");
    setLocation("");
    setType("experience");
    setCurrent(false);
    setSkills([]);
    setSkillInput("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const parcoursData = {
        title: {
          fr: titleFr.trim(),
          en: titleEn.trim(),
        },
        subtitle: {
          fr: subtitleFr.trim(),
          en: subtitleEn.trim(),
        },
        description:
          descriptionFr.trim() || descriptionEn.trim()
            ? {
                fr: descriptionFr.trim(),
                en: descriptionEn.trim(),
              }
            : undefined,
        date: {
          start: dateStart,
          end: current ? undefined : dateEnd || undefined,
        },
        company: company.trim() || undefined,
        location: location.trim() || undefined,
        type: type as "education" | "experience" | "certification",
        current,
        skills: skills.filter((s) => s.trim() !== ""),
        createdAt: editingId ? undefined : new Date(),
        updatedAt: editingId ? new Date() : undefined,
      };

      if (editingId) {
        await updateParcours(editingId, parcoursData);
        alert("Parcours modifié avec succès !");
        onCancel?.();
      } else {
        await createParcours(parcoursData);
        alert("Parcours créé avec succès !");
        resetForm();
      }

      window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'enregistrement du parcours");
    } finally {
      setIsLoading(false);
    }
  }

  function handleAddSkill() {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  }

  function handleRemoveSkill(skillToRemove: string) {
    setSkills(skills.filter((s) => s !== skillToRemove));
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
      className="p-6 border border-neutral-3 rounded-lg bg-white space-y-6 shadow-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-neutral-8">
          {editingId ? "Modifier le parcours" : "Ajouter un parcours"}
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

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Type *
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
        >
          {PARCOURS_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Titres FR/EN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Titre (Français) *
          </label>
          <input
            type="text"
            value={titleFr}
            placeholder="Développeur Full Stack"
            onChange={(e) => setTitleFr(e.target.value)}
            required
            maxLength={100}
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Titre (Anglais) *
          </label>
          <input
            type="text"
            value={titleEn}
            placeholder="Full Stack Developer"
            onChange={(e) => setTitleEn(e.target.value)}
            required
            maxLength={100}
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sous-titres FR/EN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Sous-titre (Français) *
          </label>
          <input
            type="text"
            value={subtitleFr}
            placeholder="Entreprise XYZ"
            onChange={(e) => setSubtitleFr(e.target.value)}
            required
            maxLength={200}
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Sous-titre (Anglais) *
          </label>
          <input
            type="text"
            value={subtitleEn}
            placeholder="XYZ Company"
            onChange={(e) => setSubtitleEn(e.target.value)}
            required
            maxLength={200}
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
        </div>
      </div>

      {/* Entreprise et Localisation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Entreprise / Organisation
          </label>
          <input
            type="text"
            value={company}
            placeholder="Google, Microsoft..."
            onChange={(e) => setCompany(e.target.value)}
            maxLength={100}
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Localisation
          </label>
          <input
            type="text"
            value={location}
            placeholder="Paris, France"
            onChange={(e) => setLocation(e.target.value)}
            maxLength={100}
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Date de début *
          </label>
          <input
            type="month"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            required
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Date de fin
          </label>
          <input
            type="month"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            disabled={current}
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent disabled:bg-neutral-2 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Poste actuel */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={current}
            onChange={(e) => {
              setCurrent(e.target.checked);
              if (e.target.checked) setDateEnd("");
            }}
            className="w-4 h-4 text-accent-6 border-neutral-3 rounded focus:ring-accent-6"
          />
          <span className="text-sm font-medium text-neutral-7">
            Poste / Formation actuel(le)
          </span>
        </label>
      </div>

      {/* Descriptions FR/EN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Description (Français)
          </label>
          <textarea
            value={descriptionFr}
            placeholder="Détails de vos missions et réalisations..."
            onChange={(e) => setDescriptionFr(e.target.value)}
            rows={4}
            maxLength={2000}
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-7 mb-1">
            Description (Anglais)
          </label>
          <textarea
            value={descriptionEn}
            placeholder="Details of your missions and achievements..."
            onChange={(e) => setDescriptionEn(e.target.value)}
            rows={4}
            maxLength={2000}
            className="border border-neutral-3 p-2 w-full rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
        </div>
      </div>

      {/* Compétences associées */}
      <div>
        <label className="block text-sm font-medium text-neutral-7 mb-1">
          Compétences associées
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            placeholder="React, Node.js, AWS..."
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddSkill())
            }
            className="border border-neutral-3 p-2 flex-1 rounded focus:ring-2 focus:ring-accent-6 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="bg-accent-6 text-white px-4 py-2 rounded hover:bg-accent-7"
          >
            Ajouter
          </button>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-accent-1 text-accent-7 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-accent-9"
                >
                  <X width={14} height={14} />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex items-start gap-2 mt-2 p-3 bg-blue-50 rounded">
          <InfoCircle
            width={16}
            height={16}
            className="text-blue-600 mt-0.5 flex-shrink-0"
          />
          <p className="text-xs text-blue-700">
            Ajoutez les compétences clés utilisées ou acquises pendant cette
            période
          </p>
        </div>
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
