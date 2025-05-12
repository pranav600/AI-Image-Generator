// 


import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("generate");

  // Load saved data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    const savedHistory = localStorage.getItem("history");
    const savedTheme = localStorage.getItem("theme") || "dark";

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    setTheme(savedTheme);

    // Apply the initial theme
    document.documentElement.classList.add(savedTheme);
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("theme", theme);

    // Update the HTML class for the theme
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [favorites, history, theme]);

  const addToFavorites = (prompt, imageUrl) => {
    setFavorites((prev) => [
      ...prev,
      { prompt, imageUrl, timestamp: Date.now() },
    ]);
  };

  const removeFromFavorites = (timestamp) => {
    setFavorites((prev) => prev.filter((item) => item.timestamp !== timestamp));
  };

  const addToHistory = (prompt, imageUrl) => {
    setHistory((prev) =>
      [{ prompt, imageUrl, timestamp: Date.now() }, ...prev].slice(0, 50)
    );
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        history,
        theme,
        activeTab,
        setActiveTab,
        addToFavorites,
        removeFromFavorites,
        addToHistory,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);