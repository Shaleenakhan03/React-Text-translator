import { useTheme } from "../context/ThemeContext";

function Card({ children, className = "" }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`rounded-3xl shadow-xl p-6 transition-all duration-300 ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white text-gray-800"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;