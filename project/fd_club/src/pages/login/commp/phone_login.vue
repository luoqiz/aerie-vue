<script lang="ts" setup>
import { getCaptchaImageAPI } from '@/service/login'
import { useMemberStore } from '@/store/member'
import type { UserLoginVO } from '@/types/login'
import { ref } from 'vue'

const imageInfo = ref({})
// 获取图片验证码
onLoad(async () => {
  // 获取图片验证码
  const res = await getCaptchaImageAPI()
  imageInfo.value = res.data
})

// 传统表单登录，测试账号：13123456789 密码：123456
const form = ref<UserLoginVO>({
  username: '18141916702',
  password: '',
  captcha: '',
  uuid: '',
})

const memberStore = useMemberStore()
form.value.uuid = imageInfo.value.uuid
// 表单提交
const onSubmit = async () => {
  const res = await memberStore.login(form.value)
  loginHandler(res)
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
</script>
<template>
  <view class="login">
    <!-- 网页端表单登录 -->
    <input v-model="form.username" class="input" type="text" placeholder="请输入用户名/手机号码" />
    <input v-model="form.password" class="input" type="text" password placeholder="请输入密码" />
    <input v-model="form.captcha" class="input" type="text" password placeholder="请输入验证码" />
    <wd-img :width="111" :height="36" :src="imageInfo.img" />
    <button @tap="onSubmit" class="button phone">登录</button>
  </view>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;

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
</style>
