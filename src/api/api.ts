import type {
  CreateCommentRequest,
  CreateProjectRequest,
  CreateTaskRequest,
  LoginRequest,
  RegisterRequest,
  UpdateProjectRequest,
  UpdateTaskRequest,
} from "../types/requests";
import type {
  CommentResponse,
  ListCommentsResponse,
  ListProjectsResponse,
  ListTasksResponse,
  LoginResponse,
  ProjectResponse,
  RegisterResponse,
  TaskResponse,
  UserResponse,
} from "../types/responses";
import { api } from "./axiosConfig";

export const loginUser = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return data;
};

export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", data);
  return res.data;
};

export const getUserInfo = async (): Promise<UserResponse> => {
  const res = await api.get<UserResponse>("/auth/me");
  return res.data;
};

export const getProjects = async (): Promise<ListProjectsResponse[]> => {
  const res = await api.get<ListProjectsResponse[]>("/projects");
  return res.data;
};

export const createProject = async (
  data: CreateProjectRequest
): Promise<ProjectResponse> => {
  const res = await api.post<ProjectResponse>("/projects", data);
  return res.data;
};

export const updateProject = async (
  data: UpdateProjectRequest & { id: number }
): Promise<ProjectResponse> => {
  const res = await api.put<ProjectResponse>(`/projects/${data.id}`, data);
  return res.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

export const getTasks = async (
  projectId: number
): Promise<ListTasksResponse> => {
  const res = await api.get<ListTasksResponse>(`/projects/${projectId}/tasks`);
  return res.data;
};

export const getTask = async (taskId: number): Promise<TaskResponse> => {
  const res = await api.get<TaskResponse>(`/tasks/${taskId}`);
  return res.data;
};

export const createTask = async (
  data: CreateTaskRequest
): Promise<TaskResponse> => {
  const res = await api.post<TaskResponse>(`/tasks`, data);
  return res.data;
};

export const updateTask = async (
  taskId: number,
  data: UpdateTaskRequest
): Promise<TaskResponse> => {
  const res = await api.put<TaskResponse>(`/tasks/${taskId}`, data);
  return res.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await api.delete(`/tasks/${taskId}`);
};

export const completeTask = async (taskId: number): Promise<void> => {
  await api.post(`/tasks/${taskId}/complete`);
};

export const getComments = async (
  taskId: number
): Promise<ListCommentsResponse> => {
  const res = await api.get<ListCommentsResponse>(`/tasks/${taskId}/comments`);
  return res.data;
};

export const createComment = async (
  body: CreateCommentRequest
): Promise<CommentResponse> => {
  const res = await api.post(`/comments`, body);
  return res.data;
};
