"use server";

import dbConnect from "@/lib/db";
import Parcours, { ParcoursInput } from "@/lib/models/Parcours";

export async function createParcours(data: ParcoursInput) {
  await dbConnect();
  const parcours = new Parcours(data);
  await parcours.save();
  return JSON.parse(JSON.stringify(parcours.toObject()));
}

export async function updateParcours(id: string, data: Partial<ParcoursInput>) {
  await dbConnect();
  const updated = await Parcours.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  return JSON.parse(JSON.stringify(updated));
}

export async function deleteParcours(id: string) {
  await dbConnect();
  await Parcours.findByIdAndDelete(id);
  return { success: true };
}

export async function getAllParcours() {
  await dbConnect();
  const parcours = await Parcours.find({}).sort({ "date.start": -1 }).lean();
  return JSON.parse(JSON.stringify(parcours));
}

export async function getParcoursById(id: string) {
  await dbConnect();
  const parcours = await Parcours.findById(id).lean();
  return JSON.parse(JSON.stringify(parcours));
}
