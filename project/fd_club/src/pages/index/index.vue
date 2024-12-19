<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const author = ref('菲鸽')
// 测试 uni API 自动引入
onLoad(() => {
  console.log(author)
})

const value = ref<string>('')

function focus() {
  console.log('聚焦')
}
function blur() {
  console.log('失焦')
}
function search() {
  console.log('搜索')
}
function clear() {
  console.log('重置')
}
function cancel() {
  console.log('取消')
}
function change({ value }) {
  console.log('输入', value)
}
</script>

<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <wd-search
      v-model="value"
      @focus="focus"
      @blur="blur"
      @search="search"
      @clear="clear"
      @cancel="cancel"
      @change="change"
      :maxlength="10"
    />
    <view class="text-center text-4xl main-title-color mt-4">本周活动</view>
    <view class="mt-12">
      <view class="i-carbon-image-copy text-red text-6xl w-28 h-28 block mx-auto" />
    </view>
    <view class="text-center text-4xl main-title-color mt-4">摄影展示</view>

    <view class="text-center mt-8">
      当前平台是：
      <text class="text-green-500">{{ PLATFORM.platform }}</text>
    </view>
  </view>
</template>

<style>
.main-title-color {
  color: #d14328;
}
</style>
