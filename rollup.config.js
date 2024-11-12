import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'example/dist/esm/Milestone.js',
      format: 'esm',
      name: 'Milestone',
      sourcemap: false,
      globals: {
        preact: 'preact',
        'preact/compat': 'preactCompat'
      }
    },
    {
      file: 'example/dist/umd/Milestone.js',
      format: 'umd',
      name: 'Milestone',
      sourcemap: false,
      globals: {
        preact: 'preact',
        'preact/compat': 'preactCompat'
      }
    }
  ],
  external: ['preact', 'preact/compat'],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      moduleDirectories: ['node_modules']
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    babel({
      presets: [
        [
          '@babel/preset-env',
          { targets: '> 0.25%, not dead' }
        ]
      ],
      plugins: [
        ['@babel/plugin-transform-react-jsx', { pragma: 'h' }] // Configure JSX for Preact
      ],
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser(),
    image(),
    postcss()
  ]
};
