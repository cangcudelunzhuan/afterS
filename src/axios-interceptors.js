import Vue from 'vue'
import axios from 'axios'
import QS from 'qs'

let pendings = {}
let cancelPending = (config) => {
	let source = pendings[config.url]
	if (source) {
		source.cancel({message: '操作太快，服务器受不了啦!'})
		pendings[config.url] = null
	} else {
		pendings[config.url] = axios.CancelToken.source()
		config.cancelToken = pendings[config.url].token
	}
}

axios.interceptors.request.use(config => {
	cancelPending(config)
	if (config.method == 'post') {
		config.data = QS.stringify(config.data);//防止post请求参数无法传到后台
	}
	return config
}, error => {
	return Promise.reject(error)
})

// 请求到结果的拦截处理
axios.interceptors.response.use(response => {
	let code = response.data.code
	if (code == 'user-not-login') {
		let url = response.data.data || '';
		let tagert = window.location.href
		let baseUrl = url.split('&')[0];
		window.location.href = baseUrl + "&redirectUrl=" + tagert
	}
	return response
}, error => {
	return Promise.reject(error.message)
})

Vue.prototype.HttpClass = class Http {
	constructor (url) {
		this.url = url
		this.promise = null
		this.pending = null
	}

	post (params, method) {
		method = method || 'post'
		this.pending = true
		this.promise = new Promise((resolve, reject) => {
			let config = {
				method: method,
				url: this.url
			}
			if (method === 'post') {
				config.data = params
			} else {
				config.params = params
			}
			axios(config)
				.then(response => {
					let subCode = response.data.code.split('-').pop()
					if (subCode === 'success') {
						resolve(response.data)
					} else {
						// Message.error(response.data.message)
						reject(response.data.data)
					}
				})
				.catch(error => {
					// Message.error(error.message)
				})
				.finally(() => {
					this.pending = false
				})
		})
		return this.promise
	}
}

export default axios
