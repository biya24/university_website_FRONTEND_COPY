import en from "@/i18n/en";
import ml from "@/i18n/ml";
import { useLanguage } from "@/context/LanguageContext";

export function useTranslations() {
    const { language } = useLanguage();
    const dict = language === "ml" ? ml : en;
  
    return { t: dict, language };
  }
