/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/main.js
 * @Date: 2021-12-09 17:04:08
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-10 14:37:33
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
export * from './store'

new Vue({
  render: h => h(App),
}).$mount('#app')
