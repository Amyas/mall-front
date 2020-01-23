import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    // 重要信息：state 必须是一个函数，
    // 因此可以创建多个实例化该模块
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {}
  });
}
