export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

export interface CreateTaskRequest {
  project_id: number;
  title: string;
  description?: string;
  assigned_to?: number;
  due_date?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
}

export interface CreateCommentRequest {
  task_id: number;
  body: string;
}
