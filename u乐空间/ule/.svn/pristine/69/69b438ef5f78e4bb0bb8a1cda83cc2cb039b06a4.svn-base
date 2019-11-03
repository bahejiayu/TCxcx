const request = require('../../utils/request');
const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();

Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    all: '',
    surplus: '',
    isApply: '',
    waitGetMoney: '',
    isShowText: false,
    
  },
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '分销佣金'
    })
  },
  onShow: function () {
    let self = this;
    self.getMoney(self)
  },
  //获取分销佣金
  getMoney: function (self) {
    commen.updateAndGetUserInfo((userInfo) => {
      request({
        url: self.data.HOST_URI + '/user/getMoneyStatusByUserId',
        method: 'GET',
        data: {
          userId: userInfo.userId
        },
        success: (res) => {
          //更改数组中对象的值
          let { all, surplus, isApply, waitGetMoney } = res.data.data;
          // let data = [surplus, isApply, waitGetMoney];
          // self.data.listData.forEach((item, idx) => {
          //   item.money = data[idx] == undefined ? '' : data[idx];
          // })
          self.setData({
            all: all,
            surplus: surplus,
            isApply: isApply,
            waitGetMoney: waitGetMoney
          })
        }
      })
    })
  },
  toWithdraw: function () {
    wx.navigateTo({
      url: '/pages/dealer/getCash?money=' + this.data.surplus
    })
  },
  toCashDetails: () => {
    wx.navigateTo({
      url: '/pages/dealer/detailCash'
    })
  },
  isShowContent: function () {
    this.setData({
      isShowText: !this.data.isShowText
    })
  }
})