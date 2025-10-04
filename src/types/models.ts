export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  assigned_to?: number;
  due_date?: string;
  status?: "open" | "in_progress" | "done";
}

export interface Comment {
  id: number;
  task_id: number;
  body: string;
  user: User;
  created_by?: string;
  created_at?: string;
}
