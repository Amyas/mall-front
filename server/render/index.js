module.exports = async ctx => {
  try {
    const html = await ctx.renderer.renderToString(ctx)
    ctx.body = html
  } catch (error) {
    ctx.body = error
  }
}
