import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiClock,
  FiStar,
  FiSettings,
  FiInfo,
  FiX,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

function Sidebar({ sidebarOpen, toggleSidebar }) {
  const { darkMode } = useTheme();

  const menuItems = [
    { name: "Home", path: "/", icon: <FiHome /> },
    { name: "History", path: "/history", icon: <FiClock /> },
    { name: "Favorites", path: "/favorites", icon: <FiStar /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
    { name: "About", path: "/about", icon: <FiInfo /> },
  ];

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 z-50 transform transition-transform duration-300 overflow-y-auto shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          darkMode
            ? "bg-slate-900 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center p-5 border-b ${
            darkMode ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-bold text-indigo-500">
            🌍 AI Translator
          </h2>

          <button
            onClick={toggleSidebar}
            className="text-2xl hover:text-red-500 transition"
          >
            <FiX />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : darkMode
                    ? "hover:bg-slate-800"
                    : "hover:bg-indigo-100"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;