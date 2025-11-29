import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Medicine Tracker
      </h2>

      <nav className="flex flex-col gap-3">
        <Link to="/" className="sidebar-link">Dashboard</Link>
        <Link to="/medicines" className="sidebar-link">My Medicines</Link>
        <Link to="/add-medicine" className="sidebar-link">Add Medicine</Link>
        <Link to="/discover" className="sidebar-link">Discover</Link>
        <Link to="/notifications" className="sidebar-link">Notifications</Link>
      </nav>
    </div>
  );
}
