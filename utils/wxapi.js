const config = require("../config.js")
let environment = false
const wxapi = {
  // loading
  alert : function(t, i, d){
    if (typeof t !== "boolean"){
      wx.showToast({
        title: t ? t : "loading",
        icon: i ? i : "loading",
        duration: d ? d : 1000
      })
    }else{
      wx.hideToast()
    }
  },
  // dialog
  dialog: function (t, c, fn, can, con, context, cantext){
    wx.showModal({
      title: t ? t : '提示',
      content: typeof c === 'string'&&c ? c : '',
      cancelText: cantext || '取消',
      success: function (res) {
        if (res.confirm && fn) {
          fn.call(null,true)
        } else if (res.cancel && can) {
          can.call(null, false)
        }
      }
    })
  },
  //登陆
  login: function (fn, d, id) {
    //login
    wx.login({
      success: res => {
        Util.request({
          modules: '/User/login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (result) => {
            if (result.code === 0) {
              wx.setStorageSync('access_token', result.data.token)
              getApp().globalData.token = result.data.token
              getApp().globalData.bidding = result.data.is_bidding
              getApp().globalData.member = result.data.is_member
              getApp().globalData.currency = result.data.is_currency
              getApp().globalData.userInfo = result.data
              // this.getProfile(fn || '', d || '')
            }
          }
        })
      }
    })
    this.updateM()
  },
  /**
   * 小程序版本更新
  */
  updateM: function () {
    const updateManager = wx.getUpdateManager && wx.getUpdateManager() || null
    if (updateManager)
    updateManager.onUpdateReady(() => {
      this.dialog('更新提示', '新版本更新已完成，马上前往？', () => {
        updateManager.applyUpdate()
      })
    })
  },
  //检测登陆状态
  status: function (fn,d) {
    wx.checkSession({
      success: () => {
        console.log("success")
        fn(d)
      },
      fail: () => {
        console.log("login")
        this.login(fn,d)
      }
    })
  },
  //验证个人是否有个人信息
  getUser: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.getUserInfo()
        } else {
          // 授权
          this.authorize()
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  /**
   * 授权用户信息
   * 1. 允许授权 - 获取用户信息
   * 2. 拒绝授权 - 提示用户去授权
   */
  authorize: function () {
    wx.authorize({
      scope: 'scope.userInfo',
      success: (res) => {
        this.getUserInfo()
      },
      fail: (err) => {
        console.log(err)
        this.authorizeModal()
      }
    })
  },

  /**
 * 提示手动授权
 * 提示用户去设置内授权
 */
  authorizeModal: function () {
    var _this = this
    this.dialog('提示', '你取消了授权，必须要授权后才能使用喔。请点击下面去授权...',function(res){
      console.log(res)
      if (res) {
        // 跳转至设置页进行手动授权
        wx.openSetting({
          success: res => {
            if (!res.authSetting['scope.userInfo']) {
              _this.authorize()
            } else {
              _this.getUserInfo()
            }
          }
        })
      }
    }, false, '去授权')
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    wx.getUserInfo({
      success: res => {
        // 检查用户权限和上次登录身份
        this.getProfile(res)
      }
    })
  },
  // 获取用户权限
  getProfile: function (res,data) {
    Util.request({
      modules: '/user/profile',
      version: true,
      success: (result) => {
        this.uuid = result.data.uuid
        wx.setStorageSync("uuid", this.uuid)
        wx.setStorageSync('userInfo', result.data)
        if (typeof res === 'function'){
          res(data)
        }
      }
    })
  },
  //更新新用户信息
  updata: function (res,fn) {
    var data = {
      name: res.userInfo&&res.userInfo.name ? res.userInfo.name:'',
      nickname: res.userInfo &&res.userInfo.nickName ? res.userInfo.nickName:'',
      sex: res.userInfo &&res.userInfo.gender ? res.userInfo.gender:'',
      photo: res.userInfo &&res.userInfo.avatarUrl ? res.userInfo.avatarUrl:'',
      isProveIdCard: res.userInfo &&res.userInfo.card ? res.userInfo.card:'',
      isProvePhone: res.userInfo &&res.userInfo.phone ? res.userInfo.phone:'',
      companyId: res.userInfo &&res.userInfo.companyId ? res.userInfo.companyId:'',
      jobLevelId: res.userInfo &&res.userInfo.levelId ? res.userInfo.levelId:'',
      //location: res.userInfo.province
    }
    Util.request({
      modules: '/user/update',
      data: data,
      success: (result) => {
        console.log('新用户提交默认信息', result)
        if (result.code === 1000) {
          this.getProfile(fn)
        } else {
          this.dialog('提示', result.mesg)
        }
      }
    })
  },
  /*
  拨打电话
  */
  call: function (tel,fn) {
    wx.makePhoneCall({
      phoneNumber: tel,
      success:res => {
        if(fn)fn()
      }
    })
  },
  /*
  **上传图片
  */
  uploadPhoto: function (path, fn, fail) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        this.uploadFile(tempFilePaths[0], fn)
      },
      fail () {
        if (fail) fail()
      },
    })
  },
  uploadFile(path, fn, loadingFn) {
    const uploadTask = wx.uploadFile({
      url: `${config.httpURL}/jia/portal/image/upload/anon`, //仅为示例，非真实的接口地址
      filePath: path,
      name: 'file',
      header: {
        cookie: wx.getStorageSync('sessionid') ? wx.getStorageSync('sessionid') : ''
      },
      success: (res) => {
        let data = JSON.parse(res.data)
        wxapi.alert(true)
        if (data.code === 0) {
          fn(data.data)
        } else {
          wxapi.alert(data.msg, 'none')
        }
      }
    })
    uploadTask.onProgressUpdate((res) => {
      wxapi.alert(true)
      wxapi.alert(res.progress + '%', 'loading', 10000)
    })
  },
  uploadVideo(path, fn, formData) {
    let uploadTask = wx.uploadFile({
      url: `${config.httpURL}/jia/portal/image/video/upload/anon`, //仅为示例，非真实的接口地址
      filePath: path,
      name: 'file',
      formData: formData,
      header: {
        cookie: wx.getStorageSync('sessionid') ? wx.getStorageSync('sessionid') : ''
      },
      success: (res) => {
        let data = JSON.parse(res.data)
        wxapi.alert(true)
        if (data.code === 0) {
          data.data.time = data.data.time || formData.time
          fn(data.data)
        } else {
          wxapi.alert(data.msg, 'none')
        }
      }
    })
    uploadTask.onProgressUpdate((res) => {
      wxapi.alert(true)
      wxapi.alert(res.progress + '%', 'loading', 10000)
    })
  },
  /*
  * 预览图片
  */
  previewImage: function (current, list) {
    wx.previewImage({
      current: current,
      urls: list
    })
  },
  /**
  * 图片
  */
  choosePhoto (type, fn, callback) {
    if (wx.chooseMedia && !environment) {
      wx.chooseMedia({
        mediaType: ['image'],
        sourceType: [type],
        count: 1,
        success: (res) => {
          fn(res.tempFiles[0].tempFilePath, callback)
        }
      })
    }  else {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],
        sourceType: [type],
        success: function (res) {
          fn(res.tempFilePaths[0], callback)
        }
      })
    }
  },
  /**
  * 音频
  */
  chooseVideo (type, fn, callback) {
    if (wx.chooseMedia && !environment) {
      wx.chooseMedia({
        mediaType: ['video'],
        sourceType: [type],
        count: 1,
        maxDuration: 60,
        success: (res) => {
          let file = res.tempFiles[0] || {}
          if (file.duration <= 120) {
            this.alert('上传中', 'loading')
            fn(file.tempFilePath, callback, {
              time: file.duration
            })
          } else {
            this.alert('视频时长过大', 'none')
          }
        }
      })
    } else {
      wx.chooseVideo({
        sourceType: [type],
        maxDuration: 60,
        success: (res) => {
          if (res.duration <= 120) {
            this.alert('上传中', 'loading')
            fn(res.tempFilePath, callback, {
              time: res.duration
            })
          } else {
            this.alert('视频时长过大', 'none')
          }
        }
      })
    }
  },
  /**
  * 打开地图
  */
  openLocation: function (lat, lng, name, address) {
    // let location = this.bMapTransQQMap(parseFloat(lng), parseFloat(lat))
    wx.openLocation({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      name: name,
      address: address,
      scale: 18
    })
  },
  bMapTransQQMap (lng, lat) {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0
    let x = lng - 0.0065
    let y = lat - 0.006
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
    let lngs = z * Math.cos(theta)
    let lats = z * Math.sin(theta)
    return {
      lng: lngs,
      lat: lats
    }
  },
  /**
   * 打开文件
   */
  openFile (url) {
    wx.downloadFile({
      url: url,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
  /**
  * 图片信息
  */
  getImageInfo: function (url, fn) {
    wx.getImageInfo({
      src: url,
      success(res) {
        fn(res)
      }
    })
  },
  /**
  * 保存图片
  */
  saveImage: function (url, fn) {
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success(res) {
        fn(res)
      },
      fail (res) {
        console.log(res, url)
      }
    })
  },
  /**
   * 绘制图片
  */
  getCanvas (id, fn, width, height) {
    wx.canvasToTempFilePath({
      canvasId: id,
      quality: 1,
      width: width || '',
      height: height || '',
      success:res => {
        fn(res.tempFilePath)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
  * 选择位置
  */
  chooseLocation: function (fn) {
    wx.chooseLocation({
      success: res => {
        fn(res)
      }
    })
  },
  /*
  * 搜索
  */
  systemInfo:function(fn){
    wx.getSystemInfo({
      success: function (res) {
        fn(res.model+' '+res.system)
      }
    })
  },
  /*
  * 设备信息
  */
  getSystemInfo: function (fn) {
    wx.getSystemInfo({
      success: function (res) {
        environment = res.environment === 'wxwork' 
        fn(res)
      }
    })
  },
  /**
   * 设置系统剪贴板
  */
  setClipboard (data) {
    wx.setClipboardData({
      data: data,
      success: (res) => {
        this.alert('微信号已复制', 'success')
      }
    })
  },
  /*
  * 录音
  */
  getVoice (start, fn) {
    let recorderManager = wx.getRecorderManager()
    const options = {
      duration: 120000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3'
    }
    recorderManager.start(options)
    recorderManager.onStart(res => {
      start && start()
    })
    recorderManager.onStop((res) => {
      if (res.duration < 1000) {
        this.alert('时长过短', 'none')
        return false
      }
      fn(res)
    })
  },
  stopVoice (fn) {
    let recorderManager = wx.getRecorderManager()
    recorderManager.stop()
  },
  /*
  * 播放mp3
  */
  openAudio (url, stop) {
    let innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = url
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onEnded((res) => {
      if (stop) stop()
    })
    innerAudioContext.onError((res) => {
      if (stop) stop()
      wxapi.alert('资源错误','none')
    })
    return innerAudioContext
  },
  /**
   * promise
   */
  promise(data, fn) {
    return new Promise((resolve, reject) => {
      fn(data, resolve);
    })
  },
  /**
   * 对比数组
   */
  contrast(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      return false
    } else if (a.length !== b.length) {
      return false
    } else {
      return a.every((e, i) => {
        return e ===  b[i]
      })
    }
  },
  /**
   * url字符串改为参数
   * @return object
   */
  getURLParams(url) {
    let str = decodeURIComponent(url)
    return str.replace(/(^\?)/, '').split('&').reduce(function (result, item) {
      let values = item.split('=');
      result[values[0]] = values[1];
      return result;
    }, {});
  },
  /**
   * 时间戳换取日期
   */
  getData(time) {
    let date = new Date()
    let yearNew = date.getFullYear()
    let monthNew = date.getMonth() + 1 > 9 && date.getMonth() + 1|| '0' + date.getMonth() + 1
    let dayNew = date.getDate() > 9 && date.getDate() || '0' + date.getDate()
    time = time > Math.pow(10, 12) && time || time * 1000
    date.setTime(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 > 9 && date.getMonth() + 1 || '0' + date.getMonth() + 1
    let day = date.getDate() > 9 && date.getDate() || '0' + date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let target = parseInt(yearNew + '' + monthNew + dayNew)
    let current = parseInt(year + '' + month + day)
    if (target === current){
      return '今天 ' + hour + ':' + minute
    } else if (target - current === 1) {
      return '昨天 ' + hour + ':' + minute
    } else {
      return month + '-' + day + ' ' + hour + ':' + minute
    }
  },
  /**
   * 时间戳换取日期
   */
  coverTime(s) {
    s = Math.floor(s)
    let num = s%60
    let m = s%3600
    if (s >= 60) {
        return Math.floor(s/60) + "'" + (num ? num + '"' : '')
    } else {
        return s + '"'
    }
  },
  /**
   * 当前时间
   */
  getCurrentData() {
    let date = new Date()
    let yearNew = date.getFullYear()
    let monthNew = date.getMonth() + 1 > 9 && date.getMonth() + 1 || '0' + (date.getMonth() + 1)
    let dayNew = date.getDate() > 9 && date.getDate() || '0' + date.getDate()
    return yearNew + '.' + monthNew + '.' + dayNew
  },
  /**
   * 
  */
  setNavigation (color, bg) {
    wx.setNavigationBarColor && wx.setNavigationBarColor({
      frontColor: color,
      backgroundColor: bg,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  /* 跳转 */
  toPage(url) {
    wx.navigateTo({
      url: `/pages/${url}/${url}`
    })
  },
  pay(data, succ, fail) {
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success: res => {
        succ && succ(res)
      },
      fail: res => {
        fail && fail(res)
      }
    })
  },
  getShare() {
    let member = getApp().globalData.member
    if (member === 1) {
      return {
        title: userInfo.last_name + userInfo.frist_name + '邀您加入EMBA君乐汇会员',
        path: '/pages/index/index?shareId=' + userInfo.user_id,
        imageUrl: '/img/banner2.png'
      }
    } else {
      return {
        title: getApp().globalData.shareTitle,
        path: '/pages/index/index',
        imageUrl: '/img/banner2.png'
      }
    }
  },
}
module.exports = wxapi