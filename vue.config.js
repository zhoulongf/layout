/*
 * @Author: zhoulf
 * @FilePath: /testvue/vue.config.js
 * @Date: 2021-12-11 16:53:07
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-13 12:11:24
 * @Description: 
 */
module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "./src/style/globa.scss";' // 全局引入
      }
    }
  },
}