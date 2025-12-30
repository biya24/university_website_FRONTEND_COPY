"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ml";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load saved language
  useEffect(() => {
    const savedLang = (localStorage.getItem("language") as Language) || "en";
    setLanguageState(savedLang);
  }, []);

  // Fetch translations from backend
  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://10.10.100.40:3001/api/translations/${language}`);
        if (!res.ok) throw new Error("Failed to fetch translations");
        const data = await res.json();
        setTranslations(data);
      } catch (err) {
        console.error("Translation fetch error:", err);
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => translations[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
