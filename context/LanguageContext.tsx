"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

type Language = "en" | "ml";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext =
  createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

 
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("language") as Language) || "en";
  });
  
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /* ---------- LOAD SAVED LANGUAGE ---------- */


  /* ---------- FETCH TRANSLATIONS ---------- */
  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://10.10.100.40:3001/api/translations/${language}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setTranslations(data || {});
      } catch (err) {
        console.error("Translation fetch error:", err);
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, [language]);

  /* ---------- LANGUAGE SWITCH (🔥 IMPORTANT FIX) ---------- */
  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    setLanguageState(lang);
    localStorage.setItem("language", lang);

    // Remove existing /ml
    const cleanPath = pathname.replace(/^\/ml/, "");

    // Add /ml only for Malayalam
    const newPath = lang === "ml" ? `/ml${cleanPath}` : cleanPath;

    router.replace(newPath); // 🚀 FORCE SERVER PAGE RELOAD
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
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
};

