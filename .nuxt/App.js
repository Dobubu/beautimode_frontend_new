import Vue from 'vue'

import {
  getMatchedComponentsInstances,
  promisify,
  globalHandleError
} from './utils'

import '../node_modules/element-ui/lib/theme-chalk/index.css'

import '../assets/sass/app.scss'

import _6f6c098b from '../layouts/default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"title":"BeautiMode 創意生活風格網","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"My flawless Nuxt.js project"},{"http-equiv":"content-language","content":"zh-TW"},{"name":"keywords","content":"時尚,生活,創意,beautimode,美麗,自信,幸福"},{"name":"author","content":"宏麗數位創意"},{"property":"og:site_name","content":"BeautiMode 創意生活風格網"},{"property":"og:title","content":"BeautiMode 創意生活風格網"},{"property":"og:description","content":"BeautiMode，由“Beauty’’和“Mode’’兩個字組成，“Mode”在法文中意為「時尚」，在英文中意為「形式\u002F模式」，代表「美麗」的“Beauty”，字尾的“y”改成“i”，代表「我」，“BeautiMode”意味著「關於我的美麗與時尚以及我的美麗形式\u002F模式」。 愛美是人的天性，品味可以培養，優質設計讓生活更美好！每位女性都是獨一無二的，每個人都擁有變美的權利，美的呈現有成千上萬種模式，《BeautiMode創意生活風格網》提供美的訊息，希望每位女性能從中找到適合自己的方式，讓自己內外皆美。 每位女性都是獨一無二的，每個人都擁有變美的權利，美的呈現有成千上萬種模式，BeautiMode創意生活風格網提供美的訊息，希望每位女性能從中找到適合自己的方式，讓自己內外皆美。"},{"property":"og:image","content":"https:\u002F\u002Fwww.beautimode.com\u002Ftheme\u002Fmain\u002Fimage\u002Flogo.png"},{"property":"og:url","content":"http:\u002F\u002Fwww.beautimode.com\u002F"},{"property":"og:type","content":"website"}],"script":[{"src":"https:\u002F\u002Fcode.jquery.com\u002Fjquery-1.12.4.js"},{"src":"https:\u002F\u002Fcode.jquery.com\u002Fui\u002F1.12.1\u002Fjquery-ui.min.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fgsap\u002F1.19.1\u002FTweenMax.min.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery.touchswipe\u002F1.6.18\u002Fjquery.touchSwipe.min.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002FScrollMagic\u002F2.0.5\u002FScrollMagic.min.js"},{"src":"https:\u002F\u002Fcdn.bootcss.com\u002Fparallax.js\u002F1.4.2\u002Fparallax.min.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002FOwlCarousel2\u002F2.2.0\u002Fowl.carousel.min.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002FScrollMagic\u002F2.0.5\u002Fplugins\u002Fanimation.gsap.min.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fmasonry\u002F4.2.0\u002Fmasonry.pkgd.min.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Flightbox2\u002F2.9.0\u002Fjs\u002Flightbox.min.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fenquire.js\u002F2.1.6\u002Fenquire.min.js"},{"src":"https:\u002F\u002Fplatform.twitter.com\u002Fwidgets.js","charset":"utf-8"},{"src":"\u002Fjs\u002Fapplication.js"},{"src":"\u002Fjs\u002Fcanvas-video-player.js"},{"src":"\u002Fjs\u002Ftwitter.js"},{"src":"\u002Fjs\u002Ftypekit.js"},{"src":"\u002Fjs\u002FScrollToPlugin.min.js"}],"link":[{"rel":"shortcut icon","type":"image\u002Fx-icon","href":"https:\u002F\u002Fwww.beautimode.com\u002FBeautiMode.ico"},{"rel":"stylesheet","href":"https:\u002F\u002Fuse.fontawesome.com\u002Freleases\u002Fv5.8.1\u002Fcss\u002Fall.css"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fanimate.css\u002F3.7.2\u002Fanimate.min.css"}],"__dangerouslyDisableSanitizers":["script"],"style":[]},

  render (h, props) {
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [layoutEl])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter (el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [templateEl])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [

      transitionEl
    ])
  },

  data: () => ({
    isOnline: true,

    layout: null,
    layoutName: ''
  }),

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this

      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  computed: {
    isOffline () {
      return !this.isOnline
    }
  },

  methods: {
    refreshOnlineStatus () {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    async refresh () {
      const pages = getMatchedComponentsInstances(this.$route)

      if (!pages.length) {
        return
      }

      const promises = pages.map((page) => {
        const p = []

        if (page.$options.fetch) {
          p.push(promisify(page.$options.fetch, this.context))
        }

        if (page.$options.asyncData) {
          p.push(
            promisify(page.$options.asyncData, this.context)
              .then((newData) => {
                for (const key in newData) {
                  Vue.set(page.$data, key, newData[key])
                }
              })
          )
        }

        return Promise.all(p)
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        globalHandleError(error)
        this.error(error)
      }
    },

    setLayout (layout) {
      if(layout && typeof layout !== 'string') {
        throw new Error('[nuxt] Avoid using non-string value as layout property.')
      }

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
}
