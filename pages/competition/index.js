const {
    globalData
} = getApp()

const {
    formatTime
} = require("../../utils/util")
var WxParse = require('../../wxParse/wxParse.js');
let interval;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        curIndex: 0,
        detail: {},
        imageUrl: '',
        id: "",
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 1,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
            id: 3,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        }, {
            id: 4,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
        }, {
            id: 5,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
        }, {
            id: 6,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
        }],
        activityTime: `00:00:00`
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function ({
        id
    }) {
        id = 'adb160bb0dbe40ae8047e4e66438f98d'
        this.setData({
            id
        })
        this.activityDetail(id)
    },

    // 获取赛事详情
    async activityDetail(id) {
        const {
            code,
            data
        } = await globalData.$api.activityDetail(id || '20a78733e3944a58a76585acd2c24f52')
        if (code != 0) return false

        const imageUrl = wx.getStorageSync('imageUrl')
        let swiperList = data.detail.lastStageWorks.map((x, i) => {
            let name = x.formAnswer.map(formAnswer => formAnswer.type == "userName_enroll_preset" ? formAnswer.answer : '').filter(name => name != '')
            let avatar = x.formAnswer.map(formAnswer => formAnswer.type == "uploadPic_enroll_preset" ? formAnswer.answer : '').filter(avatar => avatar != '')
            let worksName = x.formAnswer.map(formAnswer => formAnswer.type == "input_works_preset" ? formAnswer.answer : '').filter(worksName => worksName != '')
            let cover = x.formAnswer.map(formAnswer => formAnswer.type == "uploadPic_works_preset" ? formAnswer.answer : '').filter(cover => cover != '')
            return {
                name: name[0],
                avatar: avatar[0],
                worksName: worksName[0],
                cover: cover[0],
                index: i,
                enrollNumber: x.enrollNumber,
            }
        })
        console.log(swiperList, '9999999')
        data.detail.newsList.forEach(item => {
            item.releaseTime = formatTime(item.releaseTime)
        })
        let that = this;
        WxParse.wxParse('noticeContent', 'html', data.detail.noticeContent, that, 0);
        WxParse.wxParse('activityDetails', 'html', data.detail.activityDetails, that, 0);
        
        this.setData({
            detail: data.detail,
            imageUrl,
            swiperList
        })
        this.towerSwiper('swiperList');
        // 活动状态为 1 || 2 时 开启倒计时
        this.openInerval(data.detail.userStageInfo.type == 1 || data.detail.userStageInfo.type == 2 ? data.detail.userStageInfo.activityEnrollEndTime : null)

    },
    // 获取剩余多少天 time 结束时间
    getTHMSDate(time) {
        let nowDate = new Date()
        let endDate = new Date(time)

        var lefttime = endDate.getTime() - nowDate.getTime(), //距离结束时间的毫秒数
            d = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
            h = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
            m = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
            s = Math.floor(lefttime / 1000 % 60); //计算秒数

        return {
            d,
            h: h < 10 && h >= 0 ? `0${h}` : h,
            m: m < 10 && m >= 0 ? `0${m}` : m,
            s: s < 10 && s >= 0 ? `0${s}` : s,
        }
    },
    // 处理倒计时
    openInerval(date) {
        let resDate = this.getTHMSDate(date)

        // 结束 终止
        if (resDate.d <= 0 && resDate.h <= 0 && resDate.m <= 0 && resDate.s <= 0) {
            let detail = this.data.detail
            detail.userStageInfo.type = 5
            this.setData({
                detail
            })
        }

        // 展示天数
        if (resDate.d > 0 || resDate.h >= 24) {
            // 天数
            this.setData({
                activityTime: resDate.d + '天'
            })
        } else {
            // 展示小时 
            // 倒计时
            interval = setInterval(() => {

                const {
                    h,
                    m,
                    s
                } = this.getTHMSDate(date)

                if (h <= 0 && m <= 0 && s <= 0) {
                    let detail = this.data.detail
                    detail.userStageInfo.type = 5
                    this.setData({
                        detail
                    })
                    clearInterval(interval)
                    return false
                }
                this.setData({
                    activityTime: `${h}:${m}:${s}`
                })
            }, 1000)
        }

    },
    // 晋级页面
    goPlayer() {
        const {
            performanceActivityId
        } = this.data.detail
        wx.navigateTo({
            url: `/pages/player/index?performanceActivityId=${performanceActivityId}&type=play`,
        })
    },
    // 跳转选手信息
    goPlayerUser() {
        let curIndex = this.data.curIndex
        console.log(this.data.swiperList[curIndex].enrollNumber)
        wx.navigateTo({
            url: '/pages/playerUser/index?id=' + this.data.swiperList[curIndex].enrollNumber,
            // url: '/pages/playerUser/index?id=cb9b337386d944388671798e594b09ad',
        })
    },
    // 选手个人信息

    goPlayerUserInfo() {
        let curIndex = this.data.curIndex
        let {
            name,
            avatar,
            enrollNumber
        } = this.data.swiperList[curIndex]
        wx.navigateTo({
            url: `/pages/playerUserInfo/index?id=cb9b337386d944388671798e594b09ad&name=${name}&avatar=${avatar}&enrollNumber=${enrollNumber}`,
        })
    },


    DotStyle(e) {
        this.setData({
            DotStyle: e.detail.value
        })
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
        let list = this.data[name];
        for (let i = 0; i < list.length; i++) {
            list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
            list[i].mLeft = i - parseInt(list.length / 2)
        }
        this.setData({
            swiperList: list
        })
    },
    // towerSwiper触摸开始
    towerStart(e) {
        this.setData({
            towerStart: e.touches[0].pageX,
            curIndex: this.data.swiperList.findIndex(x => x.mLeft == 0)
        })
    },
    // towerSwiper计算方向
    towerMove(e) {
        this.setData({
            direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left',
        })
    },
    // towerSwiper计算滚动
    towerEnd(e) {
        let direction = this.data.direction;
        let list = this.data.swiperList;
        if (direction == 'right') {
            let mLeft = list[0].mLeft;
            let zIndex = list[0].zIndex;
            for (let i = 1; i < list.length; i++) {
                list[i - 1].mLeft = list[i].mLeft
                list[i - 1].zIndex = list[i].zIndex
            }
            list[list.length - 1].mLeft = mLeft;
            list[list.length - 1].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
        } else {
            let mLeft = list[list.length - 1].mLeft;
            let zIndex = list[list.length - 1].zIndex;
            for (let i = list.length - 1; i > 0; i--) {
                list[i].mLeft = list[i - 1].mLeft
                list[i].zIndex = list[i - 1].zIndex
            }
            list[0].mLeft = mLeft;
            list[0].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
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
        return {
            title: '活动详情',
            path: 'pages/competition/index?id='+this.data.id
        }
    }
})