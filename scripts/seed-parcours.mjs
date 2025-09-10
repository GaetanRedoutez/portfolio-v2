import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connexion MongoDB réussie !");

    const ParcoursSchema = new mongoose.Schema({
      date: {
        start: { type: String, required: true },
        end: { type: String },
      },
      title: {
        fr: { type: String, required: true },
        en: { type: String, required: true },
      },
      subtitle: {
        fr: { type: String, required: true },
        en: { type: String, required: true },
      },
    });

    const Parcours = mongoose.model("Parcours", ParcoursSchema);

    await Parcours.deleteMany({});

    await Parcours.insertMany([
      {
        date: { start: "2018", end: "2023" },
        title: { fr: "Automaticien", en: "Automation Technician" },
        subtitle: {
          fr: "Programmation et automatisation",
          en: "Programming and automation",
        },
      },
      {
        date: { start: "2020", end: "2023" },
        title: { fr: "Début en développement", en: "Started coding" },
        subtitle: {
          fr: "Formation autodidacte et premiers projets personnels",
          en: "Self-learning and first personal projects",
        },
      },
      {
        date: { start: "2023", end: "2024" },
        title: {
          fr: "Formation développeur web",
          en: "Web developer training",
        },
        subtitle: {
          fr: "Formation OpenClassrooms",
          en: "OpenClassrooms training",
        },
      },
      {
        date: { start: "2024" },
        title: {
          fr: "Alternance développeur web",
          en: "Web developer apprenticeship",
        },
        subtitle: {
          fr: "Créations d'applications web React, Next.js et Java",
          en: "Building web apps with React, Next.js and Java",
        },
      },
    ]);
    console.log("✅ Données insérées !");
  } catch (error) {
    console.error("❌ Erreur de connexion :", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
