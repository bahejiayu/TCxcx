const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
const app = getApp();
Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    isShowHint: false,
    listData: [{
      title: '进出记录',
      eve: 'accessRecord'
    }, {
      title: '核销订单',
      eve: 'indentSell'
    }]
  },
	
	onShareAppMessage() { 
	  return  app.globalData.shareMessage
	},
  onLoad: function (options) {
    var self = this
    console.log(options)
    commen.updateAndGetUserInfo((userInfo) => {
      self.setData({
        userInfo: userInfo
      })
      var getReq = wxReq.get(API.getUserById(), { userId: options.userId })
      getReq.then(resp => {
        var user = resp.data.data
        self.setData({
          user: user
        })
        var shopReq = wxReq.get(API.getShop(), {
          id: user.userShopId
        })
        shopReq.then(resp => {
          console.log(resp)
          self.setData({
            shop: resp.data.data
          })
        })
      })
    })
    wx.setNavigationBarTitle({
      title: '员工管理'
    })
  },
  showHint: function () {
    var self = this
    // this.setData({
    // 	isShowHint: true
    // })
    wx.showModal({
      title: '提示',
      content: '您确定要解绑"' + this.data.user.userName + '"吗？',
      success(res) {
        if (res.confirm) {
          var getReq = wxReq.get(API.getUnWorkUser(), {
            userId: self.data.user.userId,
            workId: self.data.userInfo.userId
          })
          getReq.then(resp => {
            if (resp.data.errno == 0) {
              commen.showMessage("解绑成功")
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            } else {
              commen.showError("权限不足")
            }
          })
        }
      }
    })
  },
  hideHint: function () {
    this.setData({
      isShowHint: false
    })
  },
  indentSell: function () {
    wx.navigateTo({
      url: '/pages/indentSell/indentSell?userId=' + this.data.user.userId
    })
  },
  accessRecord: function () {
    wx.navigateTo({
      url: '/pages/accessRecord/accessRecord?userId=' + this.data.user.userId
    })
  }
})