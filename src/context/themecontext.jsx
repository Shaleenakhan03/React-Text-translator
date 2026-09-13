console.log("✅ THEME CONTEXT LOADED");
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    console.log("✅ THEME CONTEXT LOADED");
  // 🌙 Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  // 🔤 Font Size
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("fontSize") || "medium";
  });

  // ✨ Animations
  const [animations, setAnimations] = useState(() => {
    return JSON.parse(localStorage.getItem("animations")) ?? true;
  });

  // ✅ Success Alerts
  const [successAlerts, setSuccessAlerts] = useState(() => {
    return JSON.parse(localStorage.getItem("successAlerts")) ?? true;
  });

  // ⚠ Error Alerts
  const [errorAlerts, setErrorAlerts] = useState(() => {
    return JSON.parse(localStorage.getItem("errorAlerts")) ?? true;
  });

  // Save everything
  useEffect(() => {
  // Save settings
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
  localStorage.setItem("fontSize", fontSize);
  localStorage.setItem("animations", JSON.stringify(animations));
  localStorage.setItem("successAlerts", JSON.stringify(successAlerts));
  localStorage.setItem("errorAlerts", JSON.stringify(errorAlerts));

  const root = document.documentElement;

  // Dark Mode
  if (darkMode) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Font Size
  const fontSizes = {
    small: "6px",
    medium: "12px",
    large: "16px",
  };

  root.style.setProperty(
    "--app-font-size",
    fontSizes[fontSize] || fontSizes.medium
  );

}, [
  darkMode,
  fontSize,
  animations,
  successAlerts,
  errorAlerts,
]);

  return (
    <ThemeContext.Provider
  value={{
    test: "HELLO",
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
  }}
>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}