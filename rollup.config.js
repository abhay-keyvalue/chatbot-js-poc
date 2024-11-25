import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import dotenv from 'dotenv';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

dotenv.config();

export default {
  input: 'src/app.tsx',
  output: [
    {
      file: 'example/dist/esm/Milestone.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'example/dist/umd/Milestone.js',
      format: 'umd',
      name: 'ChatBotSDK',
      sourcemap: true,
      globals: {
        preact: 'Preact',
        'preact/hooks': 'PreactHooks',
        'preact/jsx-runtime': 'PreactJSXRuntime'
      }
    }
  ],
  plugins: [
    peerDepsExternal(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      moduleDirectories: ['node_modules']
    }),
    commonjs(),
    postcss(),
    babel({
      presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]],
      plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'h' }]],
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser(),
    replace({
      preventAssignment: true, // Prevent variable reassignment
      values: {
        // Replace environment variables with actual values
        'import.meta.env.VITE_APP_SDK_BASE_URL': JSON.stringify(process.env.VITE_APP_SDK_BASE_URL)
      }
    })
  ],
  context: 'globalThis'
};
