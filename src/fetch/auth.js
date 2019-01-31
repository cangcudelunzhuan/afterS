import {post} from './base'

export function getUser() {
	return post('/geely-after-sale/index/getLoginInfo')
}

export function getMenu() {
	return post('/geely-after-sale/afterSale/dataList')
}
