import { useEffect, useState } from "react";
import axios from "axios";

export default function Discover() {
  const [donations, setDonations] = useState([]);

  // Load available medicines from backend
  const loadMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/medicines/discover");
      setDonations(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load available medicines");
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  // Request a medicine
  const requestMedicine = async (medicineId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to request medicine");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/request/request",
        { medicineId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Request sent successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error requesting medicine");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available for Donation</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {donations.length === 0 && (
          <p className="text-gray-500">No medicines available for donation.</p>
        )}

        {donations.map((m) => (
          <div key={m._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold text-lg">{m.name}</h3>
            <p><strong>Expiry:</strong> {m.expiryDate?.slice(0, 10)}</p>
            <p><strong>Quantity:</strong> {m.quantity}</p>
            <p><strong>City:</strong> {m.city}</p>

            {/* Donor info (your backend sends name + phone) */}
            {m.donor && (
              <p className="mt-2 text-sm text-gray-600">
                Donor: {m.donor.name} ({m.donor.phone})
              </p>
            )}

            <button
              onClick={() => requestMedicine(m._id)}
              className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Request Medicine
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
