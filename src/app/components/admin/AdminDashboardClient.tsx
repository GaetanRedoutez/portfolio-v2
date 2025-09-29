"use client";

import { IParcours } from "@/lib/models/Parcours";
import { IProject } from "@/lib/models/Project";
import { ISkill } from "@/lib/models/Skill";
import {
  Calendar,
  Code,
  MultiplePages,
  Search,
  Trash,
  EditPencil,
} from "iconoir-react";
import { useState } from "react";
import ParcoursForm from "./form/ParcoursForm";
import ProjectForm from "./form/ProjectsForm";
import SkillForm from "./form/SkillsForm";
import { deleteProject } from "@/app/action/admin/projects";
import { deleteSkill } from "@/app/action/admin/skills";
import { deleteParcours } from "@/app/action/admin/parcours";

type TabType = "projects" | "skills" | "parcours";

interface Props {
  projects: IProject[];
  skills: ISkill[];
  parcours: IParcours[];
}

export default function AdminDashboardClient({
  projects,
  skills,
  parcours,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSkills = skills.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredParcours = parcours.filter(
    (p) =>
      p.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (type: TabType, id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;

    setIsDeleting(id);
    try {
      if (type === "projects") {
        await deleteProject(id);
      } else if (type === "skills") {
        await deleteSkill(id);
      } else if (type === "parcours") {
        await deleteParcours(id);
      }
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (id: string) => {
    setEditingItem(id);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-neutral-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-8 mb-2">
            Administration
          </h1>
          <p className="text-neutral-6">
            Gérez vos projets, compétences et parcours
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-common-1 rounded-lg shadow-sm mb-6">
          <div className="border-b border-neutral-2">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "projects", label: "Projets", icon: MultiplePages },
                { id: "skills", label: "Compétences", icon: Code },
                { id: "parcours", label: "Parcours", icon: Calendar },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-accent-6 text-accent-6"
                      : "border-transparent text-neutral-6 hover:text-neutral-8"
                  }`}
                >
                  <tab.icon width={18} height={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-5"
                  width={20}
                  height={20}
                />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-neutral-3 rounded-md focus:ring-2 focus:ring-accent-6 focus:border-transparent"
                />
              </div>
            </div>

            {/* Projets */}
            {activeTab === "projects" && (
              <div className="grid gap-4">
                <ProjectForm
                  editingId={editingItem}
                  onCancel={handleCancelEdit}
                />
                {filteredProjects.map((project) => (
                  <div
                    key={project._id}
                    className="p-4 border border-neutral-3 rounded-md bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-neutral-8">
                          {project.title}
                        </h3>
                        <p className="text-neutral-6 mt-1">
                          {project.description}
                        </p>
                        {project.tech && project.tech.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.tech.map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-accent-1 text-accent-7 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(project._id)}
                          className="p-2 text-neutral-6 hover:text-accent-6 hover:bg-accent-1 rounded transition-colors"
                          title="Modifier"
                        >
                          <EditPencil width={18} height={18} />
                        </button>
                        <button
                          onClick={() => handleDelete("projects", project._id)}
                          disabled={isDeleting === project._id}
                          className="p-2 text-neutral-6 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          <Trash width={18} height={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Compétences */}
            {activeTab === "skills" && (
              <div className="grid gap-4">
                <SkillForm
                  editingId={editingItem}
                  onCancel={handleCancelEdit}
                />
                {filteredSkills.map((skill) => (
                  <div
                    key={skill._id}
                    className="p-4 border border-neutral-3 rounded-md bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-neutral-8">
                          {skill.name}
                        </h3>
                        {skill.category && (
                          <span className="text-sm text-neutral-6 mt-1">
                            {skill.category}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(skill._id)}
                          className="p-2 text-neutral-6 hover:text-accent-6 hover:bg-accent-1 rounded transition-colors"
                          title="Modifier"
                        >
                          <EditPencil width={18} height={18} />
                        </button>
                        <button
                          onClick={() => handleDelete("skills", skill._id)}
                          disabled={isDeleting === skill._id}
                          className="p-2 text-neutral-6 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          <Trash width={18} height={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Parcours */}
            {activeTab === "parcours" && (
              <div className="grid gap-4">
                <ParcoursForm
                  editingId={editingItem}
                  onCancel={handleCancelEdit}
                />
                {filteredParcours.map((parc) => (
                  <div
                    key={parc._id}
                    className="p-4 border border-neutral-3 rounded-md bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-neutral-8">
                          {parc.title.fr} / {parc.title.en}
                        </h3>
                        <p className="text-neutral-6 mt-1">
                          {parc.subtitle.fr}
                        </p>
                        <p className="text-sm text-neutral-5 mt-1">
                          {parc.date.start} - {parc.date.end || "Présent"}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(parc._id)}
                          className="p-2 text-neutral-6 hover:text-accent-6 hover:bg-accent-1 rounded transition-colors"
                          title="Modifier"
                        >
                          <EditPencil width={18} height={18} />
                        </button>
                        <button
                          onClick={() => handleDelete("parcours", parc._id)}
                          disabled={isDeleting === parc._id}
                          className="p-2 text-neutral-6 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          <Trash width={18} height={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
