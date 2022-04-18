const {
  globalData
} = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    avatar: '',
    enrollNumber: '',
    forms: [],
    imageUrl: '',
    dataInfo: {},
    uploadUrl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({
    id,
    name,
    avatar,
    enrollNumber
  }) {
    let imageUrl = wx.getStorageSync('imageUrl')
    this.setData({
      name,
      avatar,
      enrollNumber,
      imageUrl
    })
    this.getEnrollDetail(id)
  },
  //   选手个人信息
  async getEnrollDetail(id) {
    const {
      code,
      data
    } = await globalData.$api.enrollDetail(id)
    if (code != 0) return false
    let name = data.forms.filter(item => {
      return item.type === 'userName_enroll_preset'
    });
    let uploadUrl = data.forms.filter(item => {
      return item.type === 'uploadPic_enroll_preset'
    });
    console.log(name, '00000')
    this.setData({
      dataInfo: data,
      name: name[0].answerMsg.answer,
      uploadUrl: uploadUrl[0].answerMsg.answer
    })
  },
  //   下载文件
  donwload(e) {
    let {
      url
    } = e.currentTarget.dataset
    wx.downloadFile({
      url: this.data.imageUrl + url, //仅为示例，并非真实的资源
      success(res) {
        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath;
          wx.saveFile({
            tempFilePath,
            success(e) {
              console.log(e)
              wx.showModal({
                content: '下载成功',
                showCancel: false
              })
            }
          })

        }
      }
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