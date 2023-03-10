<template>
	<view>
		<uni-easyinput v-if="data.name!=='gender'"
			:type="['dutyRange','safetyDuty'].includes(data.name)?'textarea':'text'" v-model="data.value" />
		<view v-if="data.name==='gender'" style="text-align: center;">
			<radio-group @change="(event:any)=>data.value=event.detail.value">
				<label class="radio">
					<radio value="男" :checked="data.value==='男'" />男
				</label>
				<label class="radio">
					<radio value="女" :checked="data.value==='女'" />女
				</label>
			</radio-group>
		</view>
		<button type="primary" class="d-userinfo-update-btn" @click="handleSubmit">保存</button>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useAppStore
	} from '@/stores/modules/app'
	import validate from '@/utils/validate'

	const store = useAppStore()

	let data = ref({
		title: '',
		name: '',
		value: ''
	})

	onLoad((options: any) => {
		if (options.data) {
			data.value = {
				...JSON.parse(options.data)
			}
			uni.setNavigationBarTitle({
				title: data.value.title
			})
		}
	})

	const handleSubmit = () => {
		let length = data.value.value.length
		let success = true
		switch (data.value.name) {
			case 'name':
				if (length < 2 || length > 10) {
					uni.showToast({
						icon: 'error',
						title: '名称2-10个字符！'
					})
					success = false
				}
				break
			case 'gender':
				if (!data.value.value) {
					uni.showToast({
						icon: 'error',
						title: '未选择性别！'
					})
					success = false
				}
				break
			case 'mobile':
				if (!validate.mobile(data.value.value)) {
					uni.showToast({
						icon: 'error',
						title: '手机号非法！'
					})
					success = false
				}
				break
			case 'company':
				if (length < 4 || length > 20) {
					uni.showToast({
						icon: 'error',
						title: '工作单位4-20个字符！'
					})
					success = false
				}
				break
			case 'post':
				if (length < 4 || length > 10) {
					uni.showToast({
						icon: 'error',
						title: '岗位4-10个字符！'
					})
					success = false
				}
				case 'dutyRange':
					if (!data.value.value) {
						uni.showToast({
							icon: 'error',
							title: `${data.value.title}不能为空！`
						})
						success = false
					}
					break
				case 'safetyDuty':
					if (!data.value.value) {
						uni.showToast({
							icon: 'error',
							title: `${data.value.title}不能为空！`
						})
						success = false
					}
					break
		}
		if (!success) {
			return false
		}
		store.setUserInfo({
			[data.value.name]: data.value.value
		})
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	.d-userinfo-update-btn {
		position: absolute;
		width: 90%;
		bottom: 20rpx;
		margin: 40rpx;
	}
</style>
