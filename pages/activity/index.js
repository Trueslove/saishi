const {
    globalData
} = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ['全部活动'],
        index: 0,
        show: false,


        list: [], // 进行活动
        historyList: [], // 过期活动

        pageNum: 1, // 往期活动分页
        isLoad: true, // 往期活动是否继续加载

        groupList: [], // 组别
        listItemAcitve: 0,
    },


    openPopup() {
        this.setData({
            show: true
        })
    },
    close({
        detail
    }) {
        this.setData({
            show: detail
        })
    },
    clickRemake() {
        console.log('1')
    },
    clickItem() {
        console.log('1')
    },

    clickItem(e) {
        console.log(e)
        let index = e.currentTarget.dataset.target
        this.setData({
            listItemAcitve: index
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getActivityList()
        this.getActivityhistory()
        this.getActivityGroup();
    },
    async getActivityhistory() {
        const res = await globalData.$api.getActivityList(1, {
            pageNum: this.data.pageNum
        })
        if (res.code != 0) return false
        if (res.data.activityList.list.length <= 0) return this.setData({
            isLoad: false
        })
        this.setData({
            historyList: [...res.data.activityList.list.map(x => {
                if (Array.isArray(x.headBannerUrl)) x.headBannerUrl = x.headBannerUrl[0]
                return x
            }), ...this.data.historyList],
            isLoad: true
        })
    },
    // 获取进行/过期活动列表
    async getActivityList() {
        const res = await globalData.$api.getActivityList(0)
        if (res.code != 0) return false
        this.setData({
            list: res.data
        })

    },
    // 获取组别
    async getActivityGroup() {
        const res = await globalData.$api.getActivityGroup(0)
        if (res.code != 0) return false
        this.setData({
            groupList: res.data
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
        if (!this.data.isLoad) return false
        this.setData({
            pageNum: this.data.pageNum + 1
        })
        this.getActivityhistory()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})