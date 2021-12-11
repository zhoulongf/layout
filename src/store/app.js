/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/store/app.js
 * @Date: 2021-12-10 12:00:11
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-10 14:37:45
 * @Description: 
 */
import Vue from "vue";
import {createGetters} from './util.js'
import { isMobile } from "../helper.js"
const state ={
    isMobile:isMobile(),
    //所有的树形菜单，mix导航模式时，每个元素为顶部菜单，顶部菜单的子级（如果有）为侧边栏菜单
    menus: [],

}
const store = Vue.observable(state)
//加速查找menu的哈希表：<k: menu.fullPath, v: menu>
// let MenuSearchMap = Object.create(null)
export const getters = createGetters(store)
export const mutations = {
    ...createGetters(store),
    menus(v){
        //每次更新菜单时都需要清空加速表
        // MenuSearchMap = Object.create(null)
        if (!Array.isArray(v)) {
            return store.menus = []
        }
        // store.menus = transformMenu(v)
    }
}