# 构建步骤
## 1、初始化

在终端执行```npm init```命令生成package.json

该命令会询问项目名称、描述、作者、入口、测试命令等等信息（可以不管， 直接一路回车）
#### 1.1 初始化[eslint](https://www.npmjs.com/package/eslint)
本地安装 eslint
```
npm install eslint --save-dev
```
eslint官方提供了3种预安装包, 使用[eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)
```
npm install --save-dev eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-plugin-html eslint-friendly-formatter babel-eslint
```
初始化eslint文件
```
eslint --init
```
执行eslint --init命令后， 会提示一系列问题如图,然后在根目录下生成一文件.eslintrc.js, 修改extends为standard
```
// .eslintrc.js
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "extends": "standard"
};
```
##### 1.2 CSS规范[stylelint](https://www.npmjs.com/package/stylelint)
安装
```
npm i stylelint
```
## 2、安装[webpack](https://www.npmjs.com/package/webpack)与[webpack-cli](https://www.npmjs.com/package/webpack-cli)
 因为webpack4.x版本之后 webpack模块一部分功能分到webpack.cli模块， 所以两者都需要安装,具体命令如下

#### 2.1 全局安装webpack与webpack-cli模块
```
npm install webpack webpack-cli --global
```
#### 2.2 安装本地webpack与webpack-cli模块
```
npm install webpack webpack-cli --save-dev
```
####  提示
>上述命令可采用简写，install可简写为i,--global可简写为-g,--save-dev可简写为-D(这个命令是用于把配置添加到package.json的开发环境配置列表中，后面会提到)，--save可简写为-S

```
npm i webpack -g               //这是安装全局webpack命令
npm i webpack webpack-cli -D   //这是安装本地项目模块
```
#### 2.3 在项目根目录新建src和dist文件夹与index.html,src下建立hello.js与index.js

>hello.js中 导出一个模块
```
// hello.js
module.exports = function() {
    let hello = document.createElement('div');
    hello.innerHTML = "Hello World!";
    return hello;
};
```
index.js中引入该模块
```
const hello = require('./hello')
document.getElementById('root').appendChild(hello)
```

我们打包时就只需把index.js模块打包成bundle.js，然后供index.html引用即可，这就是最简单的webpack打包原理

####  2.4 开始进行webpack打包
webpack全局安装的情况下```npm install webpack webpack-cli -g```

在终端执行以下打包命令
```
webpack src/index.js --output dist/bundle.js
```
>output可以简写o

#### 2.5 通过配置文件来使用webpack
新建webpack.config.js， 简单的配置入口， 出口配置
>注：webpack.config.js文件中的__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录 即D:\GitLab\webpack4

>注：path.join的功能是拼接路径片段。

