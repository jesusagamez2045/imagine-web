import { useContext, useState, type FC } from "react";
import { getUserInfo, loginUser } from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.access_token);
      const userData = await getUserInfo();
      const dataWithToken = { ...userData, token: data.access_token };

      auth.login(dataWithToken);
      navigate("/projects");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
