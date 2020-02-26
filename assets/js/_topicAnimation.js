export default {
  methods: {
    _progressEvent() {
      var progressBar = $('#progress .bar'),
        articleH = [];

      $('.topic.content article').each(function(i){
        // - 取得所有收錄文章的h1
        var title = $(this).find('h1').html(),
          controller = new ScrollMagic.Controller();

        // - 時間軸的h2 文字顯示的地方
        var progressChange = function(){
          var progressH2 = $('#progress h2'),
            Timeline = new TimelineMax();

          // - 把抓到的文章標題h1，塞入時間軸的h2
          Timeline.to(progressH2, .1, {y: -10, opacity:0}, 0)
              .add(function(){ progressH2.html(title) }, .1)
              .set(progressH2, {y: 10, opacity:0}, .1)
              .to(progressH2, .3, {y: 0, opacity:1}, .2)
        }

        articleH.push($(this).height())
        var scene = new ScrollMagic.Scene({triggerElement: this, triggerHook: 'onLeave', duration: articleH[i], offset: -130})
          .on("enter",function(){
            progressChange();
            $('.topic.content ul.catalog li').eq(i).addClass('active').siblings().removeClass('active')
          })
                .setTween(
                  TweenMax.fromTo(progressBar, 1, {scaleX: 0, ease: Power0.easeNone}, {scaleX: 1, ease: Power0.easeNone})
                )
                .addTo(controller);
      })

      $('.topic.content ul.catalog li').bind('click',function(){
        var id = $(this).attr('data-anchor');
        TweenMax.to(window, .75, {scrollTo:{y: id, autoKill:false, offsetY: 130}, ease: Power3.easeOut})
      })
    },
    _progressDisplay() {
      var edge = $('.topic.content .topic-body').offset().top - 130,
        progress = $('#progress'),
        lastST,
        thisST;
      lastST = 0;
      $(window).scroll(function(event){
        thisST = $(this).scrollTop();
        if( thisST > edge && thisST > lastST ){
          progress.addClass('active')
        }
        if( thisST < lastST ){
          progress.removeClass('active')
        }
        lastST = thisST;
      })
    }
  }
}