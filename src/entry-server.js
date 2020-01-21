import { CreateApp } from './entry'

/**
 * 返回服务端渲染实例
 * @param {Object} ctx 服务端渲染renderToString中传入的context
 */
export default ctx => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    // 当前页面url
    const url = ctx.server.originalUrl

    const { app, router, store } = CreateApp()

    // 设置vue路由
    router.push(url)

    router.onReady(async function () {
      const matchedComponents = router.getMatchedComponents()
      // 解析路由内容，并执行asyncData生命周期
      // 执行asyncData生命周期来获取数据
      await Promise.all(
        matchedComponents.map(Components => {
          if (Components.asyncData) {
            return Components.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })
      )

      ctx.state = store.state
      // 返回可用于渲染的vue对象
      resolve(app)
    }, reject)
  })
}
