const path = require('path');

/*
 * Default webpack configuration for development
 */

const config = {
  entry: './src/client/script/index',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },
    }, {
      test: /\.less$/,
      loader: ['style-loader', 'css-loader', 'less-loader'],
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader'],
    }],
  },
}

module.exports = config;
