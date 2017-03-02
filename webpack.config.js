var webpack = require('webpack'),
    fs = require('fs'),
    interpolate = require('interpolate'),
    pkg = require('./package.json');

module.exports = {
  entry: './src/state.js',
  output: {
    filename: './dist/state.js',
    library: 'state',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      { loader: 'babel-loader', options: { presets: ['es2015'] } }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(interpolate(fs.readFileSync('.banner').toString().trim(), pkg))
  ]
};
