const {
  globalData
} = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    list: [],
    swipers: [],
    imageUrl: '',
    allThemeList: [],
    twoList: [],
    oneGroupId: "",
    twoGroupId: "",
    performanceActivityId: "",
    imageUrl: wx.getStorageSync('imageUrl'),
    pageNum: 1,
    isLoad: false,
    activeIndex: 0,
    stagesIndex: 0,
    stageId: "",
    oneGroupCategoryId: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({
    performanceActivityId,
    type
  }) {
    const imageUrl = wx.getStorageSync('imageUrl')
    this.setData({
      type,
      imageUrl,
      performanceActivityId
    })
    this.getList();
    this.promotionSwipers(performanceActivityId)
    this.allThemeList(performanceActivityId);
  },
  goUser(e) {
    let {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/playerUser/index?id=' + id,
    })
  },
  //  晋级成绩列表
  async promotionList() {
    let {
      performanceActivityId,
      oneGroupId,
      stageId,
      pageNum
    } = this.data;
    const {
      code,
      data
    } = await globalData.$api.promotionList({
      performanceActivityId,
      oneGroupId,
      stageId,
      pageNum
    })
    if (code != 0) return false
    data.list.forEach(item => {
      if (item.formRecode) {
        let targetWork = item.formRecode.filter(f => {
          return f.type === 'input_works_preset';
        })
        let targetImg = item.formRecode.filter(f => {
          return f.type === 'uploadPic_works_preset';
        })
        if (targetWork.length > 0) {
          item.workName = targetWork[0].answer
        }
        if (targetImg.length > 0) {
          item.imgUrl = targetImg[0].answer
        }
      }
    })
    this.setData({
      list: data.list
    })
  },
  async handleWorkVoting(e) {
    let {
      id
    } = e.currentTarget.dataset;
    const {
      code,
      data
    } = await globalData.$api.workVoting(id)
    if (code != 0) return false
    wx.showModal({
      title: "投票成功",
      icon: "success"
    })
    this.getList();
  },
  getList() {
    if (this.data.type == 'promotion') {
      this.enrollWorkList();
    } else {
      this.promotionList()
    }
  },
  handleChangeOne(e) { // 更改一级列表
    let {
      id
    } = e.currentTarget.dataset;
    let {
      allThemeList
    } = this.data;
    let target = allThemeList.filter(item => {
      return item.oneThemeId == id;
    })
    if (target.length > 0) {
      this.setData({
        twoList: target[0].subs,
        oneGroupId: id,
        twoGroupId: target[0].subs[0].twoThemeId
      })
    } else {
      this.setData({
        twoList: [],
        oneGroupId: ""
      })
    }
    this.enrollWorkList();
  },
  handleChangeTwo(e) { // 更改二级列表
    let {
      id
    } = e.currentTarget.dataset;
    this.setData({
      twoGroupId: id
    })
    this.enrollWorkList();
  },
  //  主题列表
  async allThemeList(id) {
    const {
      code,
      data
    } = await globalData.$api.allThemeList(id)
    if (code != 0) return false
    this.setData({
      allThemeList: data
    })
  },
  //  作品列表
  async enrollWorkList() {
    let {
      performanceActivityId,
      oneGroupId,
      twoGroupId,
      pageNum
    } = this.data;
    const {
      code,
      data
    } = await globalData.$api.enrollWorkList({
      performanceActivityId,
      oneGroupId,
      twoGroupId,
      pageNum
    })
    if (code != 0) return false
    if (data.workList.list.length <= 0) return this.setData({
      isLoad: false
    })
    data.workList.list.forEach(item => {
      if (item.workFormRecord) {
        let targetWork = item.workFormRecord.filter(f => {
          return f.type === 'input_works_preset';
        })
        if (targetWork.length > 0) {
          item.workName = targetWork[0].answer
        }
      }
    })
    this.setData({
      list: data.workList.list,
      isLoad: true
    })
  },
  async promotionSwipers(id) {
    const {
      code,
      data
    } = await globalData.$api.promotionSwipers(id)
    if (code != 0) return false
    this.setData({
      swipers: data.topAdvert,
      activityGroupCategoryList: [{
        oneGroupName: "全部",
        oneGroupCategoryId: ""
      }].concat(data.activityGroupCategoryList),
      stagesList: data.stagesList
    })
  },
  handleChangePickActive(e) {
    let {
      value
    } = e.detail;
    let {
      activityGroupCategoryList
    } = this.data;
    this.setData({
      activeIndex: value,
      oneGroupId: activityGroupCategoryList[value].oneGroupCategoryId
    })
    this.promotionList();
  },
  handleChangePickStages(e) {
    let {
      value
    } = e.detail;
    let {
      stagesList
    } = this.data;
    this.setData({
      stagesIndex: value,
      stageId: stagesList[value].stageId
    })
    this.promotionList();
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
    if (!this.data.isLoad) return false
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})