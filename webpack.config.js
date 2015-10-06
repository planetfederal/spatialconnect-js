module.exports = {
  entry : './src/index.js',
  output : {
    library : 'spatialconnect',
    libraryTarget : 'commonjs2',
    filename : './dist/spatialconnect.js'
  },
  externals : {
    'ol':'openlayers'
  },
  module:{
    loaders:[
      {
        test:/\.js?$/,
        exclude:/(node_modules)/,
        loader:'babel'
      }
    ]
  }
};
