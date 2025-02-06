module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroicons/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#e6f0ff',
          600: '#2563eb',
        }
      },
      backgroundImage: {
        'sidebar-gradient': 'linear-gradient(195deg, #ffffff 0%, #f3f4f6 100%)',
      }
    },
  },
  plugins: [],
} 