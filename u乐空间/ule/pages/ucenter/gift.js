const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();

Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    pageSize: 10,
    pageNum: 0,
    userInfo: null,
    list: []
  },

  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  onShow: function (options) {
    let self = this;
    commen.updateAndGetUserInfo((userInfo) => {
      self.setData({
        userInfo: userInfo
      })
      self.getGiftData(self)
    })
  },
  onReachBottom: function () {
    this.getGiftData(this)
  },
  editAdress: function (e) {
    var self = this
    var id = e.currentTarget.dataset.id
    commen.getAdress((obj) => {
      wx.showLoading({
        title: '更新中',
      })
      var req = wxReq.post(API.getGiftupdate(), {
        "ugId": id,
        "ugPlace": obj.place,
        "ugReceiverName": obj.name,
        "ugReceiverPhone": obj.phone,
        "ugPostcodes": obj.postalCode
      })
      req.then(resp => {
        wx.hideLoading()
        // self.setData({
        //   pageNum: 0,
        //   list: []
        // })
        // self.getGiftData(self)
        wx.redirectTo({
          url: '/pages/ucenter/gift',
        })
      })
    })
  },
  toTiming: function (e) {
    wx.navigateTo({
      url: '/pages/express/express?shipSn=' + e.currentTarget.dataset.sn + "&shipChannel=" + e.currentTarget.dataset.channel,
    })
  },
  //获取礼品数据
  getGiftData: function (self) {
    var pageNum = self.data.pageNum + 1
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: API.getGiftByUserId(),
      method: 'GET',
      data: {
        userId: self.data.userInfo.userId,
        pageSize: self.data.pageSize,
        pageNum: pageNum
      },
      success: (res) => {
        if (res.data.data.length > 0) {
          self.setData({
            list: self.data.list.concat(res.data.data),
            pageNum: pageNum
          })
        }
        wx.hideLoading()
      }
    })
  }
})