<script lang="ts" setup>
import { useMemberStore } from '@/store'

const logout = () => {
  const memberStore = useMemberStore()
  memberStore.logout()
  setTimeout(() => {
    // 页面跳转
    uni.switchTab({ url: '/pages/my/my' })
  }, 500)
}
</script>

<template>
  <view>
    <button @click="logout">退出登录</button>
  </view>
</template>

<style lang="scss" scoped></style>
