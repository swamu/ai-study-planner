/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        background: '#F7F8FA',
        surface: '#FFFFFF',
        border: '#EAEAEA',
        'border-light': '#F0F0F0',
        
        // Text colors
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B6B6B',
        'text-tertiary': '#9E9E9E',
        
        // Accent colors (muted)
        accent: {
          blue: '#4A90E2',
          teal: '#50B5A9',
          purple: '#8B7EC8',
          green: '#6FCF97',
          amber: '#F2A154',
          red: '#E57373',
        },
        
        // Category colors (soft)
        category: {
          genai: '#4A90E2',
          agentic: '#8B7EC8',
          hld: '#50B5A9',
          dsa: '#F2A154',
          revision: '#7B8FD6',
          project: '#6FCF97',
        },
        
        // Difficulty colors (gentle)
        difficulty: {
          easy: '#6FCF97',
          moderate: '#F2A154',
          hard: '#E57373',
          flexible: '#8B7EC8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.06)',
      },
      maxWidth: {
        'container': '1280px',
      },
      spacing: {
        'grid': '8px',
        'grid-2': '16px',
        'grid-3': '24px',
        'grid-4': '32px',
      },
    },
  },
  plugins: [],
}
