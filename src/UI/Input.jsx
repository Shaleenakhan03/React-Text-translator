import { useTheme } from "../context/ThemeContext";

function Input({ className = "", ...props }) {
  const { darkMode } = useTheme();

  return (
    <input
      {...props}
      className={`w-full rounded-xl border px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        darkMode
          ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
      } ${className}`}
    />
  );
}

export default Input;