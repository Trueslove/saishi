// index.js
// 获取应用实例
const { globalData } = getApp()


import { formatTime } from '../../utils/util'


Page({
  data: {
    navbarHeight: 0,

    indexData: null
    
  },
  onLoad() {
    this.setData({
      navbarHeight: globalData.navbarHeight
    })

    this.getHomeFetch()
  },
  // 获取首页接口
  async getHomeFetch() {
    const result = await globalData.$api.getHome()
    if(result.code != 0) return false

    // 存储图片域名
    wx.setStorageSync('imageUrl', result.data.dfs)

    result.data.newsList = result.data.newsList.map(x => {
      x.releaseTime = formatTime(x.releaseTime)
      return x
    })
    wx.setStorageSync("topAdvert", result.data.topAdvert);
    wx.setStorageSync("dfs", result.data.dfs);
    this.setData({
      indexData: result.data
    })
  },
  // 跳转用户信息
  goUser() {
    wx.navigateTo({
      url: '/pages/user/index',
    })
  },
  // 跳转更多活动咨询
  goActivityList() {
    wx.navigateTo({
      url: '/pages/news/index',
    })
  },
  // 跳转消息
  goMessage() {
    wx.navigateTo({
      url: '/pages/message/index',
    })
  },
  goNewsList() {
    wx.navigateTo({
      url: '/pages/news/index',
    })
  },
  showToast() {
    wx.showModal({
      title: '敬请期待',
      content: '热门课程筹划中',
      showCancel: false,
      confirmColor: '#07C160'
    })
  }
})