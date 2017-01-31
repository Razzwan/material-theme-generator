const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const commonConfig = require('./base')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const data = require('../app/data.static-generation')

const extractCSS = new ExtractTextPlugin('style.[hash].css')

module.exports = env => webpackMerge(commonConfig, {
  entry: {
    themeGenerator: './static-entry.js',
  },
  output: {
    pathinfo: false,
    filename: 'bundle.js',
    libraryTarget: 'umd'
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
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   mangle: {
    //     screw_ie8: true,
    //     keep_fnames: true,
    //   },
    //   compress: {
    //     warnings: false,
    //     screw_ie8: true
    //   },
    //   comments: false,
    // }),
    new webpack.NoEmitOnErrorsPlugin(),
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, Object.assign({}, data, {
      script: 'bundle.js'
    })),
  ],
})
