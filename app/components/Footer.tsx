"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/i18n/useTranslation";

type MenuItem = {
  title: string;
  url: string;
};

type MenuMap = Record<string, MenuItem[]>;

const MENU_CONFIG = [
  { titleKey: "quickLinks", menuName: "footer-quicklinks" },
  { titleKey: "importantLinks", menuName: "footer-useful" },
  { titleKey: "resources", menuName: "footer-resources" },
];


export default function UniversityFooter() {
  const { t } = useTranslation();

  const { language } = useLanguage();
  const [menus, setMenus] = useState<MenuMap>({});
  const [email, setEmail] = useState("");

  useEffect(() => {
    const langPrefix = language === "ml" ? "/ml" : "";

    MENU_CONFIG.forEach(({ menuName }) => {
      fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${langPrefix}/jsonapi/menu_items/${menuName}`,
        { cache: "no-store" }
      )
        .then((res) => res.json())
        .then((json) => {
          const items =
            json?.data?.map((item: any) => ({
              title: item.attributes.title,
              url: item.attributes.url,
            })) || [];

          setMenus((prev) => ({
            ...prev,
            [menuName]: items,
          }));
        })
        .catch((err) =>
          console.error(`Error loading menu ${menuName}`, err)
        );
    });
  }, [language]); // 👈 RE-FETCH ON LANGUAGE CHANGE

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Dynamic Footer Menus */}
          {MENU_CONFIG.map(({ titleKey, menuName }) => (
            <div key={menuName}>
              <h3 className="text-xl font-bold mb-6 tracking-wider break-words whitespace-normal">

              {t.footer.menus[titleKey]}
              </h3>

              <div className="space-y-2">
                {(menus[menuName] || []).map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="block text-gray-400 hover:text-white transition-colors text-sm break-words"

                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Newsletter + Address (UNCHANGED) */}
          <div>
            {/* <h3 className="text-xl font-bold mb-6 uppercase tracking-wider">
              RESOURCES
            </h3> */}

            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-2">
              {t.footer.newsletter.title}
              </h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed break-words">

              {t.footer.newsletter.subtitle}
              </p>

              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.footer.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 min-w-0 bg-gray-900 border border-gray-700 rounded 
px-4 py-2 text-sm text-white placeholder-gray-500 
focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"

                />
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-600 text-white px-5 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {t.footer.newsletter.button}
                </button>
              </form>
            </div>

            <div className="pt-4">
            <p className="text-gray-400 text-sm leading-relaxed break-words whitespace-normal">
              {t.footer.address.line1}<br />
              {t.footer.address.line2}<br />
              {t.footer.address.line3}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
                {t.footer.copyright.replace(
          "{{year}}",
          new Date().getFullYear().toString()
        )}
          </p>
        </div>
      </div>
    </footer>
  );
}
