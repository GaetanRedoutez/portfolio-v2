import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connexion MongoDB réussie !");

    const ProjectSchema = new mongoose.Schema(
      {
        title: {
          type: String,
          required: [true, "Le titre du projet est requis"],
          trim: true,
          maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
        },
        slug: {
          type: String,
          required: [true, "Le slug est requis"],
          unique: true,
          trim: true,
          lowercase: true,
          match: [
            /^[a-z0-9-]+$/,
            "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets",
          ],
        },
        description: {
          type: String,
          required: [true, "La description du projet est requise"],
          trim: true,
          maxlength: [
            1000,
            "La description ne peut pas dépasser 1000 caractères",
          ],
        },
        stack: {
          type: String,
          trim: true,
        },
        tech: [
          {
            type: String,
            trim: true,
          },
        ],
        github: {
          type: String,
          trim: true,
          match: [
            /^https:\/\/(www\.)?github\.com\/.*$/,
            "L'URL GitHub doit être valide",
          ],
        },
        demo: {
          type: String,
          trim: true,
          match: [/^https?:\/\/.*$/, "L'URL de démonstration doit être valide"],
        },
        images: [
          {
            type: String,
            trim: true,
          },
        ],
        featured: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      }
    );

    const Projects = mongoose.model("Projects", ProjectSchema);

    await Projects.deleteMany({});

    await Projects.insertMany([
      {
        title: "Application E-commerce",
        slug: "application-ecommerce",
        description:
          "Plateforme e-commerce moderne avec panier, paiements et gestion des commandes",
        images: ["/pexels-pixabay-270632.jpg"],
        tech: ["React", "Node.js", "MongoDB"],
        stack: "Full-Stack",
        github: "https://github.com/tonprofil/mon-ecommerce",
        demo: "https://mon-ecommerce-demo.com",
        featured: true,
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
