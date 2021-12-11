/*
 * @Author: zhoulf
 * @FilePath: /testvue/src/store/util.js
 * @Date: 2021-12-10 14:20:04
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-10 14:28:14
 * @Description: 
 */
export function createGetters(store){
    const getters = Object.create(null)
    Object.defineProperties(
        getters,
        Object.keys(store).reduce((obj,key) =>{
            obj[key] = {
                enumerable:true,
                get:() => store[key]
            }
            return obj
        },{})
    )
    return getters
}