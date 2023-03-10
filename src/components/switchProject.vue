<template>
	<view class="d-project-container">
		<view class="d-project-header-box">
			<view class="d-project-title-box">
				<view @click="handleClose" class="d-project-close">
					<uni-icons type="closeempty" size="25" />
				</view>
				<text class="d-project-title">选择当前工作项目</text>
			</view>
			<uni-search-bar placeholder="请输入项目关键词模糊搜索" @input="onSearchChange" @clear="onSearchReset"
				@cancel="onSearchReset" />
		</view>
		<view class="d-project-body-box">
			<uni-list>
				<uni-list-item v-for="item in state.projects" :key="item.id" :title="item.name" clickable
					@click="handleTapItem(item)">
					<template #footer>
						<uni-icons v-if="item.id === state.selectedProjectId" type="checkmarkempty" size="17"
							color="#33bd1a" />
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="d-project-bottom-box">
			<button type="primary" style="width: 90%" @click="handleSubmit">立即确认</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		withDefaults,
		defineProps,
		defineEmits,
		reactive
	} from 'vue'
	import {
		useAppStore
	} from '@/stores/modules/app'

	interface IProps {
		selectedProjectId ? : number
	}
	interface IState {
		iniProjects: any[]
		projects: any[]
		selectedProjectId: number
	}

	const store = useAppStore()
	const props = withDefaults(defineProps < IProps > (), {
		selectedProjectId: 0
	})
	const emits = defineEmits(['close'])

	const state: IState = reactive({
		iniProjects: store.projects,
		projects: store.projects,
		selectedProjectId: props.selectedProjectId
	})

	/** 搜索重置 */
	const onSearchReset = () => {
		state.projects = state.iniProjects
	}

	/** 搜索框值变化 */
	const onSearchChange = (value: any) => {
		if (value) {
			state.projects = state.projects.filter((project: any) => project.name.includes(value))
		} else {
			state.projects = state.iniProjects
		}
	}

	/** 切换 */
	const handleTapItem = (item: any) => {
		state.selectedProjectId = item.id
	}

	/** 关闭 */
	const handleClose = () => {
		emits('close')
	}

	/** 确认 */
	const handleSubmit = () => {
		store.setSelectedProject(state.iniProjects.find((project: any) => project.id === state.selectedProjectId))
		emits('close')
	}
</script>

<style lang="scss" scoped>
	.d-project-container {
		height: 80vh;
		background-color: rgba(249, 249, 249, 1);
	}

	.d-project-header-box {
		width: 100%;

		.d-project-title-box {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #c6c6c6;

			.d-project-close {
				width: 50rpx;
				padding: 0 20rpx;
			}

			.d-project-title {
				padding-right: 90rpx;
				text-align: center;
				width: 100%;
			}
		}
	}

	.d-project-body-box {
		height: calc(100% - 300rpx);
		overflow-y: scroll;
	}

	.d-project-bottom-box {
		height: 92rpx;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
