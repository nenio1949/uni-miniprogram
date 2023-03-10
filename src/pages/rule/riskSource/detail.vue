<template>
	<view class="d-risk-dtl-container">
		<uni-list>
			<uni-list-item title="隐患名称" direction="column" :note="message.title" />
			<uni-list-item title="发现时间" direction="column" :note="message.createTime" />
			<uni-list-item title="隐患描述" direction="column" :note="message.content" />
		</uni-list>
	</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	let message = ref({
		title: '',
		content: '',
		createTime: '',
	})

	onLoad((options: any) => {
		message.value = {
			...JSON.parse(options.message)
		}
	})
</script>

<style lang="scss">
	.d-risk-dtl-container {
		background-color: rgba(249, 249, 249, 1);
		height: 100%;
	}
</style>
