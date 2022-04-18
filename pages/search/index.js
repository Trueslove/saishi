
const {
  globalData
} = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    isSearch: false,
    hotList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchHotList()
  },
  // 清除搜索内容
  clearSearchValue() {
    this.setData({
      searchValue: '',
      isSearch: false
    })
  },
  // 热门搜搜点击搜索
  clickSearch(e) {
    this.setData({ searchValue: e.currentTarget.dataset.target})
    this.searchActivity()
  },
  // 取消返回
  goBlack() {
    wx.navigateBack({
      detail: 1
    })
  },
  // 搜索热词
  async searchHotList() {
    const { data , code } = await globalData.$api.searchHot({})
    if(code != 0 ) return false
    this.setData({
      hotList: data
    })
  },
  // 搜索
  async searchActivity() {
    const data = {
      activityName: this.data.searchValue,
      pageNum: 1,
    }
    const {
      code,
      data:res
    } = await globalData.$api.searchActivity(data)
    if (code != 0) return false

    this.setData({
      list: res.activityList.list,
      isSearch: res.activityList.list.length <= 0 ? true : false
    })
  },

  onInput(e) {
    this.setData({
      searchValue: e.detail.value,
      isSearch: false
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