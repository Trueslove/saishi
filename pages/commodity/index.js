// pages/commodity/index.js
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
    page: 1,
    isLoad: true,// 是否上拉加载
    productsCategoryList: [],
    active: "",
    imageUrl: wx.getStorageSync('imageUrl'),
    goodsList: [],
    topAdvert: wx.getStorageSync('topAdvert'),
    dfs: wx.getStorageSync('dfs'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goodsList();
    this.categoryList();
  },
  // 获取商品列表
  async goodsList() {
    let {active, page} = this.data;
    const {
      code,
      data
    } = await globalData.$api.goodsList({productsCategoryTwoId: active, pageNum: page})
    if (code != 0) return false
    if (data.productsList.length <= 0) return this.setData({ isLoad: false })
    this.setData({
      goodsList: this.data.goodsList.concat(data.productsList),
      isLoad: true
    })
  },
  // 获取商品分类列表
  async categoryList() {
    const {
      code,
      data
    } = await globalData.$api.categoryList()
    if (code != 0) return false
    this.setData({
      productsCategoryList: data.ProductsCategoryList,
    })
  },
  selectNav(e) {
    console.log(e)
    this.setData({
      active: e.currentTarget.dataset.target
    })
    this.setData({
      goodsList: []
    })
    this.goodsList();
  },
  goWebView() {
    let url = `https://jlp-mobile.familyfaces.cn/family/products/info/view/42244cae7f74437a98382519116281aa/6dabe799c1ea4d3da0d5d6ac8bf05310?code=021j6pll2CJiP84lzPnl20dbsf4j6plb&state=1`
    wx.navigateTo({
      url: '/pages/webView/index?url=' + url,
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
    if(!this.data.isLoad) return false
    this.setData({
        page: this.data.page + 1
    })
    this.goodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})