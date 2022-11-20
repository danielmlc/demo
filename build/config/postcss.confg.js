import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

export const postcssConf = (env, name) => {
  return postcss({
    extensions: ['.css', '.less'],
    extract: true,
    minimize: env === 'production' ? true: false,
    plugins: [
              postcssImport(), 
              autoprefixer({
                overrideBrowserslist:[
                  '> 1%',
                  'last 2 versions',
                  'not ie <= 10'
                ]
              })]
  });
}
