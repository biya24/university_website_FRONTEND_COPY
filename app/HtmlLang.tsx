"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

export default function HtmlLang() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language === "ml" ? "ml" : "en";
  }, [language]);

  return null;
}
