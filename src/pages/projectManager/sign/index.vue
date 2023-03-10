<!-- 项目管理——打卡 -->
<template>
	<view class="d-sign-container">
		<image src="../../../static/images/sign-bg.png" class="d-sign-bg" />
		<view class="d-sign-header">
			<view class="d-sign-title">质量是交通建设的灵魂和生命</view>
			<view class="d-sign-desc">已坚持打卡<text class="d-sign-desc-red">{{state.totalSignDays}}</text>天</view>
		</view>
		<view class="d-sign-body">
			<view class="d-sign-date-box">
				<view v-for="(item) in state.dates" :key="item.day" class="d-sign-date-item">
					<view class="d-sign-date-weekday" :class="item.weekDay==='今天'&&'d-sign-date-weekday-active'">
						{{item.weekDay}}
					</view>
					<view class="d-sign-date-day" :class="item.selected&&'d-sign-date-day-active'">{{item.day}}</view>
				</view>
			</view>
			<view class="d-sign-address">当前位置：{{state.address}}</view>
			<view class="d-sign-textarea-box">
				<view class="d-sign-textarea" @click="handleSign">
					<view class="d-sign-textarea-title">打卡签到</view>
					<view class="d-sign-textarea-time">{{state.currentTime}}</view>
				</view>
				<!-- <view class="animate-wave">
					<view class="w1"></view>
					<view class="w2"></view>
					<view class="w3"></view>
					<view class="w4"></view>
					<view class="w5"></view>
					<view class="w6"></view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		onUnmounted
	} from 'vue'
	import {
		onLoad,
	} from '@dcloudio/uni-app'
	// #ifdef MP-WEIXIN
	import amap from '../../../utils/amap-wx.130'
	// #endif

	let timeInterval = 0

	interface IState {
		amapPlugin: any
		totalSignDays: number
		hasSigned: boolean
		currentTime: string
		dates: any[]
		address: any
	}
	const state: IState = reactive({
		amapPlugin: null,
		totalSignDays: 36,
		hasSigned: false,
		currentTime: '',
		dates: [],
		address: ''
	})

	onLoad(() => {
		generateTime()
		generateDate();
		// #ifdef MP-WEIXIN
		state.amapPlugin = new amap.AMapWX({
			key: '63a5fd4b7d16f5059672f78ee838e94a'
		})
		// #endif
	})

	onUnmounted(() => {
		clearInterval(timeInterval)
	})

	/** 构造时间 */
	const generateTime = () => {
		timeInterval = setInterval(() => {
			let date = new Date()
			let hour = date.getHours()
			let minute = date.getMinutes()
			let second = date.getSeconds()
			state.currentTime = hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2,
				'0') + ':' + second.toString().padStart(2, '0')
		}, 1000)
	}

	const chineseWeekDayEnum: any = {
		0: "日",
		1: "一",
		2: "二",
		3: "三",
		4: "四",
		5: "五",
		6: "六",
	};

	/** 组装日期数据 */
	const generateDate = () => {
		let datas = []
		let date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate() // 今天是当月第几天
		let monthDays = new Date(year, month, 0).getDate() // 当月天数
		let latestDayWithWeekDay = new Date(
			Date.parse(year + '-' + month + "-" + monthDays)
		).getDay(); // 当月最后一天是周几
		if (day > 3 && monthDays - day > 2) { //只显示当月日期
			for (let i = day - 3; i < day + 4; i++) {
				datas.push({
					day: i,
					weekDay: i === day ? '今天' : chineseWeekDayEnum[new Date(
						Date.parse(year + '-' + month + '-' + i)
					).getDay()],
					selected: i % 2 === 0
				})
			}
		} else {
			if (day <= 3) { // 显示上月及当月日期
				let lastMonthYear = month === 1 ? year - 1 : year;
				let lastMonth = month === 1 ? 12 : month - 1;
				let lastMonthDays = new Date(
					lastMonthYear,
					lastMonth,
					0
				).getDate(); // 获取上一月总天数

				for (let i = lastMonthDays - (3 - day); i < lastMonthDays + 1; i++) {
					datas.push({
						day: i,
						weekDay: i === day ? '今天' : chineseWeekDayEnum[new Date(
							Date.parse(lastMonthYear + '-' + lastMonth + '-' + i)
						).getDay()],
						selected: i % 2 === 0
					})
				}
				for (let i = 1; i < 7 - (3 - day); i++) {
					datas.push({
						day: i,
						weekDay: i === day ? '今天' : chineseWeekDayEnum[new Date(
							Date.parse(year + '-' + month + '-' + i)
						).getDay()],
						selected: i % 2 === 0
					})
				}
			} else if (monthDays - day <= 2) { // 显示当月及下月日期
				let nextMonthYear = month === 12 ? year + 1 : year;
				let nextMonth = month === 12 ? 1 : month + 1;
				for (let i = day - 3; i < day + 1; i++) {
					datas.push({
						day: i,
						weekDay: i === day ? '今天' : chineseWeekDayEnum[new Date(
							Date.parse(year + '-' + month + '-' + i)
						).getDay()],
						selected: i % 2 === 0
					})
				}
				for (let i = 1; i < 7 - latestDayWithWeekDay; i++) {
					datas.push({
						day: i,
						weekDay: i === day ? '今天' : chineseWeekDayEnum[new Date(
							Date.parse(nextMonthYear + '-' + nextMonth + '-' + i)
						).getDay()],
						selected: i % 2 === 0
					})
				}
			}
		}
		state.dates = datas
	}

	/** 打卡签到 */
	const handleSign = () => {
		// #ifdef MP-WEIXIN
		uni.showLoading({
			title: '获取位置信息中'
		})
		state.amapPlugin?.getRegeo({
			success: (data: any) => {
				uni.hideLoading()
				state.address = data[0].regeocodeData.formatted_address
				uni.showToast({
					title: '成功获取位置信息'
				})
			},
			fail: () => {
				uni.showToast({
					title: '定位失败，请稍微检查定位权限后再试！',
					icon: 'error'
				})
			}
		})
		// #endif

		// #ifndef MP-WEIXIN
		uni.showToast({
			title: '仅支持微信小程序!',
			icon: 'error'
		})
		// #endif
	}
