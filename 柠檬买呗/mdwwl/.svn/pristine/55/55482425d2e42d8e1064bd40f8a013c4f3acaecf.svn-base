App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.removeStorageSync('token')
        wx.removeStorageSync('uid')
      }
    });
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  myConfig:{
    tpUrl:"https://banma.laoyeshow.cn/sfimage/wwl/"

  },
  config:{
    http: "https://school.ljq360.com"
    // http:"http://192.168.0.253/dotiings"

  }

})

// {
//   "pagePath": "pages/message/message",
//   "text": "发现",
//   "iconPath": "/images/ju3_03.png",
//   "selectedIconPath": "/images/ju3c_03.png"
// },