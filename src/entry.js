import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

// 由于服务端渲染，对象会存于服务器中，所以不可以使用单例
// 需要为每次请求都生成一个Vue实例,router/store同理
export function CreateApp () {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
