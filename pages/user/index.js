const {
  globalData
} = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userCountData: {},
    imageUrl: '',
    showJJHHPopup: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUser()
  },
  // 打开家家户户
  openJJHH() {
    this.setData({
      showJJHHPopup: !this.data.showJJHHPopup
    })
  },

  async getUser() {
    const {
      code,
      data
    } = await globalData.$api.getUser()
    if (code != 0) return false
    const userInfo = JSON.parse(wx.getStorageSync('userInfo'))
    const imageUrl = wx.getStorageSync('imageUrl')

    this.setData({
      userCountData: data,
      userInfo,
      imageUrl
    })
  },
  layout() {
    wx.clearStorageSync()
    wx.navigateTo({
      url: '/pages/login/index',
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