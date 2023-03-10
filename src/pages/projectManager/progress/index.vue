<!-- 项目管理——项目进度 -->
<template>
	<view class="d-progress-container">
		<view class="d-progress-header">当前项目总进度：44.5%</view>
		<Filter type="status" @change="handleFilterChange" />
		<view class="d-progress-body-box">
			<view v-for="(item, index) in state.progresses" :key="item.id" class="d-progress-item"
				@click="handleTapItem(item)">
				<view class="d-progress-item-header" :class="{
            default_bg_color: item.status === '未开始',
            primary_bg_color: item.status === '进行中',
            success_bg_color: item.status === '已结束'
          }">
					<view class="d-progress-item-sort">
						<text class="d-progress-item-sort-text">{{ index + 1 }}</text>
					</view>
					<text class="d-progress-item-title">{{ item.title }}</text>
				</view>
				<view class="d-progress-item-panel">
					<text class="d-progress-label">起止时间：</text>
					<text class="d-progress-content">{{ item.timeRange }}</text>
				</view>
				<view class="d-progress-item-panel">
					<text class="d-progress-label">进度状态：</text>
					<text class="d-progress-content">{{ item.status }}</text>
				</view>
				<view class="d-progress-item-panel">
					<text class="d-progress-label">子任务数：</text>
					<text class="d-progress-content">{{ item.completeTask }}/{{ item.totalTask }}</text>
				</view>
				<progress :percent="parseInt(((item.completeTask / item.totalTask) * 100).toString())" show-info
					:activeColor="progressColor[item.status]" stroke-width="5"></progress>
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
				totalTask: 5,
				completeTask: 5
			},
			{
				id: 2,
				title: '轨旁设备安装',
				timeRange: '2022-10-23 ~ 2022-11-29',
				status: '进行中',
				totalTask: 3,
				completeTask: 1
			},
			{
				id: 3,
				title: '室内设备安装',
				timeRange: '2022-10-13 ~ 2022-12-12',
				status: '未开始',
				totalTask: 6,
				completeTask: 0
			}
		]
	})

	const progressColor: any = {
		已结束: '#32c297',
		进行中: '#007aff'
	}

	/** 筛选变化 */
	const handleFilterChange = (content: any) => {
		console.log(111, content)
	}

	const handleTapItem = (item: any) => {
		uni.navigateTo({
			url: `/pages/projectManager/progress/subProgress/index?process=${JSON.stringify(item)}`
		})
	}
</script>

<style lang="scss" scoped>
	.d-progress-container {
		height: 100%;
		background-color: $uni-bg-color;
	}

	.d-progress-header {
		text-align: center;
		padding: 20rpx 0;
		font-size: 24rpx;
	}

	.d-progress-body-box {
		padding: 20rpx;
	}

	.d-progress-item {
		margin-bottom: 20rpx;
		width: 100%;
		background-color: $uni-bg-color-white;

		.d-progress-item-header {
			display: flex;
			align-items: center;
			height: 80rpx;
			padding: 0 10rpx;

			.d-progress-item-sort {
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				background-color: rgba(0, 0, 0, 0.05);
				text-align: center;
				line-height: 60rpx;

				.d-progress-item-sort-text {
					text-align: center;
				}
			}

			.d-progress-item-title {
				font-size: 28rpx;
				margin-left: 20rpx;
			}
		}

		.d-progress-item-panel {
			padding: 0 10rpx;

			.d-progress-label {
				font-size: 28rpx;
				color: rgba(140, 140, 140, 1);
			}

			.d-progress-content {
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
