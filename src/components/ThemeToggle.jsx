export default function ThemeToggle({ theme, setTheme }) {
    return (
      <button
        className="px-3 py-2 bg-blue-600 rounded-md text-sm"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    );
  }
  