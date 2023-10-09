const { fontFamily, screens } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    future: {
      hoverOnlyWhenSupported: true,
    },
    screens: {
      xs: '475px',
      ...screens,
    },
    extend: {
      screens: {
        md: '720px',
      },
      colors: {
        'off-white': 'rgb(var(--off-white) / <alpha-value>)',
        '0range': 'rgb(var(--0range) / <alpha-value>)',
        b1ack: 'rgb(var(--b1ack) / <alpha-value>)',
        'app-bg': {
          light: 'rgb(var(--off-white) / <alpha-value>)',
          DEFAULT: 'rgb(var(--off-white) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        display: ['var(--font-display)', ...fontFamily.sans],
      },
      borderRadius: {
        '4xl': '2.25rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
        '8xl': '4rem',
      },
      aria: {
        current: 'current=page',
      },
      backgroundImage: {
        'b1ack-textured': "url('/assets/bgs/black-textured.png')",
        '0range-textured': "url('/assets/bgs/orange-textured.png')",
        'off-white-textured': "url('/assets/bgs/off-white-textured.png')",
        vinyl: "url('/assets/bgs/vinyl.png')",
      },
      spacing: {
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
        176: '44rem',
        192: '48rem',
        208: '52rem',
        224: '56rem',
        240: '60rem',
        256: '64rem',
        272: '68rem',
        288: '72rem',
      },
      gridTemplateColumns: {
        'full-bleed-scroll': `
          [full-start] 1fr
          [content-start]
          min((var(--wrapper-max) - var(--wrapper-px) * 2), 100% - var(--wrapper-px) * 2))
          [content-end]
          1fr [full-end];
        `,
      },
      containers: {
        '4xs': '4rem',
        '3xs': '10rem',
        '2xs': '16rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/container-queries')],
}
