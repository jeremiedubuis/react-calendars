import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: 'react-calendars',
            fileName: (format) => `react-calendars.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime'
                }
            }
        }
    },
    test: {
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts'
    },
    plugins: [
        react(),
        dts({
            entryRoot: path.resolve(__dirname, 'src/lib'),
            outDir: path.resolve(__dirname, 'dist'),
            insertTypesEntry: true,
            include: ['src/lib/**/*.ts', 'src/lib/**/*.tsx'],
            exclude: [
                'src/lib/__tests__/**',
                'src/**/*.test.ts',
                'src/**/*.test.tsx',
                'vite.config.*',
                'src/main.tsx'
            ]
        })
    ]
});
