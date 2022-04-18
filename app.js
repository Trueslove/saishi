const RongIMLib = require('./lib/RongIMLib-3.0.7.2-dev.js');

// 应用初始化以获取 RongIMLib 实例对象，请务必保证此过程只被执行一次
const im = RongIMLib.init({ appkey: 'x18ywvqfxyrac' });


// 导入api
import $api from './api/apis'


App({
  onLaunch() {
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.navbarHeight = result.statusBarHeight

        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - result.statusBarHeight;
        } else {
          this.globalData.CustomBar = result.statusBarHeight + 50;
        }
      },
    })
  },
  globalData: {
    navbarHeight: 0,
    CustomBar: 0,
    $api
  }
})