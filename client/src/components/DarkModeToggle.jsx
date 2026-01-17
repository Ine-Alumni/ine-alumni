import { useState, useEffect } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <button
      className="ml-2 p-2 hover:bg-gray-100 rounded"
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
    >
      <img
        src={
          darkMode
            ? "/assets/icons/darkmode.svg"
            : "/assets/icons/lightmode.svg"
        }
        alt={darkMode ? "Mode Clair" : "Mode Sombre"}
        className="w-10 h-10"
      />
    </button>
  );
}

export default DarkModeToggle;
