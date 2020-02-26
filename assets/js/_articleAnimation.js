export default {
  methods: {
    // 控制上方文章進度條（category-content.js）
    _progressEvent() {
      var progressBar = $('#progress .bar'),
        articleH = [];

      $('.category.content article').each(function(i){
        var title = $(this).find('h1').html(),
          Timeline = new TimelineMax(),
          controller = new ScrollMagic.Controller();
        articleH.push($(this).height())
        var scene = new ScrollMagic.Scene({triggerElement: this, triggerHook: 'onLeave', duration: articleH[i], offset: 0})
                .setTween(
                  TweenMax.fromTo(progressBar, 1, {scaleX: 0, ease: Power0.easeNone}, {scaleX: 1, ease: Power0.easeNone})
                )
                .addTo(controller);
      })
    },
    _progressDisplay() {
      var edge = $('.category.content article').offset().top - 100,
        progress = $('#progress'),
        lastST,
        thisST;
      lastST = 0;
      $(window).scroll(function(event){
        thisST = $(this).scrollTop();
        if( thisST > edge && thisST > lastST ){
          // use progress will not work ?
          $('#progress').addClass('active')
        }
        if( thisST < lastST ){
          $('#progress').removeClass('active')
        }
        lastST = thisST;
      })
    },
    // 照片輪播（category-content.js）
    _albumSlider() {
      $('.category.content .album .owl-carousel').owlCarousel({
        animateOut: 'fadeOut',
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplaySpeed: 500,
        items: 1,
        nav: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        freeDrag: false,
        autoHeight: true,
        dotsContainer: '#carousel-custom-dots',
        dotsEach:true,
        autoHeight: false,
        autoHeightClass: 'owl-height'
      })
      $('.category.content .album .owl-dot').unbind('click')
      $('.category.content .album .owl-dot').bind('click',function () {
          $(".category.content .album .owl-carousel").trigger('to.owl.carousel', [$(this).index(), 300]);
      });
    },
    // 圖庫開關（category-content.js）
    _gallerySwitch() {
      const self = this;

      $('.category.content .album .ctrl-gallery a').unbind('click')
      $('.category.content .album .ctrl-gallery a').bind('click',function(){
        self.lockScroll(true)
        self.maskDisplay(true)
        self._galleryDisplay(true)
      })
      $('#gallery .gallery-close a').unbind('click')
      $('#gallery .gallery-close a').bind('click',function(){
        self.lockScroll(false)
        self.maskDisplay(false)
        self._galleryDisplay(false)
      })
      $(window).keyup(function(e) {
          if (e.keyCode == 27) {
            self._galleryDisplay(false)
          }
      });
    },
    _galleryDisplay(boolean) {
      var timeLine = new TimelineLite(),
        main = $('.category.content'),
        gallery = $('#gallery');
      if(boolean){
        timeLine.to( gallery, .5, { x: '0%', ease: Power4.easeOut },.3)
            .to( main, .5, { x: -100, ease: Power4.easeOut },.3)
      } else {
        timeLine.to( gallery, .5, { x: '100%', ease: Power4.easeOut },0)
            .to( main, .5, { x: 0, ease: Power4.easeOut },0)
      }
    },
    // - 照片呈現瀑布（未用）
    _galleryGrid() {
      $('#gallery .grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 350,
        gutter: 15
      });
    },
    // - 照片燈箱屬性設定
    _galleryLightbox() {
      lightbox.option({
        'wrapAround': true,
        'disableScrolling': true,
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'resizeDuration': 0,
        'showImageNumberLabel': false,
        'positionFromTop': 0,
        'maxWidth': 1080
      })
    }
  },
}