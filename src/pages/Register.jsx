import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    console.log("Register", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white shadow-lg rounded-lg p-6 w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          name="name"
          className="form-input mb-3"
          placeholder="Name"
          onChange={change}
        />

        <input
          name="email"
          className="form-input mb-3"
          placeholder="Email"
          onChange={change}
        />

        <input
          type="password"
          name="password"
          className="form-input mb-3"
          placeholder="Password"
          onChange={change}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded-md">
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link className="text-indigo-600" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
