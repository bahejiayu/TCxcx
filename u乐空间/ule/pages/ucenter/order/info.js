const app = getApp();
const API = require('../../../utils/api')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
Page({
  data: {
    HOST_URI: API.getSERVERURI(),
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
  },
  onLoad(e) {
    this.setData({
      orderId: e.id
    })
    let that = this;
    wxReq.get(API.orderDetail, {
      id: e.id
    }).then(res => {      
      this.setData({
        orderInfo: res.data.data,
        orderGoods: res.data.data.orderGoodsList,
        addTime: that.changeTime(res.data.data.addTime),
        shipTime: that.changeTime(res.data.data.shipTime)
      })
    })
  },
  onShareAppMessage() {
    return app.globalData.shareMessage
  },
  copyInfo(e) {
    let text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success(res) {
        wx.showToast({
          title: '复制成功',
          duration: 1500,
        });
      }
    })
  },
  //将毫秒转时间
  changeTime: function (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    month = month <= 9 ? '0' + month : month;
    day = day <= 9 ? '0' + day : day;
    return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
  },
  toRefund(){
    wx.redirectTo({
      url: '../refund/apply?id=' + this.data.orderId + '&price=' + this.data.orderInfo.actualPrice
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
  cancel(){
    var param = {};
    param.orderId = this.data.orderId

    wxReq.post(API.orderCancel, param).then(resp => {
      if (resp.data.errno == 0) {
        commen.showMessage("取消订单成功")
        setTimeout(() => {
          wx.navigateBack(1)
        }, 1500)
      }
    })
  },
  toPay(){
    commen.mallOrderPay(this.data.orderId)
  },
  cofirmGet(e) {
    commen.mallOrderConfirm(this.data.orderId, function () {
      wx.navigateBack(1)
    })
  },
  toTiming: function (e) {
    wx.navigateTo({
      url: '/pages/expressView/expressView?code=' + e.currentTarget.dataset.code,
    })
  },
})