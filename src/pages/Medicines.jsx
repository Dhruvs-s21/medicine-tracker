import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    expiryDate: "",
    quantity: ""
  });

  // Fetch medicines from backend
  const loadMedicines = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/medicines/mine",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch medicines");
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  // Delete medicine
  const deleteMedicine = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/medicines/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      loadMedicines();
    } catch (err) {
      alert("Error deleting medicine");
    }
  };

  // Start editing
  const startEdit = (m) => {
    setEditingId(m._id);
    setEditForm({
      name: m.name,
      expiryDate: m.expiryDate?.slice(0, 10),
      quantity: m.quantity
    });
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const fd = new FormData();
      fd.append("name", editForm.name);
      fd.append("expiryDate", editForm.expiryDate);
      fd.append("quantity", editForm.quantity);

      await axios.put(
        `http://localhost:5000/api/medicines/update/${id}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEditingId(null);
      loadMedicines();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Make available
  const makeAvailable = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/medicines/available/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      loadMedicines();
    } catch (err) {
      alert("Failed to update donation status");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Medicines</h2>
        <Link
          to="/add-medicine"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          + Add Medicine
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Expiry</th>
              <th className="py-2 text-left">Quantity</th>
              <th className="py-2 text-left">Donation</th>
              <th className="py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {medicines.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No medicines added yet.
                </td>
              </tr>
            )}

            {medicines.map((m) => (
              <tr key={m._id} className="border-b">
                {editingId === m._id ? (
                  <>
                    <td className="py-2">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>

                    <td>
                      <input
                        type="date"
                        value={editForm.expiryDate}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            expiryDate: e.target.value
                          })
                        }
                        className="border px-2 py-1 rounded"
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={editForm.quantity}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            quantity: e.target.value
                          })
                        }
                        className="border px-2 py-1 rounded w-20"
                      />
                    </td>

                    <td className="text-center">
                      {m.status === "available" ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                          Available
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                          Not Available
                        </span>
                      )}
                    </td>

                    <td className="text-center py-2">
                      <button
                        className="text-green-600 px-2"
                        onClick={() => saveEdit(m._id)}
                      >
                        Save
                      </button>
                      <button
                        className="text-gray-600 px-2"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2">{m.name}</td>
                    <td>{m.expiryDate?.slice(0, 10)}</td>
                    <td>{m.quantity}</td>

                    <td className="py-2 text-center">
                      {m.status === "available" ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                          Available
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                          Not Available
                        </span>
                      )}
                    </td>

                    <td className="text-center py-2 flex gap-2 justify-center">
                      <button
                        className="text-blue-600"
                        onClick={() => startEdit(m)}
                      >
                        Edit
                      </button>

                      <button
                        className="text-red-600"
                        onClick={() => deleteMedicine(m._id)}
                      >
                        Delete
                      </button>

                      {m.status !== "available" && (
                        <button
                          className="text-green-600"
                          onClick={() => makeAvailable(m._id)}
                        >
                          Make Available
                        </button>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