</script>

<style lang="scss" scoped>
	.d-sign-container {
		background-color: $uni-bg-color;
		height: 100%;
	}

	.d-sign-bg {
		width: 100%;
		height: 300rpx;
	}

	.d-sign-header {
		background-color: $uni-bg-color-white;
		padding: 20rpx;

		.d-sign-title {
			color: rgba(131, 140, 144, 1);
		}

		.d-sign-desc {
			font-size: 28rpx;
			color: rgba(200, 200, 200, 1);

			&-red {
				color: $uni-color-error;
			}
		}
	}

	.d-sign-body {
		margin-top: 20rpx;
		background-color: $uni-bg-color-white;
		padding: 40rpx;
	}

	.d-sign-date-box {
		display: flex;
		flex-direction: row;

		.d-sign-date-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.d-sign-date-weekday {
				color: $uni-text-color-grey;
				margin-bottom: 20rpx;
				font-size: 28rpx;
			}

			.d-sign-date-weekday-active {
				color: $uni-color-primary;
			}

			.d-sign-date-day {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				border: 1rpx solid $uni-text-color-grey;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.d-sign-date-day-active {
				background-color: rgba(222, 231, 247, 1);
			}
		}
	}

	.d-sign-address {
		padding: 20rpx 0;
	}

	.d-sign-textarea-box {
		width: 100%;
		text-align: center;
		height: 400rpx;
		padding: 50rpx 0;
		position: relative;
	}

	.d-sign-textarea {
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
		margin: 20rpx auto;
		top: 700rpx;
		display: flex;
		align-items: center;
		top: 40rpx;
		justify-content: center;
		flex-direction: column;
		background-color: $uni-color-primary;
		z-index: 10;

		&-title {
			font-size: 36rpx;
			color: $uni-color-white;
		}

		&-time {
			font-size: 24rpx;
			color: $uni-color-white;
		}
	}

	// .animate-wave {
	// 	width: 360rpx;
	// 	height: 360rpx;
	// 	position: absolute;
	// 	top: 40rpx;
	// 	left: 0;
	// 	right: 0;
	// 	margin: 0 auto;

	// 	.w2 {
	// 		animation-delay: 1s;
	// 	}

	// 	.w3 {
	// 		animation-delay: 2s;
	// 	}

	// 	.w4 {
	// 		animation-delay: 3s;
	// 	}

	// 	.w5 {
	// 		animation-delay: 4s;
	// 	}

	// 	.w6 {
	// 		animation-delay: 5s;
	// 	}
	// }

	// @-webkit-keyframes opac {
	// 	from {
	// 		opacity: 1;
	// 		width: 0;
	// 		height: 0;
	// 		top: 50%;
	// 		left: 50%;
	// 	}

	// 	to {
	// 		opacity: 0;
	// 		width: 100%;
	// 		height: 100%;
	// 		top: 0;
	// 		left: 0;
	// 	}
	// }

	// .animate-wave * {
	// 	background: #7fb5ef;
	// 	position: absolute;
	// 	border-radius: 50%;
	// 	animation: opac 6s infinite;
	// }
</style>
