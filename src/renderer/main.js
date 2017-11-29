import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import App from './App'
import router from './router'
import $ from 'jquery'

global.jQuery = $

require('bootstrap/dist/js/bootstrap.min.js')

require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap-tagsinput/dist/bootstrap-tagsinput.css')
require('font-awesome/css/font-awesome.css')

Vue.use(Vuex)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	template: '<App/>'
}).$mount('#app')