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
        1: "#faf9f7",
        2: "#ffffff",
        3: "#f5f3f0",
        4: "#f9f7f4",
      },
      neutral: {
        1: "#4a4a4a",
        2: "#717182",
        3: "#cbced4",
      },
      accent: {
        1: "#7c9885",
        2: "#a8c5d1",
        3: "#e8d5c4",
        4: "#c4a584",
        5: "#9bb3a0",
      },
      destructive: {
        1: "#d4183d",
        2: "#ffffff",
      },
      border: "rgba(124, 152, 133, 0.2)",
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
      },
      animation: {
        "slide-in-right":
          "slide-in-right 0.32s cubic-bezier(0.17, 0.67, 0.41, 1.17) 0.16s both",
        "slide-in-left":
          "slide-in-left 0.32s cubic-bezier(0.17, 0.67, 0.41, 1.17) 0.16s both",
        "bg-slide-loop": "bg-slide-loop 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
