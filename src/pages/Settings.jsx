import { useTheme } from "../context/ThemeContext";
import { languages } from "../data/languages";
import { useNavigate } from "react-router-dom";

function Settings() {
  const theme = useTheme();
  const navigate = useNavigate();

  console.log(theme);

  const {
    darkMode,
    setDarkMode,
    fontSize,
    setFontSize,
    animations,
    setAnimations,
    successAlerts,
    setSuccessAlerts,
    errorAlerts,
    setErrorAlerts,
  } = theme;

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${darkMode
        ? "bg-gray-900 text-white"
        : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900"
        }`}
    >
      <div
        className={`max-w-3xl mx-auto rounded-3xl shadow-xl p-8 ${darkMode ? "bg-gray-800" : "bg-white"
          }`}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">
          ⚙️ Settings
        </h1>

        {/* Appearance */}
        {/* Appearance */}
<div className="mb-8">
  <h2 className="text-2xl font-semibold mb-6">
    🎨 Appearance
  </h2>

  <div className="space-y-6">

    {/* Dark Mode */}
    <div className="flex justify-between items-center">
      <span>🌙 Dark Mode</span>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`px-5 py-3 rounded-xl text-white transition ${
          darkMode
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>


    {/* Font Size */}
    <div className="flex justify-between items-center">
      <span>🔤 Font Size</span>

      <select
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        className="border rounded-lg p-2 text-black"
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>

    {/* Animations */}
    <div className="flex justify-between items-center">
      <span>✨ Animations</span>

      <input
        type="checkbox"
        checked={animations}
        onChange={(e) => setAnimations(e.target.checked)}
      />
    </div>

  </div>
</div>

<hr className="my-6" />
        <hr className="my-6" />

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            🔔 Notifications
          </h2>

          <div className="space-y-6">

            <div className="flex justify-between items-center">
              <span>✅ Success Alerts</span>

              <input
                type="checkbox"
                checked={successAlerts}
                onChange={(e) => setSuccessAlerts(e.target.checked)}
              />
            </div>

            <div className="flex justify-between items-center">
              <span>⚠ Error Alerts</span>

              <input
                type="checkbox"
                checked={errorAlerts}
                onChange={(e) => setErrorAlerts(e.target.checked)}
              />
            </div>

          </div>
        </div>
        <hr className="my-6" />

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            ♻ Reset
          </h2>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
          >
            ♻ Reset App
          </button>
        </div>

        <div className="text-center text-gray-500">
          Version 1.0.0 <br />
          Developed by <strong>Shaleena Khan</strong> ❤️
        </div>
      </div>
    </div>
  );
}

export default Settings;