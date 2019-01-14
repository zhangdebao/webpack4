// webpack.prod.js
const ClearWebpackPlugin = require('clean-webpack-plugin') // 引入ClearWebpackPlugin插件
const merge = require('webpack-merge')
const common = require('./webpack.common')

const webpack = require('webpack')
const dev = require('./config/prod')
const path = require('path')
const PurifyCssWebpack = require('purifycss-webpack') // 引入PurifyCssWebpack插件
const glob = require('glob') // 引入glob模块,用于扫描全部html文件中所引用的css
module.exports = merge(common, { // 将webpack.common.js合并到当前文件
  devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
  plugins: [
    new ClearWebpackPlugin(['dist']), // 清理所要清理的文件夾名称
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, 'src/*.html')) // 同步扫描所有html文件中所引用的css
    }),
    new webpack.DefinePlugin({ // DefinePlugin可以在编译时期创建全局变量。
      'process.env': dev
    })
  ]
})
