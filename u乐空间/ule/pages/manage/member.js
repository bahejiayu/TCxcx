const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({

  data: {
    temParam: {},
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    listType: 0,
    searchState: false,
    yearPageSize: 10,
    yearPageNum: 0,
    userPageSize: 10,
    userPageNum: 0,
    yearList: [],
    userList: [],
    showList: [],
    user: {},
    searchParam: '',
    searchState: false,
    isUntie: false,
    isShowUntie: false,
    userInfo: {},
    idx: '',
    start: ''
  },
	
	onShareAppMessage() { 
	  return  app.globalData.shareMessage
	},
  onLoad: function(options) {
    var self = this
    wx.setNavigationBarTitle({
      title: '年卡会员'
    })
    commen.updateAndGetUserInfo((userInfo) => {
      self.setData({
        userInfo: userInfo
      })
    })
  },
  reset: function() {
    this.setData({
      listType: 0,
      searchState: false,
      yearPageSize: 10,
      yearPageNum: 0,
      userPageSize: 10,
      userPageNum: 0,
      yearList: [],
      userList: [],
      showList: [],
      user: {},
      searchParam: ''
    })
  },
  onShow: function(options) {
    var self = this
    this.reset()
    commen.updateAndGetUserInfo((user) => {
      self.setData({
        user: user
      })
      self.getYearList();
    })
  },
  getYearList: function() {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    var param = {}
    param.pageNum = this.data.yearPageNum + 1
    param.pageSize = this.data.yearPageSize
    var getReq = wxReq.get(API.getYearUserList(), param)
    getReq.then(resp => {

      var list = self.data.yearList.concat(resp.data.data)
      self.setData({
        yearList: list,
        showList: list,
        listType: 0
      })
      if (resp.data.data.length > 0) {
        self.setData({
          yearPageNum: self.data.yearPageNum + 1
        })
      }
      wx.hideLoading()
    })
  },
  getUserList: function() {
    if (!this.data.searchParam) {
      return false
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
  onReachBottom: function() {
    let self = this;
    if (self.data.listType == 0) {
      self.getYearList()
    } else {
      self.getUserList()
    }
  },
  focusShow: function(e) {
    console.log(1)
    this.setData({
      searchState: true,
      listType: 1,
      start: ''
    })
  },
  focusHide: function() {
    this.setData({
      searchState: false,
      showList: this.data.yearList,
      listType: 0,
      userPageNum: 0,
      searchParam: '',
      userList: []
    })
  },
  searchUser: function(e) {
    console.log(2)
    this.setData({
      searchParam: e.detail.value,
      userList: [],
      userPageNum: 0
    })
    this.getUserList();
  },
  unYearUser: function(e) {
    var index = e.currentTarget.dataset.index
    let that = this;
    wx.showModal({
      content: '解绑会员“' + that.data.showList[index].userName+'”后Ta将不再享有会员权益',
      confirmText: '解绑会员',
      success: (e) => {
        if (e.confirm) {
          var param = {}
          param.userId = that.data.showList[index].userId
          param.workUserId = that.data.userInfo.userId
          var postReq = wxReq.post(API.postUnYearCard(), param)
          postReq.then(resp => {
            if (resp.data.errno == 0) {
              commen.showMessage("解绑成功")
              wx.redirectTo({
                url: '/pages/manage/member',
              })
            }
          })
        }
      }
    })
  },
  touchMove: function() {
    this.setData({
      isUntie: true
    })
  },
  untieMenber: function(e) {
    wx.navigateTo({
      url: 'memberUp?id=' + e.currentTarget.dataset.id
    })
  },
  showUntie: function(e) {
    var index = e.currentTarget.dataset.index
    var params = {}
    params.name = this.data.showList[index].userName
    params.id = this.data.showList[index].userId
    this.setData({
      isShowUntie: true,
      temParam: params
    })
  },
  hideUntie: function() {
    this.setData({
      isShowUntie: false,
      isUntie: false
    })
  },
  scrollEve: function(e) {
    let idx = e.currentTarget.dataset.index;
    console.log(idx == e.currentTarget.dataset.index)
    this.setData({
      idx: idx,
      start: 300
    })
  },
  touchStart(e) {
    this.setData({
      touchStart: e.touches[0].pageX,
      move: null
    })
  },

  touchMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.touchStart > 0 ? 'right' : 'left'
    })
  },

  touchEnd(e) {
    let direction = this.data.direction;
    if (direction == 'left') {
      this.setData({
        move: e.currentTarget.dataset.move,
        direction: null
      })
    }
  },
})