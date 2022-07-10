const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    publicPath: '/',
    outputDir: "dist",
    assetsDir: "static",
    indexPath: "spa.html",
    css: {extract: false}
  }
})
