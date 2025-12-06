import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Medicine Tracker</h2>

      <nav className="flex flex-col gap-3">

        <NavLink 
          to="/" 
          end
          className={({ isActive }) =>
            isActive ? "sidebar-link bg-blue-100 text-blue-600" : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/medicines"
          className={({ isActive }) =>
            isActive ? "sidebar-link bg-blue-100 text-blue-600" : "sidebar-link"
          }
        >
          My Medicines
        </NavLink>

        <NavLink 
          to="/add-medicine"
          className={({ isActive }) =>
            isActive ? "sidebar-link bg-blue-100 text-blue-600" : "sidebar-link"
          }
        >
          Add Medicine
        </NavLink>

        <NavLink 
          to="/discover"
          className={({ isActive }) =>
            isActive ? "sidebar-link bg-blue-100 text-blue-600" : "sidebar-link"
          }
        >
          Discover
        </NavLink>

        <NavLink 
          to="/notifications"
          className={({ isActive }) =>
            isActive ? "sidebar-link bg-blue-100 text-blue-600" : "sidebar-link"
          }
        >
          Notifications
        </NavLink>

      </nav>
    </div>
  );
}
