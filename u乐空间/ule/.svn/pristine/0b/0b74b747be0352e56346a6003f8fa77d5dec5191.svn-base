const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
var interval;
Page({
  data: {
    sec: 5,
    state: null,
    isShowPage: false,
    HOST_URL: API.getHOSTURI(),
  },

  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  onLoad: function (options) {
    var self = this
    //if(options.userId){
    commen.updateAndGetUserInfo((userInfo) => {
      self.setData({
        userInfo: userInfo
      })
      var shopId = commen.getShopId();
      if (shopId == null || shopId == '' || shopId == undefined) {
        //去掉入店限制
        //return false
        shopId = userInfo.userShopId
      }
      self.setData({
        shopId: shopId
      })
      if (options.privateId) {
        var param = {};
        if (userInfo.userType == 4) {
          commen.showMessageAndToPage("您还没有注册，请先注册", '/pages/auth/login')
          return
        };
        param.uoUserCode = userInfo.uoUserCode;
        param.uoType = 1;
        param.uoCommodityId = options.privateId;
        param.uoSiId = shopId;
        console.log(param);
        commen.checkOrderCanCreate(param, () => {
          var getReq = wxReq.get(API.getPrivateStart(), {
            userId: userInfo.userId,
            spaceId: options.privateId
          });
          getReq.then(resp => {
            console.log(resp);
            if (resp.data.errno == 0) {
              console.log("成功产生私人空间订单")
              self.time()
            } else {
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/home/home',
                })
              }, 1500)
            }
          })
        })
      } else if (options.shopId) {
        self.setData({
          state: 2
        })
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        var getReq = wxReq.get(API.getCheckCommonOrderIsHavePay(), {
          userId: userInfo.userId,
          shopId: options.shopId
        })
        getReq.then(resp => {
          wx.hideLoading()
          //如果一个普通会员直接扫开门码提示没有订单
          if (resp.data.data == -1) {
            wx.showModal({
              title: '提示',
              content: '你还没有订单',
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.switchTab({
                    url:"/pages/home/home"
                  })
                }
              }
            });
            return false;
          }
          if (resp.data.data > 0) {
            var orderReq = wxReq.get(API.getCommenOrderId(), {})
            orderReq.then(resp => {
              console.log("orderid=" + resp.data.data)
              var param = {
                payId: 0,
                orderId: resp.data.data,
                redUse: false
              };
              commen.payMoney(param, () => {
                self.time();
              });
            });
          } else {
            self.time();
          };
        });
      };
    });
  },
  time: function () {
    this.setData({
      state: 1
    })
    //开门倒计时
    let idx = 5;
    clearInterval(interval)
    interval = setInterval(() => {
      idx--
      if (idx <= 0) {
        clearInterval(interval);
        wx.reLaunch({
          url: '/pages/home/home'
        })
      }
      this.setData({
        sec: idx
      })
    }, 1000)
  }
})