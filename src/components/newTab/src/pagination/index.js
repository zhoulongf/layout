/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/newTab/src/pagination/index.js
 * @Date: 2021-12-13 11:02:49
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-13 11:04:46
 * @Description: 
 */
import Pagination from './src/pagination.vue'
Pagination.install = function(Vue){
    Vue.component(Pagination.name,Pagination)
}
export default Pagination