<template>
	<view class="d-userinfo-container">
		<view v-if="isShowQrCode" class="d-userinfo-qrcode-container">
			<view>
				<tki-qrcode ref="qrcode" :val="qrcodeConfig.val" :size="qrcodeConfig.size" :unit="qrcodeConfig.unit"
					:background="qrcodeConfig.background" :foreground="qrcodeConfig.foreground"
					:pdground="qrcodeConfig.pdground" :icon-size="qrcodeConfig.iconsize" :lv="qrcodeConfig.lv"
					:onval="qrcodeConfig.onval" :load-make="qrcodeConfig.loadMake"
					:show-loading="qrcodeConfig.showLoading" :loading-text="qrcodeConfig.loadingText" />
			</view>
		</view>
		<view class="d-userinfo-body">
			<uni-list class="d-userinfo-list">
				<uni-list-item title="头像" show-arrow clickable>
					<template #footer>
						<image class="d-userinfo-avatar" :src="userInfo.avatar" />
					</template>
				</uni-list-item>
				<uni-list-item title="名称" show-arrow clickable :right-text="userInfo.name"
					@click="handleTapItem({title:'名称',name:'name',value:userInfo.name})" />
				<uni-list-item title="性别" show-arrow clickable :right-text="userInfo.gender"
					@click="handleTapItem({title:'性别',name:'gender',value:userInfo.gender})" />
				<uni-list-item title="手机号" show-arrow clickable :right-text="userInfo.mobile"
					@click="handleTapItem({title:'手机号',name:'mobile',value:userInfo.mobile})" />
			</uni-list>
			<uni-list class="d-userinfo-list">
				<uni-list-item title="工作单位" show-arrow clickable :right-text="userInfo.company"
					@click="handleTapItem({title:'工作单位',name:'company',value:userInfo.company})" />
				<uni-list-item title="岗位" show-arrow clickable :right-text="userInfo.post"
					@click="handleTapItem({title:'岗位',name:'post',value:userInfo.post})" />
				<uni-list-item v-if="!isShowQrCode" title="二维码工牌" show-arrow clickable @click="showQrCode">
					<template #footer>
						<image class="d-userinfo-qrcode-icon" :src="qrcodeIcon" />
					</template>
				</uni-list-item>
				<uni-list-item title="职责范围" show-arrow clickable
					@click="handleTapItem({title:'职责范围',name:'dutyRange',value:userInfo.dutyRange})">
					<template #footer>
						<text class="d-userinfo-content">{{ userInfo.dutyRange }}</text>
					</template>
				</uni-list-item>
				<uni-list-item title="安全责任" show-arrow clickable
					@click="handleTapItem({title:'安全责任',name:'safetyDuty',value:userInfo.safetyDuty})">
					<template #footer>
						<text class="d-userinfo-content">{{ userInfo.safetyDuty }}</text>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script setup lang="ts">
	import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue'
	import qrcodeIcon from '@/static/images/qrcode.png'
	import {
		reactive,
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useAppStore
	} from '@/stores/modules/app'
	import {
		storeToRefs
	} from 'pinia'

	const qrcode = ref(null)
	const {
		userInfo
	} = storeToRefs(useAppStore())
	const isShowQrCode = ref(false)

	const qrcodeConfig = reactive({
		val: 'https://blog.csdn.net/xh_960125/article/details/106191723',
		size: 150,
		unit: 'rpx',
		background: '#ffffff',
		foreground: '#000000',
		pdground: '#000000',
		iconsize: 30,
		lv: 3,
		onval: true,
		loadMake: true,
		showLoading: true,
		loadingText: '二维码工牌生成中'
	})

	onLoad((options: any) => {
		if (options.showQrCode) {
			isShowQrCode.value = true
		}
	})

	const showQrCode = () => {
		isShowQrCode.value = true
	}

	/** 点击跳转到编辑页 */
	const handleTapItem = (data: any) => {
		uni.navigateTo({
			url: `/pages/user/userInfo/update?data=${JSON.stringify(data)}`
		})
	}
</script>

<style lang="scss" scoped>
	.d-userinfo-container {
		background-color: $uni-bg-color;
		height: 100%;
	}

	.d-userinfo-qrcode-container {
		text-align: center;
		padding: 20rpx 0;
	}

	.d-userinfo-body {
		display: flex;
		flex-direction: column;
	}

	.d-userinfo-list {
		margin-bottom: 20rpx;
	}

	.d-userinfo-avatar {
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
	}

	.d-userinfo-qrcode-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.d-userinfo-content {
		font-size: 28rpx;
		color: rgba(153, 153, 153, 1);
		width: 70%;
		text-align: right;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
