/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/table/index.js
 * @Date: 2021-12-11 14:58:49
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-11 16:43:50
 * @Description: 
 */
import comTable from './src/table.vue'
comTable.install = function(Vue){
    Vue.component(comTable.name,comTable)
}
export default comTable