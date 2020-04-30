const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = (env) => {
  return {
    mode: env ? env.type : `production`,
    entry: `./src/main.js`,
    output: {
      filename: `bundle.js`,
      path: path.join(__dirname, `public`),
    },
    devtool: `source-map`,
    devServer: {
      contentBase: path.join(__dirname, `public`),
      watchContentBase: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [`style-loader`, `css-loader`]
        }
      ]
    },
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: [`es-us`]
      })
    ],
    resolve: {
      alias: {
        '@utils': path.resolve(__dirname, `src/utils`),
        '@components': path.resolve(__dirname, `src/components`),
        '@consts': path.resolve(__dirname, `src/consts`),
        '@controllers': path.resolve(__dirname, `src/controllers`),
        '@abstract': path.resolve(__dirname, `src/components/abstract`),
        '@smart-abstract': path.resolve(__dirname, `src/components/smart`),
        '@models': path.resolve(__dirname, `src/models`),
      }
    }
  };
};
