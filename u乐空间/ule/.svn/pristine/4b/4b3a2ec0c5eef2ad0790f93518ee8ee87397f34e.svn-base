const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    isShowList: false,
    menberType: '年卡会员',
    user: {},
    userInfo: {},
    shop: {},
    items: [
      {
        name: '年卡会员',
        value: '1'
      },
      {
        name: '普通会员',
        value: '0'
      }
    ]
  },
	
	onShareAppMessage() { 
	  return  app.globalData.shareMessage
	},
  onLoad: function (options) {
    var self = this
    commen.updateAndGetUserInfo((userInfo) => {
      self.setData({
        userInfo: userInfo
      })
      var userReq = wxReq.get(API.getUserById(), {
        userId: options.id
      })
      userReq.then(resp => {
        self.setData({
          user: resp.data.data
        })
        for (var i = 0; i < this.data.items.length; i++) {
          if (this.data.user.userYearType == this.data.items[i].value) {
            self.setData({
              menberType: this.data.items[i].name
            })
            break
          }
        }
        var shopReq = wxReq.get(API.getShop(), {
          id: self.data.user.userShopId
        })
        shopReq.then(resp => {
          self.setData({
            shop: resp.data.data
          })
        })
      })
    })
    wx.setNavigationBarTitle({
      title: '添加会员'
    })

  },
  radioChange: function (e) {
    var params = e.detail.value.split(":")
    var user = this.data.user
    user.userYearType = parseInt(params[1])
    this.setData({
      menberType: params[0],
      user: user
    })
  },
  save: function () {
    var postReq = {}
    console.log(this.data.user.userYearType)
    if (this.data.user.userYearType == 0) {
      postReq = wxReq.post(API.postUnYearCard(), {
        userId: this.data.user.userId,
        workUserId: this.data.userInfo.userId
      })
    } else {
      postReq = wxReq.post(API.postUpYearCard(), {
        userId: this.data.user.userId,
        workUserId: this.data.userInfo.userId
      })
    }
    postReq.then(resp => {
      if (resp.data.errno == 0) {
        commen.showMessage("保存成功")
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})