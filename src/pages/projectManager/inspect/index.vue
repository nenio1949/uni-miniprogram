<!-- 项目管理——现场检查 -->
<template>
	<view class="d-inspect-container">
		<Filter @change="handleFilterChange" />
		<view class="d-inspect-body-box">
			<view v-for="(item, index) in state.progresses" :key="item.id" class="d-inspect-item"
				@click="handleTapItem(item)">
				<view class="d-inspect-item-header" :class="{
            default_bg_color: item.status === '待检查',
            primary_bg_color: item.status === '检查中',
            success_bg_color: item.status === '已结束'
          }">
					<view class="d-inspect-item-sort">
						<text class="d-inspect-item-sort-text">{{ index + 1 }}</text>
					</view>
					<text class="d-inspect-item-title">{{ item.title }}</text>
				</view>
				<view class="d-inspect-item-panel">
					<text class="d-inspect-label">起止时间：</text>
					<text class="d-inspect-content">{{ item.timeRange }}</text>
				</view>
				<view class="d-inspect-item-panel">
					<text class="d-inspect-label">进度状态：</text>
					<text class="d-inspect-content">{{ item.status }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue'
	import Filter from '@/components/filter'

	interface IState {
		progresses: any[]
	}

	const state: IState = reactive({
		progresses: [{
				id: 1,
				title: '施工准备工作',
				timeRange: '2021-10-01 ~ 2022-10-31',
				status: '已结束',
			},
			{
				id: 2,
				title: '轨旁设备安装',
				timeRange: '2022-10-23 ~ 2022-11-29',
				status: '检查中',
			},
			{
				id: 3,
				title: '室内设备安装',
				timeRange: '2022-10-13 ~ 2022-12-12',
				status: '待检查',
			}
		]
	})

	/** 筛选变化 */
	const handleFilterChange = (content: any) => {
		console.log(111, content)
	}

	const handleTapItem = (item: any) => {
		uni.navigateTo({
			url: `/pages/projectManager/inspect/check?inspect=${JSON.stringify(item)}`
		})
	}
</script>

<style lang="scss" scoped>
	.d-inspect-container {
		height: 100%;
		background-color: $uni-bg-color;
	}

	.d-inspect-header {
		text-align: center;
		padding: 20rpx 0;
		font-size: 24rpx;
	}

	.d-inspect-body-box {
		padding: 20rpx;
	}

	.d-inspect-item {
		margin-bottom: 20rpx;
		width: 100%;
		background-color: $uni-bg-color-white;

		.d-inspect-item-header {
			display: flex;
			align-items: center;
			height: 80rpx;
			padding: 0 10rpx;

			.d-inspect-item-sort {
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				background-color: rgba(0, 0, 0, 0.05);
				text-align: center;
				line-height: 60rpx;

				.d-inspect-item-sort-text {
					text-align: center;
				}
			}

			.d-inspect-item-title {
				font-size: 28rpx;
				margin-left: 20rpx;
			}
		}

		.d-inspect-item-panel {
			padding: 0 10rpx;

			.d-inspect-label {
				font-size: 28rpx;
				color: rgba(140, 140, 140, 1);
			}

			.d-inspect-content {
				font-size: 28rpx;
				color: rgba(67, 67, 67, 1);
			}
		}
	}

	.default_bg_color {
		background-color: $uni-bg-color-default;
		color: $uni-text-color-default;
	}

	.primary_bg_color {
		background-color: $uni-bg-color-primary;
		color: $uni-text-color-primary;
	}

	.success_bg_color {
		background-color: $uni-bg-color-success;
		color: $uni-text-color-success;
	}
</style>
