module.exports = {
  // 为对象中的Key添加process.env.前缀
  replaceEnvKey(obj) {
    const envObj = {}
    Object.keys(obj).forEach(k => {
      envObj[`process.env.${k}`] = obj[k]
    })
    return envObj
  }
}
