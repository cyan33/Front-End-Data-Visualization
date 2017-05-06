const path = require('path');

/*
 * Default webpack configuration for development
 */

const config = {
  entry: {
    app: './src/client/script/index',
    'air-pollution': './src/client/script/airPollution',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
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
      test: /\.scss$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'sass-loader', // compiles Sass to CSS
        options: {
          sourceMap: true,
        },
      }],
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }],
  },
  externals: {
    jQuery: 'jquery',
    echarts: 'echarts',
  },
}

module.exports = config;
