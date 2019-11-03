
const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({

  data: {
    cartList:[],
    money:0,
    SERVER_URI: API.getSERVERURI(),
    address:null,
    cartId:0,
    orderId:null
  },
  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  onLoad: function (options) {
    var cartId = wx.getStorageSync('cartId');
    if(!cartId){
      cartId=0;
    }
    this.setData({
      cartId:cartId
    })
    var data = {};
    data.cartId = cartId;
    var postReq = wxReq.get(API.orderBeforePay, data);
    postReq.then(resp => {
      this.setData({
        cartList:resp.data.data.cartList,
        money: resp.data.data.money
      })
    })
  },
  chooseAddress:function(){
    commen.getAdress((address)=>{
      this.setData({
        address:address
      })
    })
  },
  submit:function(){
    var that = this;
    if(!this.data.address){
      commen.showError('请选择收货地址');
      return false;
    }
    var data = {};
    let shopId = commen.getShopId();
    if(!shopId){
      shopId = null;
    }
    data.shopId = shopId;
    data.cartId = this.data.cartId;
    data.consignee = this.data.address.name;
    data.address = this.data.address.place;
    data.mobile = this.data.address.phone;
    var getReq = wxReq.post(API.orderSubmit, data);
    getReq.then(resp => {
      if(resp.data.errno==0){
        const orderId = resp.data.data;
        that.setData({
          orderId: orderId
        })
        commen.mallOrderPay(orderId);
        // var data = {}
        // data.orderId = orderId;
        // var payReq = wxReq.post(API.orderPrepay, data);
        // payReq.then(res=>{
        //   console.log(res)
        //   if (res.data.errno === 0) {
        //     const payParam = res.data.data;
        //     console.log("支付过程开始");
        //     wx.requestPayment({
        //       'timeStamp': payParam.timeStamp,
        //       'nonceStr': payParam.nonceStr,
        //       'package': payParam.packageValue,
        //       'signType': payParam.signType,
        //       'paySign': payParam.paySign,
        //       'success'(res) {
        //         console.log("支付过程成功");
        //         // wx.redirectTo({
        //         //   url: '/pages/ucenter/order/info?id=' + orderId
        //         // });
        //         that.paySubmit(orderId, function () {
        //           wx.redirectTo({
        //             url: '/pages/ucenter/order/info?id=' + that.data.orderId
        //           });
        //         });
        //       },
        //       'fail'(res) {
        //         console.log("支付过程失败");
        //         wx.redirectTo({
        //           url: '/pages/ucenter/order/info?id=' + that.data.orderId
        //         });
        //       },
        //       'complete'(res) {
        //         console.log("支付过程结束")
        //       }
        //     });
        //   }else{
        //     wx.redirectTo({
        //       url: '/pages/ucenter/order/info?id=' + orderId
        //     });
        //   }
        // })
      }else{
        commen.showError(resp.data.msg)
      }
    })
  },
  paySubmit(code, callback = (param) => { }) {
    console.log("paySubmit");
    var that = this;
    console.log(code);
    wxReq.post(API.mallPostPaySubmit, {
      payCode: code
    }).then(resp=>{
      if (resp.data.errno === 0) {
        callback(resp)
      } else {
        commen.showError(resp.data.errMsg);
      }
    })
  }
})