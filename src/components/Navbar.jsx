import { FiMenu, FiSettings } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-md transition-all duration-300 ${
        darkMode
          ? "bg-slate-900/90 text-white border-b border-slate-700"
          : "bg-white/90 text-gray-800 border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-2xl hover:text-indigo-500 transition"
          >
            <FiMenu />
          </button>

          <h1 className="text-2xl font-bold tracking-wide">
            🌍 AI Translator
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl rounded-full p-2 hover:bg-indigo-500 hover:text-white transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="text-xl rounded-full p-2 hover:bg-indigo-500 hover:text-white transition"
          >
            <FiSettings />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;