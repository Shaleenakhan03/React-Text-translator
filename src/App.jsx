import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import About from "./pages/About";

function App() {
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-gray-900"
      }`}
    >
      <Navbar toggleSidebar={toggleSidebar} />

      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="pt-20 px-4 md:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;