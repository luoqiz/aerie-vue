<script setup lang="ts">
import { useMemberStore } from '@/store/member'
import { onLoad } from '@dcloudio/uni-app'

// 第三方登录时需要的code
let code = ''

// 微信小程序提供方法
// 获取 code 登录凭证
onLoad(async () => {
  const res = await wx.login()
  code = res.code
  console.log(code)
})

// 获取用户手机号码
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev: any) => {
  const { encryptedData, iv } = ev.detail
  console.log('res----', ev)
  const memberStore = useMemberStore()
  const isSuccess = await memberStore.wxMiniLogin({
    code,
    encryptedData,
    iv,
    // userEncryptedData: res.encryptedData,
    // userIv:res.iv
  })
  if (isSuccess) {
    // 成功提示
    uni.showToast({ icon: 'success', title: '登录成功' })
    memberStore.getUserInfo()
    setTimeout(() => {
      // 页面跳转
      uni.switchTab({ url: '/pages/index/index' })
      // uni.navigateBack();
    }, 500)
  } else {
    uni.showToast({ icon: 'error', title: '登陆失败' })
  }
}
// const login = () => {
//     wx.getUserProfile({
//         desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
//         success: async (res:any) => {
//             console.log('res',res);

//         }
//     });
// };
</script>

<template>
  <view class="login">
    <!-- 小程序端授权登录 -->
    <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber">
      <text class="icon icon-phone"></text>
      手机号快捷登录
    </button>

    <!-- <button @click="login">登录</button> -->
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
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

.wrap {
  padding: 24rpx;
}
</style>
