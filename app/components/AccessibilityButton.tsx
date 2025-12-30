// components/AccessibilityButton.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  FaUniversalAccess,
  FaTimes,
  FaFont,
  FaAdjust,
  FaEye,
  FaEyeSlash,
  FaMousePointer,
  FaVolumeUp,
  FaVolumeMute,
  FaSearch,
  FaHighlighter,
  FaUndo,
  FaKeyboard
} from 'react-icons/fa';
import { 
  RiContrastFill, 
  RiCursorFill,
  RiTextWrap
} from 'react-icons/ri';
import { TbLetterSpacing } from 'react-icons/tb';
import { GiMagnifyingGlass } from 'react-icons/gi';

const AccessibilityButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSettings, setActiveSettings] = useState({
    highContrast: false,
    darkMode: false,
    largeText: false,
    dyslexiaFriendly: false,
    highlightLinks: false,
    bigCursor: false,
    textToSpeech: false,
    hideImages: false,
    letterSpacing: false,
    lineHeight: false
  });
  const panelRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // High Contrast
    if (activeSettings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    // Dark Mode
    if (activeSettings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Large Text
    if (activeSettings.largeText) {
      root.style.fontSize = '120%';
    } else {
      root.style.fontSize = '100%';
    }

    // Dyslexia Friendly Font
    if (activeSettings.dyslexiaFriendly) {
      document.body.classList.add('dyslexia-friendly');
    } else {
      document.body.classList.remove('dyslexia-friendly');
    }

    // Highlight Links
    if (activeSettings.highlightLinks) {
      document.body.classList.add('highlight-links');
    } else {
      document.body.classList.remove('highlight-links');
    }

    // Big Cursor
    if (activeSettings.bigCursor) {
      document.body.classList.add('big-cursor');
    } else {
      document.body.classList.remove('big-cursor');
    }

    // Letter Spacing
    if (activeSettings.letterSpacing) {
      document.body.classList.add('letter-spacing');
    } else {
      document.body.classList.remove('letter-spacing');
    }

    // Line Height
    if (activeSettings.lineHeight) {
      document.body.classList.add('line-height');
    } else {
      document.body.classList.remove('line-height');
    }

    // Hide Images
    if (activeSettings.hideImages) {
      document.body.classList.add('hide-images');
    } else {
      document.body.classList.remove('hide-images');
    }
  }, [activeSettings]);

  const toggleSetting = (setting) => {
    setActiveSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const resetAll = () => {
    setActiveSettings({
      highContrast: false,
      darkMode: false,
      largeText: false,
      dyslexiaFriendly: false,
      highlightLinks: false,
      bigCursor: false,
      textToSpeech: false,
      hideImages: false,
      letterSpacing: false,
      lineHeight: false
    });
  };

  const accessibilityOptions = [
    {
      id: 'highContrast',
      icon: <RiContrastFill />,
      label: 'High Contrast',
      description: 'Increase color contrast',
      active: activeSettings.highContrast,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'darkMode',
      icon: <FaAdjust />,
      label: 'Dark Mode',
      description: 'Switch to dark theme',
      active: activeSettings.darkMode,
      color: 'bg-gray-800 hover:bg-gray-900'
    },
    {
      id: 'largeText',
      icon: <FaFont />,
      label: 'Large Text',
      description: 'Increase text size',
      active: activeSettings.largeText,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'dyslexiaFriendly',
      icon: <RiTextWrap />,
      label: 'Dyslexia Friendly',
      description: 'Use dyslexia-friendly font',
      active: activeSettings.dyslexiaFriendly,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'highlightLinks',
      icon: <FaHighlighter />,
      label: 'Highlight Links',
      description: 'Make links more visible',
      active: activeSettings.highlightLinks,
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      id: 'bigCursor',
      icon: <FaMousePointer />,
      label: 'Big Cursor',
      description: 'Increase cursor size',
      active: activeSettings.bigCursor,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'letterSpacing',
      icon: <TbLetterSpacing />,
      label: 'Letter Spacing',
      description: 'Increase space between letters',
      active: activeSettings.letterSpacing,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
    {
      id: 'lineHeight',
      icon: <FaSearch />,
      label: 'Line Height',
      description: 'Increase space between lines',
      active: activeSettings.lineHeight,
      color: 'bg-teal-500 hover:bg-teal-600'
    },
    {
      id: 'hideImages',
      icon: activeSettings.hideImages ? <FaEyeSlash /> : <FaEye />,
      label: 'Hide Images',
      description: 'Remove distracting images',
      active: activeSettings.hideImages,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'textToSpeech',
      icon: activeSettings.textToSpeech ? <FaVolumeUp /> : <FaVolumeMute />,
      label: 'Read Aloud',
      description: 'Enable text-to-speech',
      active: activeSettings.textToSpeech,
      color: 'bg-pink-500 hover:bg-pink-600',
      action: () => {
        if ('speechSynthesis' in window) {
          if (!activeSettings.textToSpeech) {
            const utterance = new SpeechSynthesisUtterance(document.body.innerText);
            speechSynthesis.speak(utterance);
          } else {
            speechSynthesis.cancel();
          }
        }
        toggleSetting('textToSpeech');
      }
    }
  ];

  return (
    <>
      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#711F45] to-purple-700 text-white flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
        aria-label="Accessibility options"
      >
        <div className="relative">
          {isOpen ? (
            <FaTimes className="text-xl transition-transform duration-300" />
          ) : (
            <FaUniversalAccess className="text-xl group-hover:rotate-12 transition-transform duration-300" />
          )}
          {/* Animation indicator */}
          {!isOpen && Object.values(activeSettings).some(v => v) && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </button>

      {/* Accessibility Panel */}
      <div
        ref={panelRef}
        className={`fixed bottom-24 right-6 z-50 transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 max-h-[70vh] overflow-y-auto border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Accessibility</h3>
              <p className="text-sm text-gray-600">Adjust to your needs</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close panel"
            >
              <FaTimes />
            </button>
          </div>

          {/* Active Settings Indicator */}
          {Object.values(activeSettings).some(v => v) && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <FaKeyboard />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">
                    {Object.values(activeSettings).filter(v => v).length} settings active
                  </p>
                  <button
                    onClick={resetAll}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center mt-1"
                  >
                    <FaUndo className="mr-1" size={10} />
                    Reset all settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Accessibility Options Grid */}
          <div className="grid grid-cols-2 gap-3">
            {accessibilityOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.action || (() => toggleSetting(option.id))}
                className={`p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center text-center ${
                  option.active 
                    ? `${option.color} text-white shadow-lg` 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
                aria-label={`${option.label} - ${option.description}`}
                aria-pressed={option.active}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  option.active ? 'bg-white/20' : 'bg-white'
                }`}>
                  <span className={`text-lg ${option.active ? 'text-white' : 'text-gray-600'}`}>
                    {option.icon}
                  </span>
                </div>
                <span className={`font-medium text-sm ${option.active ? 'text-white' : 'text-gray-800'}`}>
                  {option.label}
                </span>
                <span className={`text-xs mt-1 ${option.active ? 'text-white/90' : 'text-gray-500'}`}>
                  {option.description}
                </span>
                {option.active && (
                  <div className="mt-2 w-3 h-3 rounded-full bg-white"></div>
                )}
              </button>
            ))}
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Keyboard Shortcuts</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <kbd className="bg-white px-2 py-1 rounded border mr-1">Ctrl</kbd>
                <kbd className="bg-white px-2 py-1 rounded border mr-1">+</kbd>
                Zoom in
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <kbd className="bg-white px-2 py-1 rounded border mr-1">Ctrl</kbd>
                <kbd className="bg-white px-2 py-1 rounded border mr-1">-</kbd>
                Zoom out
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <kbd className="bg-white px-2 py-1 rounded border mr-1">Tab</kbd>
                Navigate
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <kbd className="bg-white px-2 py-1 rounded border mr-1">Shift</kbd>
                <kbd className="bg-white px-2 py-1 rounded border mr-1">Tab</kbd>
                Back
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center">
            <button
              onClick={resetAll}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center mx-auto"
            >
              <FaUndo className="mr-2" />
              Reset All Settings
            </button>
          </div>
        </div>
      </div>

      {/* Add global styles for accessibility features */}
      <style jsx global>{`
        /* High Contrast */
        .high-contrast {
          filter: contrast(1.4) !important;
          background-color: #000 !important;
          color: #fff !important;
        }
        
        .high-contrast * {
          background-color: #000 !important;
          color: #fff !important;
          border-color: #fff !important;
        }
        
        .high-contrast a {
          color: #ffff00 !important;
          text-decoration: underline !important;
        }
        
        /* Dark Mode */
        .dark-mode {
          background-color: #121212 !important;
          color: #e0e0e0 !important;
        }
        
        .dark-mode * {
          background-color: #121212 !important;
          color: #e0e0e0 !important;
          border-color: #333 !important;
        }
        
        .dark-mode a {
          color: #90caf9 !important;
        }
        
        /* Dyslexia Friendly */
        .dyslexia-friendly {
          font-family: 'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif !important;
          font-weight: 400 !important;
        }
        
        /* Highlight Links */
        .highlight-links a {
          background-color: #ffff00 !important;
          color: #000 !important;
          padding: 2px 4px !important;
          border-radius: 3px !important;
          font-weight: bold !important;
        }
        
        /* Big Cursor */
        .big-cursor * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="%23000" opacity="0.5"/></svg>') 16 16, auto !important;
        }
        
        /* Letter Spacing */
        .letter-spacing * {
          letter-spacing: 0.1em !important;
        }
        
        /* Line Height */
        .line-height * {
          line-height: 1.8 !important;
        }
        
        /* Hide Images */
        .hide-images img,
        .hide-images picture,
        .hide-images video,
        .hide-images canvas,
        .hide-images svg {
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
        }
        
        .hide-images *::before,
        .hide-images *::after {
          visibility: hidden !important;
          opacity: 0 !important;
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, 
                      color 0.3s ease, 
                      border-color 0.3s ease,
                      filter 0.3s ease,
                      font-size 0.3s ease,
                      line-height 0.3s ease,
                      letter-spacing 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default AccessibilityButton;