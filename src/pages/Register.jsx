import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log(res.data);

      alert("Registration successful!");

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // redirect to home/dashboard
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-[300px] mx-auto mt-10"
    >
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <button className="bg-blue-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}
