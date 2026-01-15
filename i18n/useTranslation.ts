import en from "./en";
import ml from "./ml";
import { useLanguage } from "@/context/LanguageContext";

export function useTranslation() {
  const { language } = useLanguage();

  const t = language === "ml" ? ml : en;

  return { t, language };
}
