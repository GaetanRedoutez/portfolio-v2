/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

export enum SkillType {
  FRONT = "FRONT",
  BACK = "BACK",
  OTHER = "OTHER",
}

export interface SkillInput {
  name: string;
  type: SkillType;
  icon: string;
  level?: number;
  category?: string;
  slug?: string;
}

export interface ISkill {
  _id: string;
  name: string;
  slug: string;
  type: SkillType;
  icon: string;
  level?: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISkillDocument
  extends Omit<ISkill, "_id">,
    mongoose.Document {}

const SkillSchema = new mongoose.Schema<ISkillDocument>(
  {
    name: {
      type: String,
      required: [true, "Le nom de la compétence est requis"],
      trim: true,
      maxlength: [50, "Le nom ne peut pas dépasser 50 caractères"],
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: {
        values: Object.values(SkillType),
        message: "{VALUE} n'est pas un type valide",
      },
      required: [true, "Le type est requis"],
      index: true,
    },
    icon: {
      type: String,
      required: [true, "L'icône est requise"],
      trim: true,
      validate: {
        validator: (v: string) => /^[a-zA-Z-]+$/.test(v),
        message:
          "Le nom de l'icône doit être valide (lettres et tirets uniquement)",
      },
    },
    level: {
      type: Number,
      min: [1, "Le niveau doit être entre 1 et 5"],
      max: [5, "Le niveau doit être entre 1 et 5"],
      default: 3,
    },
    category: {
      type: String,
      trim: true,
      enum: {
        values: [
          "Language",
          "Framework",
          "Library",
          "Tool",
          "Database",
          "Cloud",
          "DevOps",
          "Testing",
          "Design",
          "Other",
        ],
        message: "{VALUE} n'est pas une catégorie valide",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret._id = ret._id.toString();
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  }
);

// Slug automatique
SkillSchema.pre<ISkillDocument>("save", function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = generateSlug(this.name);
  }
  next();
});

// Gestion des doublons de slug
SkillSchema.pre<ISkillDocument>("save", async function (next) {
  if (this.isNew || this.isModified("slug")) {
    const slugRegex = new RegExp(`^${this.slug}(-[0-9]+)?$`, "i");
    const skillsWithSlug = await (
      this.constructor as mongoose.Model<ISkillDocument>
    ).find({
      slug: slugRegex,
      _id: { $ne: this._id },
    });

    if (skillsWithSlug.length > 0) {
      this.slug = `${this.slug}-${skillsWithSlug.length + 1}`;
    }
  }
  next();
});

SkillSchema.index({ type: 1, name: 1 });
SkillSchema.index({ type: 1, level: -1 });
SkillSchema.index({ name: "text" });

SkillSchema.statics.findByType = function (type: SkillType) {
  return this.find({ type }).sort({ level: -1, name: 1 });
};

SkillSchema.statics.findBySlug = function (slug: string) {
  return this.findOne({ slug });
};

SkillSchema.statics.findByCategory = function (category: string) {
  return this.find({ category }).sort({ level: -1, name: 1 });
};

SkillSchema.statics.findTopSkills = function (limit = 10) {
  return this.find().sort({ level: -1, name: 1 }).limit(limit);
};

SkillSchema.virtual("typeLabel").get(function (this: ISkillDocument) {
  const labels: Record<SkillType, string> = {
    [SkillType.FRONT]: "Frontend",
    [SkillType.BACK]: "Backend",
    [SkillType.OTHER]: "Autre",
  };
  return labels[this.type];
});

SkillSchema.virtual("url").get(function (this: ISkillDocument) {
  return `/skills/${this.slug}`;
});

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const Skill =
  (mongoose.models && mongoose.models.Skill) ||
  mongoose.model<ISkillDocument>("Skill", SkillSchema);

export default Skill;
