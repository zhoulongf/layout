/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/newTab/index.js
 * @Date: 2021-12-13 15:33:32
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-13 15:37:35
 * @Description: 
 */
import zTable from './src/table.vue'
zTable.install = function(Vue){
    Vue.component(zTable.name,zTable)
}
export default zTable