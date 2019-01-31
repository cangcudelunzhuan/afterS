import Mock from 'mockjs'

Mock.setup({
	timeout: '500-1000'
})
Mock.mock('/geely-after-sale/afterSale/dailyTrendy', 'post', function (options) {
	return {
		code: 'success',
		data: [{
			title: "进厂车系分布",
			pieData: [
					{name: "博越", value: 1000},
					{name: "远景", value: 2000}
				]
			},{
				title: "峰谷值分布",
				xAxisData: ["6:00", "8:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
				sericesData: [10, 20, 40, 25, 40, 11, 5]
			},{
				title: "过夜车（台）",
				pieData: [
						{key: ">=2天", value: 1000},
						{key: ">=7天", value: 2000}
					]
			}],
		message: 'success'
	}
})


Mock.mock('/geely-after-sale/afterSale/yearProgress', 'post', function (options) {
	return {
		code: 'success',
		data: [{
			title: "年进厂台次",
			value: 6789
		}, {
			title: "年产值",
			value: 6789
		}, {
			title: "备件完成率",
			value: "67%"
		}],
		message: 'success'
	}
})

//客户满意度
Mock.mock('/geely-after-sale/afterSale/csi', 'post', function (options) {
	return {
		code: 'success',
		data: {
			title: "全国近12个月满意度趋势",
			lengendData: ["电话满意度", "JDP电话满意度", "短信满意度", "JDP短信满意度"],
			xAxisData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
			sericesDatas: {
				line: [
					{
						name: "电话满意度",
						value: [430, 590, 470, 420, 430, 590, 470, 420, 430, 590, 470, 420]
					},
					{
						name: "JDP电话满意度",
						value: [450, 420, 780, 490, 450, 420, 780, 490, 450, 420, 780, 490]
					},
				],
				bar: [
					{
						name: "短信满意度",
						value: [10, 160, 220, 40, 80, 20, 130, 40, 10, 20, 160, 40]
					},
					{
						name: "JDP短信满意度",
						value: [10, 20, 80, 40, 10, 220, 160, 40, 10, 20, 530, 40]
					}
				]
			}
		},
		message: 'success'
	}
})

// 备件供应
Mock.mock('/geely-after-sale/afterSale/sparesProvide', 'post', function (options) {
	return {
		code: 'success',
		data: {
			mbz: [{
				title: "备件目标值",
				value: 1234,
				wcl: '78 %'
			},
				{
					title: "钣金目标值",
					value: 1200,
					wcl: '50 %'
				},
				{
					title: "油漆目标值",
					value: 680,
					wcl: '78 %'
				}],
			jsl: {
				lengendData: ["审核及时率", "备货及时率", "到货及时率"],
				xAxisData: ["1月", "2月", "3月"],
				sericesDatas: [
					[10, 20, 30],
					[10, 20, 30],
					[10, 20, 30]
				]
			},
			mzl: {
				lengendData: ["审核及时率", "备货及时率", "到货及时率"],
				xAxisData: ["1月", "2月", "3月"],
				sericesDatas: [
					[10, 20, 30],
					[10, 20, 30],
					[10, 20, 30]
				]
			}
		},
		message: 'success'
	}
})

// 售后运营
Mock.mock('/geely-after-sale/afterSale/saleOperation', 'post', function (options) {
	return {
		code: 'success',
		data: {
			wxz: [
				{
					title: "年维修产值",
					value: "29.89",
					avg: "3.32",
					tb: "10%"
				},
				{
					title: "年维修台次",
					value: "407",
					avg: "33120",
					tb: "31.2%"
				},
				{
					title: "客单价",
					value: "782",
					tb: "10%"
				},
				{
					title: "用户忠诚度",
					value: "13.6%",
					tb: "10%"
				}
			],
			productTrend: {
				lengendData: ["保修内产值", "有偿服务产值", "索赔"],
				xAxisData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
				sericesDatas: {
					line: [
						{
							name: "保修内产值",
							value: [430, 590, 470, 420, 430, 590, 470, 420, 430, 590, 470, 420]
						},
						{
							name: "有偿服务产值",
							value: [450, 420, 780, 490, 450, 420, 780, 490, 450, 420, 780, 490]
						},
					],
					bar: [
						{
							name: "索赔",
							value: [10, 160, 220, 40, 80, 20, 130, 40, 10, 20, 160, 40]
						}
					]
				}
			}
		},
		message: 'success'
	}
})

// 短信满意度
Mock.mock('/geely-after-sale/afterSale/sms', 'post', function (options) {
	return {
		code: 'success',
		data: {
			title: "全国近12个月满意度趋势",
			lengendData: ["电话满意度", "JDP电话满意度", "短信满意度", "JDP短信满意度"],
			xAxisData: ["1月", "2月", "3月", "4月"],
			sericesDatas: {
				line: [
					{
						name: "电话满意度",
						value: [430, 590, 470, 420]
					},
					{
						name: "JDP电话满意度",
						value: [450, 420, 780, 490]
					},
				],
				bar: [
					{
						name: "短信满意度",
						value: [10, 20, 30, 40]
					},
					{
						name: "JDP短信满意度",
						value: [10, 20, 30, 40]
					}
				]
			}
		},
		message: 'success'
	}
})

// 电话满意度
Mock.mock('/geely-after-sale/afterSale/tsi', 'post', function (options) {
	return {
		code: 'success',
		data: {
			title: '电话满意度',
			lengendData: ["电话满意度", "JDP城市电话满意度"],
			xAxisData: ["东北", "山东", "西北", "华中"],
			sericesData: [
				[30, 60, 80, 40],
				[10, 20, 30, 40]
			]
		},
		message: 'success'
	}
})

// 用户保持率

// Mock.mock('/geely-after-sale/afterSale/userRetention', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: {
// 			title: "用户保持率",
// 			pieData: [
// 				{key: "1年内", value: 0.98},
// 				{key: "2年内", value: 55.0},
// 				{key: "3年内", value: 39.2},
// 				{key: "4年内", value: 25.9}
// 			]
// 		},
// 		message: 'success'
// 	}
// })

// 预约管理
Mock.mock('/geely-after-sale/afterSale/tsi', 'post', function (options) {
	return {
		code: 'success',
		data: {
			title: '电话满意度',
			lengendData: ["电话满意度", "JDP城市电话满意度"],
			xAxisData: ["东北", "山东", "西北", "华中"],
			sericesData: [
				[30, 60, 80, 40],
				[10, 20, 30, 40]
			]
		},
		message: 'success'
	}
})

// 全网预约管理

// Mock.mock('/geely-after-sale/afterSale/appointMange', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: {
// 			yy: [{
// 				title: "预约进场率",
// 				value: "36.2%"
// 			}, {
// 				title: "预约未进厂",
// 				value: "24%"
// 			}],
// 			jztc: {
// 				title: "进站台次情况",
// 				colData: [{
// 						key:	'region',
// 						title: '大区',
// 						value: null
// 					},{
// 						key:	'appointCnt',
// 						title: '预约台次',
// 						value: null
// 					},{
// 						key:	'appointPull',
// 						title: '预约进站',
// 						value: null
// 					},{
// 						key:	'repairCnt',
// 						title: '维修台次',
// 						value: null
// 					},{
// 						key:	'overTime',
// 						title: '已超期',
// 						value: null
// 					},{
// 						key:	'appointRate',
// 						title: '预约率',
// 						value: null
// 					}],
// 				sericesData: [{
// 					"region": "东北",
// 					"appointCnt": 348,
// 					"appointPull": 232,
// 					"repairCnt": 752,
// 					"overTime": 109,
// 					"appointRate": "30%"
// 				}, {
// 					"region": "山东",
// 					"appointCnt": 348,
// 					"appointPull": 232,
// 					"repairCnt": 752,
// 					"overTime": 109,
// 					"appointRate": "30%"
// 				}]
// 			}
// 		},
// 		message: 'success'
// 	}
// })

//客户抱怨

// Mock.mock('/geely-after-sale/afterSale/userComplaint', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: {
// 			title: "客户抱怨",
// 			ksmyd: {
// 				title: "客诉满意度",
// 				value: 8846,
// 				tb: 0.1,
// 				xAxisData: ["1月", "2月", "3月", "4月"],
// 				lengendData: [10, 20, 30, 40]
// 			},
// 			xyAndBh: {
// 				title: "2小时响应&3DC闭环",
// 				lengendData: ["2小时响应", "3DC闭环"],
// 				xAxisData: ["1月", "2月", "3月", "4月"],
// 				sericesData: [{
// 					name: '2小时响应',
// 					value: [10, 20, 30, 40]
// 				}, {
// 					name: '3DC闭环',
// 					value: [40, 60, 70, 10]
// 				}]
// 			},
// 			tsly: {
// 				title: "投诉来源",
// 				colData: ["排名", "投诉来源", "投诉累计", "投诉当月", "月涨幅"],
// 				sericesData: [{
// 					rank: 1,
// 					tsly: "网络投诉",
// 					tslj: 15234,
// 					tsdy: 4234,
// 					yzf: "128%"
// 				}, {
// 					rank: 2,
// 					tsly: "热线投诉",
// 					tslj: 15234,
// 					tsdy: 4234,
// 					yzf: "128%"
// 				}, {
// 					rank: 3,
// 					tsly: "信函投诉",
// 					tslj: 15234,
// 					tsdy: 4234,
// 					yzf: "128%"
// 				}]
// 			},
// 			tsfl: {
// 				title: "投诉分类",
// 				colData: ["排名", "投诉来源", "投诉累计", "投诉当月", "月涨幅"],
// 				sericesData: [{
// 					rank: 1,
// 					tsly: "网络投诉",
// 					tslj: 15234,
// 					tsdy: 4234,
// 					yzf: "128%"
// 				}, {
// 					rank: 2,
// 					tsly: "热线投诉",
// 					tslj: 15234,
// 					tsdy: 4234,
// 					yzf: "128%"
// 				}, {
// 					rank: 3,
// 					tsly: "信函投诉",
// 					tslj: 15234,
// 					tsdy: 4234,
// 					yzf: "128%"
// 				}]
// 			},
// 			mydph: {
// 				title: "满意度全国排行",
// 				colData: ["排名", "城市", "占比"],
// 				sericesData: [{
// 					rank: 1,
// 					city: "杭州",
// 					zb: "10%"
// 				}, {
// 					rank: 2,
// 					city: "北京",
// 					zb: "20%"
// 				}, {
// 					rank: 3,
// 					city: "上海",
// 					zb: "30%"
// 				}]
// 			}
// 		},
// 		message: 'success'
// 	}
// })

// 首发故障
// Mock.mock('/geely-after-sale/afterSale/startFailure', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: {
// 			title: "首发故障",
// 			sum: 12345,
// 			gzfb: {
// 				title: "XXX故障",
// 				xAxisData: ["5月", "6月", "7月", "8月"],
// 				sericesData: [10, 20, 30, 40]
// 			},
// 			cxRank: {
// 				title: "",
// 				colData: ["排名", "车系", "本月累计", "本年累计"],
// 				sericesData: [{
// 					rank: 1,
// 					cx: "博越",
// 					bylj: 123,
// 					bnlj: 456
// 				}, {
// 					rank: 2,
// 					cx: "远景",
// 					bylj: 123,
// 					bnlj: 456
// 				}, {
// 					rank: 3,
// 					cx: "帝豪",
// 					bylj: 123,
// 					bnlj: 456
// 				}, {
// 					rank: 4,
// 					cx: "金刚",
// 					bylj: 123,
// 					bnlj: 456
// 				}]
// 			}
// 		},
// 		message: 'success'
// 	}
// })

// 新品故障
// Mock.mock('/geely-after-sale/afterSale/newProductFailure', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: {
// 			title: "新品故障",
// 			lj: [{
// 				title: "累计不良频次",
// 				value: 121212
// 			}, {
// 				title: "累计千车不良率",
// 				value: "36.2%",
// 				hb: 0.08
// 			}],
// 			gzlb: {
// 				title: "",
// 				colData: ["类别", "占比"],
// 				sericesData: [
// 					{title: "设计", value: "33.06%"},
// 					{title: "常规电器", value: "33.06%"},
// 					{title: "新能源电器", value: "33.06%"},
// 					{title: "车身附件", value: "33.06%"}
// 				]
// 			}
// 		},
// 		message: 'success'
// 	}
// })

// 技术活动执行情况
// Mock.mock('/geely-after-sale/afterSale/activities', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: {
// 			activities:[{
// 				title:"技术活动1",
// 				mbValue:1000,
// 				wcValue:1000,
// 				completion:{
// 					title:"完成情况",
// 					lengendData:["环比","实际值"],
// 					xAxisData:["1月","2月","3月","4月"],
// 					sericesData:[
// 						[10,40,50,70],
// 						[10,20,30,40]
// 					]
// 				},
// 				leakage:{
// 					title:"漏做情况",
// 					lengendData:["环比","实际值"],
// 					 xAxisData:["1月","2月","3月","4月"],
// 					 sericesData:[
// 						[22,55,66,88],
// 						[10,20,30,40]
// 				 	]
// 				}
// 			},{
// 				title:"技术活动2",
// 				 mbValue:2000,
// 				 wcValue:2000,
// 				 completion:{
// 					 title:"完成情况",
// 					 lengendData:["环比","实际值"],
// 					 xAxisData:["5月","6月","7月","8月"],
// 					 sericesData:[
// 						 [22,33,44,55],
// 						 [50,60,70,80]
// 					 ]
// 				 },
// 				 leakage:{
// 					 title:"漏做情况",
// 					 lengendData:["环比","实际值"],
// 					 xAxisData:["5月","6月","7月","8月"],
// 					 sericesData:[
// 						 [66,77,88,99],
// 						 [150,60,70,80]
// 					 ]
// 				 }
// 			 },{
// 				 title:"技术活动3",
// 				 mbValue:3000,
// 				 wcValue:3000,
// 				 completion:{
// 					 title:"完成情况",
// 					 lengendData:["环比","实际值"],
// 					 xAxisData:["9月","10月","11月","12月"],
// 					 sericesData:[
// 						 [90,80,60,40],
// 						 [90,20,30,40]
// 					 ]
// 				 },
// 				 leakage:{
// 					 title:"漏做情况",
// 					 lengendData:["环比","实际值"],
// 					  xAxisData:["1月","2月","3月","4月"],
// 						sericesData:[
// 							[50,60,70,80],
// 							[10,20,30,40]
// 						]
// 					}
// 				}
// 			]
// 		},
// 		message: 'success'
// 	}
// })


// 服务站产值分布
// Mock.mock('/geely-after-sale/serviceStation/serviceIncome', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: [{
//       "key": "杭州百福达汽车维修有限公司",
//       "value": 22
//     },
//     {
//       "key": "浙江外事旅游股份有限公司",
//       "value": 33
//     },
//     {
//       "key": "杭州万荣汽车修理有限公司",
//       "value": 33
//     },
//     {
//       "key": "桐庐远东汽车修理厂",
//       "value": 44
//     }],
// 		message: 'success'
// 	}
// })

// 客户抱怨

// Mock.mock('/geely-after-sale/serviceStation/custComplaints', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: {
// 			xAxisData: ['01', '02', '03'],
// 			lineLengendData: ["客户件", "2小时响应", "3DC闭环"],
// 			lineSericesData: [
// 				[22,33,44],
// 				[33,44,55],
// 				[44,55,66]
// 		]
// 		},
// 		message: 'success'
// 	}
// })

//预约管理
// Mock.mock('/geely-after-sale/serviceStation/appointment', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: {
// 			xAxisData: ['01', '02', '03'],
// 			lineLengendData: ["客户件", "2小时响应", "3DC闭环"],
// 			lineSericesData: [
// 				[22,33,44],
// 				[33,44,55],
// 				[44,55,66]
// 		]
// 		},
// 		message: 'success'
// 	}
// })

// 服务站满意度趋势
// Mock.mock('/geely-after-sale/serviceStation/serviceSatisfaction', 'post', function (options) {
// 	return {
// 		code: 'success',
// 		data: {
// 			xAxisData: ['01', '02', '03'],
// 			lineLengendData: ["客户件", "2小时响应", "3DC闭环"],
// 			lineSericesData: [
// 				[22,33,44],
// 				[33,44,55],
// 				[44,55,66]
// 		]
// 		},
// 		message: 'success'
// 	}
// })
