import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 300ms ease-out',
        scaleIn: 'scaleIn 200ms ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.98)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    }
  },
  daisyui: {
    themes: [
      {
        familyWarm: {
          primary: '#C86B53',
          secondary: '#A37E6F',
          accent: '#9BBF9B',
          neutral: '#3D3A37',
          'base-100': '#FAF6F1',
          'base-200': '#F1ECE6',
          'base-300': '#E8E1D9',
          info: '#6CA6C1',
          success: '#7CB59A',
          warning: '#E1A95F',
          error: '#D4837D'
        }
      },
      'dark'
    ]
  },
  plugins: [require('daisyui')]
};

export default config; 