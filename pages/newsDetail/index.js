const { globalData } = getApp()
import { formatTime } from '../../utils/util'
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({ newsId }) {
        this.setData({
            newsId
        })
        this.getNewsDetail(newsId)
    },
    // 获取新闻详情
    async getNewsDetail(newsId) {
        const { code, data } = await globalData.$api.getNewsDetail(newsId)
        if(code != 0) return false

        // data.newsContent = data.newsContent.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ');
        let that = this;
        WxParse.wxParse('newsContent', 'html', data.newsContent, that);
        data.specifyReleaseTime = formatTime(data.specifyReleaseTime)
        this.setData({
            detail: data
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