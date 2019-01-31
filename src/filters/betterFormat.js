const c1 = 10000
const c2 = 10000000
const c3 = 100000000

export default (num) => {
	if (!num && num != 0) {
		return '--'
	}
	let symbol = ''
	let value
	if (num < c1) {
		value = num
	} else if (num >= c1 && num < c2) {
		symbol = '万'
		value = num / c1
	} else if (num >= c2 && num < c3) {
		symbol =  '千万'
		value = num / c2
	}else {
		symbol = '亿'
		value = num / c3
	}
	return value.toString().match(/^\d+(?:\.\d{0,2})?/) + symbol
}
