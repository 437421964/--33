import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 声明一个变量，放到vuex
// vuex声明的变量
// - state里声明
// - 取：$store,state.属性名

//  vuex修改数据
//  - 自产自销
// -规范：函数命名采用大驼峰
// - mutations:函数
// - mutations里的函数的参数

//  - state:数据
//  -playload 载荷 触发mutations里面的方法
//  触发mutations里面的方法
//  -this.$store.commit('mutation方法名字',参数)

// getters->相当于computedi计算属性
// getters的函数第一个参数是state
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    bigNumber(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_COUNT(state, playload) {
      state.count += playload
    }
  }
})
