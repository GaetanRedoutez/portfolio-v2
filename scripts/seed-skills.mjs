import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });
const MONGODB_URI = process.env.MONGODB_URI;

const skills = [
  { name: "JavaScript", type: "FRONT", icon: "Javascript" },
  { name: "TypeScript", type: "FRONT", icon: "TypeScript" },
  { name: "React", type: "FRONT", icon: "React" },
  { name: "Next.js", type: "FRONT", icon: "Nextjs" },
  { name: "Node.js", type: "BACK", icon: "Nodejs" },
  { name: "TailwindCSS", type: "FRONT", icon: "Tailwind" },
  { name: "MongoDB", type: "BACK", icon: "MongoDB" },
  { name: "Git", type: "OTHER", icon: "Git" },
];

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["FRONT", "BACK", "OTHER"],
    required: true,
  },
  icon: { type: String, required: true },
});

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connexion MongoDB réussie !");

    // vider la collection avant d’insérer
    const Skills = mongoose.model("Skills", SkillSchema);

    await Skills.deleteMany({});
    console.log("🗑 Collection Skills vidée");

    // insérer
    await Skills.insertMany(skills);
    console.log("🌱 Skills insérées avec succès !");
  } catch (err) {
    console.error("❌ Erreur lors du seed :", err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
