import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  //useTheme is the one we exported a the last line of out ThemeContext.jsx that created the useContext()
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      switch to {theme === "light" ? "Dark" : "light"} Mode
    </button>
  );
};
export default ThemeToggle;
