import { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    setLoading(true);
    setError("");
    setNotifications(null);

    try {
      const token = localStorage.getItem("token");
      console.log("Notifications.jsx: token:", token?.slice?.(0, 20));

      if (!token) {
        setError("Not logged in: no token found in localStorage");
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Notifications.jsx: response data:", res.data);
      setNotifications(res.data);
    } catch (err) {
      console.error("Notifications.jsx: load error:", err);
      // Try to show server response if present
      const serverMsg = err.response?.data || err.message;
      setError(typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // call on mount
    loadNotifications();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      <div className="mb-4">
        <button
          className="px-3 py-1 bg-slate-200 rounded"
          onClick={loadNotifications}
        >
          Reload
        </button>
      </div>

      {loading && <p>Loading notifications…</p>}
      {error && (
        <div className="bg-red-100 border border-red-300 p-3 rounded mb-4">
          <strong>Error:</strong> <pre style={{ whiteSpace: "pre-wrap" }}>{error}</pre>
        </div>
      )}

      {!loading && !error && notifications && notifications.length === 0 && (
        <p className="text-gray-500">No notifications</p>
      )}

      {!loading && !error && Array.isArray(notifications) && notifications.length > 0 && (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n._id || Math.random()} className="p-3 bg-white shadow rounded">
              <div className="text-sm text-gray-600">
                {n.medicine ? <strong>{n.medicine.name}</strong> : null}
                {" — "}
                {n.status ? `Status: ${n.status}` : ""}
              </div>
              <div className="mt-1">
                {/* donor/requester may be populated */}
                {n.requester && <div>Requester: {n.requester.name} ({n.requester.phone})</div>}
                {n.donor && <div>Donor: {n.donor.name} ({n.donor.phone})</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