>有了这个配置文件，我们只需在终端中运行webpack命令就可进行打包，这条命令会自动引用webpack.config.js文件中的配置选项，示例如下：
![webpack](https://user-gold-cdn.xitu.io/2018/11/5/166e285f68796a6f?w=1614&h=403&f=png&s=67605)

#### 2.6 在package.json文件中配置打包命令
##### 注：package.json中的script会按你设置的命令名称来执行对应的命令。
```
{
  "name": "webpack4",
  "version": "1.0.0",
  "description": "webpack4尝鲜",
  "main": "index.js",
  "scripts": {
    "start": "webpack",
    "test": "npm run test"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.23.1",
    "webpack-cli": "^3.1.2"
  }
}
```
我们就可以在终端中直接执行npm start命令来进行打包，start命令比较特殊，可以直接npm加上start就可以执行，如果我们想起其他的名称，如build时，就需要使用npm run加上build，即```npm run build```命令。
现在我们执行npm start命令

## 3 构建本地服务器
#### 3.1 [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)安装本地服务器
Webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js构建，它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖

>安装命令：```npm i webpack-dev-server -D```
#### 注意：devServer作为webpack配置选项中的一项，以下是它的一些配置选项:

>- contentBase ：设置服务器所读取文件的目录，当前我们设置为"./dist"
>- port  ：设置端口号，如果省略，默认为8080
>- inline  ：设置为true，当源文件改变时会自动刷新页面
>- historyApiFallback  ：设置为true，所有的跳转将指向index.html

```
// webpack.config.js
const path = require('path')
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件
  output: {
    path: path.join(__dirname, '/dist'), // 打包后的文件存放的地方
    filename: 'bundle.js' // 打包后输出文件的文件名
  },
  // 本地服务器配置
  devServer: {
    contentBase: './dist', // 本地服务器所加载文件的入口
    port: '8080', // 端口号8080
    inline: true, // 修改源码文件后实时刷新
    historyApiFallback: true // 不跳转
  }
}
```
在package.json 文件配置启动服务器命令```webpack-dev-server --open```
```
// package.json
{
 ...
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --open",
    "test": "npm run test"
  },
 ...
}
```
我们把start命令名称改为了build，这样比较语义化，平时的脚手架也多数采用这个名称，我们用dev（development的缩写，意指开发环境）来启动本地服务器，webpack-dev-server就是启动服务器的命令，--open是用于启动完服务器后自动打开浏览器，这时候我们自定义命令方式的便捷性就体现出来了，可以多个命令集成在一起运行，即我们定义了一个dev命令名称就可以同时运行了webpack-dev-server和--open两个命令

#### 3.2 Source Maps调试配置
作为开发，代码调试当然少不了，那么问题来了，经过打包后的文件，你是不容易找到出错的地方的，Source Map就是用来解决这个问题的
通过如下配置，我们会在打包时生成对应于打包文件的.map文件，使得编译后的代码可读性更高，更易于调试。
```
// webpack.config.js
const path = require('path')
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件
  output: {
    path: path.join(__dirname, '/dist'), // 打包后的文件存放的地方
    filename: 'bundle.js' // 打包后输出文件的文件名
  },
  // 本地服务器配置
  devServer: {
    contentBase: './', // 本地服务器所加载文件的入口
    port: '8080', // 设置端口号，如果省略，默认为8080
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    historyApiFallback: false // 设置为true，所有的跳转将指向index.html
  },
  devtool: 'source-map' // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
}
```
配置好后，我们再次运行npm run build进行打包，这时我们会发现在dist文件夹中多出了一个bundle.js.map文件
如果我们的代码有bug，在浏览器的调试工具中会提示错误出现的位置，这就是devtool: 'source-map'配置项的作用。  

## 4、[Loaders](https://www.webpackjs.com/concepts/loaders/)
loaders是webpack最强大的功能之一，通过不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理，例如把scss转为css，将ES66、ES7等语法转化为当前浏览器能识别的语法，将JSX转化为js等多项功能。

>Loaders需要单独安装并且需要在webpack.config.js中的modules配置项下进行配置，Loaders的配置包括以下几方面：
>- test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
>- loader：loader的名称（必须）
>- include/exclude：手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
>- options：为loaders提供额外的设置选项（可选）

#### 4.1 配置[css-loader](https://www.npmjs.com/package/css-loader)
如果我们要加载一个css文件，需要安装配置style-loader和css-loader:

>安装css-loader与其依赖:```npm i style-loader css-loader -D```
配置文件现在为
```
// webpack.config.js
const path = require('path')
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件
  output: {
    path: path.join(__dirname, '/dist'), // 打包后的文件存放的地方
    filename: 'bundle.js' // 打包后输出文件的文件名
  },
  // 本地服务器配置
  devServer: {
    contentBase: './', // 本地服务器所加载文件的入口
    port: '8080', // 设置端口号，如果省略，默认为8080
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    historyApiFallback: false // 设置为true，所有的跳转将指向index.html
  },
  devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ['style-loader', 'css-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      }
    ]
  }
}
```
在src文件夹下新建css文件夹，在css文件夹下新建index.css文件
并且在index.js中引入
```
import './css/index.css'
const hello = require('./hello')
document.getElementById('root').appendChild(hello)
```
#### 4.2 配置[SASS](https://www.sass.hk/)
安装：
```
npm i sass-loader node-sass -D  // 因为sass-loader依赖于node-sass，所以还要安装node-sass
```
>配置SASS的rules
```
// webpack.config.js
const path = require('path')
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ['style-loader', 'css-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      }
    ]
  }
}
```
css文件夹下新建red.scss文件
```
$--red-color: red;
body{
  color: $--red-color;
}
```
index.js中引入red.scss
```
import './css/red.scss'
import './css/index.css'
const hello = require('./hello')
document.getElementById('root').appendChild(hello)
```

## 5 [Babel](https://www.babeljs.cn/)
Babel 是一个 JavaScript 编译器
Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本（ES6、ES7、ES8...）的 JavaScript 代码。以下是Babel 可以为你做的主要事情
>- (1)、转换语法
>- (2)、Polyfill 实现目标环境中缺少的功能 （通过 @babel/polyfill）
>- (3)、源代码转换 (codemods)
>- (4)、基于JavaScript进行拓展的语言， 例如JSX

#### 5.1 Babel的安装与配置
Babel其实是几个模块化的包，其核心功能位于称为babel-core的npm包中，webpack可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析ES6的babel-preset-env包和解析JSX的babel-preset-react包）。
```
npm install -D babel-loader @babel/core @babel/preset-env // babel-preset-env的env表示是对当前环境的预处理，而不是像以前使用babel-preset-es2015只能针对某个环境
```
```
const path = require('path')
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(js|jsx)$/,
        use: { // 注意use选择如果有多项配置，可写成这种对象形式
          loader: 'babel-loader'
          // options: { // 后续Babel配置会单独提取到.babelrc文件中
          //   presets: [ '@babel/preset-env' ] // 支持最新JS语法(ES6、ES7、ES8。。。)
          // }
        },
        exclude: /node_modules/ // 排除匹配node_modules模块
      }
    ]
  }
}
```
## 6 插件([Plugins](https://www.webpackjs.com/concepts/plugins/))
插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
>Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。

#### 6.1 插件如何使用
使用某个插件，需要通过npm进行安装，然后在webpack.config.js配置文件的plugins(是一个数组)配置项中添加该插件的实例，下面我们先来使用一个简单的版权声明插件.
```
// webpack.config.js
...
module.exports = {
  ...
  plugins: [
    new webpack.BannerPlugins('版权所有，翻版必究') // new一个插件的实例
  ]
}
```
新建.babelrc文件， 将Babel配置收取至.babelrc文件中
```
{
  "presets": [ "@babel/preset-env" ]
}
```
#### 6.2 自动生成html文件([html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin))
我们都是使用的模板index.html, 那么怎么自动引入打包生成之后的JS文件？HtmlWebpackPlugin插件就是用来解决这个问题的

安装该插件```npm i html-webpack-plugin -D```

>在src文件夹下新建index.html的文件模板（当然这个是可选的，因为就算不设置模板，HtmlWebpackPlugin插件也会生成默认html文件，这里我们设置模块会让我们的开发更加灵活），如下：

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
>webpack.config.js中我们引入了HtmlWebpackPlugin插件，并配置了引用了我们设置的模板，如下：
```
// webpack.config.js
const path = require('path') // 路径处理模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入HtmlWebpackPlugin插件
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件
  ....
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/index.html') // new一个这个插件的实例，并传入相关的参数
    })
  ]
}
```
## 6.3 清理/dist文件夹([clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin))
你可能已经注意到，在我们删掉/dist文件夹之前，由于前面的代码示例遗留，导致我们的/dist文件夹比较杂乱。webpack会生成文件，然后将这些文件放置在/dist文件夹中，但是webpack无法追踪到哪些文件是实际在项目中用到的。

>通常，在每次构建前清理/dist文件夹，是比较推荐的做法，因此只会生成用到的文件，这时候就用到CleanWebpackPlugin插件了。
>安装:```npm i clean-webpack-plugin -D```
```
// webpack.config.js
const path = require('path') // 路径处理模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入HtmlWebpackPlugin插件
const ClearWebpackPlugin = require('clean-webpack-plugin') // 引入ClearWebpackPlugin插件
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.template.html') // new一个这个插件的实例，并传入相关的参数
    }),
    new ClearWebpackPlugin(['dist']) // 清理所要清理的文件夾名称
  ]
}
```
插件的使用方法都是一样的，首先引入，然后new一个实例，实例可传入参数。
现在我们运行npm run build后就会发现，webpack会先将/dist文件夹删除，然后再生产新的/dist文件夹。

## 6.4 热更新(HotModuleReplacementPlugin)
HotModuleReplacementPlugin（HMR）是一个很实用的插件，可以在我们修改代码后自动刷新预览效果。
>方法：
>- (1):devServer配置项中添加hot: true参数。
>- (2):因为HotModuleReplacementPlugin是webpack模块自带的，所以引入webpack后，在plugins配置项中直接使用即可。
```
// webpack.config.js
const path = require('path') // 路径处理模块
const webpack = require('webpack') // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入HtmlWebpackPlugin插件
const ClearWebpackPlugin = require('clean-webpack-plugin') // 引入ClearWebpackPlugin插件
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.template.html') // new一个这个插件的实例，并传入相关的参数
    }),
    new ClearWebpackPlugin(['dist']), // 清理所要清理的文件夾名称
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ]
}
```

此时我们重新启动项目npm run dev后，修改hello.js的内容，会发现浏览器预览效果会自动刷新（也许反应会比较慢，因为我们使用了source-map和其他配置的影响，后面代码分离的时候我们再处理）。

## 7 项目优化及拓展
## 7.1 代码分离
在当前的开发环境都是提倡模块化，webpack自然不例外，我们前面的webpack.config.js配置文件，其实也没配置多少东西就这么多了，要是以后增加了更多配置，岂不是看得眼花缭乱，所以最好的方法就是把它拆分，方便管理：

>- 根目录下新建webpack.common.js(公共配置文件)、webpack.dev.js(开发环境配置文件)、webpack.prod.js(生产环境配置文件)

安装一个合并模块插件[webpack-merge](https://www.npmjs.com/package/webpack-merge)
```
npm i webpack-merge -D
```
>- 拆分webpack.config.js。 删除webpack.config.js。具体实现如下
```
// webpack.common.js
const path = require('path') // 路径处理模块
const webpack = require('webpack') // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入HtmlWebpackPlugin插件
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件
  output: {
    path: path.join(__dirname, '/dist'), // 打包后的文件存放的地方
    filename: 'bundle.js' // 打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ['style-loader', 'css-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      {
        test: /\.(js|jsx)$/,
        use: { // 注意use选择如果有多项配置，可写成这种对象形式
          loader: 'babel-loader'
          // options: { // 后续Babel配置会单独提取到.babelrc文件中
          //   presets: [ 'env' ] // 支持最新JS语法(ES6、ES7、ES8。。。)
          // }
        },
        exclude: /node_modules/ // 排除匹配node_modules模块
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.template.html') // new一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ]
}
```
```
// webpack.prod.js
const ClearWebpackPlugin = require('clean-webpack-plugin') // 引入ClearWebpackPlugin插件
const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
  plugins: [
    new ClearWebpackPlugin(['dist']) // 清理所要清理的文件夾名称
  ]
})
```
```
// webpack.dev.js
const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  // 本地服务器配置
  devServer: {
    contentBase: './', // 本地服务器所加载文件的入口
    port: '8080', // 设置端口号，如果省略，默认为8080
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    historyApiFallback: false, // 设置为true，所有的跳转将指向index.html
    hot: true // 热加载
  }
})
```
>- 设置package.json的scripts命令：
```
{
  "name": "webpack4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack-dev-server --open --config src/webpack.dev.js",
    "test": "npm run test"
  },
  ...
}
```

>我们把build命令改为了webpack --config webpack.prod.js，意思是把打包配置指向webpack.prod.js配置文件，而之前我们只需要使用一个webpack命令为什么就可以运行了？因为webpack命令是默认指向webpack.config.js这个文件名称了，现在我们把文件名称改了，所以就需要自定义指向新的文件，dev命令中的指令也同理。
然后我们运行npm run build和npm run dev，效果应该和我们分离代码前是一样的。

注：说道package.json文件，顺便就多提几句，因为也许有些朋友可能对我们安装模块时加的-D、-S或-g命令存在一些疑惑，因为不知道什么时候加什么尾缀。
其实这个package.json文件是用于我们安装依赖的，可以把它当成一份依赖安装说明表，就是如果我们把项目上传或者发给其他的开发同事，肯定不会把/node_modules文件夹也发送过去，因为这太大了，不现实也没必要。
开发同事只需要有这份package.json文件，然后npm install就可以把我们所需要的依赖都安装下来，但前提是package.json文件上有记录，这就是安装模块时加上-D,-S命令的原因。
-D的全称是--save-dev指开发环境时需要用到的依赖，会记录在package.json文件中的devDependencies选项中，而-S是--save是指生产环境也就是上线环境中需要用到的依赖，会记录在package.json文件中的dependencies选项中，-g的全称是--global指安装全局命令，就是我们在本电脑的任何项目中都能使用到的命令，比如安装cnpm这个淘宝镜像命令就会用到-g命令。
所以我们在安装模块时一定不要忘了加上对应的尾缀命令，让我们的模块有迹可循，否则其他的开发同事接手你的项目的话，会不会下班后（放学后）在门口等你就不知道了。

#### 7.2 增加css前缀、分离css、消除冗余css、分离图片

1. 增加css前缀[postcss-loader](https://www.npmjs.com/package/postcss-loader)、[autoprefixer](https://www.npmjs.com/package/autoprefixer)

>平时我们写css时，一些属性需要手动加上前缀，比如-webkit-border-radius: 10px;，在webpack中我们能不能让它自动加上呢？那是必须的，首先肯定得安装模块了：

```
npm i postcss-loader autoprefixer -D
```

>安装好这两个模块后，在项目根目录下新建postcss.config.js文件:

```
module.exports = {
  plugins: [
    require('autoprefixer') // 引用autoprefixer模块
  ]
}
```
> index.css中增加以下样式

```
body {
    background: gray;
}
#root div{
  width: 200px;
  margin-top: 50px;
  transform: rotate(45deg); /* 这个属性会产生前缀 */
}
```

>修改webpack.common.js文件中的css-loader配置：
```
// webpack.common.js
const path = require('path') // 路径处理模块
const webpack = require('webpack') // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入HtmlWebpackPlugin插件
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件
  output: {
    path: path.join(__dirname, '/dist'), // 打包后的文件存放的地方
    filename: 'bundle.js' // 打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: [
          { loader: 'style-loader' }, // 这里采用的是对象配置loader的写法
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }// 使用postcss-loader
        ] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      ...
    ]
  }
}
```
然后我们运行npm run dev后css样式中会自动添加前缀

2. 分离css插件[extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)

>虽然webpack的理念是把css、js全都打包到一个文件里，但要是我们想把css分离出来该怎么做呢？
```
npm i extract-text-webpack-plugin@next -D  // 加上@next是为了安装最新的，否则会出错
```
>安装完以上插件后在webpack.common.js文件中引入并使用该插件：
```
// webpack.common.js
const path = require('path') // 路径处理模块
const webpack = require('webpack') // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入HtmlWebpackPlugin插件
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 引入分离插件
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件
  output: {
    path: path.join(__dirname, '/dist'), // 打包后的文件存放的地方
    filename: 'bundle.js' // 打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' }// 使用postcss-loader
          ] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
        })
      },
      ...
    ]
  },
  plugins: [
    ...
    new ExtractTextPlugin('css/index.css') // 将css分离到/dist文件夹下的css文件夹中的index.css
  ]
}
```
#### 7.3 消除冗余css插件 [purifycss-webpack](https://www.npmjs.com/package/purifycss-webpack)、 [purify-css](https://www.npmjs.com/package/purify-css)

有时候我们css写得多了，可能会不自觉的写重复了一些样式，这就造成了多余的代码，上线前又忘了检查，对于这方面，我们应该尽量去优化它，webpack就有这个功能。

```
npm i purifycss-webpack purify-css glob -D
```
安装完上述三个模块后，因为正常来说是在生产环境中优化代码，所以我们应该是在webpack.prod.js文件中进行配置，引入clean-webpack-plugin及glob插件并使用它们：
```
// webpack.prod.js
const ClearWebpackPlugin = require('clean-webpack-plugin') // 引入ClearWebpackPlugin插件
const merge = require('webpack-merge')
const common = require('./webpack.common')

const path = require('path')
const PurifyCssWebpack = require('purifycss-webpack') // 引入PurifyCssWebpack插件
const glob = require('glob') // 引入glob模块,用于扫描全部html文件中所引用的css
module.exports = merge(common, { // 将webpack.common.js合并到当前文件
  devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
  plugins: [
    new ClearWebpackPlugin(['dist']), // 清理所要清理的文件夾名称
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, 'src/*.html')) // 同步扫描所有html文件中所引用的css
    })
  ]
})
```

在index.css文件中增加一些多余的代码测试：
```
body {
    background: gray;
}
#root div{
  width: 200px;
  margin-top: 50px;
  transform: rotate(45deg); /* 这个属性会产生前缀 */
}
.a{                 /* 冗余css */
    color: black;
}

.b{                 /* 冗余css */
    width: 50px;
    height: 50px;
    background: yellow;
}
```

然后我们运行npm run build后发现打包后的index.css中是没有多余的.a和.b代码的：
```
body {
  background: gray;
}

#root div {
  width: 200px;
  margin-top: 50px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  /* 这个属性会产生前缀 */
}
/*# sourceMappingURL=index.css.map*/
```

#### 7.4 处理图片 [url-loader](https://www.npmjs.com/package/url-loader)

处理图片需要安装两个loader：

虽然我们只需使用url-loader，但url-loader是依赖于file-loader的，所以也要安装

```
npm i url-loader file-loader -D
```

然后在webpack.common.js中配置url-loader：
```
// webpack.common.js
...
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(png|jpg|svg|gif)$/, // 正则匹配图片格式
        use: [
          {
            loader: 'url-loader' // 使用url-loader
          }
        ]
      }
    ]
  },
  ...
}
```
>更新index.css， 背景改为背景
```
body {
    background: gray;
    background-image: url(../images/back.png) top right repeat-y;
}
...
```
运行npm run dev后，背景图片变成了base64，因为webpack会自动优化图片，减少发送请求，但是如果我想把它变成路径的该怎么做？
可以把webpack.common.js的loader配置更改一下，增加options选项：
```
// webpack.common.js
...
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(png|jpg|svg|gif)$/, // 正则匹配图片格式
        use: [
          {
            loader: 'url-loader', // 使用url-loader
            options: {
              limit: 1000 // 限制只有小于1kb的图片才转为base64，例子图片为384kb,所以不会被转化
            }
          }
        ]
      }
    ]
  },
  ...
}
```
然后我们运行npm run build后，再运行npm run dev，额，图片是没有转成base64了，但是图片怎么不显示了？
问题就出在路径上，我们之前图片的路径是在../images文件夹下，但是打包出来后没有这个路径了，图片直接和文件同级了，所以我们需要在webpack.common.js中给它设置一个文件夹：
```
// webpack.common.js
...
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(png|jpg|svg|gif)$/, // 正则匹配图片格式
        use: [
          {
            loader: 'url-loader', // 使用url-loader
            options: {
              limit: 1000, // 限制只有小于1kb的图片才转为base64，例子图片为384kb,所以不会被转化
              outputPath: 'images' // 设置打包后图片存放的文件夹名称
            }
          }
        ]
      }
    ]
  },
  ...
}
```
继续npm run build打包再npm run dev运行，我的天！图片还是不显示！ 调试工具上看图片路径有images文件夹了，但是我的../呢？

这涉及到配置路径的问题上了，我们还需要在css-loader中给背景图片设置一个公共路径publicPath: '../'，如下：
```
// webpack.common.js
...
module.exports = {
  ...
  module: {
    rules: [
    ...
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ExtractTextPlugin.extract({ // 这里我们需要调用分离插件内的extract方法
          fallback: 'style-loader', // 相当于回滚，经postcss-loader和css-loader处理过的css最终再经过style-loader处理
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' }// 使用postcss-loader
          ], // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
          publicPath: '../' // 给背景图片设置一个功能路径
        })
      },
      {
        test: /\.(png|jpg|svg|gif)$/, // 正则匹配图片格式
        use: [
          {
            loader: 'url-loader', // 使用url-loader
            options: {
              limit: 1000, // 限制只有小于1kb的图片才转为base64，例子图片为384kb,所以不会被转化
              outputPath: 'images' // 设置打包后图片存放的文件夹名称
            }
          }
        ]
      }
    ]
  },
  ...
}
```

#### 7.5 引入[vue](https://cn.vuejs.org/)
>引入vue.js
```
npm install vue --S
```
使用vue-loader处理.vue后缀的文件
安装[vue-loader](https://www.npmjs.com/package/vue-loader)
```
npm install vue-loader --S
```
使用vue-loader
```
// webpack.common.js
...
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      ...
        ]
      }
    ]
  },
  ...
}
```

>引入vuex, 对全局状态进行管理
```
npm install vuex -S
```
>在preset文件夹下创建store.js

```
import Vue from 'vue'
import Vuex from 'vuex'
import { get, post } from './request.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: null
  },
  // 突变
  mutations: {
    HTMLTOWORD (state) {
    }
  },
  // 分发的action
  actions: {
    HTMLTOWORD ({ commit }, data) {
      return post({
        url: '/htmlTransformWord',
        data
      })
    }
  }

})
export default store
```

在main.js中引入store
```
// main.js
...
import store from '@/preset/store.js'
new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
})
```
在index.vue文件下， 分发的action
```
...
downloadWord () {
  const html = this.getCanvasHTML()
  const promise = this.$store.dispatch('HTMLTOWORD', {
    html: this.getCanvasHTML()
  })
  promise.then(res => {
    console.log('res')
  })
},
...
```

>配置VueLoaderPlugin
```
// webpack.common.js
...
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader插件
module.exports = {
  ...
  plugins: [
  ...
    new VueLoaderPlugin()
  ]
}
```
>预编译[vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler) 将.vue编译成render渲染函数
```
npm install vue-template-compiler --S
```

### 7.6 定义别名@
```
// webpack.common.js
...
module.exports = {
  ...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  ...
}

```

#### 7.7 压缩代码
在webpack4.x版本中当你打包时会自动把js压缩了，而且npm run dev运行服务器时，当你修改代码时，热更新很慢，这是因为你修改后webpack又自动为你打包，这就导致了在开发环境中效率很慢，所以我们需要把开发环境和生产环境区分开来，这时就体现出我们代码分离的便捷性了，webpack.dev.js代表开发环境的配置，webpack.prod.js代表生产环境的配置，这时我们只要在package.json文件中配置对应环境的命令即可：
```
{
  ...
  "scripts": {
    "build": "webpack --config webpack.prod.js --mode production",
    "dev": "webpack-dev-server --open --config webpack.dev.js --mode development",
    "test": "npm run test"
  },
  ...
}
```

>
--mode production表示打包时是生产环境，会自己将js进行压缩，而--mode development表示当前是开发环境，不需要进行压缩。这同时也解决了之前一直遗留的警告问题

## 8 根据运行环境变换对应的IP

#### 8.1 安装[cross-env](https://www.npmjs.com/package/cross-env)修改生产环境变量
项目背景：项目有三个分支、dev（开发分支）、uat（测试环境）、prod(上线环境)
现在需要:运行对应的命令npm run dev:dev、uat、prod以及npm run build:dev、uat、prod会调用对用的host

>步骤如下
>- 1、cross-env能跨平台地设置及使用环境变量,安装```npm i --save-dev cross-dev```
>- 2、config文件夹下新建dev.js（开发环境）、prod.js(生产环境)。配置文件如下
```
// dev.js
// 在任何文件里都能简单的用下面代码获取到配置
// const NODE_ENV = process.env.NODE_ENV
// const BRANCH = process.env.BRANCH
module.exports = {
  NODE_ENV: "'development'", // 开发模式|生产模式
  /*
   * 1、process.env.BRANC 读取终端执行的npm命令
   * 2、BRANCH: JSON.stringify(process.env.BRANCH) || 'dev'：用于接受npm命令的修改
   * 3、默认dev
   */
  BRANCH: JSON.stringify(process.env.BRANCH) || "'dev'"
}
```
```
// prod.js
// 在任何文件里都能简单的用下面代码获取到配置
// const NODE_ENV = process.env.NODE_ENV
// const BRANCH = process.env.BRANCH
module.exports = {
  NODE_ENV: "'production'", // 开发模式|生产模式
  /*
   * 1、process.env.BRANC 读取终端执行的npm命令
   * 2、BRANCH: JSON.stringify(process.env.BRANCH) || 'dev'：用于接受npm命令的修改
   * 3、默认dev
   */
  BRANCH: JSON.stringify(process.env.BRANCH) || "'dev'"
}
```
>- 3、在package.json中配置npm 脚本如下：
```
{
  ...
  "scripts": {
    "dev": "webpack-dev-server --open --config webpack.dev.js --mode development",
    "dev:dev": "cross-env BRANCH=dev webpack-dev-server --open --config webpack.dev.js --mode development"
    ...
  },
  ...
}
```
>- 4、在webpack.dev.js中引入dev.js，webpack.prod.js引入prod.js 并将其设置为全局变量，具体如下
```
// webpack.dev.js
const dev = require('./config/dev')
...
module.exports = merge(common, {
  ...
  plugins: [
    new webpack.DefinePlugin({ // DefinePlugin可以在编译时期创建全局变量。
      'process.env': dev
    })
  ]
})
```
```
// webpack.prod.js
...
const dev = require('./config/prod')
module.exports = merge(common, { // 将webpack.common.js合并到当前文件
  plugins: [
    ...
    new webpack.DefinePlugin({ // DefinePlugin可以在编译时期创建全局变量。
      'process.env': dev
    })
  ]
})
```

>- 5、 config文件下新建common.js，用于存放公共的方法，并配置
```
// common.js
module.exports = {
  /**
   * [getHost 根据执行脚本的具体命令，返回具体的请求IP]
   * @return {[type]} [description]
   */
  getHost () {
    const BRANCH = `${process.env.BRANCH}`
    let HOST = ''
    switch (BRANCH) {
      case 'dev' :
        HOST = 'https://xxx.com'
        break
      default :
        HOST = ''
    }
    return HOST
  }
}
```
>- 6、 分别运行npm run build npm run dev使用. 就可以看到效果
```
// index.js
const { post } = require('./preset/request')
const promise = post({
  url: '/xxx/xxx',
  data: {
    tenantCode: '88000531',
    keyword: '',
    page: {
      size: 10,
      page: 1
    }
  }
})
promise.then(res => {
  console.log('res', res)
}).catch(err => {
  console.log('err', err)
})
```

运行npm run build:dev，这样NODE_ENV便设置成功，无需担心跨平台问题
在任何页面使用都能获取process.env.BRANCH

#### 8.2 安装 [Axios](https://www.npmjs.com/package/axios)
>Axios具有以下特征：
>- 从浏览器中创建 XMLHttpRequests
>- 从 node.js 创建 http 请求
>- 支持 Promise API
拦截请求和响应
转换请求数据和响应数据
取消请求
自动转换 JSON 数据
客户端支持防御 XSRF

安装命令：```npm install axios```
封裝请求的request.js
```
const HOST = require('../../config/common').getHost() // 获取命令后缀
const _axios = require('axios') // 使用axios
const axios = _axios.create({ // 创建实例
  baseURL: HOST, // IP
  timeout: 5000 // 请求超时时间
})
// 配置默认值
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/**
 * [description]
 * @param  {[type]} url     [请求地址]
 * @param  {[type]} params  [请求参数, 与url拼接的]
 * @param  {[type]} headers [请求头]
 * @param  {[type]} timeout [超时时间]
 * @return {[type]}         [返回promise]
 */
module.exports.get = function ({ url = '', params = {}, headers = {}, timeout = 5000 }) {
  const promise = axios.get(url, { params, timeout })
  return promise
}
/**
 * [POST请求]
 * @param  {[type]} url     [请求地址]
 * @param  {[type]} data    [请求参数]
 * @param  {[type]} params  [地址拼接参数]
 * @param  {[type]} headers [请求头]
 * @param  {[type]} timeout [超时]
 * @return {[type]}         [返回promise]
 */
module.exports.post = function ({ url = '', data = {}, params = {}, headers = {}, timeout = 5000 }) {
  const promise = axios.post(url, { data, params, headers, timeout })
  return promise
}
/**
 * [PUT请求]
 * @param  {[type]} url     [请求地址]
 * @param  {[type]} data    [请求参数]
 * @param  {[type]} params  [地址拼接参数]
 * @param  {[type]} headers [请求头]
 * @param  {[type]} timeout [超时]
 * @return {[type]}         [返回promise]
 */
module.exports.put = function ({ url = '', data = {}, params = {}, headers = {}, timeout = 5000 }) {
  const promise = axios.put(url, { data, params, headers, timeout })
  return promise
}
/**
 * [DELETE请求]
 * @param  {[type]} url     [请求地址]
 * @param  {[type]} data    [请求参数]
 * @param  {[type]} params  [地址拼接参数]
 * @param  {[type]} headers [请求头]
 * @param  {[type]} timeout [超时]
 * @return {[type]}         [返回promise]
 */
module.exports._delete = function ({ url = '', data = {}, params = {}, headers = {}, timeout = 5000 }) {
  const promise = axios.delete(url, { data, params, headers, timeout })
  return promise
}
```
#### 9 重新定义src
>- 1 清空src
>- 2 添加main.js

```
// main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { router } from '@/preset/router.js'
import App from '@/App.vue'
Vue.use(VueRouter)
Vue.use(Vuex)
new Vue({
  el: '#root',
  router,
  render: h => h(App)
})

```

### 代码规范与规范校验
全局安装commitlint
```
npm install -g @commitlint/config-conventional @commitlint/cli
```

>Commit message格式  
type: subject

>注意冒号后面有空格。type 用于说明 commit 的类别，只允许使用下面7个标识。
> - feat：新功能（feature）
> - fix：修补bug
> - docs：文档（documentation）
> - style： 格式（不影响代码运行的变动）
> - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
> - test：增加测试
> - chore：构建过程或辅助工具的变动
如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。

2、根目录下新建配置文件commitlint.config.js
```
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```
3、配合Husky
```
npm install husky --save-dev
npm audit fix
```
4、在package.json中配置Husky
```
"husky": {
  "hooks": {
    "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
  }
}
```

5、配置提交之前检查eslint
```
"husky": {
  "hooks": {
    "pre-commit": "eslint \"src/**/*.{js,ts,vue}\""
  }

}
```

## Vue组件自动化测试---UI测试框架storybook
>######  全局安装
```
npm i -g @storybook/cli
```
>###### 根路径下，初始化storiesbook初始化
```
npx -p @storybook/cli sb init
npm install --save core-js@2
npm install --save core-js@3
```
>###### 项目目录下获取 Storybook

```
getstorybook

npm run storebook
```
