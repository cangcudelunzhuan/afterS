import Vue from 'vue'
Vue.filter('numFormat', require('./numFormat').default)
Vue.filter('pointFormat', require('./pointFormat').default)
Vue.filter('betterFormat', require('./betterFormat').default)
