// pages/commodityDetail/index.js
const {
  globalData
} = getApp()
import {
  formatTime
} from '../../utils/util'
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: [],
    curIndex: 1,
    payPopupShow: false,
    couponPopupShow: false,
    cardPopupShow: false,
    completePopupShow: false,
    id: wx.getStorageSync("goodsId"),
    goodsInfo: {},
    imageUrl: wx.getStorageSync("imageUrl"),
    giftMainCard: {},
    address: "",
    specsId: 0,
    buyNum: 1, // 购买数量
    coupons: [],
    couponId: '',
    mainCard: [],
    mainActiveId: 0,
    cardNum: 1,
    mainCardType: "",
    addressInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({
    id
  }) {
    if (wx.getStorageSync("goodsId") || id) {
      this.setData({
        id: id || wx.getStorageSync("goodsId"),
        addressInfo: wx.getStorageSync("address") ? JSON.parse(wx.getStorageSync("address")) : {}
      })
      wx.setStorageSync('goodsId', id)
      this.goodsInfo();
      this.giftMainCard();
      this.resourceAddress();
    }
  },
  // 领取优惠券
  async handleReceiveCoupon(e) {
    let {
      id
    } = e.currentTarget.dataset;
    this.setData({
      couponId: id
    })
    const {
      code,
      data
    } = await globalData.$api.receive({
      couponId: id
    })
    if (code != 0) return false
    // this.setData({
    //   address: data,
    // })
  },
  handleCardNum(e) {
    let {
      type,
      num
    } = e.currentTarget.dataset;
    let {
      cardNum
    } = this.data;
    switch (type) {
      case "add":
        if (cardNum < num) {
          this.setData({
            cardNum: ++cardNum
          })
        }
        break;
      case "jian":
        if (cardNum > 1) {
          this.setData({
            cardNum: --cardNum
          })
        }
        break;
    }
  },
  handleBuyNum(e) { // 购物数量
    let {
      type
    } = e.currentTarget.dataset;
    let {
      buyNum,
      goodsInfo
    } = this.data;
    switch (type) {
      case "add":
        if (buyNum < goodsInfo.stock) {
          this.setData({
            buyNum: ++buyNum
          })
        }
        break;
      case "jian":
        if (buyNum > 1) {
          this.setData({
            buyNum: --buyNum
          })
        }
        break;
    }
  },
  handleChangeTbId(e) { // 规格发生变化
    let {
      id
    } = e.currentTarget.dataset;
    this.setData({
      specsId: id
    })
  },
  // 获取发货地址
  async resourceAddress() {
    let {
      id
    } = this.data;
    const {
      code,
      data
    } = await globalData.$api.resourceAddress({
      productId: id
    })
    if (code != 0) return false
    this.setData({
      address: data,
    })
  },
  // 获取礼品卡
  async giftMainCard() {
    let {
      id
    } = this.data;
    const {
      code,
      data
    } = await globalData.$api.giftMainCard({
      productId: "61e0706659e9409f87e0d7fb2eb2e7b0"
    })
    if (code != 0) return false
    this.setData({
      giftMainCard: data,
    })
  },
  // 获取商品列表
  async goodsInfo() {
    let {
      id
    } = this.data;
    const {
      code,
      data
    } = await globalData.$api.goodsInfo({
      id
    })
    if (code != 0) return false
    this.setData({
      goodsInfo: data,
    })
  },
  bindSwiper(e) {
    this.setData({
      curIndex: e.detail.current + 1
    })
  },
  handleCard(e) { // 某个卡类型的信息
    let {
      type
    } = e.currentTarget.dataset;
    let target = this.data.giftMainCard[type];
    target.forEach(item => {
      item.beginDate = formatTime(item.beginDate);
      item.endDate = formatTime(item.endDate);
    })
    this.setData({
      completePopupShow: true,
      mainCard: target,
      mainCardType: type
    })
  },
  handleMainCardActive(e) {
    let {
      index
    } = e.currentTarget.dataset;
    this.setData({
      mainActiveId: index
    })
  },
  openPopup(e) {
    const name = e.currentTarget.dataset.target
    this.setData({
      [`${name}PopupShow`]: true
    })
  },
  hideModal(e) {
    this.setData({
      payPopupShow: false,
      couponPopupShow: false,
      cardPopupShow: false,
      completePopupShow: false
    })
  },
  async submit() {
    this.setData({
      payPopupShow: false,
    })
    let {
      buyNum,
      specsId,
      couponId,
      goodsInfo,
      addressInfo
    } = this.data;
    wx.setStorageSync("goodsInfo", JSON.stringify({
      specsId: goodsInfo.tbServiceProductsSpecs[specsId].id,
      consigneeObj: {
        ...goodsInfo.userDefaultAddress,
        ...addressInfo
      },
      buyNum
    }))
    // const {
    //   code,
    //   data
    // } = await globalData.$api.getOrderMsg({
    //   specsId: goodsInfo.tbServiceProductsSpecs[specsId].id,
    //   paymentType: '2',
    //   couponId,
    //   consigneeObj: {...goodsInfo.userDefaultAddress},
    //   buyNum
    // })
    // if (code != 0) return false
    wx.navigateTo({
      url: `/pages/commoditySubmit/index?id=${goodsInfo.products.id}&specsId=${goodsInfo.tbServiceProductsSpecs[specsId].id}`,
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
    wx.removeStorageSync('address');
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