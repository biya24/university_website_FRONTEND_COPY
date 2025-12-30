"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  Search,
  Menu as MenuIcon,
  X,
  ChevronDown,
} from "lucide-react";

import { fetchMenu } from "@/lib/fetchMenu";
import { useLanguage } from "@/context/LanguageContext";
import { useSearch } from "@/context/SearchContext";

interface MenuItem {
  id: string;
  title: string;
  url: string;
  parent: string | null;
  children: MenuItem[];
}

export default function UniversityHeader() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false); // DESKTOP
  const [mobileOpen, setMobileOpen] = useState(false); // MOBILE
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  // ✅ MOBILE STATES (FIXED)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [expandedSubMobile, setExpandedSubMobile] = useState<Record<string, boolean>>({});

  const { language, setLanguage } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
  } = useSearch();

  const NAAC_URL = "/naac";
  const TOUR_URL = "/virtual-tour";


  useEffect(() => {
    async function load() {
      const tree = await fetchMenu("main", language);
      setMenuItems(tree);

      if (tree.length > 0) {
        const firstWithChildren = tree.find(
          (item) => item.children && item.children.length > 0
        );
        setActiveCategory(firstWithChildren?.title || tree[0].title);
      }
    }
    load();
  }, [language]);

  const activeMenu = menuItems.find((m) => m.title === activeCategory);

  const handleNavigation = (url: string) => {
    setMenuOpen(false);
    setMobileOpen(false);
    setExpandedMobile(null);
    setExpandedSubMobile({});
    router.push(url);
  };

  const handleCategoryClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      setActiveCategory(item.title);
    } else if (item.url) {
      handleNavigation(item.url);
    }
  };

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <div className="w-full bg-white h-24 border-b shadow-sm px-10 flex items-center justify-between hidden md:flex">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="University Logo"
            width={500}
            height={70}
            className="object-contain w-[200px] md:w-[310px] lg:w-[500px]"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <Phone className="text-[#6b174e]" size={22} />
          <Mail className="text-[#6b174e]" size={22} />

          <button className="px-4 py-2 border rounded-xl text-sm">NAAC</button>
          <button className="px-4 py-2 border rounded-xl text-sm">
            360° Virtual tour
          </button>

          <button onClick={() => setSearchOpen(true)}>
            <Search size={20} />
          </button>

          <button
            onClick={() => setLanguage(language === "en" ? "ml" : "en")}
            className="flex items-center gap-1"
          >
            {language === "en" ? "English" : "മലയാളം"}
            <ChevronDown size={14} />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-4 py-2 border rounded-xl flex items-center gap-2"
          >
            {menuOpen ? <>Close <X size={20} /></> : <>Menu <MenuIcon size={22} /></>}
          </button>
        </div>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      
<div className="w-full bg-white border-b shadow-sm md:hidden">

{/* ROW 1 — LOGO + MENU */}
<div className="h-20 px-4 flex items-center justify-between">
  <Link href="/">
    <Image
      src="/logo.png"
      alt="Logo"
      width={250}
      height={70}
      priority
    />
  </Link>

  <button onClick={() => setMobileOpen(!mobileOpen)}>
    {mobileOpen ? <X size={30} /> : <MenuIcon size={30} />}
  </button>
</div>

{/* ROW 2 — QUICK ACTIONS */}
<div className="h-12 px-4 flex items-center justify-between
                border-t border-gray-200 bg-white text-sm">

  <button className="font-medium text-gray-700 hover:text-[#6b174e]">
    NAAC
  </button>

  <button className="font-medium text-gray-700 hover:text-[#6b174e]">
    360° Virtual Tour
  </button>

  <button
    onClick={() => setLanguage(language === "en" ? "ml" : "en")}
    className="flex items-center gap-1 font-medium text-gray-700 hover:text-[#6b174e]"
  >
    {language === "en" ? "English" : "മലയാളം"}
    <ChevronDown size={14} />
  </button>

  <button
    onClick={() => setSearchOpen(true)}
    className="text-gray-700 hover:text-[#6b174e]"
  >
    <Search size={20} />
  </button>
</div>
</div>


      {/* ================= MOBILE MENU (FIXED) ================= */}
      {mobileOpen && (
        <div className="bg-white w-full shadow-xl border-t border-gray-300 p-4 md:hidden max-h-[calc(100vh-140px)] overflow-y-auto">

          {menuItems.map((item) => (
            <div key={item.id} className="mb-3">

              {/* LEVEL 1 */}
              <button
                    onClick={() =>
                      item.children?.length
                        ? setExpandedMobile(
                            expandedMobile === item.id ? null : item.id
                          )
                        : handleNavigation(item.url)
                    }
                    className="w-full flex justify-between items-center
                              font-semibold text-[#6b174e] py-2"
                  >

                {item.title}
                {item.children?.length > 0 && (
                  <ChevronDown
                    size={18}
                    className={`transition ${expandedMobile === item.id ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {/* LEVEL 2 */}
              {expandedMobile === item.id &&
                item.children?.map((child) => (
                  <div key={child.id} className="ml-4">

                    <button
                      onClick={() =>
                        child.children?.length > 0
                          ? setExpandedSubMobile((prev) => ({
                              ...prev,
                              [child.id]: !prev[child.id],
                            }))
                          : handleNavigation(child.url)
                      }
                      className="w-full flex justify-between items-center py-1.5 text-gray-700"
                    >
                      {child.title}
                      {child.children?.length > 0 && (
                        <ChevronDown
                          size={16}
                          className={`transition ${
                            expandedSubMobile[child.id] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* LEVEL 3 */}
                    {expandedSubMobile[child.id] &&
                      child.children?.map((inner) => (
                        <button
                          key={inner.id}
                          onClick={() => handleNavigation(inner.url)}
                          className="block w-full text-left ml-6 py-1 text-sm text-gray-600 hover:text-[#6b174e]"
                        >
                          {inner.title}
                        </button>
                      ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* ================= DESKTOP MEGA MENU ================= */}
      {menuOpen && (
        <div className="hidden md:block w-full border-t border-gray-200 bg-white shadow-inner">
          <div className="flex gap-6 items-center px-6 h-12 border-b bg-gray-100">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCategoryClick(item)}
                className={`text-[16px] font-medium ${
                  activeCategory === item.title
                    ? "text-[#6b174e] border-b-2 border-[#6b174e]"
                    : "text-gray-700"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 px-6 py-4 w-full">
            {activeMenu?.children?.map((sub) => (
              <div key={sub.id} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => sub.children?.length ? null : handleNavigation(sub.url)}
                  className="group flex items-center gap-3 py-3 px-4 w-full cursor-pointer hover:bg-gray-100 hover:text-[#6b174e] transition"
                >
                  <span className="text-[#6b174e]">•</span>
                  <span className="font-medium">{sub.title}</span>
                </button>

                {sub.children?.map((inner) => (
                  <button
                    key={inner.id}
                    onClick={() => handleNavigation(inner.url)}
                    className="group flex items-center gap-3 py-2 px-10 w-full cursor-pointer hover:bg-gray-100 hover:text-[#6b174e] transition"
                  >
                    <span className="text-[#6b174e]">–</span>
                    <span>{inner.title}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
