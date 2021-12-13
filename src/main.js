/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/main.js
 * @Date: 2021-12-09 17:04:08
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-11 17:08:42
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import comTable from './components/table/index'
Vue.use(ElementUI)
Vue.use(comTable)
Vue.config.productionTip = false
export * from './store'

new Vue({
  render: h => h(App),
}).$mount('#app')
