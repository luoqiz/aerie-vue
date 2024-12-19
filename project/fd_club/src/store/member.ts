import {
  getUserInfoAPI,
  loginApi,
  loginWxMiniAPI,
  logoutAPI,
  refreshTokenApi,
} from '@/service/login'
import type { TokenType, UserLoginVO, UserVO, WxMiniLoginVo } from '@/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore('member', {
  state() {
    // 会员信息
    const profile = ref<UserVO>()

    const token = ref<string>()

    // 登陆后返回的认证信息
    const tokenInfo = ref<TokenType>({
      accessToken: '',
      refreshToken: '',
      id: 0,
      userId: 0,
      userType: 0,
      clientId: '',
      expiresTime: 0,
    })

    return {
      profile,
      tokenInfo,
    }
  },
  getters: {
    getToken: (state) => state.tokenInfo?.accessToken,
    isLogin: (state): boolean => !!state.tokenInfo.accessToken,
    getAuthorization: (state) => {
      return state.tokenInfo.accessToken
        ? { authorization: `Bearer ${state.tokenInfo.accessToken}` }
        : {}
    },
  },
  actions: {
    // 保存会员信息，登录时使用
    // setProfile(val: UserVO) {
    // this.profile.value = val;
    // },
    // 清理会员信息，退出时使用
    clearProfile() {
      this.profile = undefined
      this.tokenInfo = {
        accessToken: '',
        refreshToken: '',
        id: 0,
        userId: 0,
        userType: 0,
        clientId: '',
        expiresTime: 0,
      }
    },
    async login(user: UserLoginVO) {
      this.token = await loginApi(user)
      if (
        this.tokenInfo !== undefined &&
        this.tokenInfo.accessToken !== undefined &&
        this.tokenInfo.accessToken !== ''
      ) {
        await this.getUserInfo()
        return true
      } else {
        return false
      }
    },

    async refreshToken() {
      this.tokenInfo = await refreshTokenApi(this.tokenInfo!.refreshToken!)
      console.log(this.tokenInfo!.accessToken)
      if (
        this.tokenInfo !== undefined &&
        this.tokenInfo.accessToken !== undefined &&
        this.tokenInfo.accessToken !== ''
      ) {
        return true
      } else {
        return false
      }
    },
    async wxMiniLogin(data: WxMiniLoginVo) {
      this.tokenInfo = await loginWxMiniAPI(data)
      if (
        this.tokenInfo !== undefined &&
        this.tokenInfo.accessToken !== undefined &&
        this.tokenInfo.accessToken !== ''
      ) {
        return true
      } else {
        return false
      }
    },
    async getUserInfo() {
      this.profile = await getUserInfoAPI()
    },
    async logout() {
      logoutAPI()
      this.profile = undefined
      this.tokenInfo = {}
    },
  },
  // TODO: 持久化
  persist: {
    storage: {
      getItem(key) {
        return uni.getStorageSync(key)
      },
      setItem(key, value) {
        uni.setStorageSync(key, value)
      },
    },
  },
})
