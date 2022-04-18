const { globalData} = getApp()
const {
  formatTime
} = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: globalData.CustomBar,
    show: false,
    imageUrl: wx.getStorageSync('imageUrl'),
    dataInfo: {},
    userGroupWork: {},
    activeId: ""
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ id }) {
    this.workDetail(id);
  },
  handleChangeActiveId(e) {
    let {id} = e.currentTarget.dataset;
    this.setData({
      activeId: id
    })
    this.hideModal();
    this.workDetail(id);
  },
  async userGroupWorkList() {
    let {performanceActivityId} = this.data.dataInfo;
    console.log(this.data.dataInfo, performanceActivityId)
    const {
      code,
      data
    } = await globalData.$api.userGroupWorkList(performanceActivityId)
    if (code != 0) return false
    this.setData({
      userGroupWork: data
    })
  },
  async handleWorkVoting() {
    let {
      performanceActivityEnrollWorkId
    } = this.data.dataInfo;
    const {
      code,
      data
    } = await globalData.$api.workVoting(performanceActivityEnrollWorkId)
    if (code != 0) return false
    wx.showModal({
      title: "投票成功",
      icon: "success"
    })
    this.workDetail(performanceActivityEnrollWorkId)
  },
  check() {
    this.setData({
      show: !this.data.show
    })
  },
  //   选手作品信息
  async workDetail(id) {
    const {code , data} = await globalData.$api.workDetail(id)
    if(code != 0) return false
    data.resultRecord.forEach(item => {
      item.createTime = formatTime(item.createTime);
      item.stageBeginTime = formatTime(item.stageBeginTime);
    })
    this.setData({
        dataInfo: data,
        // forms: data.forms.map(x => {
        //     x.isTxt = !typeof x.answerMsg.answer == 'object' 
        //     return x
        // })
    })
    this.userGroupWorkList();

  },
  // 选手作品详情 workDetail
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
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