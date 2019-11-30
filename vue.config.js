
// const fs = require('fs')

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/css/elementUI.scss";`
            }
        }
    },
    configureWebpack: {
        resolve: {
          alias: {
            'vue$': 'vue/dist/vue.esm.js' 
          }
        }
    }
}