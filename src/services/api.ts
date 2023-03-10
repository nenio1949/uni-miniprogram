import request from './request'

// 公共模块开始
/** 登录 */
const login = async (datas: object) => {
  return request('/api/jwt/login', 'POST', datas)
}
/** 获取当前登录用户信息 */
const getCurrentUserInfo = async () => {
  return request('/api/web/users/info', 'GET')
}
// 公共模块结束

export default {
  login,
  getCurrentUserInfo
}
