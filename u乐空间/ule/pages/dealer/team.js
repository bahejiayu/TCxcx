const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();


Page({
  data: {
    teamData: [],
    pageSize: 10,
    pageNum: 0
  },
  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  onLoad: function (options) {
    let self = this;
    commen.updateAndGetUserInfo((userInfo) => {
      self.setData({
        userInfo: userInfo
      })
      self.getTeamData()
    })

    wx.setNavigationBarTitle({
      title: '我的团队'
    })
  },
  //获取我的团队的数据
  getTeamData: function () {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    var param = {}
    param.userId = self.data.userInfo.userId
    param.pageSize = self.data.pageSize
    param.pageNum = self.data.pageNum + 1
    var getReq = wxReq.get(API.getMyTeam(), param)
    getReq.then(resp => {
      if (resp.data.data.length > 0) {
        var list = self.data.teamData
        list = list.concat(resp.data.data)
        self.setData({
          teamData: list,
          pageNum: self.data.pageNum + 1
        })
      }
      wx.hideLoading()
    })

  },
  //上拉生命周期
  onReachBottom: function () {
    this.getTeamData()
  },
  loadState: function (res) {
    if (res.data.errno !== 0) {
      wx.showLoading({
        title: '玩命加载中',
      })
    } else if (res.data.errno === 0) {
      wx.hideLoading({
        title: '玩命加载中',
      })
    }
    if (res.data.data.length >= 10) {
      wx.showToast({
        title: '到底啦',
        image: '/images/branch-money.png',
        duration: 1000,
      })
    }
  },
})