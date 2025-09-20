import { Document, model, models, ObjectId, Schema } from "mongoose";

enum SkillType {
  FRONT = "FRONT",
  BACK = "BACK",
  OTHER = "OTHER",
}
export interface ISkill extends Document {
  name: string;
  type: SkillType;
  icon: string; // nom de l'icône de iconoir
}

export interface SkillInterface {
  name: string;
  type: SkillType;
  icon: string;
}

export interface ISkillDocument extends ISkill, Document {
  _id: ObjectId;
  __v: number;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["FRONT", "BACK", "OTHER"],
    required: true,
  },
  icon: { type: String, required: true },
});

export default models.Skills || model<ISkill>("Skills", SkillSchema);
