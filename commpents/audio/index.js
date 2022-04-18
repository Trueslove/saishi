// commpents/audio/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
        type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached() {
        this.getAudioDuration()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getAudioDuration() {
        const innerAudioContext = wx.createInnerAudioContext()
        const imageUrl = wx.getStorageSync('imageUrl')

        innerAudioContext.autoplay = true
        
        innerAudioContext.src = imageUrl + this.properties.item.url
        
        var a = innerAudioContext.duration
        
     
    }
  }
})
