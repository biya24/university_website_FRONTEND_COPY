/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          scroll: {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-50%)" },
          },
        },
        animation: {
          scroll: "scroll 35s linear infinite",
        },
        fontFamily: {
          malayalam: ["var(--font-malayalam)", "Mandharam", "Noto Sans Malayalam", "sans-serif"],
        },
        colors: {
          brand: {
            primary: "#023e8a",
          },
        },
      },
    },
  };
  