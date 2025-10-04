import type { User, Project, Task, Comment } from "./models";

export interface LoginResponse {
  access_token: string;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export type UserResponse = User;

export type ListProjectsResponse = Project[];
export type ProjectResponse = Project;

export type ListTasksResponse = Task[];
export type TaskResponse = Task;

export type ListCommentsResponse = Comment[];
export type CommentResponse = Comment;
