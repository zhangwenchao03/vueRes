import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'
import i18n from './lang'

import axios from 'axios'
import '../mock/index.js'
Vue.prototype.$ajax = axios


// 引入mockjs
require('../mock/index.js')

// import './icons' //引入图标
import './permission' //权限控制


Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
