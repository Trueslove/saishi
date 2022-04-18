// pages/user_awards/index.js
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
    },
    async getMyCertifycateList() {
      const {
          code,
          data
      } = await globalData.$api.getMyCertifycateList()
      if (code != 0) return false
      const userInfo = wx.getStorageSync('userInfo')
      const imageUrl = wx.getStorageSync('imageUrl')
      let total = 0
      data.forEach(item => {
        item.issueTime = formatTime(item.issueTime)
      })
      this.setData({
          userInfo: JSON.parse(userInfo),
          imageUrl,
          list: data,
          total
      })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getMyCertifycateList();
    },
    go(e) {
      let {id} = e.currentTarget.dataset;
        wx.navigateTo({
          url: '/pages/user_certificate/index?id=' + id,
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