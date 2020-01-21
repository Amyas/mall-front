import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export function createStore () {
  const store = new Vuex.Store({
    state: () => ({
      goods: [],
      goodsType: [1, 2, 3]
    }),
    getters: {},
    mutations: {
      SET_GOODS_LIST (state, payload) {
        state.goods = payload
      },
      SET_GOODS_TYPE_LIST (state, payload) {
        state.goodsType = payload
      }
    },
    actions: {
      async getGoods ({ commit }) {
        const data = await axios({
          url: 'http://admin.amyas.cn/api/goods'
        })
        commit('SET_GOODS_LIST', data.data.data.items)
      },
      async getGoodsType ({ commit }) {
        const data = await axios({
          url: 'http://admin.amyas.cn/api/goods-class'
        })
        commit('SET_GOODS_TYPE_LIST', data.data.data.items)
      }
    },
    modules: {}
  })
  return store
}
