import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { extractTextFromDocument, isValidFileType } from "./document-parser";
import { analyzeResume } from "./openai";

// Configure multer for file uploads (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (isValidFileType(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF and DOCX files are allowed.") as any);
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for resume analysis
  app.post("/api/resume/analyze", upload.single("file"), async (req: Request, res: Response) => {
    try {
      const file = req.file;
      
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Extract text from the document
      const text = await extractTextFromDocument(file.buffer, file.mimetype);
      
      // Analyze the resume using OpenAI
      const analysisResult = await analyzeResume(text);
      
      // Store the analysis result
      const analysis = await storage.createResumeAnalysis({
        filename: file.originalname,
        fileType: file.mimetype,
        overallScore: analysisResult.overallScore,
        keywordsScore: analysisResult.keywordsScore,
        experienceScore: analysisResult.experienceScore,
        skillsScore: analysisResult.skillsScore,
        educationScore: analysisResult.educationScore,
        formattingScore: analysisResult.formattingScore,
        feedback: analysisResult.feedback,
        improvementSuggestions: analysisResult.improvementSuggestions,
      });
      
      return res.status(200).json(analysis);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "An error occurred while analyzing the resume" 
      });
    }
  });

  // Get a specific resume analysis
  app.get("/api/resume/analysis/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const analysis = await storage.getResumeAnalysis(id);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      return res.status(200).json(analysis);
    } catch (error) {
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "An error occurred while fetching the analysis" 
      });
    }
  });

  // Get recent resume analyses
  app.get("/api/resume/analyses/recent", async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const analyses = await storage.getRecentResumeAnalyses(limit);
      return res.status(200).json(analyses);
    } catch (error) {
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "An error occurred while fetching recent analyses" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
