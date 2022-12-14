import axios from 'axios'
// @ts-ignore
import {message} from 'ant-design-vue'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// import axiosRetry from 'axios-retry'
// @ts-ignore
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?
// 'https://supermeoki/data_admin' :
// 'https://127.0.0.1:10020/data_admin'

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://supermeoki.xyz/data_admin'
    : 'http://127.0.0.1:10020/data_admin',
  timeout: 15 * 1000, // 设置请求超时时间
  retryDelay: 1000, // 超时请求
  retry: 4 // 超时重新触发请求次数
})

// 请求拦截
const requestWhiteList = ['/login', '/register', '/getFullViews', '/getUniqueViews'] // 请求白名单
// let responseWhiteList = [] // 响应白名单
axiosInstance.interceptors.request.use((config) => {
  Nprogress.start() // 添加请求进度条
  if (requestWhiteList.includes(config.url)) {
    return config
  }
  const userInfo = {
    id: JSON.parse(localStorage.getItem('userInfo')).id || ''
  }
  const token = window.localStorage.getItem('token')
  if (!config.headers) {
    config.headers = {}
  } else {
    // 区分上传接口和普通接口
    if (config.url === '/uploadFile') {
      // 以formData上传时请求头Content-Type类型要改为multipart/form-data
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    config.headers.authorization = token
    // 暂时不能使用中文做中文名  header不能写入中文  需要传入时进行过滤  后期做处理
    config.headers = {
      authorization: token,
      userInfo: JSON.stringify(userInfo)
    }
  }
  return config
}, (err) => {
  message.error(err)
  console.log('=====>请求拦截失败:', err)
  Nprogress.done() // 结束请求进度条
})

// 响应拦截

axiosInstance.interceptors.response.use((config) => {
  const { data } = config
  if (!data.success) {
    message.error(data.message)
    Nprogress.done() // 结束请求进度条
    return
  }
  // 需要添加token等   登录信息失效  跳转 /login

  Nprogress.done() // 结束请求进度条
  return config
}, (err) => {
  // 设置超时请求
  // let config = err.config;
  Nprogress.done()
  // 暂时注释
  // if (!config || !config.retry) return Promise.reject(err);

  // config.__retryCount = config.__retryCount || 0;

  // if (config.__retryCount >= config.retry) {
  //     return Promise.reject(err);
  // }

  // config.__retryCount += 1;
  // let backoff = new Promise<void>((resolve) => {
  //     setTimeout(function () {
  //         resolve();
  //     }, config.retryDelay || 1);
  // });
  // return backoff.then(function () {
  //     return axiosInstance(config);
  // });
  // console.log('=====>响应拦截失败', err.config)
  message.error(String(err)) // statusCode 不为200时   报相关异常信息
})

const request = axiosInstance
export default request
