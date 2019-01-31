import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
Vue.use(Router)
let router = new Router({
	routes: [
		{path: '/', redirect: '/perload'},
		{
			path: '/lock',
			component: {template: '<div>lock</div>'},
		},
		{
			path: '/perload',
			component: () => import('@/pages/perload'),
		},
		{
			path: '/lock',
			component: () => import('@/pages/lock'),
		},
		{
			path: '/pages',
			component: () => import('@/pages/index'),
			children: [
				{path: '/', redirect: 'top/0'},
				{
					path: 'top/:level',
					component: () => import('@/pages/index/top'),
					meta: {user: true}
				},
				{
					path: 'bottom/:level',
					component: () => import('@/pages/index/bottom'),
					meta: {user: true}
				},
				{
					path: 'city',
					component: () => import('@/pages/index/city'),
					meta: {user: true}
				}
			]
		}
	]
})
router.beforeEach((to, from, next) => {
	if(to.meta && to.meta.user){
		let user = store.state.user
		if(!user){
			next('/perload')
		}else{
			next()
		}
	}else{
		next()
	}
})
export default  router
