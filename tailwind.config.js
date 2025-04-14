/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,css}"], // Scanne les fichiers HTML, TS/JS et CSS dans src
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'var(--primary-100, #f0f4f8)', // Fallback colors
          700: 'var(--primary-700, #3d5a88)',
          900: 'var(--primary-900, #1a365d)',
        },
        accent: {
          DEFAULT: 'var(--accent-color, #c5a47e)', // 'DEFAULT' key for using 'accent' directly
          dark: 'var(--accent-dark, #a88557)',
        },
        text: {
          light: 'var(--text-light, #ffffff)',
          dark: 'var(--text-dark, #1a1a1a)',
        },
        'silver-metallic': '#BCC6CC', // Ajout de la couleur argentée/métallique
      },
      fontFamily: {
        heading: ['var(--heading-font, "Playfair Display")', 'serif'],
        body: ['var(--body-font, "Lato")', 'sans-serif'],
      },
      backgroundImage: {
         'gradient-hero': 'var(--gradient-hero)',
      }
      // Vous pouvez ajouter d'autres extensions ici si nécessaire (ombres, transitions...)
    },
  },
  plugins: [],
}
