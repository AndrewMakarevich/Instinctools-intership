const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: "source-map",
  // devServer: {
  //   static: path.resolve(__dirname, 'dist')
  // },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin()
  ]
};