import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'example/dist/esm/Milestone.js',
      format: 'esm',
      name: 'Milestone',
      sourcemap: false
    },
    {
      file: 'example/dist/umd/Milestone.js',
      format: 'umd',
      name: 'Milestone',
      sourcemap: false
    }
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      moduleDirectories: ['node_modules']
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    babel({
      presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]],
      plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'h' }]],
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser(),
    image(),
    postcss()
  ],
  context: 'globalThis'
};
