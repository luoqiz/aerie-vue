import { http } from '@/utils/http'
import type {
  SmsCodeVO,
  SmsLoginVO,
  TokenType,
  UserLoginVO,
  UserRegisterrVO,
  WxMiniLoginVo,
} from '../../types/login'

const urlPrefix = '/system/api/v1'

// 登录
export const loginApi = (data: UserLoginVO) => {
  return http.post('/auth/account', { data })
}

// 退出登录
export const logoutAPI = () => {
  return http.get(urlPrefix + '/auth/logout')
}

// 注册
export const registerApi = (data: UserRegisterrVO) => {
  return http.post('/auth/account/register', { data })
}

// 刷新访问令牌
export const refreshTokenApi = (refreshToken: string) => {
  return http.post('/admin-api/system/auth/refresh-token?refreshToken=' + refreshToken)
}

// 使用租户名，获得租户编号
export const getTenantIdByNameApi = (name: string) => {
  return http.get('/admin-api/system/tenant/get-id-by-name?name=' + name)
}

// 获取用户权限信息
export const getInfoApi = () => {
  return http.get(urlPrefix + '/system/auth/get-permission-info')
}

// 路由
export const getAsyncRoutesApi = () => {
  return http.get(urlPrefix + '/system/auth/list-menus')
}

// 获取登录验证码
export const sendSmsCodeApi = (data: SmsCodeVO) => {
  return http.post(urlPrefix + '/system/auth/send-sms-code', { data })
}

// 短信验证码登录
export const smsLoginApi = (data: SmsLoginVO) => {
  return http.post(urlPrefix + '/system/auth/sms-login', { data })
}

// 社交授权的跳转
// type  查看后台的 SocialTypeEnum
export const socialAuthRedirectApi = async (type: number, code: string) => {
  return await http.get<TokenType>(
    urlPrefix + '/auth/social/redirect?type=' + type + '&code=' + code,
  )
}

// 发送第三方绑定的手机验证码
export const sendRegisterSmsCodeApi = (phone: string) => {
  return http.get('/msg/api/v1/send/register/code', {
    phone,
  })
}

// 将第三方用户信息和本系统内用户绑定
export const bindUser = (socialUserId: string, phone: string, code: string) => {
  return http.get(urlPrefix + '/social/bind', {
    socialUserId,
    phone,
    code,
  })
}

// 微信小程序登录
export const loginWxMiniAPI1 = (data: WxMiniLoginVo) => {
  return http.post(urlPrefix + '/auth/wxLogin', { data })
}

// 微信小程序登录
export const loginWxMiniAPI = (data: WxMiniLoginVo) => {
  return http.post('/oauth/register/wechat_mini_program', { data })
  // return http.post('/oauth/gitee', { data })
}

// 获取用户信息
export const getUserInfoAPI = () => {
  return http.get(urlPrefix + '/user/info')
}

// 获取图片验证码
export const getCaptchaImageAPI = () => {
  return http.get('/captcha/image')
}
