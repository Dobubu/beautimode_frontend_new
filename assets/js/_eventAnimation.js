export default {
  methods: {
    // 得獎名單的選單開合（event-content.js）
    _toggleAccordion() {
      $('.event.content .block-accordion .accordion').accordion({
        collapsible: true,
        heightStyle: "content"
      })
    }
  },
}