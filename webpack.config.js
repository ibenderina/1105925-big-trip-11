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
    ]
  };
};
