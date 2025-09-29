"use server";

import dbConnect from "@/lib/db";
import Project, { ProjectInput } from "@/lib/models/Project";

export async function createProject(data: ProjectInput) {
  await dbConnect();
  const project = new Project(data);
  await project.save();
  return JSON.parse(JSON.stringify(project.toObject()));
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  await dbConnect();
  const updated = await Project.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteProject(id: string) {
  await dbConnect();
  await Project.findByIdAndDelete(id);
  return { success: true };
}

export async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function getProjectById(id: string) {
  await dbConnect();
  const project = await Project.findById(id).lean();
  return JSON.parse(JSON.stringify(project));
}
