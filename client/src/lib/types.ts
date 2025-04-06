export interface ResumeAnalysis {
  id: number;
  filename: string;
  fileType: string;
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
  createdAt: string;
}

export enum ScoreCategory {
  OVERALL = "overall",
  KEYWORDS = "keywords",
  EXPERIENCE = "experience",
  SKILLS = "skills",
  EDUCATION = "education",
  FORMATTING = "formatting"
}

export const getScoreColor = (score: number): string => {
  if (score < 70) return "bg-red-500"; // Danger
  if (score < 85) return "bg-amber-500"; // Warning
  return "bg-green-500"; // Success
};

export const getScoreLabel = (score: number): string => {
  if (score < 70) return "Needs Improvement";
  if (score < 85) return "Good";
  return "Excellent";
};

export interface NavItem {
  name: string;
  href: string;
  active: boolean;
}
