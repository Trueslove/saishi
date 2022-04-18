// commpents/form/upload/index.js
const wxapi = require('../../../utils/wxapi')
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: String
        },
        title: {
            type: String
        },
        tips: {
            type: Boolean
        },
        maxNumberLimit: {
            type: Number
        },
        value: {
            type: Array
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        list: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 选择图片
        choosePhoto (e) {
            let index = e.currentTarget.dataset.index
            let type = ['camera', 'album']
            wxapi.choosePhoto(type, wxapi.uploadFile, res => {
                let list = this.data.list
                res.url = res.src
                if (index === '') {
                    list.push(res)
                } else {
                    list.splice(index, 1, res)
                }
                this.setData({
                    list
                })
                this.triggerEvent('customevent', {value: list})
            })
        },
        // 选择视频
        chooseVideo (e) {
            let index = e.currentTarget.dataset.index
            let type = ['camera', 'album']
            wxapi.chooseVideo(type, wxapi.uploadVideo, res => {
                let list = this.data.list
                res.url = res.src
                if (index === '') {
                    list.push(res)
                } else {
                    list.splice(index, 1, res)
                }
                this.setData({
                    list
                })
                this.triggerEvent('customevent', {value: list})
            })
        },
        videoPlay(e) {
            this.video = wx.createVideoContext(e.currentTarget.id, this)
            this.video.requestFullScreen()
        },
        fullscreenchange(e) {
            if (!e.detail.fullscreen) {
              this.video.pause()
            }
        },
    },
    lifetimes: {
        attached: function() {
            if (this.data.value) {
                this.setData({
                    list: this.data.value
                })
            }
        },
      },
      attached: function() {
        if (this.data.value) {
            this.setData({
                list: this.data.value
            })
        }
      },
})
