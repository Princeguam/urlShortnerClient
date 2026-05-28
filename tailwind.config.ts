import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        linen: 'var(--linen)',
        sage: 'var(--sage)',
        fern: 'var(--fern)',
        forest: 'var(--forest)',
        deep: 'var(--deep)',
        'bg-main': 'var(--bg-main)',
        'bg-card': 'var(--bg-card)',
        'bg-muted': 'var(--bg-muted)'
      },
      fontFamily: {
        display: ["Playfair Display", 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        md: '12px',
        lg: '20px'
      },
      boxShadow: {
        'md-forest': '0 4px 16px rgba(52,78,65,0.12)',
        'lg-forest': '0 12px 40px rgba(52,78,65,0.18)'
      }
    }
  }
}

export default config
