import {post} from './base'

/*
* 获取车系
* */
export function getChex() {
	return post('/geely-after-sale/afterSale/chexList', {})
}

/*
* 获取新品车系
* */
export function getNewChex() {
	return post('/geely-after-sale/afterSale/newCarType', {})
}

/*
* 日进厂台次
* */
export function getDailyProgress(params) {
	return post('/geely-after-sale/afterSale/dailyProgress', {...params})
}

/*
* 日进厂趋势
* */
export function getDailyTrendy(params) {
	return post('/geely-after-sale/afterSale/dailyTrendy', {...params})
}

export function getYearProgress(dqId) {
	return post('/geely-after-sale/afterSale/yearProgress',{dqId})
}

/*
* 备件供应
* */
export function getSparePartsSupply(params) {
	return post('/geely-after-sale/afterSale/sparesProvide', {...params})
}

// 客户满意度
export function getCsi(params) {
	return post('/geely-after-sale/afterSale/csi', params)
}

//售后运营
export function getSaleOperation(params) {
	return post('/geely-after-sale/afterSale/saleOperation', {...params})
}

/*
*技术分析
* */
export function getTechAnalysis(carType,dqId,sfId) {
	return post('/geely-after-sale/afterSale/techAnalysis', {carType,dqId,sfId})
}

/*
*故障趋势
* */
export function getFaultTrendy(partId, partName) {
	return post('/geely-after-sale/afterSale/faultTrendy', {partId,partName})
}
