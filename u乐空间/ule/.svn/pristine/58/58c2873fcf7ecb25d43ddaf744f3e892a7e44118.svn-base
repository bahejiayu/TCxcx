const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
const app = getApp(); 

Page({
  data: {
    value: 'record',
    showIndex: 0,
    privateList: [],
    otherList: [],
    mealList: [],
    privatePageSize: 10,
    otherPageSize: 10,
    mealPageSize: 10,
    privatePageNum: 0,
    otherPageNum: 0,
    mealPageNum: 0,
    userInfo: null,
    TabCur: 0,
    nav: ['空间', '物品', '套餐']
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
      self.getList(0);
      self.getList(1);
      self.getList(2);
    })
  },
  getList: function (showIndex) {
    var self = this
    if (showIndex == undefined) {
      showIndex = this.data.showIndex
    }
    wx.showLoading({
      title: '加载中',
    })
    var obj = {}
    obj.userCode = self.data.userInfo.userCode
    // var list;
    // var newList;
    var url = API.getListByUserCode();
    if (showIndex == 0) {
      obj.pageNum = this.data.privatePageNum + 1
      obj.pageSize = this.data.privatePageSize
      obj.orderTypes = [0, 1, 4]
    } else if (showIndex == 1) {
      obj.pageNum = this.data.otherPageNum + 1
      obj.pageSize = this.data.otherPageSize
      obj.orderTypes = [2, 5]
    } else if(showIndex == 2){
      obj.pageNum = this.data.mealPageNum + 1
      obj.pageSize = this.data.mealPageSize
      obj.orderTypes = [3]
    }
    var postReq = wxReq.post(url, obj)
    postReq.then(resp => {
      if (resp.data.data.length > 0) {
        if (showIndex == 0) {
          self.setData({
            privatePageSize: obj.pageSize,
            privatePageNum: obj.pageNum,
            privateList: self.data.privateList.concat(resp.data.data)
          })
        } else if (showIndex == 1) {
          self.setData({
            otherPageSize: obj.pageSize,
            otherPageNum: obj.pageNum,
            otherList: self.data.otherList.concat(resp.data.data)
          })
        } else if(showIndex == 2) {
          self.setData({
            mealPageSize: obj.pageSize,
            mealPageNum: obj.pageNum,
            mealList: self.data.mealList.concat(resp.data.data)
          })
        }
      }
      wx.hideLoading()
    })
  },
  onReachBottom: function () {
    this.getList()
  },
  toDetail: function (e) {
    if (e.currentTarget.dataset.type == 4) {
      wx.navigateTo({
        url: '/pages/indent/indent?id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: 'info?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  }
})