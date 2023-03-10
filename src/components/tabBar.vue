<template>
	<view class="d-tab-bar">
		<view v-for="(tab, index) in props.tabBars" :key="tab.id" class="d-tab-scroll" :style="props.scrollStyle">
			<view class="d-tab-swiper-list" :class="{ active: props.tabIndex == index }" :style="props.scrollItemStyle"
				@tap="tabTap(index)">
				{{ tab.name }} {{ tab.num ? tab.num : '' }}
				<view class="d-tab-swiper-line" />
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		withDefaults,
		defineProps,
		efineEmits
	} from 'vue'

	interface IProps {
		tabBars: any[]
		tabIndex: number
		scrollStyle ? : string
		scrollItemStyle ? : string
	}
	const emits = defineEmits(['tabTap'])

	const props = withDefaults(defineProps < IProps > (), {
		tabBars: () => {
			return []
		},
		tabIndex: 0,
		scrollStyle: '',
		scrollItemStyle: ''
	})

	const tabTap = (index: number) => {
		emits('tabTap', index)
	}
</script>

<style lang="scss" scoped>
	.d-tab-scroll {
		display: inline-block;
		flex: 1;
		text-align: ce nter;
	}

	.d-tab-swiper-list {
		display: inline-block;
		color: #969696;
		font-weight: bold;
		width: 100%;
		text-align: center;
	}

	.d-tab-bar {
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		justify-content: space-around;
		border-top: 1rpx solid #dcdcdc;
		border-bottom: 1rpx solid #dcdcdc;
	}

	.d-tab-bar .active {
		color: #343434;
		background-color: #dcdcdc;
	}

	.active .d-tab-swiper-line {
		margin: auto;
	}
</style>
