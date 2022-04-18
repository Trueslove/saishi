import config from '../config'




const $http = (url, data = {}, params = {}) => {

  if (!params.notloading) {
    wx.showLoading({
      title: '加载中..',
    })
  }
  return new Promise((resolve, reject) => {

    const sessionid = wx.getStorageSync('sessionid')

    wx.request({
      url: config.httpURL + url,
      method: params.method ? params.method : 'POST',
      data,
      header: {
        ...params.header,
        cookie: sessionid ? sessionid : ''
      },
      success: (result) => {
        //  登录失效
        if (result.data.code === -11) {
          wx.redirectTo({
            url: '/pages/login/index',
            success() {
              wx.showToast({
                icon: 'none',
                title: result.data.message,
              })
            }
          })
        }


        if (result.data.code == 0) {
          // 设置cookie
          let isAutoLogin = result.cookies[0] && url == '/u/wx/session/generator'
          let isPhoneLogin = result.cookies[0] && url == '/u/submitLogin'

          if (isAutoLogin || isPhoneLogin) {
            wx.setStorageSync('sessionid', result.cookies[0])
          }
        } else {
  
        }

        resolve(result.data)
      },
      fail: error => {
        reject(error)
      },
      complete: () => {
        !params.notloading && wx.hideLoading()
      }
    })
  })
}

export default $http