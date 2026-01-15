// components/SocialMediaGlobe.jsx
'use client';

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialMediaGlobe = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      url: '#',
      label: 'Facebook',
      color: 'hover:bg-[#1877F2]',
    },
    {
      icon: <FaXTwitter />,
      url: '#',
      label: 'X',
      color: 'hover:bg-black',
    },
    {
      icon: <FaInstagram />,
      url: '#',
      label: 'Instagram',
      color:
        'hover:bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]',
    },
    {
      icon: <FaLinkedinIn />,
      url: '#',
      label: 'LinkedIn',
      color: 'hover:bg-[#0077B5]',
    },
    {
      icon: <FaYoutube />,
      url: '#',
      label: 'YouTube',
      color: 'hover:bg-[#FF0000]',
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-3">
        {socialLinks.map((social, index) => (
          <div key={index} className="relative group">
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-11 h-11 flex items-center justify-center rounded-full bg-white text-gray-700 shadow-lg border border-gray-200
                transition-all duration-300 transform
                hover:scale-110 hover:text-white ${social.color}`}
            >
              {social.icon}
            </a>

            {/* Tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 
              bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md 
              whitespace-nowrap opacity-0 group-hover:opacity-100 
              transition-opacity duration-300">
              {social.label}
              <span className="absolute left-full top-1/2 -translate-y-1/2 
                border-4 border-transparent border-l-gray-900"></span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaGlobe;
