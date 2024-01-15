/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.boton': {
          // Estilos específicos para la clase "boton"
          // Por ejemplo, puede tener padding, color de fondo, etc.
          // Reemplaza esto con los estilos que desees.
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '4px',
          // ... otros estilos
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

