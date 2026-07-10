import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0D0C',
        surface: '#17140F',
        surface2: '#201C15',
        paper: '#F4EEE1',
        amber: '#F2A93B',
        signal: '#FF6A3D',
        safe: '#8FBF6F',
        line: '#3A342A',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};
export default config;
