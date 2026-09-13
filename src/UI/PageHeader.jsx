import { useTheme } from "../context/ThemeContext";

function PageHeader({ title, subtitle }) {
  const { darkMode, fontSize } = useTheme();
  console.log(fontSize);

  const titleSizes = {
    small: "text-3xl",
    medium: "text-4xl",
    large: "text-5xl",
  };

  const subtitleSizes = {
    small: "text-base",
    medium: "text-lg",
    large: "text-xl",
  };

  return (
    <div className="mb-8">
      <h1
        className={`${titleSizes[fontSize]} font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className={`mt-2 ${subtitleSizes[fontSize]} ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;