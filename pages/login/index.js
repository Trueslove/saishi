const {
  globalData
} = getApp()

let interval;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginType: 1, // 切换登录方式 

    isGetPhone: false, // 是否获取手机号弹窗
    phone: '', // 手机号
    code: '', // 验证码
    isClickLogin: false, // 是否点击登录


    codeText: '获取验证码',  // 验证码按钮文本
    getCodeing: false, // 获取验证码中


    codeInputFocus: false,  

    phoneModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await globalData.$api.initLogin()
  },

  // 取消绑定的手机号弹窗
  phonePopupCancel() {
    this.setData({
      phoneModal: false
    })
  },

  // 关闭获取手机号确认弹窗
  closeGetPhonePopup() {
    this.setData({
      isGetPhone: false
    })
  },
  // 获取登录用户信息
  getUserInfo() {
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: e => {
        wx.setStorageSync('loginUserInfo', e.userInfo)
        this.setData({
          isGetPhone: true
        })
      }
    })
  },
  // 获取手机号 / 授权登录
  async getPhone(e) {
    this.setData({
      isGetPhone: false
    })
    if (e.detail.code) {
      const phoneData = e.detail
      //用户按了允许授权按钮
      const result = await globalData.$api.getPhone({
        ...phoneData
      })
      if (!result) return false

      wx.showToast({
        title: '登录成功！',
        success() {

        }
      })
      wx.redirectTo({
        url: '/pages/index/index',
      })


    } else {
      //用户按了拒绝按钮
    }
  },
  // 切换验证码登录
  async getPhoneLogin(e) {
    this.setData({
      loginType: 2
    })
  },
  // 验证码登录
  async codeLogin() {

    let data = {
      loginName: this.data.phone,
      inputMsgCode: this.data.code,
    }

    const result = await globalData.$api.codeLogin(data)
    if (result) {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }

  },
  // 获取验证码
  async getCode() {
    const reg = /^1[3-9]\d{9}$/
    if (!reg.test(this.data.phone)) return wx.showToast({
      icon: 'none',
      title: '请输入正确的手机号码',
    })

    let data = {
      telephone: this.data.phone,
      optionType: 0
    }
    const result = await globalData.$api.getCode(data)
    console.log(result)

    this.setData({ codeInputFocus: true})


    wx.showToast({
      title: '发送成功！',
      icon: 'none'
    })
    this.setData({
      getCodeing: true
    })
    let codeTime = 60
    interval = setInterval(() => {
      if (codeTime <= 0) {
        clearInterval(interval)
        codeTime = 60
        this.setData({
          codeText: '重新获取',
          getCodeing: false
        })
        return false
      }
      codeTime -= 1
      this.setData({
        codeText: codeTime + 's'
      })
    }, 1000);

  },
  onInput(e) {
    this.setData({
      [e.currentTarget.dataset.target]: e.detail.value,
      isClickLogin: this.data.phone && this.data.code
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
    clearInterval(interval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(interval)
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