import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  unit: { type: String, default: "" },
  uploadedBy: { type: String, default: "Faculty" },
  date: { type: Date, default: Date.now },
  url: { type: String, default: "" }
}, { timestamps: true });

const syllabusSchema = new mongoose.Schema({
  course: { type: String, required: true },
  semester: { type: String, required: true },
  subjects: [{ type: String }],
  url: { type: String, default: "" }
}, { timestamps: true });

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, default: "TBA" },
  description: { type: String, default: "" }
}, { timestamps: true });

export const Note = mongoose.model("Note", noteSchema);
export const Syllabus = mongoose.model("Syllabus", syllabusSchema);
export const Event = mongoose.model("Event", eventSchema);

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export const Contact = mongoose.model("Contact", contactSchema);
