module.exports = {
  entry: {
    './native/index': './src/index.js',
  },
  output: {
    library: 'spatialconnect',
    libraryTarget: 'umd',
    filename: '[name].js',
  },
  externals: {
    'react-native': 'react-native',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }, {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
    ],
  },
};
