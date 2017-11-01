var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: "./sidebar/lib/sidebar.js",
  output: {
    path: __dirname + "/sidebar",
    filename: "bundle.js"
  },
  module:{
    loaders: [
      {test : /\.css$/, loader: 'style-css'}
    ]
  }
}
