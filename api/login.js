import $http from './http'


import {
    encrypt,
    decrypt
} from '../lib/rsa/RSA'

/**
 * 初始化登录 
 */
export function initLogin() {
    wx.removeStorageSync('sessionid')
    return new Promise((resolve, reject) => {
        wx.login({
            async success({
                code
            }) {
                const {
                    data
                } = await $http('/wx/sessionKeyAndOpenId/get', {
                    code
                }, {
                    notloading: true
                })
                wx.setStorageSync('userLoginData', data)
                wx.removeStorageSync('cookie')
                resolve(data)
            }
        })
    })
}

/**
 * 授权登录
 */
export async function getAuthLogin() {
    const userLoginData = wx.getStorageSync('userLoginData')
    const userPhoneInfo = wx.getStorageSync('userPhoneInfo')


    const {
        nickName,
        avatarUrl
    } = wx.getStorageSync('loginUserInfo')


    let loginParams = {
        openId: userLoginData.openid,
        nickName,
        headImgUrl: avatarUrl,
        isFristLogin: 1,
        isApplet: 1,
        telephone: userPhoneInfo.phoneNumber,
        unionid: userLoginData.unionid
    }



    // RSA加密
    let rsaResult = encrypt(loginParams)
    console.log(rsaResult)
    const result = await $http('/u/wx/session/generator', rsaResult, {
        notloading: true
    })

    if (result.code != 0) return false

    wx.setStorageSync('userInfo', decrypt(result.data))

    wx.hideLoading()


    return true


}


/**
 * 获取手机号
 */

export async function getPhone({
    encryptedData,
    iv,
}) {

    wx.showLoading({
        title: '登录中..',
    })
    const {
        session_key
    } = wx.getStorageSync('userLoginData')

    const {
        code,
        data
    } = await $http('/wx/mobilePhone/get', {
        encryptedData,
        iv,
        session_key
    }, {
        notloading: true
    })
    if (code != 0) return false
    wx.setStorageSync('userPhoneInfo', data)

    return getAuthLogin()
}

/**
 * 手机号登录
 */
export async function codeLogin(data) {
    wx.showLoading({
        title: '登录中...',
    })
    const result = await $http('/u/submitLogin', encrypt({
        ...data,
        login_yzm: true,
        forceFlag: true
    }), {
        notloading: true
    })

    if (result.code != 0) return false

    wx.setStorageSync('userInfo', decrypt(result.data))

    wx.hideLoading()
    return true

}



/**
 * 获取验证码
 */

export async function getCode(data) {
    const result = await $http('/jia/user/msgcode/get', encrypt(data))

    console.log(decrypt(result.data))
    return result
}