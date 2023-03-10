<template>
	<view class="d-login-container">
		<view class="d-login-avatar-box">
			<image src="../../static/logo.png" mode="scaleToFill" class="d-login-avatar" />
		</view>
		<uni-forms ref="formRef" :model-value="formData" class="d-login-form-container" :rules="rules"
			label-position="top" label-align="right">
			<uni-forms-item label="手机号" required name="mobile">
				<uni-easyinput v-model="formData.mobile" type="text" :input-border="false" maxlength="11" trim
					placeholder="请输入登录手机号" />
			</uni-forms-item>

			<uni-forms-item label="验证码" required name="code">
				<uni-easyinput v-model="formData.code" type="number" :input-border="false" maxlength="20" trim
					placeholder="请输入验证码" />
			</uni-forms-item>
		</uni-forms>

		<view class="d-login-btn-box">
			<button type="primary" @click="handleLogin">登录</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive
	} from 'vue'
	import api from '@/services/api'

	const formData = reactive({
		mobile: '',
		code: ''
	})

	const rules = ref({
		mobile: {
			rules: [{
				required: true,
				errorMessage: '请输入登录账号'
			}]
		},
		code: {
			rules: [{
				required: true,
				errorMessage: '请输入登录密码'
			}]
		}
	})

	const formRef = ref < any > (null)

	/** 登录提交 */
	const handleLogin = () => {
		formRef?.value &&
			formRef?.value.validate().then(async () => {
				const res: any = await api.login(formData)
				console.log(res)
				if (res.errcode === 0) {
					uni.showToast({
						icon: 'success',
						title: '登录成功！',
						complete() {
							uni.switchTab({
								url: '/pages/home/index'
							})
						}
					})
				}
			})
	}
</script>

<style lang="scss" scoped>
	.d-login-container {
		background-color: $uni-bg-color;
		height: 100%;
	}

	.d-login-avatar-box {
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.d-login-avatar {
			width: 200rpx;
			height: 200rpx;
			border-radius: 100rpx;
		}
	}

	.d-login-form-container {
		background-color: rgba(255, 255, 255, 1);
		padding: 5%;

		::v-deep .uni-forms-item__label {
			flex-direction: row-reverse;
		}
	}

	.d-login-btn-box {
		padding: 0 5%;
		margin-top: 50rpx;
	}
</style>
