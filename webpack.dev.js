// webpack.dev.js
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const dev = require('./config/dev')
module.exports = merge(common, {
  // 本地服务器配置
  devServer: {
    contentBase: './', // 本地服务器所加载文件的入口
    port: '8085', // 设置端口号，如果省略，默认为8080
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    historyApiFallback: false, // 设置为true，所有的跳转将指向index.html
    hot: true // 热加载
    // proxy: {
    //   '/api': {
    //     target: 'http://tcc.taobao.com',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  plugins: [
    new webpack.DefinePlugin({ // DefinePlugin可以在编译时期创建全局变量。
      'process.env': dev
    })
  ]
})
