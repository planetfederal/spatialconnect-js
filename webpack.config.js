var path = require('path');

module.exports = {
  entry: {
    spatialconnect: './src/index.js',
    test : './src/index.test.js'
  },
  output: {
    library: 'spatialconnect',
    libraryTarget: 'umd',
    filename: './dist/[name].js'
  },
  resolve: {
    alias: {
      'react-native': './react-native-mock'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }, {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      }
    ]
  }
};
