const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
const app = getApp();
Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    listType: 0,
    searchState: false,
    workPageSize: 10,
    workPageNum: 0,
    userPageSize: 10,
    userPageNum: 0,
    workList: [],
    userList: [],
    showList: [],
    user: {},
    searchParam: ''
  },
  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '员工管理'
    })
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  reset: function () {
    this.setData({
      listType: 0,
      searchState: false,
      workPageSize: 10,
      workPageNum: 0,
      userPageSize: 10,
      userPageNum: 0,
      workList: [],
      userList: [],
      showList: [],
      user: {},
      searchParam: ''
    })
  },
  onShow: function (options) {
    var self = this
    this.reset()
    commen.updateAndGetUserInfo((user) => {
      self.setData({
        user: user
      })
      self.getWorkList();
    })
  },
  getWorkList: function () {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    var param = {}
    param.pageNum = this.data.workPageNum + 1
    param.pageSize = this.data.workPageSize
    var getReq = wxReq.get(API.getWorkUserList(), param)
    getReq.then(resp => {
      var list = self.data.workList.concat(resp.data.data)
      self.setData({
        workList: list,
        showList: list,
        listType: 0
      })
      if (resp.data.data.length > 0) {
        self.setData({
          workPageNum: self.data.workPageNum + 1
        })
      }
      wx.hideLoading()
    })
  },
  getUserList: function () {
    if (this.data.searchParam == '') {
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    var param = {}
    param.searchParam = self.data.searchParam
    param.pageSize = this.data.userPageSize
    param.pageNum = this.data.userPageNum + 1
    var getReq = wxReq.get(API.getSearchUser(), param)
    getReq.then(resp => {
      var list = self.data.userList.concat(resp.data.data)
      self.setData({
        userList: list,
        showList: list,
        listType: 1
      })
      if (resp.data.data.length > 0) {
        self.setData({
          userPageNum: self.data.userPageNum + 1
        })
      }
      wx.hideLoading()
    })
  },
  //上拉生命周期
  onReachBottom: function () {
    let self = this;
    if (self.data.listType == 0) {
      self.getWorkList()
    } else {
      self.getUserList()
    }
  },
  focusShow: function (e) {
    this.setData({
      searchState: true,
      listType: 1
    })
  },
  focusHide: function () {
    this.setData({
      searchState: false,
      showList: this.data.workList,
      listType: 0,
      userPageNum: 0,
      searchParam: '',
      userList: []
    })
  },
  searchUser: function (e) {
    this.setData({
      searchParam: e.detail.value,
      userList: [],
      userPageNum: 0
    })
    this.getUserList();
  },
  staffDetails: function (e) {
    if (e.currentTarget.dataset.type == 1 || e.currentTarget.dataset.type == 2 || e.currentTarget.dataset.type == 3) {
      wx.navigateTo({
        url: 'info?userId=' + e.currentTarget.dataset.id
      })
    }
    return
  },
  addStaff: function (e) {
    wx.navigateTo({
      url: 'add?userId=' + e.currentTarget.dataset.id
    })
  }
})