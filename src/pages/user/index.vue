<template>
	<view class="d-user-container">
		<view class="d-user-info-panel">
			<image :src="userInfo.avatar" class="d-user-avatar" />
			<text class="d-user-name">{{ userInfo.name }}</text>
		</view>
		<uni-list>
			<uni-list-item thumb="/static/images/data-user.png" title="基础信息" link="navigateTo"
				to="/pages/user/userInfo/index" />
			<uni-list-item thumb="/static/images/finance.png" title="我的工资" link="navigateTo"
				to="/pages/user/wage/index" />
			<uni-list-item thumb="/static/images/qrcode.png" title="二维码工牌" link="navigateTo"
				to="/pages/user/userInfo/index?showQrCode=true" />
		</uni-list>
		<button class="d-user-btn-logout" @click="handleLogout">退出登录</button>
	</view>
</template>

<script setup lang="ts">
	import {
		useAppStore
	} from '@/stores/modules/app'
	import {
		storeToRefs
	} from 'pinia'

	const {
		userInfo
	} = storeToRefs(useAppStore())

	/** 退出登录 */
	const handleLogout = () => {
		uni.navigateTo({
			url: '/pages/common/login'
		})
	}
</script>

<style lang="scss" scoped>
	.d-user-container {
		background-color: $uni-bg-color;
		height: 100%;
	}

	.d-user-info-panel {
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.d-user-avatar {
			width: 200rpx;
			height: 200rpx;
			border-radius: 100rpx;
		}

		.d-user-name {
			margin-top: 20rpx;
		}
	}

	.d-user-btn-logout {
		margin-top: 50rpx;
		color: red;
		background-color: rgba(255, 255, 255, 1);
	}
</style>
