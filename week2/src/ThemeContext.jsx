import { createContext, useContext, useState, useEffect } from "react";

//createContext -> a global space to store info
//useContext -> to use what we created, in other components
//useState -> to monitor the current theme
//useEffect -> to run or load the theme

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the provider component
//making sure everyone in the app can access what we created as a provider
//{children} -> whatever inside provider will have access
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Optional: save theme in localStorage for persistence
  //useEffect -> if we have already saved a theme in the browser, let's use it
  useEffect(() => {
    //💡since we are looking for our theme item, the "theme" is a key.
    //probably when storing, the values are saved like "theme" -> key "light" -> value (typical)
    //so here, we just use getItem("theme") bacuse we don't care about the value
    const savedTheme = localStorage.getItem("theme"); //"theme" = key
    if (savedTheme) setTheme(savedTheme);
  }, []);

  //whenever the theme changes ->
  useEffect(() => {
    //so here, we're doing this <body data-theme="light"> or "dark"
    //it does not create a JSX element- it just updates the <body> tag
    document.body.setAttribute("data-theme", theme); // apply theme to <body>

    //💡but in below setItem, we need to pass KEY and the VALUE which assigns "light" to "theme"
    //"theme" = key
    //"dark" = value

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    //take the previous theme
    //make it dark if it's light
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    // anything insied .Provider can access the shared "theme" and "toggleItem"
    //As Long As it uses useContext(ThemeContext)

    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create a custom hook for easy access
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

//although we didn't have anything in const ThemeContext
//but we set useContext(ThemeContext) because in our ThemeProvider return space,
//we determined ThemeContext Component . its provider and gave it value
//so everything is connected
