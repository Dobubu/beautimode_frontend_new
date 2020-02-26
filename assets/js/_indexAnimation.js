export default {
	data() {
		return {
			video: null,
			videoPlayer: null,
			videoCont: null,
			videoClose: null,
			videoCanvas: null,
			section_top: null,
			window_scroll: null,
			top_px: null
		}
	},
	methods: {
		// nav置頂（home.js)
		_navFixed() {
			var nav = $('nav#nav'),
				controller = new ScrollMagic.Controller(),
				scene = new ScrollMagic.Scene({
					triggerElement: ".home .choice > .container",
					triggerHook: "onLeave"
				})
				.on("enter", function () {
					nav.removeClass('index')
					TweenMax.fromTo(nav, 1, {
						y: -90,
						ease: Power4.easeOut
					}, {
						y: 0,
						ease: Power4.easeOut
					})
				})
				.on("leave", function () {
					nav.addClass('index')
				})
				//.addIndicators({name: "nav"})
				.addTo(controller);

			nav.addClass('index')
		},
		// 專題輪播（home.js)
		_topicSlider() {
			$('.home .topic .owl-carousel').owlCarousel({
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
				dotsEach: true
			})

			$('.home .topic .owl-dot').click(function () {
				$(".home .topic .owl-carousel").trigger('to.owl.carousel', [$(this).index(), 300]);
			});
		},
		videoDisplay(boolean) {
			var Timeline = new TimelineMax();
			const self = this;

			if (boolean) {
				Timeline.set(self.video, {
						css: {
							'position': 'fixed',
							'z-index': 6,
							height: '432px',
							top: self.top_px + 'px'
						}
					})
					.to(self.video, .7, {
						css: {
							top: '0px',
							height: '100%'
						},
						ease: Power4.easeOut
					})
					.add(function () {
						self.video.addClass('active')
					}, 0)
					.add(function () {
						self.videoCont.fadeOut(700)
					}, 0)
					.add(function () {
						self.videoClose.fadeIn(700)
					}, 0)

			} else {
				Timeline.set(self.video, {
						css: {
							'position': 'relative',
							'z-index': 1,
							height: '432px'
						}
					})
					.add(function () {
						self.video.removeClass('active')
					}, 0)
					.add(function () {
						self.videoCont.fadeIn(0)
					}, 0)
					.add(function () {
						self.videoClose.fadeOut(0)
					}, 0)
			}
		},
		// 影片開關（home.js)
		_videoSwitch() {
			var controller = new ScrollMagic.Controller(),
				canvasVideo = new CanvasVideoPlayer({
					videoSelector: '.js-video',
					canvasSelector: '.js-canvas',
					timelineSelector: '.js-timeline',
					audio: false,
					autoplay: true,
					loop: true,
					hideVideo: true
				});
			const self = this

			var scene = new ScrollMagic.Scene({
					triggerElement: 'section.video',
					triggerHook: 'onEnter'
				})
				.on("enter", function () {
					$(window).scroll(function (event) {
						self.section_top = self.video.offset().top;
						self.window_scroll = $(window).scrollTop();
						self.top_px = (self.section_top - self.window_scroll);
					})
					canvasVideo.play()
				})
				.on("leave", function () {
					canvasVideo.pause()
				})
				.addTo(controller);

			var scene = new ScrollMagic.Scene({
					triggerElement: 'section.event',
					triggerHook: 'onLeave'
				})
				.on("enter", function () {
					canvasVideo.pause()
				})
				.on("leave", function () {
					canvasVideo.play()
				})
				.addTo(controller);

			self.videoCont.children('a').on('click', function () {
				self.videoDisplay(true)
				self.lockScroll(true)
			})

			self.videoClose.on('click', function () {
				self.videoDisplay(false)
				self.lockScroll(false)
			})

			$(window).keyup(function (e) {
				if (e.keyCode == 27) {
					self.videoDisplay(false)
				}
			});

			canvasVideo.pause();
		},
		indexTest() {
			console.log('[mixin] index')
		},
	},
	mounted() {
		this.video = $('.home .video');
		this.videoPlayer = this.video.children('.video-player');
		this.videoCont = this.video.children('.container');
		this.videoClose = this.video.children('.video-close');
		this.videoCanvas = $('canvas.js-canvas');
	},
}