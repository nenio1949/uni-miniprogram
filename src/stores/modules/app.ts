import { defineStore } from 'pinia'
import { RootState } from '@/types/index'
import logo from '@/static/logo.png'

export const useAppStore = defineStore('global', {
	state: (): RootState => ({
		userInfo: {
			avatar: logo,
			name: '蜡笔小新',
			gender: '男',
			mobile: '13123456789',
			company: '成都交控科技有限公司',
			post: '项目总工',
			plateQrCode: '',
			dutyRange: '全面负责现场施工过程中的各项工作',
			safetyDuty: '根据安全责任书范围全面把控各项安全事项'
		},
		token: '',
		projects: [
			{
				id: 1,
				name: '成都27号线项目'
			},
			{
				id: 2,
				name: '成都12号线项目'
			},
			{
				id: 3,
				name: '成都17号线项目'
			},
			{
				id: 4,
				name: '成都3号线项目'
			}
		],
		selectedProject: {
			id: 1,
			name: '成都27号项目'
		}
	}),
	getters: {
		// 示例返回大写字符
		capName(state) {
			return state.userInfo?.name.toUpperCase()
		}
	},
	persist: {
		key: 'store-key', // 本地存储key
		storage: {
			setItem: uni.setStorageSync,
			getItem: uni.getStorageSync
		}
	},
	actions: {
		/** 设置用户信息 */
		async setUserInfo(userInfo: object) {
			// 这里可以发起请求
			this.userInfo = { ...this.userInfo, ...userInfo }
		},
		/** 设置选中项目 */
		setSelectedProject(project: any) {
			this.selectedProject = project
		}
	}
})
