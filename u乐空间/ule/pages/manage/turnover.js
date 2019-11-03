const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const calendar = require('../../utils/time')
const app = getApp();

Page({
  data: {
    HOST_URL: API.getSERVERURI(),
    TabCur: 0,
    nav: ['空间', '商城'],
    isShowList: false,
    shop: '选择门店',
    shopId: null,
    items: [],
    userInfo: {},
    size: 0,
    money: 0,
    orderList: [],
    pageNum: 0,
    pageSize: 10,
    mallSize: 0,
    mallMoney: 0,
    mallOrderList: [],
    mallPageNum: 0,
    mallPageSize: 10,
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  },
	onShareAppMessage() { 
	  return  app.globalData.shareMessage
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
  DateStartChange(e) {
    this.setData({
      startTime: e.detail.value
    })
    
    this.reset()
    this.getData(this.data.shopId)
  },
  DateEndChange(e) {
    this.setData({
      endTime: e.detail.value
    })
    
    this.reset()
    this.getData(this.data.shopId)
  },
  onLoad: function (options) {
    let year = new Date().getFullYear();
    let month = parseInt(new Date().getMonth()) + 1;
    let day = new Date().getDate();
    this.setData({
      startTime: year + '-' + month + '-' + day,
      endTime: year + '-' + month + '-' + day,
    })
    var self = this
    wx.setNavigationBarTitle({
      title: '营业额统计'
    })
    commen.updateAndGetUserInfo((userInfo) => {
      self.setData({
        userInfo: userInfo,
        shopId: userInfo.userShopId
      })
      if (userInfo.userType == 3) {
        var getReq = wxReq.get(API.getAllShop(), {})
        getReq.then(resp => {
          self.setData({
            items: resp.data.data
          })
        })
        self.getData()
      } else {
        self.getData(this.data.shopId)
      }
    })
  },
  radioChange: function (e) {
    var shopName = ''
    for (var i = 0; i < this.data.items.length; i++) {
      if (e.detail.value == this.data.items[i].siId) {
        shopName = this.data.items[i].siName
      }
    }
    this.setData({
      shopId: e.detail.value,
      shop: shopName,
      orderList: [],
      pageNum: 0
    })
    this.getData(this.data.shopId)
  },
  getData: function (siId) {
    var self = this
    var param = {}
    param.start = this.data.startTime.replace(/-/g, '/') + " 00:00:00"
    param.end = this.data.endTime.replace(/-/g, '/') + " 23:59:59"
    console.log(param)
    if (siId != undefined) {
      self.setData({
        shopId: siId
      })
      param.shopId = siId
    }

    var ySizeReq = wxReq.get(API.getSizeBetweenTime(), param)
    ySizeReq.then(resp => {
      console.log(resp)
      self.setData({
        size: resp.data.data
      })
    })
    var tMoneyReq = wxReq.get(API.getAllTurnoverBetweenTime(), param)
    tMoneyReq.then(resp => {
      self.setData({
        money: commen.formatMoney(resp.data.data)
      })
    })

    var ySizeReq = wxReq.get(API.mallGetSizeBetweenTime, param)
    ySizeReq.then(resp => {
      console.log(resp)
      self.setData({
        mallSize: resp.data.data
      })
    })
    var tMoneyReq = wxReq.get(API.mallGetAllTurnoverBetweenTime, param)
    tMoneyReq.then(resp => {
      self.setData({
        mallMoney: commen.formatMoney(resp.data.data)
      })
    })

    self.getOrderList(siId)
    self.getMallOrderList(siId)
  },
  reset: function () {
    this.setData({
      orderList: [],
      pageNum: 0,
      mallOrderList:[],
      mallPageNum:0
    })
  },
  getOrderList: function (siId) {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    var param = {}
    console.log(siId)
    if (siId) {
      param.shopId = siId
    }
    param.pageSize = this.data.pageSize
    param.pageNum = this.data.pageNum + 1
    param.start = this.data.startTime.replace(/-/g, '/') + " 00:00:00"
    param.end = this.data.endTime.replace(/-/g, '/') + " 23:59:59"
    console.log(param)
    var getReq = wxReq.get(API.getListBetweenTime(), param)
    getReq.then(resp => {
      console.log(resp)
      if (resp.data.data.length > 0) {
        var list = this.data.orderList.concat(resp.data.data)
        self.setData({
          orderList: list,
          pageNum: this.data.pageNum + 1
        })
      }
      wx.hideLoading()
    })
  },
  getMallOrderList: function (siId) {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    var param = {}
    console.log(siId)
    if (siId) {
      param.shopId = siId
    }
    param.pageSize = this.data.mallPageSize
    param.pageNum = this.data.mallPageNum + 1
    param.start = this.data.startTime.replace(/-/g, '/') + " 00:00:00"
    param.end = this.data.endTime.replace(/-/g, '/') + " 23:59:59"
    console.log(param)
    var getReq = wxReq.get(API.mallGetListBetweenTime, param)
    getReq.then(resp => {
      console.log(resp)
      if (resp.data.data.length > 0) {
        var list = this.data.mallOrderList.concat(resp.data.data)
        self.setData({
          mallOrderList: list,
          mallPageNum: this.data.mallPageNum + 1
        })
      }
      wx.hideLoading()
    })
  },
  onReachBottom: function () {

    let self = this;
    if (this.data.TabCur == 0) {
      self.getOrderList(self.data.shopId)
    }else{
      self.getMallOrderList(self.data.shopId)
    }
  },
})