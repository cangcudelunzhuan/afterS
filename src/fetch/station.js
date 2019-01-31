import {post} from './base'

/*
* 服务站信息
* */
export function getServiceCnt(cityId, dealerId) {
	return post('/geely-after-sale/serviceStation/serviceCnt', {cityId, dealerId})
}
export function getServiceInfo(cityId, dealerId) {
	return post('/geely-after-sale/serviceStation/serviceInfo', {cityId, dealerId})
}

/*
* 客户抱怨
* */
export function getCustComplaints(cityId, dealerId) {
	return post('/geely-after-sale/serviceStation/custComplaints', {cityId, dealerId})
}

/*
* 预约管理
* */
export function getAppointment(cityId, dealerId) {
	return post('/geely-after-sale/serviceStation/appointment', {cityId, dealerId})
}

/*
* 服务站产值分布
* */
export function getCityServiceIncome(cityId, dealerId) {
	return post('/geely-after-sale/serviceStation/cityServiceIncome', {cityId, dealerId})
}
export function getServiceIncome(cityId, dealerId) {
	return post('/geely-after-sale/serviceStation/serviceIncome', {cityId, dealerId})
}

/*
* 服务站满意度趋势
* */
export function getServiceSatisfaction(cityId, dealerId) {
	return post('/geely-after-sale/serviceStation/serviceSatisfaction', {cityId, dealerId})
}
