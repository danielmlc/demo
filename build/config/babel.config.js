import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from 'rollup-plugin-babel';
export const bebalConf = () => {
  return babel({
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
          targets: {
            node: '12'
          }
        }
      ]
    ],
    plugins: [
      "@vue/babel-plugin-jsx"
    ],
    exclude: 'node_modules/**',
    extensions: [
      ...DEFAULT_EXTENSIONS,
      'ts',
      'tsx'
    ],
  });
}
