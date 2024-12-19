<script setup lang="ts">
import PhoneLogin from './commp/phone_login.vue'
import WxMiniLogin from './commp/wx_mini_login.vue'
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="http://kite.web.luoqiz.top/logo.jpg" />
    </view>
    <view class="loginPannel">
      <!-- 网页端表单登录 -->
      <PhoneLogin></PhoneLogin>
      <navigator url="/pages-sub/register/register" hover-class="none">
        <view class="button">
          <text>注册</text>
        </view>
      </navigator>
      <!-- #ifdef H5 -->
      <!-- #endif -->
    </view>
    <view class="tips">登录/注册即视为你同意《服务条款》和《望川户外隐私协议》</view>
    <view class="extra">
      <view class="caption">
        <text>其他登录方式</text>
      </view>
      <view class="options">
        <!-- 小程序端授权登录 -->
        <!-- #ifdef MP-WEIXIN -->
        <!-- <WxMiniLogin></WxMiniLogin> -->
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
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

.loginPannel {
  flex-direction: column;
  padding: 40rpx 20rpx;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #fff;
    background-color: #06c05f;
    border-radius: 72rpx;
  }
}
.wechat {
  background-color: #06c05f;
}
.tips {
  bottom: 20rpx;
  // text-align: center;
  margin: 36rpx 36rpx;
  font-size: 22rpx;
  color: #999;
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

.tips1 {
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
