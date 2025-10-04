import type { FC } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./pages/Projects";
import Register from "./pages/Register";
import ProjectTasks from "./pages/ProjectTasks";
import TaskDetail from "./pages/TaskDetail";

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <PrivateRoute>
                <ProjectTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              <PrivateRoute>
                <TaskDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
