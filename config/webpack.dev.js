const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

// const baseTestUrl = 'http://192.168.0.107:8750/'
// const baseTestUrl = 'http://192.168.0.108:8750/'
// const baseTestUrl = 'http://localhost:8750/'
const baseTestUrl = 'http://192.168.1.93:8750/'
module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    index: 'proindex.html',
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      '/login': {
        target: baseTestUrl,
        changeOrigin: false,
        secure: false,
      },
      '/channelBigScreen/*': {
        target: baseTestUrl,
        changeOrigin: true,
        secure: false,
      },
      '/bigScreen/*': {
        target: baseTestUrl,
        changeOrigin: true,
        secure: false,
      },
      '/channel/*': {
        target: baseTestUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
})
