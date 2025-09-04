/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      common: {
        1: "#ffffff", // blanc
        2: "#000000", // noir
      },
      neutral: {
        1: "#f5f6f5",
        2: "#e3e5e3",
        3: "#c8cbc9",
        4: "#a3a9a6",
        5: "#7b817d",
        6: "#5a5f5c",
        7: "#414644",
        8: "#2c3531", // couleur principale
        9: "#1b211f",
        10: "#0a0c0b",
      },
      accent: {
        1: "#e6f2f2",
        2: "#cce6e6",
        3: "#99cccc",
        4: "#66b3b3",
        5: "#339999",
        6: "#227f7f",
        7: "#196c6c",
        8: "#116466", // couleur principale
        9: "#0a3d3e",
        10: "#041616",
      },
      sand: {
        1: "#f9f5f2",
        2: "#f1e7de",
        3: "#e3cfbd",
        4: "#d5b79d",
        5: "#c79f7d",
        6: "#c29c79",
        7: "#a98265",
        8: "#d9b08c", // couleur principale
        9: "#8f6952",
        10: "#74513f",
      },
      peach: {
        1: "#fff7f1",
        2: "#ffebdd",
        3: "#ffd7bb",
        4: "#ffc399",
        5: "#ffaf77",
        6: "#ffa266",
        7: "#e68f58",
        8: "#ffcb9a", // couleur principale
        9: "#cc9e75",
        10: "#997250",
      },
      mint: {
        1: "#f4fbfa",
        2: "#e6f6f4",
        3: "#cdeee9",
        4: "#b4e5de",
        5: "#9bdcd4",
        6: "#88c9c0",
        7: "#75b6ad",
        8: "#d1e8e2", // couleur principale
        9: "#7d8b8b",
        10: "#5e6969",
      },
    },
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.2rem",
      1: "0.4rem",
      1.5: "0.6rem",
      2: "0.8rem",
      2.5: "1rem",
      3: "1.2rem",
      3.5: "1.4rem",
      4: "1.6rem",
      5: "2rem",
      6: "2.4rem",
      7: "2.8rem",
      8: "3.2rem",
      9: "3.6rem",
      10: "4rem",
      11: "4.4rem",
      12: "4.8rem",
      14: "5.6rem",
      16: "6.4rem",
      20: "8rem",
      24: "9.6rem",
      28: "11.2rem",
      32: "12.8rem",
      36: "14.4rem",
      40: "16rem",
      44: "17.6rem",
      48: "19.2rem",
      52: "20.8rem",
      56: "22.4rem",
      60: "24rem",
      64: "25.6rem",
      72: "27.2rem",
      80: "28.8rem",
      96: "30.4rem",
    },
    fontSize: {
      xs: "0.8rem",
      sm: "1.2rem",
      md: "1.4rem",
      l: "1.6rem",
      xl: "1.8rem",
      "2xl": "2rem",
      "3xl": "2.2rem",
      "4xl": "2.4rem",
      "5xl": "3.2rem",
      "6xl": "4rem",
    },
    borderRadius: {
      none: "0",
      sm: ".4rem",
      md: ".8rem",
      lg: "1.6rem",
      xl: "3.2rem",
      "2xl": "12.8rem",
      "3xl": "36rem",
      full: "9999px",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "Open-Sans", "sans-serif"],
      },
      backgroundColor: {
        unset: "unset",
      },
      keyframes: {
        "slide-in-right": {
          "0%": {
            transform: "translateX(100%)",
          },
          "99%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "none",
          },
        },
        "slide-in-left": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "99%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "none",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-scale": {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "rotate-slow": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "rotate-reverse": {
          "0%": {
            transform: "rotate(360deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        "float-1": {
          "0%, 100%": {
            transform: "translateY(-10px)",
            opacity: "0.3",
          },
          "50%": {
            transform: "translateY(10px)",
            opacity: "1",
          },
        },
        "float-2": {
          "0%, 100%": {
            transform: "translateY(-8px)",
            opacity: "0.4",
          },
          "50%": {
            transform: "translateY(12px)",
            opacity: "1",
          },
        },
        "float-3": {
          "0%, 100%": {
            transform: "translateY(-12px)",
            opacity: "0.3",
          },
          "50%": {
            transform: "translateY(8px)",
            opacity: "1",
          },
        },
        "float-4": {
          "0%, 100%": {
            transform: "translateY(-6px)",
            opacity: "0.5",
          },
          "50%": {
            transform: "translateY(14px)",
            opacity: "1",
          },
        },
        "float-5": {
          "0%, 100%": {
            transform: "translateY(-14px)",
            opacity: "0.2",
          },
          "50%": {
            transform: "translateY(6px)",
            opacity: "1",
          },
        },
        "float-6": {
          "0%, 100%": {
            transform: "translateY(-11px)",
            opacity: "0.4",
          },
          "50%": {
            transform: "translateY(9px)",
            opacity: "1",
          },
        },
      },
      animation: {
        "slide-in-right":
          "slide-in-right 0.32s cubic-bezier(0.17, 0.67, 0.41, 1.17) 0.16s both",
        "slide-in-left":
          "slide-in-left 0.32s cubic-bezier(0.17, 0.67, 0.41, 1.17) 0.16s both",
        "bg-slide-loop": "bg-slide-loop 2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "fade-in-up-delay": "fade-in-up 0.8s ease-out 0.2s both",
        "fade-in-up-delay-2": "fade-in-up 0.8s ease-out 0.4s both",
        "fade-in-up-delay-3": "fade-in-up 0.8s ease-out 0.6s both",
        "fade-in-up-delay-4": "fade-in-up 0.8s ease-out 0.8s both",
        "fade-in-scale": "fade-in-scale 1s ease-out 0.3s both",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "rotate-reverse": "rotate-reverse 15s linear infinite",
        "rotate-fast": "spin 10s linear infinite",
        "float-1": "float-1 3s ease-in-out infinite",
        "float-2": "float-2 3.5s ease-in-out infinite 0.2s",
        "float-3": "float-3 4s ease-in-out infinite 0.4s",
        "float-4": "float-4 3.2s ease-in-out infinite 0.6s",
        "float-5": "float-5 3.8s ease-in-out infinite 0.8s",
        "float-6": "float-6 3.6s ease-in-out infinite 1s",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [],
};
