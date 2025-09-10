import { Document, model, models, ObjectId, Schema } from "mongoose";

export interface IParcours extends Document {
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
}

export interface ParcoursInterface {
  date: {
    start: string;
    end?: string;
  };
  title: string;
  subtitle: string;
}

export interface IParcoursDocument extends IParcours, Document {
  _id: ObjectId;
  __v: number;
}
const ParcoursSchema: Schema = new Schema({
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

export default models.Parcours || model<IParcours>("Parcours", ParcoursSchema);
