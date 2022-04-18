// pages/user_certificate/index.js
const {
    globalData
} = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageUrl: wx.getStorageSync('imageUrl'),
        info: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({
        id
    }) {
        this.getMyCertifycateByEnrollWorkId(id)
    },
    async getMyCertifycateByEnrollWorkId(enrollWorkId) {
        const {
            code,
            data
        } = await globalData.$api.getMyCertifycateByEnrollWorkId({
            enrollWorkId
        })
        if (code != 0) return false
        this.setData({
            info: data,
        })
    },
    click(e) {
        let {
            type
        } = e.currentTarget.dataset;
        let that = this;
        let imgUrl = this.data.imageUrl + that.data.info.imgUri;
        switch (type) {
            case 'img':
                wx.downloadFile({
                    url: imgUrl, //仅为示例，并非真实的资源
                    success: (res) => {
                        wx.showToast({
                            title: '下载成功',
                            icon: 'succes',
                            duration: 1000,
                            mask:true
                        })
                    }
                })
                break;
            case 'pdf':
                wx.openDocument({
                    filePath: imgUrl,
                    fileType: "pdf",
                    success: (result) => {
                        wx.showToast({
                            title: '下载成功',
                            icon: 'succes',
                            duration: 1000,
                            mask:true
                        })
                    },
                    fail: (error) => {}
                })
                break;
            case 'share':
                break;
        }
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