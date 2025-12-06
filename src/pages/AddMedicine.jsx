import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddMedicine() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    expiryDate: "",
    quantity: "",
    city: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in");
        return;
      }

      // FormData for file + text
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("expiryDate", form.expiryDate);
      fd.append("quantity", form.quantity);
      fd.append("city", form.city);

      if (image) {
        fd.append("image", image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/medicines/add",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Medicine added successfully!");
      navigate("/medicines");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error adding medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Medicine</h2>

      <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          className="border w-full px-3 py-2 rounded mb-3"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label>Expiry Date</label>
        <input
          className="border w-full px-3 py-2 rounded mb-3"
          type="date"
          value={form.expiryDate}
          onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
          required
        />

        <label>Quantity</label>
        <input
          className="border w-full px-3 py-2 rounded mb-3"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        <label>City</label>
        <input
          className="border w-full px-3 py-2 rounded mb-3"
          type="text"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />

        <label>Image (optional)</label>
        <input
          className="border w-full px-3 py-2 rounded mb-3"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Adding..." : "Add Medicine"}
        </button>
      </form>
    </div>
  );
}
