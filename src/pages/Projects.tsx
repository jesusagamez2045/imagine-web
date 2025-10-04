import { useEffect, useState } from "react";
import { type Project } from "../types/models";
import { useNavigate } from "react-router-dom";
import { createProject, deleteProject, getProjects, updateProject } from "../api/api";
import type {
  CreateProjectRequest,
  UpdateProjectRequest,
} from "../types/requests";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProjects();
      setProjects(res);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar proyectos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!newProjectName) return;
    const payload: CreateProjectRequest = {
      name: newProjectName,
      description: newProjectDescription,
    };

    try {
      const res = await createProject(payload);
      setProjects([...projects, res]);
      setNewProjectName("");
      setNewProjectDescription("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear proyecto");
    }
  };

  const handleUpdateProject = async (
    id: number,
    updatedName: string,
    updatedDescription: string
  ) => {
    const payload: UpdateProjectRequest = {
      name: updatedName,
      description: updatedDescription,
    };
    try {
      const res = await updateProject({ id, ...payload });
      setProjects(projects.map((p) => (p.id === id ? res : p)));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar proyecto");
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al eliminar proyecto");
    }
  };

  return (
    <div className="projects-page">
      <h2>Proyectos</h2>
      <div className="create-project">
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
        />
        <button onClick={handleCreateProject}>Crear Proyecto</button>
      </div>

      {loading ? (
        <p>Cargando proyectos...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id} style={{ marginBottom: "10px" }}>
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                {project.name} <span>({project.description})</span>
              </span>
              <button
                onClick={() => {
                  const newName = prompt(
                    "Nuevo nombre del proyecto",
                    project.name
                  );
                  const newDescription = prompt(
                    "Nueva descripción del proyecto",
                    project.description
                  );
                  if (newName && newDescription)
                    handleUpdateProject(project.id, newName, newDescription);
                }}
                style={{ marginLeft: "10px" }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteProject(project.id)}
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

export default Projects;
