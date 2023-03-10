<template>
	<view class="d-wage-dtl-container">
		<uni-list>
			<uni-list-item title="标题" direction="column" :note="message.title" />
			<uni-list-item title="时间" direction="column" :note="message.createTime" />
			<uni-list-item title="内容" direction="column" :note="message.content" />
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
	.d-wage-dtl-container {
		height: 100%;
	}
</style>
