<!-- 我的——工资 -->
<template>
	<view class="d-wage-container">
		<view class="d-wage-header-box">已发放：180000元</view>
		<view>
			<uni-list>
				<uni-list-item v-for="item in state.wages" :key="item.id" direction="column" clickable
					@click="handleTapItem(item)">
					<template #body>
						<view class="d-wage-item-header">
							<text class="d-wage-item-title">{{ item.title }}</text>
							<text class="d-wage-item-time">{{ item.createTime }}</text>
						</view>
					</template>
					<template #footer>
						<text class="d-wage-item-content">{{ item.content }}</text>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue'

	interface IState {
		wages: any[]
	}

	const state: IState = reactive({
		wages: [{
				id: 1,
				title: '现场动车调试行车调度管理规定C3',
				content: '现场动车调试行车调度管理规定C33-M3 V1.0',
				createTime: '2022-11-03'
			},
			{
				id: 2,
				title: '当数据量发电机房过分解读来看几个快递设计风格',
				content: '绝对是个积分的管理会计地方进度款拉萨进口量发送到国家法定龙山国际来看待时间公开雷锋精神都看过了就开始了感觉到官方公开',
				createTime: '2022-11-03'
			},
			{
				id: 3,
				title: '情侣空间即可龙珠觉醒颗粒剂',
				content: '都结束了公祭日就给了JDL扣发奖金看到了撒酒疯扩散了解放东路骨架拉肯德基撒库拉结果发生的快乐感觉',
				createTime: '2022-11-04'
			}
		]
	})

	/** 点击列表 */
	const handleTapItem = (item: any) => {
		uni.navigateTo({
			url: `/pages/user/wage/detail?message=${JSON.stringify(item)}`
		})
	}
</script>

<style lang="scss" scoped>
	.d-wage-container {
		height: 100%;
		background-color: $uni-bg-color;
	}

	.d-wage-header-box {
		text-align: center;
		padding: 20rpx 0;
	}

	.d-wage-item-header {
		display: flex;
		justify-content: space-around;

		.d-wage-item-title {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			flex: 7;
		}

		.d-wage-item-time {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			flex: 3;
			font-size: 28rpx;
			color: #999;
			text-align: right;
		}
	}

	.d-wage-item-content {
		font-size: 24rpx;
		color: #999;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
