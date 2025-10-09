/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // Remember to edit theme/colors.ts as well!
    // Also, when updating colors, please add a comment that 
    // matches up with the design guide from figma. Once all
    // the type errors are fixed, the variables will be updated
    colors: {
      bgprimary_custom: "#35A1B1",    // --same as primary_custom
      bgPrimary: "#C9E5EC",           // --unused
      primary_custom: "#35A1B1",      // surface default
      secondary: "#FAFEFF",           // surface subtle
      projectWhite: "#FFFFFF",
      projectBlack: "#383838",
      projectGray: "#A1ACB2",
      lightGray: "#E4E4E4",
      error: "#FF4949",
      success: "#4AA04A",
      disable: "#DDD",
      disabled: "#EBF0F2",            // greyscale surface default
      projectRed: "#FFE4E4",
      projectGreen: "#E4F1E4",
      projectLightGray: "#F1F9FB",
      cyanBlue: "#166276",
      limeGreen: "#9DE89C",
      yellow: "#FAC12F",
      babyBlue: "#166276",
      limeGreenDarker: "#8DD08C",
      correctAnswer: "#00897B",
      wrongAnswer: "#CF6679",
      profileCircle: "#166276",
      pointsText: "#C1A146",
      pointsCoin: "#AD872D",
      progressBar: "#35A1B1",         // --same as primary_custom
      progressBarUnFilled: "#D8EFF3", // surface lighter
      badgesGreen: "#8CC43B",
      badgesPurple: "#C383F7",
      badgesBlue: "#54ADF1",
      unselectedStar: "#CBCAB8",
      greyscaleTexticonBody:     "#28363E",   // greyscale text_icon body
      greyscaleTexticonSubtitle: "#4E6879",   // greyscale text_icon subtitle
      greyscaleTexticonDisabled: "#809CAD",   // greyscale text_icon disabled
      greyscaleTexticonCaption:  "#628397",   // greyscale text_icon caption
    },
    fontFamily: {
      montserrat: ["Montserrat-Regular"],
      "montserrat-bold": ["Montserrat-Bold"],
      "montserrat-semi-bold": ["Montserrat-SemiBold"],
      sans: ['"Montserrat-Regular"'],
      "sans-bold": ["'Montserrat-Bold'"],
      "sans-semi-bold": ["'Montserrat-SemiBold'"],
      bold: ["Montserrat-Bold"],
    },
    extend: {
      fontSize: {
        heading: 32,
        subheading: 24,
        "body-large": 18,
        body: 16,
        "body-small": 14,
        "caption-medium": 12,
        "caption-small": 10,
      },
      borderRadius: {
        small: 4,
        medium: 8,
        large: 16,
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".text-top": {
          textAlignVertical: "top",
        },
      });
    },
  ],
};
