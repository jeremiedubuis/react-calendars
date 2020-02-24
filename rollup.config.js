import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const dev = process.argv.indexOf('-w') > -1;


const plugins = [
    replace(({
        'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production')
    })),
    resolve({
        extensions: ['.js', '.jsx']
    }),
    babel()
];

if (dev) {
    plugins.push(serve(['dist', 'public']));
} else {
    plugins.push(terser());
}

export default {
    input: 'src/index.js',
    output: {
        file: pkg.main,
        format: 'umd',
        name: 'ReactCalendars',
        globals: {
            react: 'React'
        },
    },
    external: [
        'react',
        'prop-types'
    ],
    plugins
};
