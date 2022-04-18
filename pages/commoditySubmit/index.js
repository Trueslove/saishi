// pages/commoditySubmit/index.js
const {
  globalData
} = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
      imageUrl: wx.getStorageSync("imageUrl"),
      goodsInfo: {},
      buyNum: 1,
      openId: wx.getStorageSync('userLoginData').openid
    },
    /**
     * 生命周期函数--监听页面加载
     */ 
    onLoad: function ({id, specsId}) {
      this.confirmOrderDetail(id, specsId)
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
    async confirmOrderDetail(id, specsId) {
      const {
        code,
        data
      } = await globalData.$api.confirmOrderDetail({id, specsId})
      if (code != 0) return false
      this.setData({
        goodsInfo: data
      })
    },
    async submit() {
      let {buyNum, goodsInfo, openId} = this.data;
      const {
        code,
        data
      } = await globalData.$api.getOrderMsg({
        openId: openId,
        tradeType: "JSAPI",
        specsId: goodsInfo.serviceProduct.specsId,
        paymentType: '8',
        couponId: "",
        consigneeObj: {...goodsInfo.userDefaultAddress},
        buyNum,
        isWx: '1'
      })
      if (code != 0) return false
      console.log( data.payBody, '00000')
      let {payBody} = data;
      wx.requestPayment({
        timeStamp: payBody.timeStamp,
        nonceStr: payBody.nonceStr,
        signType: 'MD5',
        package: payBody.	package,
        success () {
          console.log('支付成功');
        },
        // 失败回调
        fail (err) {
          console.log(err, '支付失败')
        },
        // 接口调用结束回调
        complete (err) {
          console.log(err, '支付失败11')
        }
      })
    },
    goCoupon() {
        wx.navigateTo({
          url: '/pages/commodityCoupon/index',
        })
    },
    goCard() {
        wx.navigateTo({
          url: '/pages/commodityCard/index',
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