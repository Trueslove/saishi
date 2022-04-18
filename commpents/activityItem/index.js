// commpents/activityItem/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: String
        },
        item: {
            type: Object
        },
        index: {
            type: Number
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
            this.setData({ imageUrl: wx.getStorageSync('imageUrl')})
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
