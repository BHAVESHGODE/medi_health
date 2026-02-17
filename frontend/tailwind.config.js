/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // Indigo 600
                secondary: '#EC4899', // Pink 500
                dark: '#1F2937',
                light: '#F3F4F6',
                glass: 'rgba(255, 255, 255, 0.25)',
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'neumorph': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
            }
        },
    },
    plugins: [],
}
