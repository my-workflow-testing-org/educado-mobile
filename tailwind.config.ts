import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
// eslint-disable-next-line no-restricted-imports
import { colors } from "./theme/colors";
// eslint-disable-next-line no-restricted-imports
import { typographyPlugin } from "./theme/typography";

export default {
  content: [
    "./App.tsx",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./screens/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors,
    extend: {
      fontFamily: {
        sans: ["Montserrat_400Regular"],
        "mont-400": ["Montserrat_400Regular"],
        "mont-400-italic": ["Montserrat_400Regular_Italic"],
        "mont-500": ["Montserrat_500Medium"],
        "mont-600": ["Montserrat_600SemiBold"],
        "mont-600-italic": ["Montserrat_600SemiBold_Italic"],
        "mont-700": ["Montserrat_700Bold"],
        "mont-700-italic": ["Montserrat_700Bold_Italic"],
        "mont-800": ["Montserrat_800ExtraBold"],
      },
      fontSize: {
        heading: "32px",
        subheading: "24px",
        "body-large": "18px",
        body: "16px",
        "body-small": "14px",
        "caption-medium": "12px",
        "caption-small": "10px",
      },
      borderRadius: {
        small: "4px",
        medium: "8px",
        large: "16px",
      },
      spacing: {
        "edu-3xs": "0.125rem",
        "edu-2xs": "0.25rem",
        "edu-xs": "0.375rem",
        "edu-s": "0.5rem",
        "edu-m": "0.75rem",
        "edu-l": "1rem",
        "edu-xl": "1.25rem",
        "edu-2xl": "1.5rem",
        "edu-3xl": "2rem",
        "edu-4xl": "2.5rem",
        "edu-5xl": "3rem",
        "edu-6xl": "3.5rem",
        "edu-7xl": "4rem",
        "edu-8xl": "4.5rem",
        "edu-9xl": "5rem",
        "edu-10xl": "5.5rem",
        "edu-11xl": "6rem",
        "edu-12xl": "6.5rem",
        "edu-13xl": "7rem",
        "edu-full": "6.188rem",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".text-top": {
          textAlignVertical: "top",
        },
      });
    }),
    typographyPlugin,
  ],
} satisfies Config;
