"use client";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Students Portal",
    desc: "Access courses, grades & schedule",
    icon: "/icons/services/student.svg",
    href: "student-fyugp/fyugp-stud-login",
  },
  {
    title: "Department / Centre Login",
    desc: "Department management system",
    icon: "/icons/services/department.svg",
    href: "https://dept.ssus.ac.in/",
  },
  {
    title: "Certificate Portal",
    desc: "Download & verify certificates",
    icon: "/icons/services/certificate.svg",
    href: "https://certificate.ssus.ac.in/",
  },
  {
    title: "Online Learning",
    desc: "E-learning courses & materials",
    icon: "/icons/services/online-learning.svg",
    href: "/academics/scol",
  },
  {
    title: "LMS",
    desc: "Learning Management System",
    icon: "/icons/services/lms.svg",
    href: "https://lms.ssus.ac.in/",
  },
  {
    title: "FMTS",
    desc: "File Management & Tracking",
    icon: "/icons/services/fmts.svg",
    href: "https://fmts.ssus.ac.in",
  },
  {
    title: "Faculty Profile",
    desc: "Manage faculty information",
    icon: "/icons/services/faculty.svg",
    href: "https://faculty.ssus.ac.in/",
  },
  {
    title: "Admission",
    desc: "Apply & track applications",
    icon: "/icons/services/admission.svg",
    href: "/admission",
  },
  {
    title: "Library",
    desc: "Digital library resources",
    icon: "/icons/services/library.svg",
    href: "https://library.ssus.ac.in/",
  },
  {
    title: "Alumni",
    desc: "Connect with alumni network",
    icon: "/icons/services/alumni.svg",
    href: "/alumni",
  },
  {
    title: "Programmes",
    desc: "Explore academic programs",
    icon: "/icons/services/programmes.svg",
    href: "/academics/programmes",
  },
  {
    title: "Departments",
    desc: "View all departments",
    icon: "/icons/services/departments.svg",
    href: "/academics/departments",
  },
  {
    title: "Press Release",
    desc: "Latest news & announcements",
    icon: "/icons/services/press.svg",
    href: "https://departments.ssus.ac.in/ssus/news",
  },
  {
    title: "IQAC",
    desc: "Quality Assurance Cell",
    icon: "/icons/services/iqac.svg",
    href: "/iqac",
  },
  {
    title: "RTI",
    desc: "Right to Information",
    icon: "/icons/services/rti.svg",
    href: "https://fmts.ssus.ac.in/rti",
  },
];


export default function ServicesSection() {
  return (
    <section className="w-full bg-white py-24">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 text-[#3D0F29]">
        Explore Our Service
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-24">
        {services.map((service, idx) => (
          <Link
            key={idx}
            href={service.href}
            target={service.href.startsWith("http") ? "_blank" : undefined}
            rel={service.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="block"
          >
            <div
              className="
                group flex items-center gap-5
                border rounded-2xl
                px-6 py-7
                transition-all duration-200
                hover:bg-[#FAF4F4]
                hover:border-[#5A0D0D]
              "
              style={{ borderColor: "#E6CFCF" }}
            >
              {/* ICON */}
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={30}
                  height={30}
                  className="transition-opacity group-hover:opacity-90"
                />
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#5A0D0D] transition">
                  {service.title}
                </h3>
                <p className="text-sm mt-1 text-[#6B7280]">
                  {service.desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
