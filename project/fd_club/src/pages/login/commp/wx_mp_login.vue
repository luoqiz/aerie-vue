<script setup lang="ts">
import { socialAuthRedirectApi } from '@/service/login'
import type { TokenType } from '@/types/login'
import { checkJsApi, getCode, isWechatBrowser } from '@/utils/wxUtil'
import { onLoad } from '@dcloudio/uni-app'
// import wxJsapi from 'weixin-jsapi-zxt'

// 第三方登录时需要的code
let code = ''

// web端提供方法
onLoad(async () => {
  // 当处于微信内置浏览器时执行
  // if (isWechatBrowser()) {
  //   wxWebLogin()
  //   checkJsApi()
  // }
})

// 在微信内部浏览器中的微信登录
const wxWebLogin = async () => {
  code = getCode() ?? ''
  if (code === '') {
    return
  }
  const userInfo: TokenType = await socialAuthRedirectApi(31, code)

  if (userInfo.id === undefined || userInfo.id === null) {
    open()
  } else {
    loginHandler(true)
  }
}

// 登录后的处理
const loginHandler = (isSuccess: boolean) => {
  // 保存会员信息
  // const memberStore = useMemberStore()
  // memberStore.setProfile(profile)
  if (isSuccess) {
    // 成功提示
    uni.showToast({ icon: 'success', title: '登录成功' })
    setTimeout(() => {
      // 页面跳转
      uni.switchTab({ url: '/pages/my/my' })
      // uni.navigateBack();
    }, 500)
  } else {
    uni.showToast({ icon: 'error', title: '登陆失败' })
  }
}

// const getPhoneNumber = () => {
//   wxJsapi.openAddress({
//     success: function (res: any) {
//       // 成功获取手机号码后的回调函数
//       // let tel = res.telNumber;  // 获取手机号码
//       console.log('-- 获取手机号码 成功 --', JSON.stringify(res))
//     },
//     fail: function (res: any) {
//       // 授权失败后的回调函数
//       console.log('-- 获取手机号码 失败 --', JSON.stringify(res))
//     },
//   })
// }

// 获取用户手机号码
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  const { encryptedData, iv } = ev.detail
  console.log('ev---', ev)
  // const res = await postLoginWxMinAPI({ code, encryptedData, iv })
  // loginSuccess(res.result)
}
</script>

<template>
  <view class="login">
    <!-- 网页端表单登录 -->
    <!-- 网页端#ifdef H5 -->
    <!-- <input v-model="form.username" class="input" type="text" placeholder="请输入用户名/手机号码" />
        <input v-model="form.password" class="input" type="text" password placeholder="请输入密码" />
        <button @tap="onSubmit" class="button phone">登录</button> -->
    <!-- <button @tap="wxWebLogin" class="button phone">微信登录</button> -->
    <!--<button @tap="getPhoneNumber" class="button phone">获取手机号码</button>-->
    <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">
      <text class="icon icon-phone"></text>
      手机号快捷登录
    </button>
  </view>
</template>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    border: 1px solid #ddd;
    border-radius: 72rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    color: #fff;
    border-radius: 72rpx;
    .icon {
      margin-right: 6rpx;
      font-size: 40rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      position: relative;
      width: 440rpx;
      font-size: 26rpx;
      line-height: 1;
      color: #999;
      border-top: 1rpx solid #ddd;
      text {
        position: absolute;
        top: -12rpx;
        left: 50%;
        background-color: #fff;
        transform: translate(-40%);
      }
    }

    .options {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
        &::after {
          border: none;
        }
      }
    }

    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 24rpx;
      color: #444;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      color: #06c05f;
      border-color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  right: 20rpx;
  bottom: 80rpx;
  left: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
