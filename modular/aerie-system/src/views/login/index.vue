<script setup lang="ts">
import { useUserStore } from '@aerie-module/base';

const userStore = useUserStore();
const changUser = () => {
  userStore.setUser('更改用户了')
}
</script>
<template>
  <div class="">
    <button @click="changUser"> 更改用户</button>
  </div>
</template>
<style lang="scss" scoped></style>
