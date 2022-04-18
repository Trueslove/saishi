// pages/editAddress/index.js
const {
    globalData
} = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkbox: true,
        region: [],
        form: {
            name: "",
            cellphone: "",
            province: "",
            city: "",
            area: "",
            detailsAddress: "",
            isDefault: 1,
        },
        id: "",
        url: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({
        id, url
    }) {

        if (id) {
            this.setData({
                id,
                url
            })
            this.getAddressDetail();
        }
    },
    async getAddressDetail() {
        let {
            code,
            data
        } = await globalData.$api.getAddressDetail({
            id: this.data.id
        })
        if (code != 0) return false;
        let {
            name,
            cellphone,
            province,
            city,
            area,
            detailsAddress,
            isDefault
        } = data;
        this.setData({
            form: {
                name,
                cellphone,
                province,
                city,
                area,
                detailsAddress,
                isDefault
            },
            region: [province, city, area],
            checkbox: isDefault == 1 ? true : false
        })
    },
    changeValue(e) {
        let {
            key
        } = e.currentTarget.dataset;
        let {
            value
        } = e.detail;
        key = `form.${key}`
        this.setData({
            [key]: value
        })
    },
    async saveOrEdit() {
        let {
            form,
            id
        } = this.data;
        let params = {
            ...form,
            id
        };
        let targetValue = Object.values(params)
        let isNull = targetValue.filter(item => {
            return item;
        })
        // if(isNull.length > 0) {
        //     wx.showToast({
        //         icon: 'none',
        //         title: "请将信息补充完整！",
        //     })
        //     return false;
        // }
        let {
            code,
            data
        } = await globalData.$api.saveOrEdit(params)
        if (code != 0) return false
        wx.showToast({
            title: id ? '修改成功' : '保存成功'
        })
        if(this.data.url) {
            wx.setStorageSync('address', JSON.stringify(params))
            wx.navigateTo({ url: `/pages/${this.data.url}/index` })
        } else {
            wx.navigateBack({
                delta: 1, // 返回上一级页面。
                success: function () {
                    console.log('成功！')
                }
            })
        }
    },
    onCheck() {
        this.setData({
            checkbox: !this.data.checkbox,
            "form.isDefault": this.data.checkbox ? 0 : 1
        })
    },
    bindRegionChange: function (e) {
        let {
            value
        } = e.detail;
        this.setData({
            region: value,
            "form.province": value[0],
            "form.city": value[1],
            "form.area": value[2]
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