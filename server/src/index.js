import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

import {
  noteController,
  syllabusController,
  eventController,
  contactController,
  questionPaperController,
  setServicesDbStatus
} from "./controllers/index.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded from the correct location
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Cloudinary Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "cse@123";
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors()); // Allow all for production or specify your Render URL
app.use(express.json());

// Multer Configuration
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  }
});

// Database Connection
async function connectDb() {
  if (!MONGODB_URI) {
    console.log("No MONGODB_URI found, using JSON fallback.");
    setServicesDbStatus(false);
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    setServicesDbStatus(true);
    console.log("🚀 Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("Falling back to JSON storage mode.");
    setServicesDbStatus(false);
  }
}

connectDb();

// Auth Routes
app.post("/api/login", (req, res) => {
  const { password } = req.body || {};
  if (password === ADMIN_TOKEN) {
    return res.json({ token: ADMIN_TOKEN });
  }
  res.status(401).json({ error: "Invalid admin credentials" });
});

// File Upload Endpoint
app.post("/api/upload", authMiddleware, (req, res, next) => {
  upload.single("pdf")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
  // Only use Cloudinary if the user actually added the keys in Render
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== "your_cloud_name_here") {
    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "cse_dept_uploads"
      });
      
      // Delete the local file after successful upload
      fs.unlinkSync(req.file.path);
      return res.json({ url: uploadResult.secure_url });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      try { fs.unlinkSync(req.file.path); } catch (e) {}
      return res.status(500).json({ error: `Cloudinary error: ${error.message || "Upload failed"}` });
    }
  } else {
    // If Cloudinary keys are not set, fallback to the original behavior (saving locally on Render)
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.json({ url: fileUrl });
  }
});

// Resources API
app.get("/api/notes", noteController.getAll);
app.post("/api/notes", authMiddleware, noteController.create);
app.delete("/api/notes/:id", authMiddleware, noteController.delete);

app.get("/api/syllabus", syllabusController.getAll);
app.post("/api/syllabus", authMiddleware, syllabusController.create);
app.delete("/api/syllabus/:id", authMiddleware, syllabusController.delete);

app.get("/api/events", eventController.getAll);
app.post("/api/events", authMiddleware, eventController.create);
app.delete("/api/events/:id", authMiddleware, eventController.delete);

app.post("/api/contact", contactController.create);
app.get("/api/contact", authMiddleware, contactController.getAll);

app.get("/api/question-papers", questionPaperController.getAll);
app.post("/api/question-papers", authMiddleware, questionPaperController.create);
app.delete("/api/question-papers/:id", authMiddleware, questionPaperController.delete);

// Static Files
const distPath = path.join(__dirname, "..", "..", "cse", "dist");
const uploadsPath = path.join(__dirname, "..", "uploads");

// Serve static files from the frontend build directory
app.use("/uploads", express.static(uploadsPath));
app.use(express.static(distPath));

// API 404 handler - prevents returning index.html for invalid API requests
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// SPA Fallback - redirect all other requests to index.html for React Router
app.get("*", (req, res) => {
  const indexPath = path.join(distPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`❌ Error sending index.html: ${err.message}`);
      res.status(404).send("Frontend build not found. Please run 'npm run build' in the 'cse' directory.");
    }
  });
});


// Server Start
app.listen(PORT, () => {
  console.log(`
  =========================================
  CSE DEPT SERVER STARTED
  -----------------------------------------
  URL: http://localhost:${PORT}
  API: http://localhost:${PORT}/api
  =========================================
  `);
});
