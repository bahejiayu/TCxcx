const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
const app = getApp();
Page({
  data: {
    isShowShop: false,
    shop: {},
    // shopItems: ['员岗店','万达店','up店'],
    shopItems: [],
    isShowPost: false,
    post: {},
    items: ['员工', '店长'],
    workItems: [
      {
        name: '游客',
        value: '4'
      }, {
        name: '会员',
        value: '0'
      }, {
        name: '员工',
        value: '1'
      }, {
        name: '店长',
        value: '2'
      }, {
        name: '管理员',
        value: '3'
      },
    ],
    user: {},
    userInfo: {}
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
  onLoad: function (options) {
    var self = this
    commen.updateAndGetUserInfo((userInfo) => {
      self.setData({
        userInfo: userInfo
      })
    })

    wx.setNavigationBarTitle({
      title: '员工管理'
    })
    var getReq = wxReq.get(API.getUserById(), { userId: options.userId })
    getReq.then(resp => {
      self.setData({
        user: resp.data.data
      })
      for (var i = 0; i < this.data.workItems.length; i++) {
        if (this.data.workItems[i].value == this.data.user.userType) {
          self.setData({
            post: this.data.workItems[i]
          })
          break;
        }
      }
      var getReq = wxReq.get(API.getAllShop(), {})
      getReq.then(resp => {
        self.setData({
          shopItems: resp.data.data
        })
        for (var i = 0; i < this.data.shopItems.length; i++) {
          if (this.data.shopItems[i].siId == this.data.user.userShopId) {
            var param = {}
            param.name = this.data.shopItems[i].siName
            param.value = this.data.shopItems[i].siId
            self.setData({
              shop: param
            })
            break;
          }
        }
      })
    })
  },
  radioChange: function (e) {
    var params = e.detail.value.split(":")
    var post = {}
    post.name = params[0]
    post.value = params[1]
    this.setData({
      post: post
    })
  },
  showPostList: function () {
    this.setData({
      isShowPost: !this.data.isShowPost,
      isShowShop: false
    })
  },
  hidePostList: function () {
    this.setData({
      isShowPost: false
    })
  },
  changeShopName: function (e) {
    var params = e.detail.value.split(":")
    var shop = {}
    shop.name = params[0]
    shop.value = params[1]
    this.setData({
      shop: shop
    })
  },
  showShopList: function () {
    this.setData({
      isShowShop: !this.data.isShowShop,
      isShowPost: false
    })
  },
  hideShopList: function () {
    this.setData({
      isShowShop: false
    })
  },
  hideList: function () {
    this.setData({
      isShowPost: false,
      isShowShop: false
    })
  },
  save: function () {
    var self = this
    var param = {}
    param.workId = this.data.userInfo.userId
    param.userId = this.data.user.userId
    param.userType = this.data.post.value
    param.shopId = this.data.shop.value
    var postReq = wxReq.post(API.postBindWorkUser(), param)
    postReq.then(resp => {
      if (resp.data.errno == 0) {
        commen.showMessage("修改成功")
        wx.navigateBack({
          delta: 1
        })
      } else {
        commen.showError("权限不足");
      }
    })
  }
})