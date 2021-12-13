/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/main.js
 * @Date: 2021-12-09 17:04:08
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-13 12:13:00
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './style/index.scss'
import comTable from './components/table/index'
import Pagination from './components/newTab/src/pagination/index'
Vue.use(ElementUI)
Vue.use(comTable)
Vue.use(Pagination)
Vue.config.productionTip = false
export * from './store'
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app')
