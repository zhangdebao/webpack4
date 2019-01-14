const HOST = require('../../config/common').getHost() // 获取命令后缀
const _axios = require('axios') // 使用axios
const Qs = require('qs')
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
module.exports.get = function ({ url = '', params = {}, headers = {}, timeout = 5000, responseType }) {
  const promise = axios.get(url, { params, timeout, responseType })
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
  const promise = axios.post(url, null, {
    transformRequest: function (data) {
      return Qs.stringify(data, { arrayFormat: 'brackets' })
    },
    data,
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout
  })
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
