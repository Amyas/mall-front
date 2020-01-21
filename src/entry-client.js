import Vue from 'vue'
import { CreateApp } from './entry'

const { app, router, store } = CreateApp()

// 把服务端获取的初始化数据注入store
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  Vue.nextTick(() => {
    Vue.mixin({
      created () {
        const { asyncData } = this.$options
        if (asyncData) {
          // 将获取数据操作分配给 promise
          // 以便在组件中，我们可以在数据准备就绪后
          // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
          this.dataPromise = asyncData({
            store: this.$store,
            route: this.$route
          })
        }
      }
    })
  })
  Vue.mixin({
    beforeRouteUpdate (to, from, next) {
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        })
          .then(next)
          .catch(next)
      } else {
        next()
      }
    }
  })
  app.$mount('#app')
})
