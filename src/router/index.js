import Vue from 'vue'
import Router from 'vue-router'

const List = () => import(/* webpackChunkName: "list" */ '@/views/List')
const Item = () => import(/* webpackChunkName: "item" */ '@/views/Item')

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'List',
        component: List
      },
      {
        path: '/item',
        name: 'Item',
        component: Item
      }
    ]
  })
}
