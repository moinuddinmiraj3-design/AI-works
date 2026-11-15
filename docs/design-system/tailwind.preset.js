/** Tailwind preset — mirrors tokens.css. Usage: presets: [require('./design-system/tailwind.preset.js')] */
module.exports = {
  theme: {
    extend: {
      colors: {
        blue: { 50: '#eef5fe', 100: '#dbe9fd', 200: '#b9d4fb', 400: '#4f8ef5', 500: '#1b85f2', 600: '#2443e0', 700: '#1c35b8' },
        navy: { 900: '#14245a' },
        gray: { 0: '#ffffff', 25: '#fafafa', 50: '#f5f5f5', 100: '#ececec', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 900: '#171717' },
        ink: { 950: '#0d0d0d', 900: '#141414', 850: '#1c1c1c', 800: '#242424', 700: '#2e2e2e', 500: '#6b6b6b', 300: '#a8a8a8', 100: '#ededed' },
        success: '#22a55b', info: '#2f8fe0', danger: '#e5484d', warning: '#f5a524',
        accent: { DEFAULT: '#2443e0', hover: '#1c35b8', soft: '#eef5fe' },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.06em' }],
        xs: ['11px', '16px'],
        sm: ['12px', '18px'],
        base: ['13px', '19px'],
        md: ['14px', '20px'],
        lg: ['16px', '22px'],
        xl: ['20px', { lineHeight: '26px', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '30px', letterSpacing: '-0.01em' }],
        '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.01em' }],
      },
      borderRadius: { xs: '3px', sm: '4px', md: '6px', lg: '8px', xl: '12px' },
      boxShadow: {
        xs: '0 1px 2px rgba(0,0,0,.04)',
        sm: '0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)',
        md: '0 4px 12px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.05)',
        lg: '0 16px 40px rgba(0,0,0,.24)',
        focus: '0 0 0 3px rgba(36,67,224,.18)',
      },
      spacing: { sidebar: '240px' },
      height: { 'control-sm': '26px', control: '32px', bar: '40px' },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
};
