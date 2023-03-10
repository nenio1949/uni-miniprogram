import { useAppStore } from '@/stores/modules/app' //vuex
import config from '@/config/index'

function service(
	api: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
	data?: object,
	header: object = { 'Content-Type': 'application/json' }
) {
	const appStore = useAppStore()

	const token = appStore.token

	return new Promise((resolved, rejected) => {
		uni.request({
			method: method || 'GET',
			url: config.serverHost + api,
			data: data || {},
			timeout: 8000,
			header: {
				...header,
				'content-type': 'application/json',
				Authorization: `Bearer ${token}` //请求头添加token
			},
			success(rst: any) {
				if (rst.data.errcode !== 0) {
					uni.showToast({
						title: '错误信息:' + rst.data.msg,
						icon: 'error'
					})
				}
				resolved(rst.data)
			},
			fail(err: any) {
				uni.showToast({
					title: '请求失败，原因:' + err.msg,
					icon: 'error'
				})
				rejected(err)
			}
		})
	})
}
export default service
