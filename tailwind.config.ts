import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#2D68FF',
        'brand-red': '#FF4D4D',
        'brand-green': '#28A745',
        'brand-navy': '#0D1F40',
        'text-primary': '#0D1F40',
        'text-secondary': '#333333',
        'text-muted': '#666666',
        'text-disabled': '#999999',
        'bg-light': '#F8F9FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'page-title': '28px',
        'section-title': '24px',
        'kpi-value': '20px',
        'label': '14px',
        'subtext': '12px',
      },
      spacing: {
        'section-gap': '32px',
        'card-gap': '16px',
      },
      borderRadius: {
        'card': '8px',
        'pill': '9999px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config 