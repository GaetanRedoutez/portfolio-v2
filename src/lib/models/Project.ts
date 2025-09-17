import mongoose from "mongoose";

export interface ProjectInterface {
  title: string;
  slug?: string;
  description: string;
  stack: string;
  tech: string[];
  github?: string;
  demo?: string;
  images: string[];
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProject extends mongoose.Document {
  title: string;
  slug?: string;
  description: string;
  stack: string;
  tech: string[];
  github?: string;
  demo?: string;
  images: string[];
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new mongoose.Schema<IProject>(
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
      maxlength: [1000, "La description ne peut pas dépasser 1000 caractères"],
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

// Middleware pour générer le slug automatiquement
ProjectSchema.pre<IProject>("save", function (next) {
  if (this.isNew || this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
      .replace(/[^a-z0-9\s-]/g, "") // Supprimer les caractères spéciaux
      .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
      .replace(/-+/g, "-") // Supprimer les tirets multiples
      .replace(/^-+|-+$/g, ""); // Supprimer les tirets en début/fin
  }
  next();
});

// Index pour la recherche
ProjectSchema.index({ title: "text", description: "text" });
ProjectSchema.index({ featured: 1, createdAt: -1 });

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
