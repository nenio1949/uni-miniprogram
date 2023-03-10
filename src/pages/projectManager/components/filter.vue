<template>
	<view class="d-filter-container">
		<view class="d-filter-content" :style="{ color: state.content ? '#000' : '#b2afaf' }">
			{{ state.content || '暂无筛选条件，若需筛选请点击右侧筛选项' }}
		</view>
		<image src="../static/images/filter.png" class="d-filter-icon" @click="handleTap" />
	</view>
	<uni-popup ref="popup" type="dialog">
		<uni-popup-dialog mode="input" title="关键词" :value="state.content" placeholder="请输入条目关键词模糊搜索"
			@confirm="handleSubmit" />
	</uni-popup>
</template>
<script setup lang="ts">
	import {
		ref,
		reactive
	} from 'vue'

	interface IState {
		content ? : string
		status ? : any[]
	}
	const popup = ref < any > (null)
	const emits = defineEmits(['change'])

	const state: IState = reactive({
		content: '',
		status: []
	})

	const handleTap = () => {
		popup.value.open()
	}

	/** 输入内容提交 */
	const handleSubmit = (value: any) => {
		state.content = value
		emits('change', value)
	}
</script>

<style lang="scss" scoped>
	.d-filter-container {
		display: flex;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		align-items: center;

		.d-filter-content {
			width: 85%;
			padding: 5rpx 20rpx;
			border-radius: 20rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			font-size: 24rpx;
			background-color: #ededed;
		}

		.d-filter-icon {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>
