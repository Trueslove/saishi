// pages/uploadWork/index.js
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
    enrollWork: {},
    imageUrl: wx.getStorageSync('imageUrl'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id}) {
    this.enrollWorkListManage(id)
  },
  async enrollWorkListManage(id) {
    const {
      code,
      data
    } = await globalData.$api.enrollWorkListManage({
      performanceActivityId: "ed2f88a82903463cb106a523c1a1d541"
    })
    if (code != 0) return false
    data.workList.forEach(item => {
      item.stageWorkList.forEach(c => {
        c.uploadTime = formatTime(c.uploadTime);
        let targetImg = c.workFormRecord.filter(f => {
          return f.type == 'uploadPic_works_preset'
        });
        c.uploadPicImg = targetImg[0].answer[0].url;
        let targetTitle = c.workFormRecord.filter(f => {
          return f.type == 'input_works_preset'
        });
        c.workTitle = targetTitle[0].answer;
        let workUrl = c.workFormRecord.filter(f => {
          return f.type == 'user_works_preset'
        });
        c.workUrl = workUrl[0].answer[0].url;
      })
    })
    this.setData({
      enrollWork: data
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