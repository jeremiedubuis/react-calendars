import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.js'),
            name: 'react-calendars',
            fileName: (format) => `react-calendars.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React'
                }
            }
        }
    },
    plugins: [react()]
});
