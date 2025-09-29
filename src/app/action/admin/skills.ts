"use server";

import dbConnect from "@/lib/db";
import Skill, { SkillInput } from "@/lib/models/Skill";

export async function createSkill(data: SkillInput) {
  await dbConnect();
  const skill = new Skill(data);
  await skill.save();
  return JSON.parse(JSON.stringify(skill.toObject()));
}

export async function updateSkill(id: string, data: Partial<SkillInput>) {
  await dbConnect();
  const updated = await Skill.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteSkill(id: string) {
  await dbConnect();
  await Skill.findByIdAndDelete(id);
  return { success: true };
}

export async function getSkills() {
  await dbConnect();
  const skills = await Skill.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(skills));
}

export async function getSkillById(id: string) {
  await dbConnect();
  const skill = await Skill.findById(id).lean();
  return JSON.parse(JSON.stringify(skill));
}
