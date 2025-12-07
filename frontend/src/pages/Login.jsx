import { useState } from "react";
import api from "../services/API";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/auth/login", { email, password })
      .then((res) => {
        login(res.data); // data = user object
        navigate("/");
      })
      .catch(() => setError("Invalid email or password"));
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-sm border p-6 rounded" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <label className="block mb-2 text-sm">
          Email
          <input
            type="email"
            className="border w-full p-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block mb-4 text-sm">
          Password
          <input
            type="password"
            className="border w-full p-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
