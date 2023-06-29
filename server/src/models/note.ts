import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    uid: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("note", noteSchema);

export default Note;
