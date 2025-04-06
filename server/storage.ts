import { resumeAnalysis, type ResumeAnalysis, type InsertResumeAnalysis, users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createResumeAnalysis(analysis: InsertResumeAnalysis): Promise<ResumeAnalysis>;
  getResumeAnalysis(id: number): Promise<ResumeAnalysis | undefined>;
  getRecentResumeAnalyses(limit: number): Promise<ResumeAnalysis[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumeAnalyses: Map<number, ResumeAnalysis>;
  private currentUserId: number;
  private currentResumeAnalysisId: number;

  constructor() {
    this.users = new Map();
    this.resumeAnalyses = new Map();
    this.currentUserId = 1;
    this.currentResumeAnalysisId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createResumeAnalysis(insertAnalysis: InsertResumeAnalysis): Promise<ResumeAnalysis> {
    const id = this.currentResumeAnalysisId++;
    const analysis: ResumeAnalysis = { 
      ...insertAnalysis, 
      id, 
      createdAt: new Date()
    };
    this.resumeAnalyses.set(id, analysis);
    return analysis;
  }

  async getResumeAnalysis(id: number): Promise<ResumeAnalysis | undefined> {
    return this.resumeAnalyses.get(id);
  }

  async getRecentResumeAnalyses(limit: number): Promise<ResumeAnalysis[]> {
    const analyses = Array.from(this.resumeAnalyses.values());
    return analyses
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
