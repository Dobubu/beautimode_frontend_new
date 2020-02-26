const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'BeautiMode 創意生活風格網',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { 'http-equiv': 'content-language', content:'zh-TW' },
      { name: 'keywords', content: '時尚,生活,創意,beautimode,美麗,自信,幸福' },
      { name: 'author', content: '宏麗數位創意' },
      { property: 'og:site_name', content: 'BeautiMode 創意生活風格網' },
      { property: 'og:title', content: 'BeautiMode 創意生活風格網' },
      { property: 'og:description', content: 'BeautiMode，由“Beauty’’和“Mode’’兩個字組成，“Mode”在法文中意為「時尚」，在英文中意為「形式/模式」，代表「美麗」的“Beauty”，字尾的“y”改成“i”，代表「我」，“BeautiMode”意味著「關於我的美麗與時尚以及我的美麗形式/模式」。 愛美是人的天性，品味可以培養，優質設計讓生活更美好！每位女性都是獨一無二的，每個人都擁有變美的權利，美的呈現有成千上萬種模式，《BeautiMode創意生活風格網》提供美的訊息，希望每位女性能從中找到適合自己的方式，讓自己內外皆美。 每位女性都是獨一無二的，每個人都擁有變美的權利，美的呈現有成千上萬種模式，BeautiMode創意生活風格網提供美的訊息，希望每位女性能從中找到適合自己的方式，讓自己內外皆美。' },
      { property: 'og:image', content: 'https://www.beautimode.com/theme/main/image/logo.png' },
      { property: 'og:url', content: 'http://www.beautimode.com/' },
      { property: 'og:type', content: 'website' }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-1.12.4.js' },    
      { src: 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js'},
      { src: 'https://cdn.bootcss.com/parallax.js/1.4.2/parallax.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.0/owl.carousel.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.0/masonry.pkgd.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.9.0/js/lightbox.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/enquire.js/2.1.6/enquire.min.js'},     
      { src: 'https://platform.twitter.com/widgets.js', charset: 'utf-8'},
      { src: '/js/application.js' },
      { src: '/js/canvas-video-player.js' },
      { src: '/js/twitter.js' },
      { src: '/js/typekit.js' },
      { src: '/js/ScrollToPlugin.min.js' },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: 'https://www.beautimode.com/BeautiMode.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css'}
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/sass/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/axios', { debug: false }]
  ],
  axios: {
    baseURL: process.env.API_MODE === 'production' ? 'http://www-api.beautimode.com/api/front' : 'http://demo-api.beautimode.com/api/front'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    vendor: ["jquery"],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  /*
  ** Edit host and port
  */
  server: {
    https: false,
    port: 3090,      // default: 3000,
    host: '0.0.0.0', // default: localhost
  },
  router: {
    linkActiveClass: 'activeLink',
    linkExactActiveClass: 'exact-active-link',
    // middleware: 'auth'
  }
}
