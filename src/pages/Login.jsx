import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Save user + token using context
      login(res.data.user, res.data.token);

      alert("Login successful!");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        New user?{" "}
        <Link to="/register" className="text-blue-600">
          Create an account
        </Link>
      </p>
    </div>
  );
}

