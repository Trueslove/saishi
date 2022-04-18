// pages/message/index.js
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
    noReadNum: 0, // 未读条数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyMsgList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  async handleRead(e) {
    let {
      type,
      id,
      read
    } = e.currentTarget.dataset;
    if ((type === 'all' && this.data.noReadNum) || read == 0) {
      await globalData.$api.msgsRead({msgId: id})
      if (code != 0) return false
      this.setData({
        noReadNum: 0
      })
    }
  },
  async getMyMsgList() {
    const {
      code,
      data
    } = await globalData.$api.getMyMsgList()
    if (code != 0) return false
    let list = data;
    let targetList = list.filter(item => {
      return item.isRead == 0
    })
    list = list.map(x => {
      x.createTime = formatTime(x.createTime)
      return x
    })
    this.setData({
      list: list,
      noReadNum: targetList.length
    })
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