const path = require('path')
const webpack = require('webpack')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const { styles } = require('@ckeditor/ckeditor5-dev-utils')

function resolveSrc (_path) {
  return path.join(__dirname, _path)
}
// vue.config.js
module.exports = {
  lintOnSave: true,
  parallel: false,
  transpileDependencies: [
    /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/
  ],
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        src: resolveSrc('src'),
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),
      new CKEditorWebpackPlugin({
        language: 'it',
        translationsOutputFile: /app/
      })
    ]
  },
  chainWebpack: (config) => {
    // (1.) To handle the editor icons, get the default rule for *.svg files first:
    const svgRule = config.module.rule('svg')

    // Then you can either:
    //
    // * clear all loaders for existing 'svg' rule:
    //
    //		svgRule.uses.clear();
    //
    // * or exclude ckeditor directory from node_modules:
    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'))

    // Add an entry for *.svg files belonging to CKEditor. You can either:
    //
    // * modify the existing 'svg' rule:
    //
    //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
    //
    // * or add a new one:
    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader')

    // (2.) Transpile the .css files imported by the editor using PostCSS.
    // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
          },
          minify: true
        })
      })
  },
  // pwa: {
  //   name: 'ViteVini Agenti',
  //   themeColor: '#f08323',
  //   msTileColor: '#f08323',
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: '#f08323',
  //   icons: [
  //     {
  //       src: './public/img/icons/android-chrome-192x192.png',
  //       sizes: '192x192',
  //       type: 'image/png'
  //     },
  //     {
  //       src: './public/img/icons/android-chrome-512x512.png',
  //       sizes: '512x512',
  //       type: 'image/png'
  //     }
  //   ],
  //   iconPaths: {
  //     // favicon32: './public/img/icons/favicon-32x32.png',
  //     // favicon16: './public/img/icons/favicon-16x16.png',
  //     appleTouchIcon: './public/img/icons/apple-touch-icon-180x180.png',
  //     maskIcon: './public/img/icons/safari-pinned-tab.svg',
  //     msTileImage: './public/img/icons/msapplication-icon-144x144.png'
  //   }
  // },
  pluginOptions: {
    i18n: {
      locale: 'it',
      fallbackLocale: 'it',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.VUE_APP_NODE_ENV !== 'production'
  }
}
