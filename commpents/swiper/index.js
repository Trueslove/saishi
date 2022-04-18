// commpents/swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
      default: []
    },
    url: {
      type: String,
      default: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeSwiper({
      detail
    }) {
      this.setData({
        currentIndex: detail.current
      })
    },
    goDetail() {
      wx.navigateTo({
        url: '/pages/competition/index',
      })
    }
  }
})