
const path = require('path')

const { name } = require('./package.json')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    }
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    port: 9000,
    open: true
  }
}