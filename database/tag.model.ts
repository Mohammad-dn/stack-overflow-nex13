import { Schema, model, models, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  question: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdon: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  question: [{ type: Schema.Types.ObjectId, ref: "Question" }], // Assuming 'Question' is another mongoose model
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Assuming 'User' is another mongoose model
  createdon: { type: Date, default: Date.now },
});
const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
