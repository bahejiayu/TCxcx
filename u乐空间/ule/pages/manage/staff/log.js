const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
const calendar = require('../../../utils/time')

const app = getApp();
Page({
  data: {

    userId: null,
    pageSize: 10,
    pageNum: 0,
    list: [],
    multiArray: calendar,
    multiIndex: [calendar.idx[0], calendar.idx[1], calendar.idx[2]]
  },
  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  DateStartChange(e) {
    this.setData({
      startTime: e.detail.value
    })
    this.getCandGselect()
  },
  DateEndChange(e) {
    this.setData({
      endTime: e.detail.value
    })
    this.getCandGselect()
  },
  onLoad: function (options) {
    let year = new Date().getFullYear();
    let month = parseInt(new Date().getMonth()) + 1;
    let day = new Date().getDate();
    this.setData({
      startTime: year + '-' + month + '-' + day,
      endTime: year + '-' + month + '-' + day,
    })
    
    wx.setNavigationBarTitle({
      title: '考勤记录'
    })
    this.setData({
      userId: options.userId
    })

    this.getCandGselect()
  },
  onReachBottom: function () {
    let self = this;
    self.getCandGselect()
  },
  getCandGselect: function () {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    var param = {};
    param.userId = parseInt(this.data.userId)
    param.start = commen.YYYYMMDD2time(this.data.startTime + ' 00:00:00').getTime()
    param.end = commen.YYYYMMDD2time(this.data.endTime + ' 23:59:59').getTime()
    param.pageSize = this.data.pageSize
    param.pageNum = this.data.pageNum + 1
    var getReq = wxReq.post(API.getCandGSelect(), param)
    getReq.then(resp => {
      if (resp.data.data.length > 0) {
        var list = this.data.list.concat(resp.data.data)
        self.setData({
          list: list,
          pageNum: self.data.pageNum + 1
        })
      }
      wx.hideLoading()
    })
  },
  
})