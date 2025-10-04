import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/api";
import type { Task } from "../types/models";
import { AuthContext } from "../contexts/AuthContext";
import type { CreateTaskRequest, UpdateTaskRequest } from "../types/requests";

const ProjectTasks = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const fetchTasks = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getTasks(Number(projectId));
      setTasks(res);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar tareas");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [projectId, fetchTasks]);

  const handleCreateTask = async () => {
    if (!projectId || !newTitle) return;
    const payload: CreateTaskRequest = {
      project_id: Number(projectId),
      title: newTitle,
      description: newDescription,
      assigned_to: auth?.user?.id,
    };
    try {
      const res = await createTask(payload);
      setTasks([...tasks, res]);
      setNewTitle("");
      setNewDescription("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear tarea");
    }
  };

  const handleUpdateTask = async (id: number) => {
    const title = prompt("Nuevo título de la tarea");
    const description = prompt("Nueva descripción de la tarea");
    if (!title || !description) return;
    const payload: UpdateTaskRequest = { title, description };
    try {
      const res = await updateTask(id, payload);
      setTasks(tasks.map((t) => (t.id === id ? res : t)));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar tarea");
    }
  };

  const handleCompleteTask = async (id: number) => {
    try {
      await completeTask(id);
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t))
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error al marcar tarea como completada"
      );
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al eliminar tarea");
    }
  };

  return (
    <div className="tasks-page">
      <h2>Tareas del proyecto {projectId}</h2>

      <div className="create-task">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={handleCreateTask}>Crear Tarea</button>
      </div>

      {loading ? (
        <p>Cargando tareas...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontWeight: task.status === "done" ? "normal" : "bold",
                  textDecoration:
                    task.status === "done" ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                {task.title} <span>({task.description})</span>
              </span>
              <button
                onClick={() => handleUpdateTask(task.id)}
                style={{ marginLeft: "10px" }}
              >
                Editar
              </button>
              <button
                onClick={() => handleCompleteTask(task.id)}
                style={{ marginLeft: "5px" }}
              >
                Completar
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                style={{ marginLeft: "5px", color: "red" }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectTasks;
