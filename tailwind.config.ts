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
          secondary: '#B8826F',
          accent: '#D8A58E',
          neutral: '#3D3A37',
          'base-100': '#FAF6F1',
          'base-200': '#F1ECE6',
          'base-300': '#E8E1D9',
          info: '#A5C6D6',
          success: '#A7C7B4',
          warning: '#E1B882',
          error: '#D9A3A0'
        }
      },
      {
        orange: {
          primary: '#D8A25A',
          secondary: '#C99A6A',
          accent: '#E7C79C',
          neutral: '#5A4A3A',
          'base-100': '#FBF6EE',
          'base-200': '#F3EBDD',
          'base-300': '#EADFCC',
          info: '#C8D8E4',
          success: '#C6D9C9',
          warning: '#EAD3A8',
          error: '#D9B2A4'
        }
      },
      {
        sage: {
          primary: '#6BA08A',
          secondary: '#9BB8A8',
          accent: '#AECFBF',
          neutral: '#44524A',
          'base-100': '#F6F8F6',
          'base-200': '#ECF1EE',
          'base-300': '#E2EAE5',
          info: '#8CBACF',
          success: '#87C1A4',
          warning: '#E8C48A',
          error: '#D79A9A'
        }
      },
      {
        ocean: {
          primary: '#6AA7C4',
          secondary: '#8FBFD4',
          accent: '#B6D9E6',
          neutral: '#344955',
          'base-100': '#F5F9FB',
          'base-200': '#EAF2F6',
          'base-300': '#DFEAF0',
          info: '#78B7DE',
          success: '#8BC4B5',
          warning: '#E8CFA3',
          error: '#D49E9E'
        }
      },
      {
        rose: {
          primary: '#D99AA5',
          secondary: '#E6B9C0',
          accent: '#F0D2D7',
          neutral: '#59454A',
          'base-100': '#FDF7F8',
          'base-200': '#F6ECEE',
          'base-300': '#EEE0E3',
          info: '#B7C9E8',
          success: '#A9D6C2',
          warning: '#F0D5A3',
          error: '#E3A8A8'
        }
      },
      {
        lavender: {
          primary: '#B2A5D8',
          secondary: '#C9C0E6',
          accent: '#E0DAF3',
          neutral: '#4A4459',
          'base-100': '#FBFAFE',
          'base-200': '#F2F0FB',
          'base-300': '#E9E6F7',
          info: '#AFC6EC',
          success: '#B8D9CC',
          warning: '#EEDCB0',
          error: '#D9AFC4'
        }
      },
      {
        sand: {
          primary: '#C9B79A',
          secondary: '#D9CAB3',
          accent: '#E7DDCB',
          neutral: '#5B5244',
          'base-100': '#FBF8F3',
          'base-200': '#F3EEE5',
          'base-300': '#EAE3D6',
          info: '#C3D7E6',
          success: '#BFD7C5',
          warning: '#E9D5A5',
          error: '#D9B0A4'
        }
      },
      {
        dark: {
          primary: '#9CA3AF',
          secondary: '#6B7280',
          accent: '#9CA3AF',
          neutral: '#1F2937',
          'base-100': '#0F1419',
          'base-200': '#121820',
          'base-300': '#161D26',
          info: '#8CAFC7',
          success: '#87B3A3',
          warning: '#C7AE7A',
          error: '#B98E8E'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
};

export default config; 