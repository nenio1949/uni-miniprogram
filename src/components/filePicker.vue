<template>
	<view>
		<uni-file-picker :readonly="props.type === 'view'" :value="state.fileLists" :limit="props.limit"
			:fileExtname="props.fileExtname" :fileMediatype="props.fileMediatype" :mode="props.mode" />
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		defineProps
	} from 'vue'
	interface IProps {
		type ? : 'edit' | 'view' // 类型，edit:编辑，view：仅查看
		limit ? : number // 最多允许选择上传文件数量
		fileExtname ? : string // 允许上传的文件后缀，多个以逗号分隔
		fileMediatype ? : 'image' | 'video' | 'all' // 文件类型
		files ? : any[] | object // 文件数据
		mode ? : 'list' | 'grid' // 文件列表样式
	}

	interface IState {
		fileLists: any[] | object
	}

	const props = withDefaults(defineProps < IProps > (), {
		type: 'edit',
		limit: 9,
		fileExtname: '',
		fileMediatype: 'image',
		files: () => {
			return []
		},
		mode: 'grid'
	})

	const state: IState = reactive({
		fileLists: props.files
	})
</script>

<style lang="scss" scoped></style>
