"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/i18n/useTranslation";

const services = [
  { key: "admission", icon: "/icons/services/admission.svg", href: "/admission" },
  { key: "programmes", icon: "/icons/services/programmes.svg", href: "/academics/programmes" },
  { key: "departments", icon: "/icons/services/departments.svg", href: "/academics/departments" },
  { key: "studentPortal", icon: "/icons/services/student.svg", href: "student-fyugp/fyugp-stud-login" },
  { key: "certificate", icon: "/icons/services/certificate.svg", href: "https://certificate.ssus.ac.in/" },
  { key: "library", icon: "/icons/services/library.svg", href: "https://library.ssus.ac.in/" },
  { key: "onlineLearning", icon: "/icons/services/online-learning.svg", href: "/academics/scol" },
  { key: "lms", icon: "/icons/services/lms.svg", href: "https://lms.ssus.ac.in/" },
  { key: "faculty", icon: "/icons/services/faculty.svg", href: "https://faculty.ssus.ac.in/" },
  { key: "departmentLogin", icon: "/icons/services/department.svg", href: "https://dept.ssus.ac.in/" },
  { key: "iqac", icon: "/icons/services/iqac.svg", href: "/iqac" },
  { key: "alumni", icon: "/icons/services/alumni.svg", href: "/alumni" },
  { key: "press", icon: "/icons/services/press.svg", href: "https://departments.ssus.ac.in/ssus/news" },
  { key: "fmts", icon: "/icons/services/fmts.svg", href: "https://fmts.ssus.ac.in" },
  { key: "rti", icon: "/icons/services/rti.svg", href: "https://fmts.ssus.ac.in/rti" },
];
 
  


export default function ServicesSection() {

  const { t, language } = useTranslation();
  const { setLanguage } = useLanguage();
  return (
    <section className="w-full bg-white py-24">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 text-[#3D0F29]">
        {t.services.heading}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-24">
        {services.map((service) => (
          <Link
            key={service.key}
            href={service.href}
            target={service.href.startsWith("http") ? "_blank" : undefined}
            rel={service.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block"
          >
            <div
              className="group flex items-center gap-5 border rounded-2xl px-6 py-7 transition-all duration-200
                         hover:bg-[#FAF4F4] hover:border-[#5A0D0D]"
              style={{ borderColor: "#E6CFCF" }}
            >
              {/* ICON */}
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src={service.icon}
                  alt={t.services.items[service.key].title}
                  width={30}
                  height={30}
                />
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#5A0D0D]">
                  {t.services.items[service.key].title}
                </h3>
                <p className="text-sm mt-1 text-[#6B7280]">
                  {t.services.items[service.key].desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
