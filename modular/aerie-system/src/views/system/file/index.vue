<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const toDict = () => {
  router.push('/system/dict')
}

</script>
<template>
  <div class="">
    这是file 文件
  </div>
  <button @click="toDict">
    跳转到dict页面
  </button>
</template>
<style lang="scss" scoped></style>
