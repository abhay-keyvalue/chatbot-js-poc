import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/Milestone.ts',
  output: [
    {
      file: 'example/dist/esm/Milestone.js',
      format: 'esm',
      name: 'Milestone',
      sourcemap: false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      }
    },
    {
      file: 'example/dist/umd/Milestone.js',
      format: 'umd',
      name: 'Milestone',
      sourcemap: false,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      }
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    babel({
      presets: ['@babel/preset-react', '@babel/preset-env'],
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser(),
    image(),
    postcss()
  ]
};
