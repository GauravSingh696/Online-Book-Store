import { useState } from "react";
import api from "../services/API";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/auth/register", { name, email, password })
      .then(() => {
        setMsg("Registration successful. Please login.");
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch(() => setMsg("Something went wrong"));
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-sm border p-6 rounded" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {msg && <p className="text-green-600 text-sm mb-2">{msg}</p>}

        <label className="block mb-2 text-sm">
          Name
          <input
            className="border w-full p-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

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

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
export default Register;
