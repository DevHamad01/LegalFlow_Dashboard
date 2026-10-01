/** @type {import('tailwindcss').Config} */
// All design tokens extracted from the Figma file (LCM - Dashboard, node 1:7145).
// Defined ONCE here; SCSS variables in src/styles/_variables.scss mirror the same values.
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {
      xs: '390px',
      sm: '480px',
      md: '768px',   // tablet
      lg: '1024px',  // desktop
      xl: '1280px',
    },
    extend: {
      colors: {
        brand: {
          500: '#db7658',              // Color/LegalFlow/500
          700: '#8c4b39',              // Color/LegalFlow/700
          800: '#784031',              // Color/LegalFlow/800
          a10: 'rgba(189,138,57,0.10)', // Color/LegalFlow/Alpha-10
          a16: 'rgba(189,118,57,0.16)', // Color/LegalFlow/Alpha-16
        },
        ink: {
          950: '#171717',              // Neutral/Text/950
          600: '#5c5c5c',              // Neutral/Text/600
          400: '#a3a3a3',              // Neutral/Text/400
          legend: '#48484a',           // chart legend text
        },
        surface: {
          0: '#ffffff',                // Neutral/BG/white-0
          50: '#f7f7f7',               // Neutral/BG/50
          200: '#ebebeb',              // Neutral/BG/soft-200
          300: '#d1d1d1',              // Neutral/BG/sub-300
        },
        stroke: {
          sidebar: '#f0f0f0',
          200: '#ebebeb',              // Neutral/Stroke/200
          300: '#d1d1d1',              // Neutral/Stroke/300
          chip: '#e9eaeb',             // Gray/200
          ai: 'rgba(20,20,20,0.08)',
        },
        success: { 500: '#1fc16b', 700: '#178c4e', 800: '#1a7544', a10: 'rgba(31,193,107,0.10)', a16: 'rgba(31,193,107,0.16)' },
        danger:  { 500: '#fb3748', 700: '#d02533', a10: 'rgba(251,55,72,0.10)' },
        warning: { 500: '#f6b51e', 700: '#c99a2c', a10: 'rgba(251,198,75,0.10)', a16: 'rgba(251,198,75,0.16)' },
        violet:  { a10: 'rgba(120,77,239,0.10)', a16: 'rgba(120,77,239,0.16)' },
        orange:  { 500: '#fa7319' },
        muted:   { a16: 'rgba(153,160,174,0.16)' }, // Unsaturated/Neutral-Alpha-16
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        title: ['"Urbanist Variable"', 'Urbanist', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      fontWeight: { book: '424', 'book-md': '432', 'medium-2': '540' },
      // [size, { lineHeight, letterSpacing }] — letter-spacing = Figma % × size
      fontSize: {
        'label-xs': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'label-sm': ['14px', { lineHeight: '20px', letterSpacing: '-0.084px' }],
        'label-md': ['16px', { lineHeight: '24px', letterSpacing: '-0.176px' }],
        'label-lg': ['18px', { lineHeight: '24px', letterSpacing: '-0.27px' }],
        'label-xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.36px' }],
        'para-xs': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'para-sm': ['14px', { lineHeight: '20px', letterSpacing: '-0.028px' }],
        'para-md': ['16px', { lineHeight: '24px', letterSpacing: '-0.176px' }],
        'title-h4': ['32px', { lineHeight: '40px', letterSpacing: '0.16px' }],
        'title-h5': ['24px', { lineHeight: '26px', letterSpacing: '0' }],
        'title-h6': ['20px', { lineHeight: '28px', letterSpacing: '0' }],
      },
      borderRadius: { 4: '4px', 6: '6px', 8: '8px', 12: '12px', 16: '16px', 19: '19px' },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(10,13,18,0.05)',  // Shadow/xs
        chip: '0 1px 1px 0 rgba(10,13,18,0.05)',
        drawer: '0 16px 40px -8px rgba(23,23,23,0.24)',
        tooltip: '0 6px 16px -4px rgba(23,23,23,0.20)',
      },
      backgroundImage: {
        'activity-chart': 'linear-gradient(180.77deg, rgba(189,138,57,0.10) 9.77%, rgba(255,255,255,0) 98.55%), linear-gradient(90deg,#fff,#fff)',
        'cases-chart': 'linear-gradient(223.19deg, rgba(189,138,57,0.10) 26.41%, rgba(255,255,255,0) 75.27%), linear-gradient(90deg,#fff,#fff)',
        'tasks-chart': 'linear-gradient(189.74deg, rgba(189,138,57,0.10) 26.41%, rgba(255,255,255,0) 75.27%), linear-gradient(90deg,#fff,#fff)',
        'ai-summary': 'linear-gradient(88.98deg, rgba(250,226,189,0.10) 0.21%, #fde9fe 45.55%, #fef2fe 98.86%)',
      },
      width: { sidebar: '212px', 'sidebar-collapsed': '120px', drawer: '264px' },
      height: { topbar: '52px' },
      transitionTimingFunction: { smooth: 'cubic-bezier(0.2, 0, 0, 1)' },
    },
  },
  plugins: [],
};
