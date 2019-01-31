import Vue from 'vue'
import App from './App'
import router from './router'
import GChart from 'g-chart'
import {Resize, ChartHelper} from 'g-chart'
import {GLoading} from 'g-screen-ui'
import theme from './theme'
import 'g-screen-ui/packages/theme/fonts/iconfont'
import './theme.styl'
import './filters'

Vue.use(GChart)
Vue.config.productionTip = false

Vue.component('g-part', ()=>import('@/components/g-part.vue'))
Vue.component('g-part-title', ()=>import('@/components/g-part-title'))
Vue.component('g-container', ()=>import('@/components/g-container'))
Vue.component('g-arrows', ()=>import('@/components/arrows'))
Vue.component('g-loading',GLoading)
import store from './vuex/store'
import './axios-interceptors'

let app
Resize.addEvent(()=>{
	ChartHelper.registerTheme('default', theme(Resize.scale))
	if(app) return
	app = new Vue({
		el: '#app',
		router,
		store,
		components: { App },
		template: '<App/>'
	})
})
