const DEFAULT_AMP_CONFIG = {
	key: 'bf5f2b8cec1fc5cf8bb9c6bd7759ea2e',
	v: '1.4.12',
	protocol: 'https',
	// hostAndPath: '//dt.geely.com/maps',
	hostAndPath: 'https://webapi.amap.com/maps',
	plugin: [],
	callback: 'amapInitComponent'
};

class AMapAPILoader {
	constructor(config) {
		this.config = {
			...DEFAULT_AMP_CONFIG,
			...config
		};
		this.document = document;
		this.window = window;
		this.APIPluginPromise = '',
		this.UIPluginPromise = ''
	}

	loadAPI() {
		if (this.APIPromise) return this.APIPromise;
		const APIScript = document.createElement('script')
		APIScript.type = 'text/javascript';
		APIScript.async = true;
		APIScript.defer = true;
		APIScript.src = `${this.config.hostAndPath}?v=${this.config.v}&key=${this.config.key}&callback=${this.config.callback}`
		APIScript.charset = 'utf-8'
		this.APIPromise = new Promise((resolve, reject) => {
			if(window.AMap) resolve(window.AMap)
			this.window[this.config.callback] = () => {
				resolve(window.AMap)
			};
			APIScript.onerror = error => {
				reject(error)
			};
		})
		if(!window.AMap) document.head.appendChild(APIScript)
		return this.APIPromise
	}

	loadUI (src){
		if (this.UIPromise) return this.UIPromise;
		src = src || '//dt.geely.com/ui/1.0/main.js?v=1.0.11'
		const UIScript = document.createElement('script')
		UIScript.type = 'text/javascript';
		UIScript.async = true;
		UIScript.defer = true;
		UIScript.src = src
		UIScript.charset = 'utf-8'
		this.UIPromise = new Promise((resolve, reject) => {
			if(window.AMapUI) resolve(window.AMapUI)
			UIScript.onload = () => {
				setTimeout(resolve(window.AMapUI), 0);
			};
			// UIScript.onerror = error => reject(error);
		})
		if(!window.AMapUI) document.head.appendChild(UIScript)
		return this.UIPromise
	}
	/*
	* 加载地图插件
	* */
	async loadAPIPlugin(names) {
		if (this.APIPluginPromise) return this.APIPluginPromise;
		let AMap = await this.loadAPI()
		this.APIPluginPromise = new Promise((resolve, reject) => {
			AMap.plugin([...names], function() {
				resolve()
			});
		})

		return this.APIPluginPromise
	}
	/*
	* 加载UI 插件
	* */
	async loadUIPlugin(name) {
		if (this.UIPluginPromise) return this.UIPluginPromise;
		let AMapUI  = await this.loadUI()
		this.UIPluginPromise = new Promise((resolve, reject) => {
			AMapUI.loadUI(name, (result) => {
				resolve(result)
			})
		})
		return this.UIPluginPromise
	}
}

let loader = new AMapAPILoader()

export default loader
