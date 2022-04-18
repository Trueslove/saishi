const {
    formatTime
} = require("../../utils/util")

const {
    globalData
} = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        page: 1,
        isLoad: true,// 是否上拉加载
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getNewsList()
    },

    async getNewsList() {
        let params = {
            "activityName": "",
            "pageNum": this.data.page,
            "pageSize": 20,
        }
        const {
            code,
            data
        } = await globalData.$api.getNewsList(params)
        if (code != 0) return false
        if (data.list.length <= 0) return this.setData({ isLoad: false })

        data.list = data.list.map(x => {
            x.releaseTime = formatTime(x.releaseTime)
            return x
        })
        this.setData({
            list: [...data.list, ...this.data.list],
            isLoad: true
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function (e) {
        if(!this.data.isLoad) return false
        this.setData({
            page: this.data.page + 1
        })
        this.getNewsList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})