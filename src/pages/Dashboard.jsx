import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState({
    myMedicines: 0,
    availableMedicines: 0,
    outgoingRequests: 0,
    incomingRequests: 0,
  });

  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Card #1 */}
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-semibold">My Medicines</h3>
          <p className="text-3xl font-bold mt-2">{data.myMedicines}</p>
        </div>

        {/* Card #2 */}
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-semibold">Available for Donation</h3>
          <p className="text-3xl font-bold mt-2">{data.availableMedicines}</p>
        </div>

        {/* Card #3 */}
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-semibold">Requests I Made</h3>
          <p className="text-3xl font-bold mt-2">{data.outgoingRequests}</p>
        </div>

        {/* Card #4 */}
        <div className="bg-white shadow p-6 rounded">
          <h3 className="text-lg font-semibold">Requests Received</h3>
          <p className="text-3xl font-bold mt-2">{data.incomingRequests}</p>
        </div>

      </div>
    </div>
  );
}
