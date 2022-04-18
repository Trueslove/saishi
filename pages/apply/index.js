const wxapi = require('../../utils/wxapi')
const { globalData } = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [],
    form: {},
    pageSumNum: 1, // 共有多少页
    currentPage: 1, // 当前页面
    targeFormList: [], // 表单分页数据
    isPay: false, // 是否需要支付
    isEdit: false, // 是否是编辑
    performanceActivityId: "",
    enrollGroupId: "", 
    stageId: ""
  },
  changeListener(e) {
    this.data.form[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      ['form.' + e.currentTarget.dataset.key]:  e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ performanceActivityId, enrollGroupId, stageId }) {
    if(enrollGroupId) {
      this.searchEnrollWorkForm(performanceActivityId);
    } else {
      this.searchEnrollForm(performanceActivityId)
    }
    this.setData({
      performanceActivityId,
      enrollGroupId,
      stageId
    })
  },
  handleClick(e) {
    let { type } = e.currentTarget.dataset;
    switch(type) {
      case 'next': // 下一步
        this.setData({
          currentPage: this.data.currentPage + 1
        })
        break;
      case 'back': // 上一步
        this.setData({
          currentPage: this.data.currentPage - 1
        })
        break;
    }
  },
  async searchEnrollWorkForm(performanceActivityId) {
    const {code, data } = await globalData.$api.searchEnrollWorkForm({ performanceActivityId })
    if(code != 0 ) return false
    this.changeForm(data);
  }, 
  async searchEnrollForm(performanceActivityId) {
    const {code, data } = await globalData.$api.searchEnrollForm({ performanceActivityId }) 
    if(code != 0 ) return false
    this.changeForm(data);
  }, 
  changeForm(data) {
    let { formList, isPay } = data;
    let allPage = [];
    formList.forEach(item => {
      allPage.push(item.pageNum)
    });
    allPage = allPage.sort((a, b) => { // 排序
      return a - b;
    })
    allPage = Array.from(new Set(allPage)); // 去重
    let targeFormList = [];
    allPage.forEach(item => { // 根据页码，重组数据
      let targer = formList.filter(c => {
        return c.pageNum == item;
      })
      targeFormList.push(targer)
    })
    this.setData({
      pageSumNum: allPage.length,
      targeFormList,
      formList: data.formList,
      isPay
    })
  },
  async submit() {
    let params = this.checkForm()
    if (params) { 
      let {performanceActivityId, enrollGroupId, stageId} = this.data; 
      if(enrollGroupId) {
        const {code, data } = await globalData.$api.saveOrUpdateEnrollWorkForm({ performanceActivityId, uploadStageId: stageId, enrollGroupId, formList: params })
        if(code != 0 ) return false
      } else {
        const {code, data } = await globalData.$api.saveOrUpdateEnroll({ performanceActivityId, formList: params })
      }
      wx.navigateTo({
        url: '/pages/applySuccess/index',
      })
    }
  },

  checkForm() {
    let str = ''
    let list = []
    this.data.targeFormList.forEach(e => {
      e.forEach(item => {
        if (!str && item.isMustFill &&
          (
          this.data.form[item.performanceActivityFormId] &&
          !this.data.form[item.performanceActivityFormId].length ||
          !this.data.form[item.performanceActivityFormId]
          )
        ) {
          str = item.title
        } else {
          let value = this.data.form[item.performanceActivityFormId]
          let i = {
            performanceActivityFormId: item.performanceActivityFormId
          }
          if (item.isLinkage) {
            i.answerOptionId = Array.isArray(value) ? value.join(',') : value || ''
          } else {
            i.answer = Array.isArray(value) ? JSON.stringify(value) : value || ''
          }
          list.push(i)
        }
      })
    })
    if (!str) {
      return list
    }
    wxapi.alert('请添加' + str, 'none')
    return false
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