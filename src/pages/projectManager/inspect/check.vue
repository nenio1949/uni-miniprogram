<template>
	<view class="d-inspect-check-container">
		<view>
			<uni-list>
				<uni-list-item title="检查类型" rightText="项目部周检" />
				<uni-list-item title="检查人" rightText="欧志龙/林全青" />
				<uni-list-item title="检查状态" rightText="检查中" />
				<uni-list-item title="计划开始时间" rightText="2022-10-23" />
				<uni-list-item title="计划结束时间" rightText="2022-10-29" />
				<uni-list-item title="备注" direction="column">
					<template #footer>
						<text class="d-inspect-danger-item-content">检查各现场施工人员安全帽、安全鞋及作业是否符合管理规范。</text>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="d-inspect-check-panel">
			<view class="d-inspect-check-panel-title">被检查人</view>
			<view class="d-inspect-check-btn-box">
				<view class="d-inspect-check-user-box">
					<view v-for="(user) in state.inspect.users" :key="user.id" class="d-inspect-check-user-item">
						<text class="d-inspect-check-user-text">{{user.name}}</text>
						<uni-icons type="closeempty" size="16" color="#999999" @click="handleDeleteUser(user)" />
					</view>
				</view>
				<button type="primary" plain>扫码添加被检查人</button>
			</view>
		</view>
		<view class="d-inspect-check-panel">
			<view class="d-inspect-check-panel-title">关联隐患项</view>
			<uni-list>
				<uni-list-item v-for="item in state.inspect.dangers" direction="column">
					<template #body>
						<view class="d-inspect-danger-item-header">
							<text class="d-inspect-danger-item-title">{{ item.title }}</text>
							<text class="d-inspect-danger-item-time">{{ item.createTime }}</text>
						</view>
					</template>
					<template #footer>
						<text class="d-inspect-danger-item-content">{{ item.content }}</text>
					</template>
				</uni-list-item>
			</uni-list>
			<view class="d-inspect-check-btn-box">
				<button type="primary" plain @click="handleTapAddDanger">添加隐患记录</button>
			</view>
		</view>
	</view>
	<view style="position: fixed;bottom: 0;width:100%;background-color: white;">
		<button type="warn" style="margin:20rpx;">结束本次检查</button>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive
	} from 'vue'

	interface IState {
		inspect: any
	}

	const state: IState = reactive({
		inspect: {
			users: [{
				id: 1,
				name: '张三',
			}, {
				id: 2,
				name: '李四'
			}, {
				id: 3,
				name: '张三',
			}, {
				id: 4,
				name: '李四'
			}, {
				id: 5,
				name: '张三',
			}, {
				id: 6,
				name: '李四'
			}],
			dangers: [{
				id: 1,
				title: '人员上岗培训不全面',
				content: '施工方的演练报告未存档齐全，尽快补充存档齐全。',
				createTime: '2022-11-03'
			}, {
				id: 2,
				title: '人员上岗培训不全面',
				content: '施工方的演练报告未存档齐全，尽快补充存档齐全。',
				createTime: '2022-11-03'
			}, {
				id: 3,
				title: '人员上岗培训不全面',
				content: '施工方的演练报告未存档齐全，尽快补充存档齐全。',
				createTime: '2022-11-03'
			}],
		}
	})

	/** 删除用户 */
	const handleDeleteUser = (user: any) => {
		const index = state.inspect.users.findIndex((s: any) => s = user)
		state.inspect.users.splice(index, 1)
	}

	const handleTapAddDanger = () => {
		uni.navigateTo({
			url: '/pages/rule/hiddenDanger/create'
		})
	}
</script>

<style lang="scss" scoped>
	.d-inspect-check-container {
		padding-bottom: 150rpx;
		background-color: $uni-bg-color;
	}

	.d-inspect-check-panel {
		margin-top: 40rpx;

		&-title {
			padding: 20rpx;
		}
	}

	.d-inspect-check-btn-box {
		padding: 30rpx;
		background-color: $uni-bg-color-white;

		.d-inspect-check-user-box {
			display: flex;
			padding: 20rpx 0;
			flex-wrap: wrap;
			justify-content: flex-start;

			.d-inspect-check-user-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: row;
				background-color: rgba(230, 247, 255, 1);
				margin-right: 20rpx;
				padding: 0 10rpx;
				border: 1rpx solid #1890FF;
				border-radius: 10rpx;
				margin-bottom: 20rpx;

				.d-inspect-check-user-text {
					color: #1890FF;
					font-size: 20rpx;
					margin-right: 10rpx;
				}
			}
		}
	}

	.d-inspect-danger-item-header {
		display: flex;
		justify-content: space-around;

		.d-inspect-danger-item-title {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			flex: 7;
			font-size: 28rpx;
		}


		.d-inspect-danger-item-time {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			flex: 3;
			font-size: 28rpx;
			color: #999;
			text-align: right;
		}
	}

	.d-inspect-danger-item-content {
		font-size: 24rpx;
		color: #999;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
