import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import pkg from './package.json';

const dev = process.argv.indexOf('-w') > -1;


const plugins = [
    resolve({
        extensions: ['.js', '.jsx']
    }),
    babel()
];

if (dev) {
    plugins.push(serve(['dist', 'public']));
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
