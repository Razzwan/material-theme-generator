const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Package = require('../package')
const commonConfig = require('./base')

const extractCSS = new ExtractTextPlugin('style.[hash].css')

module.exports = env => webpackMerge(commonConfig, {
  entry: {
    themeGenerator: './index.js',
  },
  output: {
    pathinfo: false,
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader',
        }),
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    extractCSS,
    new HtmlWebpackPlugin({
      title: Package.title,
      cache: false,
      showErrors: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
    }),
  ],
})
