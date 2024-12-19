<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '注册',
  },
}
</route>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserRegisterrVO } from '../../types/login'
import { registerApi, sendRegisterSmsCodeApi } from '@/service/login'
import { useMemberStore } from '@/store/member'

const memberStore = useMemberStore()

const bindPhoneForm = ref<UserRegisterrVO>({
  phone: '',
  validateCode: '',
})

const bindPhoneFormRules = {
  // 对name字段进行必填验证
  phone: {
    rules: [
      {
        required: true,
        format: 'phone',
        errorMessage: '请输入手机号',
      },
      {
        minLength: 8,
        maxLength: 18,
        errorMessage: '请输入正确的手机号',
      },
    ],
  },
  // 对email字段进行必填验证
  valiCode: {
    rules: [
      {
        required: true,
        errorMessage: '请输入接收到的验证码',
      },
    ],
  },
}

let isSendSmsState = 0
const uCodeRef = ref<any>(null)
const tips = ref('')
const codeChange = (text: string) => {
  tips.value = text
}

const sendSmsCode = async () => {
  if (!bindPhoneForm.value.phone) {
    // uni.toast('请先填写手机号')
    return
  }
  if (uCodeRef.value.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码',
    })
    setTimeout(() => {
      uni.hideLoading()
      // 这里此提示会被start()方法中的提示覆盖
      // uni.$u.toast('验证码已发送');
      // 通知验证码组件内部开始倒计时
      uCodeRef.value.start()
    }, 2000)
  } else {
    // uni.$u.toast('倒计时结束后再发送')
    return
  }

  const isSuccess = await sendRegisterSmsCodeApi(bindPhoneForm.value.phone)
  if (isSuccess) {
    isSendSmsState = 1
  } else {
    isSendSmsState = 2
  }
}
// 表单提交
const onSubmit = async () => {
  console.log(bindPhoneForm.value)
  const res = await registerApi(bindPhoneForm.value)
  // loginHandler(res);
  if (res.data) {
    // 成功提示
    uni.showToast({ icon: 'success', title: '注册成功' })
    setTimeout(() => {
      // 页面跳转到上一级
      uni.navigateBack()
    }, 500)
  } else {
    uni.showToast({ icon: 'error', title: '注册失败，请稍后重试' })
  }
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="http://kite.web.luoqiz.top/logo.jpg" />
    </view>
    <view class="login">
      <!-- <uni-forms ref="bindPhoneFormRef" :modelValue="bindPhoneForm">
        <uni-forms-item label="验证码" name="valiCode">
          <uni-row>
            <uni-col>
              <uni-easyinput
                type="text"
                v-model="bindPhoneForm.valiCode"
                placeholder="请输入短信验证码"
              />
            </uni-col>
            <uni-col class="uno-mt-2">
              <view class="wrap">
                <u-toast ref="uToastRef"></u-toast>
                <u-code :seconds="60" ref="uCodeRef" @change="codeChange"></u-code>
                <u-button @tap="sendSmsCode">{{ tips }}</u-button>
              </view>
              <u-button size="small" @click="sendSms" v-show="isSendSmsState === 0">
                发送验证码
              </u-button>
              <u-button size="small" @click="sendSms" v-show="isSendSmsState === 1">
                重新发送
              </u-button>
              <u-toast ref="uToast"></u-toast>
            </uni-col>
          </uni-row>
        </uni-forms-item>
      </uni-forms> -->
      <wd-form ref="bindPhoneFormRef" :model="bindPhoneForm">
        <wd-cell-group border>
          <wd-input
            label="手机号"
            label-width="100px"
            prop="value1"
            clearable
            v-model="bindPhoneForm.phone"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请输入手机号' }]"
          />

          <wd-input
            label="密码"
            label-width="100px"
            prop="password"
            show-password
            clearable
            v-model="bindPhoneForm.password"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
          <wd-input
            label="确认密码"
            label-width="100px"
            prop="password2"
            show-password
            clearable
            v-model="bindPhoneForm.password2"
            placeholder="请再次输入密码"
            :rules="[{ required: true, message: '请再次输入密码' }]"
          />
        </wd-cell-group>
        <view class="footer">
          <wd-button type="primary" size="large" @click="onSubmit" block>提交</wd-button>
        </view>
      </wd-form>
      <!-- <button @tap="onSubmit" class="button phone">注册</button> -->
    </view>
    <view class="tips">登录/注册即视为你同意《服务条款》和《望川户外隐私协议》</view>
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
    margin-top: 10vh;
  }
}
.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
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
    background-color: blue;
    border-radius: 72rpx;
    .icon {
      margin-right: 6rpx;
      font-size: 40rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
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

.wrap {
  padding: 24rpx;
}
</style>
