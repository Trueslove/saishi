const {
    globalData
} = getApp()

let interval;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 1,
        isEditPhone: false,
        birthday: "",
        nickName: '',
        sex: 1,
        phone: '', // 回显手机号
        cellphone: '', // 修改手机号
        isGetCode: true, // 是否获取验证码
        btnText: '获取验证码',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({
        type,
        nickName,
        sex,
        phone,
        birthday
    }) {

        this.setData({
            type,
            nickName,
            sex: sex == 'null' ? 1 : sex,
            phone,
            birthday
        })
        wx.setNavigationBarTitle({
            title: ['修改姓名', '修改性别', '更换手机号', '修改生日'][type - 1],
        })
    },
    onEditPhone() {
        this.setData({
            isEditPhone: true
        })
    },
    changeInput(e) {
        console.log(e, '888888')
        let {
            key
        } = e.currentTarget.dataset;
        let {
            value
        } = e.detail;
        this.setData({
            [key]: value
        })
    },
    // 修改个人信息
    async editUserData() {
        let userData = {}
        if (this.data.type == 1) userData['nickName'] = this.data['nickName']
        if (this.data.type == 2) userData['sex'] = this.data['sex']
        if (this.data.type == 3) userData['cellphone'] = this.data['cellphone']
        if (this.data.type == 4) userData['birthday'] = this.data['birthday']
        const {
            code,
            data,
            message
        } = await globalData.$api.edituserData(userData)

        if (code != 0) {
            wx.showToast({
                icon: 'none',
                title: message,
            })
            return false
        }
        console.log(data)
        wx.showToast({
            title: '修改成功!',
        })
        wx.navigateBack({
            delta: 1
        })
    },

    // 选择性别
    checkSex(e) {
        const sex = e.currentTarget.dataset.target
        this.setData({
            sex
        })
    },
    // 获取验证码
    async getCode() {
        if (!this.data.isGetCode) return false
        if (this.data.cellphone.length <= 0) return wx.showToast({
            title: '请输入手机号码',
            icon: 'none'
        })
        this.setData({
            isGetCode: false
        })
        const result = await globalData.$api.getCode({
            telephone: this.data.cellphone,
            optionType: 0
        })
        if (result.code != 0) {
            wx.showToast({
                icon: 'none',
                title: result.message,
            })
            return false
        }
        let time = 5
        interval = setInterval(() => {
            if (time <= 0) {
                time = 5
                this.setData({
                    btnText: '重新获取',
                    isGetCode: true
                })
                clearInterval(interval)
                return false
            }
            time -= 1
            this.setData({
                btnText: time + 's'
            })
        }, 1000)

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