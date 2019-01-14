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
