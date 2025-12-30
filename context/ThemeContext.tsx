"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  fontSize: "small" | "normal" | "large";
  changeFontSize: (size: "small" | "normal" | "large") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "normal" | "large">("normal");

  // ✅ Load user preferences from localStorage
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    const savedFont = localStorage.getItem("fontSize");
    if (savedDark) setDarkMode(savedDark === "true");
    if (savedFont) setFontSize(savedFont as "small" | "normal" | "large");
  }, []);

  // ✅ Save preferences when changed
  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    localStorage.setItem("fontSize", fontSize);
  }, [darkMode, fontSize]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const changeFontSize = (size: "small" | "normal" | "large") => setFontSize(size);

  // ✅ Apply dark mode & font size globally via body class
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  
    // Apply font size class globally
    document.body.classList.remove("font-small", "font-normal", "font-large");
    document.body.classList.add(`font-${fontSize}`);
  }, [darkMode, fontSize]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, fontSize, changeFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
