// pages/user_work/index.js
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
        userInfo: {},
        imageUrl: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMyZPList();
    },
    async getMyZPList() {
        const userInfo = wx.getStorageSync('userInfo')
        const imageUrl = wx.getStorageSync('imageUrl')
        const {
            code,
            data
        } = await globalData.$api.getMyZPList()
        if (code != 0) return false
        let list = data;
        list = list.map(x => {
            x.zpUpdateTime = formatTime(x.zpUpdateTime)
            return x
        })
        this.setData({
            userInfo: JSON.parse(userInfo),
            imageUrl,
            list,
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})