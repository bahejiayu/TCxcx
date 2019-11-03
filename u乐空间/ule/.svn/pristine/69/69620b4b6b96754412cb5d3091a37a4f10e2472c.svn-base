const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
var flag_ = true;
const app = getApp();
Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    showAllMoney: 0,
    buyGoods: [],
    cartCode: "",
    goodsBody: [],
    goodsName: ""
  },

  onShareAppMessage() {
    return app.globalData.shareMessage
  },
  onLoad: function(options) {
    var self = this;
    flag_ = true
    // var _buyGoods = JSON.parse(options.buyGoodsStr);
    var _buyGoods = wx.getStorageSync('buyGoodsStr');



    var _showAllMoney = 0;
    var _goodsBody = [];
    var _goodsName = "";
    _buyGoods.map((v, i) => {
      var _goodBody = {};
      _goodsName += "【 " + v.mealName + " X" + v.goodNum + " " + v.mealMoney + "￥ 】";
      _goodBody.goodId = v.mealId;
      _goodBody.goodNum = v.goodNum;
      _goodBody.goodPrice = v.mealMoney;
      _showAllMoney += (v.goodNum * v.mealMoney);
      _goodsBody.push(_goodBody);
    });
    self.setData({
      buyGoods: _buyGoods,
      showAllMoney: _showAllMoney,
      goodsBody: _goodsBody,
      goodsName: _goodsName
    });
    wx.setNavigationBarTitle({
      title: '我的订单'
    });
  },
  toIndentDetails: function() {
    var that = this;
    var _goodsBody = JSON.stringify(that.data.goodsBody);
    var _goodInfo = {};
    if (!flag_) {
      return false;
    }

    flag_ = false
    wx.showLoading({
      title: '加载中',
    });
    wxReq.post(API.addShoppingCart(), {
      goodsBody: _goodsBody
    }).then(res => {
      _goodInfo.cartCode = res.data.data.cartCode;
      _goodInfo.numTotal = res.data.data.numTotal;
      _goodInfo.totalAmount = res.data.data.totalAmount;
      commen.updateAndGetUserInfo((userInfo) => {
        var shopId = commen.getShopId()
        if (shopId == undefined || shopId == null || shopId == '') {
          shopId = userInfo.userShopId
        }
        var orderReq = wxReq.post(API.postOrderCreate(), {
          uoUserCode: userInfo.userCode,
          uoType: 3,
          uoCommodityId: _goodInfo.cartCode,
          uoNumber: _goodInfo.numTotal,
          uoUnit: _goodInfo.totalAmount,
          uoCommodityName: that.data.goodsName,
          uoSiId: shopId
        });
        orderReq.then(resp => {
          var orderId = resp.data.data
          var obj = {
            payId: _goodInfo.cartCode,
            orderId: orderId,
            redUse: false
          }
          wx.hideLoading();

          commen.payMoney(obj, () => {
            flag_ = true;

            wx.navigateTo({
              url: '/pages/ucenter/room/info?id=' + orderId
            })
          }, () => {
              console.log('22222');
            flag_=true;
          });



          
        });
      })
    });

  }

})