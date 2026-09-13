function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 ${
        styles[variant] || styles.primary
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;