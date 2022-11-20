import typescript from 'rollup-plugin-typescript2';
export const typescriptConf = (env, name) => {
  return typescript({ tsconfigOverride: {
    exclude: ['node_modules'],
    tsconfig: '../../tsconfig.json'
  } })

}
