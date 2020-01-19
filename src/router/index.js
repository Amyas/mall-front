import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 测试页面 */ const Test = () => import(/* webpackChunkName: "test" */ '@/views/test')

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        children: [
          {
            path: '/',
            name: 'Test',
            component: Test
          }
        ]
      }
    ]
  })
  return router
}
