// 校验工具类

/** 手机号校验 */
const mobile = (number: any) => {
	return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(number)
}

export default {
	mobile
}