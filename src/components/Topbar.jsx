import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Medicine Tracker</h2>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

