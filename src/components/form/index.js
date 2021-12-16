/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/components/form/index.js
 * @Date: 2021-12-16 19:21:11
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-16 19:29:39
 * @Description: 
 */
import EForm from './src/index.vue'
EForm.install = function(Vue){
    Vue.component(EForm.name,EForm)
}
export default EForm