<template>
	<view class="d-filter-container">
		<view class="d-filter-content" :style="{ color: state.content ? '#000' : '#b2afaf' }">
			{{ state.content || '暂无筛选条件，若需筛选请点击右侧筛选项' }}
		</view>
		<image src="../static/images/filter.png" class="d-filter-icon" @click="handleTap" />
	</view>
	<uni-popup ref="filterPopup" type="bottom">
		<view class="d-filter-popup-container">
			<view class="d-filter-popup-title-box">
				<uni-icons type="closeempty" size="25" class="d-filter-popup-close" @click="handleClose" />
				<text class="d-filter-popup-title">选择筛选条件</text>
			</view>
			<view class="d-filter-popup-form-box">
				<uni-forms>
					<uni-forms-item label="关键词">
						<uni-easyinput placeholder="请输入关键词模糊搜索" v-model="state.content" :inputBorder="false" />
					</uni-forms-item>
					<uni-forms-item v-if="props.type==='status'" label="状态">
						<uni-data-checkbox v-model="state.status" multiple :localdata="statusList" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="d-filter-popup-btn-box">
				<button type="primary" @click="handleSubmit">立即筛选</button>
			</view>
		</view>
	</uni-popup>
</template>
<script setup lang="ts">
	import {
		ref,
		reactive,
		withDefaults,
		defineProps
	} from 'vue'

	interface IProps {
		type ? : 'keyword' | 'status'
	}

	interface IState {
		content ? : string
		status ? : string[]
	}

	const statusList = [{
		text: '已结束',
		value: 'success'
	}, {
		text: '进行中',
		value: 'process'
	}, {
		text: '未开始',
		value: 'default'
	}]
	const filterPopup = ref < any > (null)
	const emits = defineEmits(['change'])

	const props = withDefaults(defineProps < IProps > (), {
		type: 'keyword'
	})

	const state: IState = reactive({
		content: '',
		status: [],
	})

	/** 点击筛选按钮弹出筛选框 */
	const handleTap = () => {
		filterPopup.value.open()
	}
	/** 关闭弹出框 */
	const handleClose = () => {
		filterPopup.value.close()
	}

	/** 输入内容提交 */
	const handleSubmit = () => {
		emits('change', state.content)
		filterPopup.value.close()
	}
</script>

<style lang="scss" scoped>
	.d-filter-container {
		display: flex;
		justify-content: space-between;
		padding: 10rpx 20rpx;
		align-items: center;
		background-color: $uni-bg-color-white;

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

	.d-filter-popup-container {
		background-color: $uni-bg-color-white;

		.d-filter-popup-title-box {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #c6c6c6;

			.d-filter-popup-close {
				width: 50rpx;
				padding: 0 20rpx;
			}

			.d-filter-popup-title {
				flex: 8;
				padding-right: 90rpx;
				text-align: center;
			}
		}

		.d-filter-popup-form-box {
			padding: 20rpx;
		}

		.d-filter-popup-btn-box {
			padding: 20rpx;
		}
	}
</style>
