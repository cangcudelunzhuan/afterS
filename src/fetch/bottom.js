import {post} from './base'

//短信满意度
export function getSms(params) {
	return post('/geely-after-sale/afterSale/sms', params)
}

//电话满意度
export function getTsi(params) {
	return post('/geely-after-sale/afterSale/tsi', params)
}

// 用户保持率
export function getUserRetention(params) {
	return post('/geely-after-sale/afterSale/userRetention', params)
}

// 预约管理
export function getAppointMange(params) {
	return post('/geely-after-sale/afterSale/appointMange', params)
}

//客户抱怨
export function getUserComplaint(params) {
	return post('/geely-after-sale/afterSale/userComplaint', params)
}

// 首发故障
export function getStartFailure(params) {
	return post('/geely-after-sale/afterSale/startFailure', params)
}

// 新品故障
export function getNewProductFailure(params) {
	return post('/geely-after-sale/afterSale/newProductFailure', params)
}

//技术活动执行情况
export function getActivities() {
	return post('/geely-after-sale/afterSale/activities')
}

// 服务站
export function getGeelyFwz(params) {
	return post('/geely-after-sale/afterSale/geelyFwz', params)
}

//获取服务站列表
export function getStation(id) {
	return post('/geely-after-sale/afterSale/geelyFwzDeatil', {id})
}

export function getGeelyFwzList(params) {
	return post('/geely-after-sale/afterSale/geelyFwzList', params)
}
