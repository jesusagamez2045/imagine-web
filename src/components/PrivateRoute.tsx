import { useContext, type JSX } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  if (!auth?.user) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
