import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/Milestone.ts',
  output: [{
    file: 'dist/esm/milestone.js',
    format: 'esm',
    name: 'test_notification',
    sourcemap: false
  },
  {
    file: 'dist/umd/milestone.js',
    format: 'umd',
    name: 'test_notification',
    sourcemap: false
  }
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    babel(),
    terser(),
  ]
};
