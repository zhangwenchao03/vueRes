import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

//使用vuex
Vue.use(Vuex)


const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


//创建Vuex实例
const store = new Vuex.Store({
    modules,
    getters
})

export default store