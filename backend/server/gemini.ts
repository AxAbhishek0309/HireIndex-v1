// Define ResumeAnalysisResult interface directly here, matching the previous structure
export interface ResumeAnalysisResult {
  overallScore: number;
  keywordsScore: number;
  experienceScore: number;
  skillsScore: number;
  educationScore: number;
  formattingScore: number;
  feedback: {
    keywords: string;
    experience: string;
    skills: string;
    education: string;
    formatting: string;
  };
  improvementSuggestions: string[];
}

import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set. Please set it in your environment or .env file.");
}
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
const GEMINI_TIMEOUT_MS = 30000; // 30 seconds

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) resume analyzer. Score the resume realistically, not overly strict. Most good resumes should score between 60 and 85. Be encouraging and provide actionable feedback for each section.

Strictly evaluate the following resume as a real ATS would, using these criteria:
- Keyword & phrase match for the target job
- Work experience relevance and quantification
- Skills match (technical and soft)
- Education completeness
- Formatting & structure (ATS-friendly, no images, simple layout, clear sections)

For each category, give a score out of 100.
For each section, provide 1-2 sentences of feedback.
Return your response as a JSON object with these keys:
- overallScore
- keywordsScore
- experienceScore
- skillsScore
- educationScore
- formattingScore
- feedback (object with keys: keywords, experience, skills, education, formatting)
- improvementSuggestions (array of 3-5 actionable suggestions)
`;

// Function to check if the document is a resume using Gemini
export async function isResumeDocument(text: string): Promise<boolean> {
  const prompt = `Is the following document a resume or CV? Reply only with 'yes' or 'no'.\n\nDocument:\n${text}`;
  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      temperature: 0,
      topP: 1,
      topK: 1
    }
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);
  let response;
  try {
    response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error response:", errorText);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }
  const data: any = await response.json();
  let resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  resultText = resultText.trim().toLowerCase();
  return resultText.startsWith('yes');
}

// Helper to ensure all sections are present
function fillSectionDefaults(result: ResumeAnalysisResult): ResumeAnalysisResult {
  return {
    ...result,
    feedback: {
      keywords: result.feedback?.keywords || "No feedback provided.",
      experience: result.feedback?.experience || "No feedback provided.",
      skills: result.feedback?.skills || "No feedback provided.",
      education: result.feedback?.education || "No feedback provided.",
      formatting: result.feedback?.formatting || "No feedback provided.",
    },
    improvementSuggestions: Array.isArray(result.improvementSuggestions) && result.improvementSuggestions.length > 0
      ? result.improvementSuggestions
      : ["No suggestions provided."]
  };
}

export async function analyzeResumeWithGemini(text: string): Promise<ResumeAnalysisResult> {
  if (!text || !text.trim()) {
    throw new Error("Resume text is empty. Cannot analyze an empty document.");
  }
  console.log("Extracted resume text:", text.slice(0, 500)); // Log first 500 chars

  const prompt = `${SYSTEM_PROMPT}\n\nResume:\n${text}`;

  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      temperature: 0,
      topP: 1,
      topK: 1
    }
  };

  // Timeout logic
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  // Add logging for debugging
  console.log("Gemini API URL:", GEMINI_API_URL);
  console.log("Gemini request body:", JSON.stringify(body, null, 2));

  let response;
  try {
    response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error response:", errorText);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const data: any = await response.json();
  // Gemini returns the text in data.candidates[0].content.parts[0].text
  let resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Remove code block markers if present
  resultText = resultText.trim().replace(/^```json\s*/i, '').replace(/^```/, '').replace(/```$/, '').trim();

  let result: ResumeAnalysisResult;
  try {
    // Parse repeatedly until resultText is an object
    while (typeof resultText === "string") {
      resultText = JSON.parse(resultText);
    }
    result = resultText;
  } catch (e) {
    throw new Error("Failed to parse Gemini response as JSON: " + resultText);
  }

  // After parsing resultText, call fillSectionDefaults before returning
  return fillSectionDefaults(result);
} 