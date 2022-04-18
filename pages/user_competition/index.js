const {
    globalData
} = getApp()
const {
    formatTime
} = require("../../utils/util")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        list: [],
        imageUrl: '',
        total: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.myActibity()
    },

    async myActibity() {
        const {
            code,
            data
        } = await globalData.$api.myActivity()
        if (code != 0) return false
        const userInfo = wx.getStorageSync('userInfo')
        const imageUrl = wx.getStorageSync('imageUrl')
        let total = 0
        data.forEach(item => {
            item.activityList.forEach(c => {
                if (c.enrollTime) {
                    c.enrollTime = formatTime(c.enrollTime)
                }
                // c.coverPic = JSON.parse(c.coverPic)
            })
            total += item.activityList.length;
        })
        console.log(data)
        this.setData({
            userInfo: JSON.parse(userInfo),
            imageUrl,
            list: data,
            total
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})