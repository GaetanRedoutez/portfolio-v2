/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

// Interface de base pour la création (sans _id, sans slug)
export interface ParcoursInput {
  date: {
    start: string;
    end?: string;
  };
  title: {
    fr: string;
    en: string;
  };
  subtitle: {
    fr: string;
    en: string;
  };
  description?: {
    fr: string;
    en: string;
  };
  company?: string;
  location?: string;
  type?: "education" | "experience" | "certification";
  skills?: string[]; // IDs des compétences liées
  current?: boolean; // Poste actuel
  slug?: string; // Optionnel à la création, généré automatiquement
}

// Interface complète avec _id pour les données récupérées
export interface IParcours extends Required<Pick<ParcoursInput, "slug">> {
  _id: string;
  date: {
    start: string;
    end?: string;
  };
  title: {
    fr: string;
    en: string;
  };
  subtitle: {
    fr: string;
    en: string;
  };
  description?: {
    fr: string;
    en: string;
  };
  company?: string;
  location?: string;
  type: "education" | "experience" | "certification";
  skills?: string[];
  current?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour le document Mongoose
export interface IParcoursDocument
  extends Omit<IParcours, "_id">,
    mongoose.Document {}

const ParcoursSchema = new mongoose.Schema<IParcoursDocument>(
  {
    date: {
      start: {
        type: String,
        required: [true, "La date de début est requise"],
        validate: {
          validator: function (v: string) {
            // Format: YYYY-MM ou YYYY
            return /^\d{4}(-\d{2})?$/.test(v);
          },
          message: "Format de date invalide (utilisez YYYY-MM ou YYYY)",
        },
      },
      end: {
        type: String,
        validate: {
          validator: function (v: string) {
            if (!v) return true;
            return /^\d{4}(-\d{2})?$/.test(v);
          },
          message: "Format de date invalide (utilisez YYYY-MM ou YYYY)",
        },
      },
    },
    title: {
      fr: {
        type: String,
        required: [true, "Le titre en français est requis"],
        trim: true,
        maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
      },
      en: {
        type: String,
        required: [true, "Le titre en anglais est requis"],
        trim: true,
        maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
      },
    },
    subtitle: {
      fr: {
        type: String,
        required: [true, "Le sous-titre en français est requis"],
        trim: true,
        maxlength: [200, "Le sous-titre ne peut pas dépasser 200 caractères"],
      },
      en: {
        type: String,
        required: [true, "Le sous-titre en anglais est requis"],
        trim: true,
        maxlength: [200, "Le sous-titre ne peut pas dépasser 200 caractères"],
      },
    },
    description: {
      fr: {
        type: String,
        trim: true,
        maxlength: [
          2000,
          "La description ne peut pas dépasser 2000 caractères",
        ],
      },
      en: {
        type: String,
        trim: true,
        maxlength: [
          2000,
          "La description ne peut pas dépasser 2000 caractères",
        ],
      },
    },
    company: {
      type: String,
      trim: true,
      maxlength: [
        100,
        "Le nom de l'entreprise ne peut pas dépasser 100 caractères",
      ],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, "La localisation ne peut pas dépasser 100 caractères"],
    },
    type: {
      type: String,
      enum: {
        values: ["education", "experience", "certification"],
        message: "{VALUE} n'est pas un type valide",
      },
      default: "experience",
      index: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    current: {
      type: Boolean,
      default: false,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc: any, ret: any) {
        ret._id = ret._id.toString();
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

// Middleware pour générer le slug automatiquement
ParcoursSchema.pre<IParcoursDocument>("save", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = generateSlug(`${this.title.fr}-${this.date.start}`);
  }
  next();
});

// Middleware pour gérer les duplications de slug
ParcoursSchema.pre<IParcoursDocument>("save", async function (next) {
  if (this.isNew || this.isModified("slug")) {
    const slugRegex = new RegExp(`^${this.slug}(-[0-9]+)?$`, "i");
    const parcoursWithSlug = await mongoose.models.Parcours.find({
      slug: slugRegex,
      _id: { $ne: this._id },
    });

    if (parcoursWithSlug.length > 0) {
      this.slug = `${this.slug}-${parcoursWithSlug.length + 1}`;
    }
  }
  next();
});

// Index composés pour optimiser les requêtes
ParcoursSchema.index({ "date.start": -1 });
ParcoursSchema.index({ type: 1, "date.start": -1 });
ParcoursSchema.index({ current: 1, "date.start": -1 });
ParcoursSchema.index({ slug: 1 });
ParcoursSchema.index({ "title.fr": "text", "title.en": "text" });

// Méthodes statiques utiles
ParcoursSchema.statics.findByType = function (type: string) {
  return this.find({ type }).sort({ "date.start": -1 });
};

ParcoursSchema.statics.findCurrent = function () {
  return this.find({ current: true }).sort({ "date.start": -1 });
};

ParcoursSchema.statics.findBySlug = function (slug: string) {
  return this.findOne({ slug });
};

ParcoursSchema.statics.findByYear = function (year: string) {
  return this.find({
    "date.start": { $regex: `^${year}` },
  }).sort({ "date.start": -1 });
};

// Méthode virtuelle pour obtenir la durée
ParcoursSchema.virtual("duration").get(function (this: IParcoursDocument) {
  if (!this.date.end && !this.current) return null;

  const start = new Date(this.date.start);
  const end = this.date.end ? new Date(this.date.end) : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${months} mois`;
  if (remainingMonths === 0) return `${years} an${years > 1 ? "s" : ""}`;
  return `${years} an${years > 1 ? "s" : ""} ${remainingMonths} mois`;
});

// Méthode virtuelle pour obtenir le label du type
ParcoursSchema.virtual("typeLabel").get(function (this: IParcoursDocument) {
  const labels: Record<string, { fr: string; en: string }> = {
    education: { fr: "Formation", en: "Education" },
    experience: { fr: "Expérience", en: "Experience" },
    certification: { fr: "Certification", en: "Certification" },
  };
  return labels[this.type || "experience"];
});

// Méthode virtuelle pour obtenir l'URL
ParcoursSchema.virtual("url").get(function (this: IParcoursDocument) {
  return `/parcours/${this.slug}`;
});

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const Parcours =
  mongoose.models.Parcours ||
  mongoose.model<IParcoursDocument>("Parcours", ParcoursSchema);

export default Parcours;
