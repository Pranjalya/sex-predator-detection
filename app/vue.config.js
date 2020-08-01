module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
    cordovaPath: 'src-cordova'
  },

  transpileDependencies: [
    'quasar'
  ],

  publicPath: process.env.NODE_ENV === 'production'
  ? '/chary/'
  : '/'
}


