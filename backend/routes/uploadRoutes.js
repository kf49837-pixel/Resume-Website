const express = require("express");
const mongoose = require("mongoose");

const upload = require("../middleware/upload");
const Resume = require("../models/Resume");
const {
  uploadResumeFile,
  getResumeFile,
  downloadResumeFile,
  deleteResumeFile,
} = require("../utils/resumeFiles");

const router = express.Router();


// ==========================================
// POST /api/upload
// Upload a new resume
// ==========================================

router.get("/files/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid file ID" });
  }

  const file = await getResumeFile(id);

  if (!file) {
    return res.status(404).json({ message: "Resume file not found" });
  }

  res.setHeader("Content-Type", file.contentType || "application/octet-stream");
  res.setHeader(
    "Content-Disposition",
    `inline; filename*=UTF-8''${encodeURIComponent(file.filename)}`
  );

  downloadResumeFile(id).on("error", (error) => {
    if (!res.headersSent) res.status(404).end();
    else res.destroy(error);
  }).pipe(res);
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume file",
      });
    }

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const fileId = await uploadResumeFile(req.file);
    const resume = await Resume.create({
      name,
      email,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: `api/files/${fileId}`,
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });

  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      message: "Failed to upload resume",
      error: error.message,
    });
  }
});


// ==========================================
// GET /api/resumes
// Get all uploaded resumes
// ==========================================

router.get("/resumes", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });

  } catch (error) {
    console.error("Fetch resumes error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
      error: error.message,
    });
  }
});


// ==========================================
// GET /api/resumes/:id
// Get one resume by ID
// ==========================================

router.get("/resumes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });

  } catch (error) {
    console.error("Fetch resume error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
});


// ==========================================
// PUT /api/resumes/:id
// Update resume
// ==========================================

router.put("/resumes/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const { name, email } = req.body;

    if (name) {
      resume.name = name;
    }

    if (email) {
      resume.email = email;
    }

    let previousFilePath;

    if (req.file) {
      const fileId = await uploadResumeFile(req.file);
      previousFilePath = resume.filePath;
      resume.fileName = req.file.originalname;
      resume.fileType = req.file.mimetype;
      resume.fileSize = req.file.size;
      resume.filePath = `api/files/${fileId}`;
    }

    await resume.save();

    if (previousFilePath) {
      await deleteResumeFile(previousFilePath);
    }

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume,
    });

  } catch (error) {
    console.error("Update resume error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update resume",
      error: error.message,
    });
  }
});


// ==========================================
// DELETE /api/resumes/:id
// Delete resume
// ==========================================

router.delete("/resumes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    // Find resume
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    await deleteResumeFile(resume.filePath);

    // Delete resume from MongoDB
    await Resume.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });

  } catch (error) {
    console.error("Delete resume error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
      error: error.message,
    });
  }
});


module.exports = router;
