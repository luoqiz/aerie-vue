export type UserRegisterrVO = {
  username?: string
  phone?: string
  password?: string
  password2?: string
  validateCode?: string
}

export type UserLoginVO = {
  username: string
  password: string
  captcha: string
  uuid: string
}

export type TokenType = {
  id?: number // 编号
  accessToken?: string // 访问令牌
  refreshToken?: string // 刷新令牌
  userId?: number // 用户编号
  userType?: number // 用户类型
  clientId?: string // 客户端编号
  expiresTime?: number // 过期时间
  socialUserId?: number // 第三方登录用户id
  openId?: string // 第三方登录用户标识
}

export type UserVO = {
  id: number
  username: string
  nickname: string
  remark: string
  deptId: number
  postIds: string
  email: string
  mobile: string
  sex: number
  avatar: string
  loginIp: string
  loginDate: string
  tenantId: number
}

export type UserInfoVO = {
  permissions: []
  roles: []
  user: {
    avatar: string
    id: number
    nickname: string
  }
}

export type TentantNameVO = {
  name: string
}

export interface CodeImgResult {
  captchaOnOff: boolean
  img: string
  uuid: string
}
export interface SmsCodeVO {
  mobile: string
  scene: number
}
export interface SmsLoginVO {
  mobile: string
  code: string
}

export interface WxMiniLoginVo {
  code: string
  iv: string
  encryptedData: string
  userEncryptedData?: string
  userIv?: string
}
