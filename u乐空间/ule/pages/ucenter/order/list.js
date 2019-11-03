const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
const app = getApp();


Page({
  data: {
    TabCur: 0,
    nav: ['全部', '待付款', '待发货', '待收货', '待评价'],
    leftList: [],
    unCommentList: [],
    allList: [],
    unPayList: [],
    unSendList: [],
    unGetList: [],
    allPage: 0,
    unPayPage: 0,
    unSendPage: 0,
    unGetPage: 0,
    unCommentPage: 0,
    pageSize: 10,
    SERVER_URI: API.getSERVERURI(),
  },
  onLoad(opt) {
    console.log(opt);
    this.setData({
      TabCur: opt.type
    })
  },
  onShow(){
    this.reset()
    this.indentData(0)
    this.indentData(1)
    this.indentData(2)
    this.indentData(3)
    this.indentData(4)
  },
  reset(){
    this.setData({
      leftList: [],
      unCommentList: [],
      allList: [],
      unPayList: [],
      unSendList: [],
      unGetList: [],
      allPage: 0,
      unPayPage: 0,
      unSendPage: 0,
      unGetPage: 0,
      unCommentPage: 0
    })
  },
  onShareAppMessage() {
    return app.globalData.shareMessage
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
    if (this.data.TabCur==0){
      this.setData({
        leftList: this.data.allList
      })
    } else if (this.data.TabCur ==1) {
      this.setData({
        leftList: this.data.unPayList
      })
    } else if (this.data.TabCur == 2) {
      this.setData({
        leftList: this.data.unSendList
      })
    } else if (this.data.TabCur == 3) {
      this.setData({
        leftList: this.data.unGetList
      })
    } else{
      this.setData({
        leftList: this.data.unCommentList
      })
    }
  },
  onReachBottom() {
    this.indentData(this.data.TabCur)
  },
  indentData(type) {
    wx.showLoading({
      title: '加载中',
    })
    let self = this;
    commen.updateAndGetUserInfo((userInfo) => {
      var param = {};
      if (type == 0) {
        param.page = this.data.allPage + 1
      } else if (type == 1) {
        param.page = this.data.unPayPage + 1
      } else if (type == 2) {
        param.page = this.data.unSendPage + 1
      } else if (type == 3) {
        param.page = this.data.unGetPage + 1
      } else {
        param.page = this.data.unCommentPage + 1
      }
      param.size = this.data.pageSize
      param.type = type
      var getReq = wxReq.get(API.orderList, param)
      getReq.then(res => {
        if(type==4){
          console.log("wocao1")
          console.log(res)
        }
        if (res.data.data.length > 0) {
          var list = []
          if (type == 0) {
            list = self.data.allList
            list = list.concat(res.data.data)
            self.setData({
              allList: list,
              allPage: self.data.allPage + 1,
              leftList: list
            })
          } else if (type == 1) {
            list = self.data.unPayList
            list = list.concat(res.data.data)
            self.setData({
              unPayList: list,
              unPayPage: self.data.unPayPage + 1,
              leftList: list
            })
          } else if (type == 2) {
            list = self.data.unSendList
            list = list.concat(res.data.data)
            self.setData({
              unSendList: list,
              unSendPage: self.data.unSendPage + 1,
              leftList: list
            })
          } else if (type == 3) {
            list = self.data.unGetList
            list = list.concat(res.data.data)
            self.setData({
              unGetList: list,
              unGetPage: self.data.unGetPage + 1,
              leftList: list
            })
          } else {
            list = self.data.unCommentList
            list = list.concat(res.data.data)
            self.setData({
              unCommentList: list,
              unCommentPage: self.data.unCommentPage + 1
            })
          }
        }
        wx.hideLoading()
      })
    })
  },
  toComment: function (e) {
    wx.navigateTo({
      url: '/pages/ucenter/order/score?url=' + e.currentTarget.dataset.url + "&id=" + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })
  },
  submitInfo(e) {
    console.log("succcess")
    if (e.detail.formId.indexOf(" ") != -1) {
      return false
    }
    var param = {}
    param.formId = e.detail.formId
    wxReq.post(API.saveForm, param).then()
  },
  toRefund: function (e) {
    wx.navigateTo({
      url: '/pages/ucenter/refund/apply?id=' + e.currentTarget.dataset.id + "&price=" + e.currentTarget.dataset.price,
    })
  },
  cancel:function(e){
    var param = {};
    param.orderId = e.currentTarget.dataset.id

    wxReq.post(API.orderCancel, param).then(resp=>{
      if(resp.data.errno==0){
        commen.showMessage("取消订单成功")
        setTimeout(() => {
          wx.navigateBack(1)
        }, 1500)
      }
    })

  },
  toDetail:function(e){
    wx.navigateTo({
      url: '/pages/ucenter/order/info?id='+e.currentTarget.dataset.id,
    })
  },
  toPay (e) {
    commen.mallOrderPay(e.currentTarget.dataset.id)
  },
  cofirmGet(e){
    commen.mallOrderConfirm(e.currentTarget.dataset.id,function(){
        wx.navigateBack(1)
    })
  },
  toTiming: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/express/express?shipSn=' + e.currentTarget.dataset.sn + "&shipChannel=" + e.currentTarget.dataset.channel,
    })
  }
})
