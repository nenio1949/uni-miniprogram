<template>
	<view class="d-danger-create-container">
		<uni-forms label-position="top" label-align="right" class="d-danger-create-form-container">
			<uni-forms-item label="隐患名称" required name="name" :labelWidth="80">
				<uni-easyinput placeholder="请输入隐患名称" trim v-model="state.name" :inputBorder="false" />
			</uni-forms-item>
			<uni-forms-item label="发现时间" required name="findTime">
				<uni-datetime-picker type="date" placeholder="请选择发现时间" v-model="state.findTime" :border="false" />
			</uni-forms-item>
			<uni-forms-item label="隐患描述" required name="desc">
				<uni-easyinput type="textarea" placeholder="请输入隐患描述" v-model="state.desc" :inputBorder="false" />
			</uni-forms-item>
			<uni-forms-item label="附件" required name="files">
				<FilePicker :files="state.files" />
			</uni-forms-item>
		</uni-forms>
		<view>
			<button type="primary">提交</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue'
	import FilePicker from '@/components/filePicker'

	interface IState {
		name: string,
			findTime: string,
			desc: string,
			files: any[]
	}

	const state: IState = reactive({
		name: '',
		findTime: '2022-11-04',
		desc: '',
		files: []
	})
</script>

<style lang="scss" scoped>
	.d-danger-create-container {
		padding: 20rpx;
	}

	.d-danger-create-form-container {
		::v-deep .uni-forms-item__label {
			flex-direction: row-reverse;
		}
	}
</style>
