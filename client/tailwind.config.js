/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgDark: "#101720", // Midnight Blue (#101720): Cool and Calm
        bgLight: "#F4F6FC",

        textLight: "#F4F6FC",
        textColor1: "#101720",
        textColor2: "#4b5563", // gray-600
        textColor3: "#6b7280", // gray-500

        lightBgHover: "#E5E7EB", // gray-200
      },
    },
  },
  plugins: [],
};
