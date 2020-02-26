export default {
  data() {
    return {
      navLevel1ul: null,
      navLevel1li: null,
      breakPoint: 768,
      menu: null,
      all: null,
      mask: null,
      entrance: null,
      winW: null,
      winH: null,
      isMobile: null,
      availableTags: [
        "神鬼傳奇 The Mummy",
        "神鬼交鋒 Catch Me If You Can",
        "神鬼戰士 Gladiator",
        "神鬼第六感 The Others",
        "神鬼玩家 Aviator",
        "神鬼認證 The Bourne Identity",
        "神鬼無間 The Departed",
        "神鬼奇航 Pirates of the Caribbean",
        "神鬼獵人 The Revenant"
      ]
    }
  },
  methods: {
    // 導航列下拉選單 (default.js)
    // - 移入nav，可跑出下拉選單
    _navLevel1Acd() {
      this.navLevel1li.accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
        event: "mouseover",
        animate: {
          easing: "easeOutQuart",
          duration: 500
        }
      }).on('mouseleave', function () {
        $(this).accordion("option", "active", false);
      })
    },
    // - nav下方小線條可滑動。下拉選單持續打開(全部顯示)
    _navLevel1Lava() {
      const self = this
      const navLava = self.navLevel1ul.children('li.lava-line')
      self.navLevel1li.unbind('mouseover')
      self.navLevel1li.bind('mouseover', function () {
        var offset = $(this).offset(),
          offsetBody = self.navLevel1ul.offset(),
          distance = offset.left - offsetBody.left;
        TweenMax.to(navLava, 1, {
          x: distance,
          ease: Power3.easeOut
        });
      });
    },
    // - 下拉選單持續打開(正常顯示)
    _navLevel2Tabs() {
      $('#nav .menu-level-2.tabs').tabs({
        heightStyle: "auto",
        event: "mouseover",
        collapsible: false,
        active: 0
      });
      $('#nav .menu-level-2.tabs ul li a').click(function () {
        location.href = this.rel;
      });
    },
    // 手機版，導航列下拉選單 (default.js)
    // - 手機選單內的導航列內容折疊
    _menuLevel1Acd() {
      $('#menu .accordion').accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
        event: "click",
        animate: {
          easing: "easeOutQuart",
          duration: 500
        }
      })
    },
    // - 打開手機選單的動畫
    _menuDisplay(boolean) {
      const self = this

      if (boolean) {
        TweenMax.to(this.menu, .5, {
          x: '0%',
          ease: Power3.easeOut
        });
        self.lockScroll(true);
      } else {
        TweenMax.to(this.menu, .5, {
          x: '-100%',
          ease: Power3.easeOut
        });
        self.lockScroll(false);
      }
    },
    // - 點擊burger，打開手機選單
    _menuSwitch() {
      const self = this

      $('#nav .nav-burger a').unbind('click')
      $('#nav .nav-burger a').bind('click', function () {
        self._menuDisplay(true)
      })
      $('#menu .menu-close a').unbind('click')
      $('#menu .menu-close a').bind('click', function () {
        self._menuDisplay(false)
      })
      this.menu.swipe({
        swipeLeft: function () {
          self._menuDisplay(false)
        },
        threshold: 100
      });
    },
    // 會員面板開合。登入後會顯示，登入後的面板。使用isLogin判斷 (default.js)
    _settingAcd() {
      $('.icon-member.accordion').accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
        event: "click",
        animate: {
          easing: "easeOutQuart",
          duration: 500
        }
      })
    },
    // 取得瀏覽器寬、高; 判別桌機手機 [watch?]
    resize() {
      const self = this
      self.winW = $(window).width()
      self.winH = $(window).height()

      if (self.winW < self.breakPoint) {
        self.isMobile = 1;
      }
      if (self.winW >= self.breakPoint) {
        self.isMobile = 0;
      }
      $(window).bind("resize", function () {
        self.winW = $(window).width()
        self.winH = $(window).height()
        if (self.winW < self.breakPoint) {
          self.isMobile = 1;
        }
        if (self.winW >= self.breakPoint) {
          self.isMobile = 0;
        }
      })
    },
    // 登入開關。桌機、手機 (default.js)
    _entranceSwitch() {
      const self = this
      $('#nav .nav-tool .icon-member a.logout, #menu .menu-main .button a.btn').unbind('click')
      $('#nav .nav-tool .icon-member a.logout, #menu .menu-main .button a.btn').bind('click', function () {
        self._entranceDisplay(true)
      })
      $('#entrance .entrance-close a').unbind('click')
      $('#entrance .entrance-close a').bind('click', function () {
        self._entranceDisplay(false)
      })
      self.entrance.swipe({
        swipeLeft: function () {
          self._entranceDisplay(false)
        },
        threshold: 100
      });
    },
    // - 登入面板，動畫
    _entranceDisplay(boolean) {
      var Timeline = new TimelineLite(),
        main = $('.main');
      const self = this

      if (boolean) {
        if (self.isMobile == 0) {
          Timeline.to(self.entrance, .5, {
              x: '0%',
              ease: Power3.easeOut
            }, .3)
            .to(self.all, .5, {
              x: -100,
              ease: Power3.easeOut
            }, .3)
        }
        if (self.isMobile == 1) {
          Timeline.to(self.entrance, .5, {
            x: '0%',
            ease: Power3.easeOut
          }, 0)
        }
        self.maskDisplay(true)

      } else {
        if (self.isMobile == 0) {
          Timeline.to(self.entrance, .5, {
              x: '100%',
              ease: Power3.easeOut
            }, 0)
            .to(self.all, .5, {
              x: 0,
              ease: Power3.easeOut
            }, 0)
            .add(function () {
              main.removeAttr("style")
            }, .5)
        }
        if (self.isMobile == 1) {
          Timeline.to(self.entrance, .5, {
            x: '-100%',
            ease: Power3.easeOut
          }, 0)
        }
        self.maskDisplay(false)
      }
    },
    // - 登入面板，不讓他出現兩個
    _entranceTabs() {
      $('#entrance .tabs').tabs({
        heightStyle: "auto",
        event: "click",
        collapsible: false
      });
    },
    _entranceInput() {
      $('#entrance .form-control').unbind('click')
      $('#entrance .form-control').bind('click', function () {
        $('#entrance .form-group').removeClass('line-in')
        $(this).parent('.form-group').addClass('line-in')
      })
    },
    allClose() {
      this.maskDisplay(false)
      this._menuDisplay(false)
      this._entranceDisplay(false)
      this._searchDisplay(false)
    },
    // 在該網站，按ESC會觸發
    _maskSwitch() {
      const self = this
      self.mask.unbind('click')
      self.mask.bind('click', function () {
        self.allClose()
      })
      $(window).keyup(function (e) {
        if (e.keyCode == 27) {
          self.allClose()
        }
      });
    },
    // 搜尋開關 (default.js)
    // - bind 搜尋功能
    _searchSwitch() {
      const self = this
      $('#nav .nav-tool .icon-search a').unbind('click')
      $('#nav .nav-tool .icon-search a').bind('click', function () {
        self._searchDisplay(true)
      })
      $('#search .search-close a').unbind('click')
      $('#search .search-close a').bind('click', function () {
        self._searchDisplay(false)
      })
    },
    // - 搜尋區塊，動畫
    _searchDisplay(boolean) {
      var search = $('#search');
      const self = this

      if (boolean) {
        if (self.isMobile == 0) {
          TweenMax.to(search, .5, {
            css: {
              height: '320px'
            },
            ease: Power3.easeOut
          }, .3)
        }
        if (self.isMobile == 1) {
          TweenMax.to(search, .5, {
            css: {
              height: '100%'
            },
            ease: Power3.easeOut
          }, .3)
        }
        self.maskDisplay(true)

      } else {
        TweenMax.to(search, .5, {
          css: {
            height: '0%'
          },
          ease: Power3.easeOut
        })
        self.maskDisplay(false)
      }
    },
    // - 顯示下方搜尋建議
    _searchList() {
      $("#input-search").autocomplete({
        source: this.availableTags,
        response: function (event, ui) {}
      }).focus(function () {
        $('#search .tags').fadeOut(300)
      }).blur(function () {
        $('#search .tags').fadeIn(300)
      })
    },
    // 手機版，文章變輪播（component/mobile-slider.js）
    _mobileSlider() {
      const query = "screen and (max-width:767px)";
      enquire.register(query, {
        match: function () {
          $('.mobile-slider.owl-carousel').owlCarousel({
            autoplay: false,
            items: 2,
            center: true,
            loop: false,
            nav: false,
            margin: 10,
            autoWidth: true
          })
        },
        unmatch: function () {
          $('.mobile-slider.owl-carousel').trigger('destroy.owl.carousel');
        }
      })
    },
    // footer 選單移動效果 (default.js)
    _footerLava() {
      $('#footer .link ul li').unbind('mouseover')
      $('#footer .link ul li').bind('mouseover', function () {
        var offset = $(this).offset(),
          offsetBody = $('#footer .link ul').offset(),
          distance = offset.left - offsetBody.left;
        TweenMax.to($('#footer .link ul li.lava-line'), 1, {
          x: distance,
          ease: Power3.easeOut
        });
      });
    }
  },
  mounted() {
    this.navLevel1ul = $('#nav .nav-menu .menu-level-1')
    this.navLevel1li = this.navLevel1ul.children('li')
    this.menu = $('#menu')
    this.all = $('#nav, #footer, .main')
    this.mask = $('#mask')
    this.entrance = $('#entrance')
  },
}