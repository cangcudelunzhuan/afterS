export default (num) => {
	if (!num && num != 0) {
		return ''
	}
	let res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
		return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
			return $1 + ","
		})
	})
	return res
}
