import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/', // 基础路径
  timeout: 5000
})
// 请求拦截器：请求做些事情
// config 是每次请求的配置对象
// 必须返回config
request.interceptors.request.use(
  function (config) {
    // 每次请求都会执行
    // 发送请求之前做什么
    // 登录了 所有请求都加上Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    return error
  }
)
export default request
