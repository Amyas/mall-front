import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 测试页面 */ const Test = () => import(/* webpackChunkName: "test" */ '@/views/test')
/* 测试页面 */ const Child = () => import(/* webpackChunkName: "child" */ '@/views/child')

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Test',
        component: Test
      },
      {
        path: '/child',
        name: 'Child',
        component: Child
      }
    ]
  })
  return router
}
