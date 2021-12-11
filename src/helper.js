/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/helper.js
 * @Date: 2021-12-10 14:11:19
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-10 14:15:33
 * @Description: 
 */
import {Const} from './config'
export function isMobile() {
    return window.innerWidth <= Const.maxMobileWidth
}