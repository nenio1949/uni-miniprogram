<template>
  <view class="d-nomatch-container">
    {{ content }}
  </view>
</template>

<script setup lang="ts">
  import { withDefaults, defineProps } from 'vue'
  interface IProps {
    content?: string
  }
  withDefaults(defineProps<IProps>(), {
    content: '暂无数据'
  })
</script>

<style lang="scss" scoped>
  .d-nomatch-container {
    padding: 20rpx;
    text-align: center;
    font-size: 28rpx;
    color: rgb(191, 191, 191, 1);
  }
</style>
