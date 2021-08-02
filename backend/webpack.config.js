const path = require('path');
const minifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  devtool:"source-map",
  context: path.resolve(__dirname,"src"),
  entry:'./index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    port: 3011,
    watchContentBase: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
  plugins:[
    new minifyPlugin({}, {
      comments: false
    })
  ]

};
