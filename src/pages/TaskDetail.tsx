import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import type { Task, Comment } from "../types/models";
import { createComment, getComments, getTask } from "../api/api";
import type { CreateCommentRequest } from "../types/requests";

const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newComment, setNewComment] = useState("");

  const fetchTaskAndComments = useCallback(async () => {
    if (!taskId) return;
    setLoading(true);
    setError(null);
    try {
      const taskRes = await getTask(Number(taskId));
      setTask(taskRes);

      const commentsRes = await getComments(Number(taskId));
      setComments(commentsRes);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error al cargar tarea y comentarios"
      );
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTaskAndComments();
  }, [taskId, fetchTaskAndComments]);

  const handleAddComment = async () => {
    if (!taskId || !newComment) return;

    const payload: CreateCommentRequest = {
      task_id: Number(taskId),
      body: newComment,
    };

    try {
      const res = await createComment(payload);
      setComments([...comments, res]);
      setNewComment("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear comentario");
    }
  };

  return (
    <div className="task-detail-page">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : task ? (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>
            Estado: <strong>{task.status || "pending"}</strong>
          </p>

          <div className="comments-section">
            <h3>Comentarios</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.user.email || "Usuario"}:</strong>{" "}
                  {comment.body}
                </li>
              ))}
            </ul>
            <div className="add-comment">
              <input
                type="text"
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleAddComment}>Agregar Comentario</button>
            </div>
          </div>
        </>
      ) : (
        <p>No se encontró la tarea</p>
      )}
    </div>
  );
};

export default TaskDetail;
