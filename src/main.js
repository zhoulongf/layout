/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/main.js
 * @Date: 2021-12-09 17:04:08
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-16 19:27:22
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './style/index.scss'
import zTable from './components/newTab/index'
import Pagination from './components/newTab/src/pagination/index'
import EForm from './components/form/index'
Vue.use(ElementUI)
Vue.use(zTable)
Vue.use(Pagination)
Vue.use(EForm)
Vue.config.productionTip = false
export * from './store'
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app')
