const path = require('path')
const conf = require('./package-lock.json')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './', // 如果要打包cordova apk，这里必须为 ./ 否则会出现白屏的现象,如果放到网站上，为 /
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  lintOnSave: process.env.NODE_ENV === 'development',
  assetsDir: 'static',
  devServer: {
    open: true,
    host: '0.0.0.0', // 本地localhost和ip都可以打开
    useLocalIp: true,
    port: 5002,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        // target: 'http://47.106.68.248:3002', // 请求地址
        target: 'http://127.0.0.1:3002', // 请求地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 请求地址
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      'BMap': 'BMap',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      vant: 'vant'
    },
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
      filename: `js/[name].${conf.version}.js`
      // chunkFilename: `js/[name].${conf.version}.js`
    },
    // 修改打包后css文件名
    plugins: [
      new MiniCssExtractPlugin({
        filename: `css/[name].${conf.version}.css`
        // chunkFilename: `css/[name].${conf.version}.css`
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('@', resolve('src'))
      .set('_c', resolve('@/components'))
      .set('view', resolve('@/views'))
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
