module.exports = {
  entry : './src/index.js',
  output : {
    filename : './dist/spatialconnect.js'
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
