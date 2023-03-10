<template>
  <view class="d-msg-dtl-container">
    <uni-list>
      <uni-list-item
        title="消息名称"
        direction="column"
        :note="message.title"
      />
      <uni-list-item
        title="推送时间"
        direction="column"
        :note="message.createTime"
      />
      <uni-list-item
        title="首次阅读时间"
        direction="column"
        :note="message.readTime"
      />
      <uni-list-item
        title="消息内容"
        direction="column"
        :note="message.content"
      />
    </uni-list>
  </view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'

	let message = ref({
		title: '',
		content: '',
		createTime: '',
		readTime: '',
	})

	onLoad((options: any) => {
		message.value = { ...JSON.parse(options.message), }
	})
</script>

<style lang="scss" scoped>
	.d-msg-dtl-container {
		background-color: rgba(249, 249, 249, 1);
		height: 100%;
	}
</style>
