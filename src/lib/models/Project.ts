/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

// Interface de base pour la création (sans _id, sans slug)
export interface ProjectInput {
  title: string;
  slug?: string; // Optionnel à la création, généré automatiquement
  description: string;
  stack: string;
  tech: string[];
  github?: string;
  demo?: string;
  images: string[];
  featured?: boolean;
}

// Interface complète avec _id pour les données récupérées
export interface IProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  stack: string;
  tech: string[];
  github?: string;
  demo?: string;
  images: string[];
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour le document Mongoose
export interface IProjectDocument
  extends Omit<IProject, "_id">,
    mongoose.Document {}

const ProjectSchema = new mongoose.Schema<IProjectDocument>(
  {
    title: {
      type: String,
      required: [true, "Le titre du projet est requis"],
      trim: true,
      maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
      index: true, // Index simple pour les recherches
    },
    slug: {
      type: String,
      unique: true,
      sparse: true, // Permet les valeurs null/undefined multiples
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
      maxlength: [2000, "La description ne peut pas dépasser 2000 caractères"],
    },
    stack: {
      type: String,
      required: [true, "Le stack est requis"],
      trim: true,
      enum: {
        values: [
          "Frontend",
          "Backend",
          "Fullstack",
          "Mobile",
          "DevOps",
          "Data",
          "Other",
        ],
        message: "{VALUE} n'est pas un stack valide",
      },
    },
    tech: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: "Au moins une technologie doit être spécifiée",
      },
    },
    github: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true; // Optionnel
          return /^https:\/\/(www\.)?github\.com\/.+\/.+$/.test(v);
        },
        message: "L'URL GitHub doit être valide (https://github.com/user/repo)",
      },
    },
    demo: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true; // Optionnel
          return /^https?:\/\/.+\..+$/.test(v);
        },
        message: "L'URL de démonstration doit être valide",
      },
    },
    images: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.every(
            (url) => /^https?:\/\/.+/.test(url) || url.startsWith("/")
          );
        },
        message: "Toutes les URLs d'images doivent être valides",
      },
    },
    featured: {
      type: Boolean,
      default: false,
      index: true, // Index pour filtrer rapidement les projets mis en avant
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc: any, ret: any) {
        ret._id = ret._id.toString(); // Convertir ObjectId en string
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_doc: any, ret: any) {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  }
);

// Middleware pour générer le slug automatiquement si non fourni
ProjectSchema.pre<IProjectDocument>("save", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
  next();
});

// Middleware pour gérer les duplications de slug
ProjectSchema.pre<IProjectDocument>("save", async function (next) {
  if (this.isNew || this.isModified("slug")) {
    const slugRegex = new RegExp(`^${this.slug}(-[0-9]+)?$`, "i");
    const projectsWithSlug = await mongoose.models.Project.find({
      slug: slugRegex,
      _id: { $ne: this._id },
    });

    if (projectsWithSlug.length > 0) {
      this.slug = `${this.slug}-${projectsWithSlug.length + 1}`;
    }
  }
  next();
});

// Index composé pour optimiser les requêtes fréquentes
ProjectSchema.index({ featured: 1, createdAt: -1 });
ProjectSchema.index({ slug: 1 }); // Unique index pour les recherches par slug
ProjectSchema.index({ title: "text", description: "text" }); // Full-text search

// Méthodes statiques utiles
ProjectSchema.statics.findBySlug = function (slug: string) {
  return this.findOne({ slug });
};

ProjectSchema.statics.findFeatured = function () {
  return this.find({ featured: true }).sort({ createdAt: -1 });
};

ProjectSchema.statics.findByTech = function (tech: string) {
  return this.find({ tech: { $in: [tech] } }).sort({ createdAt: -1 });
};

// Méthode virtuelle pour obtenir l'URL complète du projet
ProjectSchema.virtual("url").get(function (this: IProjectDocument) {
  return `/projects/${this.slug}`;
});

// Fonction utilitaire pour générer un slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^a-z0-9\s-]/g, "") // Supprimer les caractères spéciaux
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .replace(/-+/g, "-") // Supprimer les tirets multiples
    .replace(/^-+|-+$/g, ""); // Supprimer les tirets en début/fin
}

const Project =
  mongoose.models.Project ||
  mongoose.model<IProjectDocument>("Project", ProjectSchema);

export default Project;
