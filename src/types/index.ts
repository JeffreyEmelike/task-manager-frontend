// Auth
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// User
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "guest";
  workspaces: string[];
  createdAt: string;
}

// Workspace
export interface WorkspaceMember {
  user: User;
  role: "admin" | "member" | "guest";
}

export interface Workspace {
  _id: string;
  name: string;
  owner: User;
  members: WorkspaceMember[];
  createdAt: string;
}

// Project
export interface Project {
  _id: string;
  title: string;
  description?: string;
  workspace: string;
  owner: User;
  status: "active" | "archived" | "completed";
  tags: string[];
  dueDate?: string;
  createdAt: string;
}

// Task
export type Priority = "low" | "medium" | "high" | "critical";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export interface SubTask {
  _id: string;
  title: string;
  done: boolean;
}

export interface Comment {
  _id: string;
  author: User;
  body: string;
  createdAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  project: string;
  assignee?: User;
  priority: Priority;
  status: TaskStatus;
  subtasks: SubTask[];
  comments: Comment[];
  attachments: string[];
  dueDate?: string;
  aiTags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Search
export interface searchResult {
  _id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  score: number;
}

// API Error
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
