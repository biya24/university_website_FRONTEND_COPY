// components/SocialMediaGlobe.jsx
'use client';

import { useState, useRef } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGlobe,
  FaShareAlt
} from 'react-icons/fa';

const SocialMediaGlobe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const closeTimer = useRef(null);

  const socialLinks = [
    { icon: <FaFacebookF />, url: '#', label: 'Facebook', color: 'hover:bg-[#1877F2]' },
    { icon: <FaTwitter />, url: '#', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
    { icon: <FaInstagram />, url: '#', label: 'Instagram', color: 'hover:bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]' },
    { icon: <FaLinkedinIn />, url: '#', label: 'LinkedIn', color: 'hover:bg-[#0077B5]' },
    { icon: <FaYoutube />, url: '#', label: 'YouTube', color: 'hover:bg-[#FF0000]' },
  ];

  const openPanel = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  };

  const closePanel = () => {
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">

      {/* SOCIAL ICON PANEL */}
      <div
        onMouseEnter={openPanel}
        onMouseLeave={closePanel}
        className={`flex flex-col space-y-4 bg-white/90 backdrop-blur-sm rounded-l-2xl p-5 shadow-2xl border border-gray-200 transition-all duration-500 ${
          isOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#470102]">
            Follow Us
          </span>
        </div> */}

        {socialLinks.map((social, index) => (
          <div key={index} className="relative">
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md`}
              onMouseEnter={() => setHoveredIcon(index)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {social.icon}
            </a>

            {hoveredIcon === index && (
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2">
                <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap">
                  {social.label}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* GLOBE BUTTON - FIXED FOR CHROME */}
      <button
        onMouseEnter={openPanel}
        onMouseLeave={closePanel}
        onClick={() => setIsOpen(prev => !prev)}
        className="relative z-10 w-16 h-16 rounded-l-full flex items-center justify-center shadow-2xl transition-all duration-500 group overflow-hidden"
        aria-label="Social media links"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #999999 100%)',
          backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #999999 100%)',
          WebkitBackgroundImage: 'linear-gradient(135deg, #ffffff 0%, #999999 100%)'
        }}
      >
        {/* Chrome compatibility layer */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #999999 100%)',
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #999999 100%)',
            WebkitBackgroundImage: 'linear-gradient(135deg, #ffffff 0%, #999999 100%)'
          }}
        />
        
        {isOpen ? (
          <FaShareAlt className="text-2xl rotate-180 transition-transform duration-500 relative z-10 text-[#470102]" />
        ) : (
          <FaGlobe className="text-2xl group-hover:rotate-180 transition-transform duration-700 relative z-10 text-[#470102]" />
        )}
      </button>

    </div>
  );
};

export default SocialMediaGlobe;