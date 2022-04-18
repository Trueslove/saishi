const { globalData } = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    sponsor: {},
    imageUrl: wx.getStorageSync('imageUrl'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ id }) {
    this.sponsorActivityList(id)
  },

  async sponsorActivityList(id) {
    const { code , data} = await globalData.$api.sponsorActivityList(id)
    if(code != 0) return false
    this.setData({
      list: data.activityList.list,
      sponsor: data.sponsor
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