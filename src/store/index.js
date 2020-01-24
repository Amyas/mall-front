import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    // 重要信息：state 必须是一个函数，
    // 因此可以创建多个实例化该模块
    state: () => ({
      list: []
    }),
    getters: {},
    mutations: {
      SET_LIST(state, payload) {
        state.list = payload
      }
    },
    actions: {
      async getList({ commit }) {
        const data = await axios.get('http://admin.amyas.cn/api/goods-class')
        commit('SET_LIST', data.data.data.items)
      }
    }
  })
}
