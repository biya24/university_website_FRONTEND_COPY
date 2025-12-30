"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";

export default function NotificationBar() {
  const [notices, setNotices] = useState<string[]>([
    "Online applications are invited from eligible candidates for admission to the Ph.D. programme 2025",
    "Online applications are invited from eligible candidates for admission to the M.Phil. programme 2025",
  ]);

  return (
    <div className="w-full bg-[#2b2b2b] text-white h-10 flex items-center overflow-hidden whitespace-nowrap relative z-[2000]">
      {/* Scrolling container */}
      <div className="flex items-center animate-scroll">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-10"
          >
            <Megaphone size={18} className="text-gray-300 flex-shrink-0" />
            <span className="text-sm">{notice}</span>
          </div>
        ))}

        {/* Duplicate for seamless loop */}
        {notices.map((notice, index) => (
          <div
            key={"dup-" + index}
            className="flex items-center gap-3 px-10"
          >
            <Megaphone size={18} className="text-gray-300 flex-shrink-0" />
            <span className="text-sm">{notice}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll-left 18s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
