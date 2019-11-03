const request = require('../../utils/request');
const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();

Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    moneyStatus: {},
    pUser: '',
    all: 0,
    surplus: 0,
    isApply: 0,
    surplus: 0.00,
    sOrderAllMoney: 0,
    waitGetMoney: 0.00,
    sUserSize: 0,
    userHeadIcon: API.getHOSTURI() + '/picture/centre_gray.png',
    userName: '',
    userId: '',
    userYearType: 0,
    userYearEnd: ""
  },
	onShareAppMessage() {
		return app.globalData.shareMessage
	},
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分销中心'
    })
    this.init()
  },
  //返回页面时更新数据
  onShow: function () {
    this.init()
  },
  init: function () {
    let self = this;
    commen.updateAndGetUserInfo((data) => {
      let { userHeadIcon, userName, userId, userYearType, userYearEnd } = data;
      self.setData({
        userHeadIcon: userHeadIcon,
        userName: userName,
        userId: userId,
        userYearType: userYearType,
        userYearEnd: userYearEnd
      })
      self.getData(self, data.userId)
    })

  },
  //获取数据
  getData: function (self, userId) {
    request({
      url: API.getHOSTURI() + '/user/getDistriUser',
      method: 'GET',
      data: {
        userId: userId
      },
      success: (res) => {
        let { pUser, moneyStatus, user } = res.data.data;
        self.setData({
          pUser: pUser == null ? '' : pUser.userName,
          moneyStatus: moneyStatus
        })
      }
    })
  },
  toChild: function (e) {
    wx.navigateTo({
      url: '/pages/child/child?name=' + e.currentTarget.dataset.name + '&surplus=' + e.currentTarget.dataset.surplus
    })
  },
  //提现明细
  withdraw: function () {
    wx.navigateTo({
      url: '/pages/withdraw/withdraw?money=' + this.data.moneyStatus.surplus
    })
  },
  //分销佣金
  branchMoney: () => {
    wx.navigateTo({
      url: '/pages/branchMoney/branchMoney'
    })
  },
  //分销订单
  branchOrder: () => {
    wx.navigateTo({
      url: '/pages/branchOrder/branchOrder'
    })
  },
  //提现明细
  cashDetails: () => {
    wx.navigateTo({
      url: '/pages/cashDetails/cashDetails'
    })
  },
  //我的团队
  toTeam: () => {
    wx.navigateTo({
      url: '/pages/team/team'
    })
  },
  //推广二维码
  toCode: () => {
    wx.navigateTo({
      url: '/pages/code/code'
    })
  }
})