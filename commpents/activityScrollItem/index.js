// commpents/activityScrollItem/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        marginLeft: {
            type: String
        },
        width: {
            type: String
        },
        item: {
            type: Object,
            require: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imageUrl: ''
    },
    lifetimes: {
        attached() {
            this.setData({imageUrl : wx.getStorageSync('imageUrl')})
        },
    
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goToShowAd() {
            wx.navigateTo({
              url: '/pages/webView/index?url=' + this.properties.item.url,
            })
        }
    }
})