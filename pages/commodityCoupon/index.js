// pages/commodityCoupon/index.js
const {
    globalData
  } = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({id}) {
        this.handleReceiveCoupon(id)
    },
 // 领取优惠券
 async handleReceiveCoupon(e) {
    let {
      id
    } = e.currentTarget.dataset;
    this.setData({couponId: id})
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