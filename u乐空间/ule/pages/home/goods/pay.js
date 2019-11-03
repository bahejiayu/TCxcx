const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')

const app = getApp();
Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    allMoney: 0,
    showAllMoney: 0,
    name: '',
    num: 0,
    money: 0,
    showMoney: 0,
    options: null,
    useRed: true,
    cDiscountRate: 0
  },
	
	onShareAppMessage() { 
	  return  app.globalData.shareMessage
	},
  onLoad: function (options) {
    var self = this;
    commen.getSetConfig((data) => {
      self.setData({
        cDiscountRate: 100 - data.discountRate
      })
    })
    var param = JSON.parse(options.param);
    var type = options.type;
    var _nub=options.nub;
    var obj = {}
    obj.type = type;
    obj.param = param;
    obj.nub=_nub;
    self.setData({
      options: obj
    })
    var getReq;
    if (type == 3) {
      getReq = wxReq.get(API.getCalculationMoney(), { type: 3, id: param.mealId, size: 1 })
      this.setData({
        name: param.mealName,
        num: _nub,
        money: param.mealMoney ,
        showMoney: commen.formatMoney(param.mealMoney * _nub)
      })
    }
    getReq.then(resp => {
      this.setData({
        allMoney: resp.data.data,
        showAllMoney: commen.formatMoney(resp.data.data * _nub)
      })
    })
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
  },
  switch1Change: function (e) {
    this.setData({
      useRed: e.detail.value
    })
  },
  toIndentDetails: function () {
    var param = this.data.options
    commen.updateAndGetUserInfo((userInfo) => {
      var shopId = commen.getShopId()
      console.log(shopId)
      if (shopId == undefined || shopId == null || shopId == '') {
        //去掉入店限制
        //return false
        shopId = userInfo.userShopId
      }
      var orderReq = wxReq.post(API.postOrderCreate(), {
        uoUserCode: userInfo.userCode,
        uoType: 3,
        uoCommodityId: param.param.mealId,
        uoNumber: param.nub,
        uoUnit: param.param.mealMoney,
        uoCommodityName: param.param.mealName,
        uoSiId: shopId
      })
      orderReq.then(resp => {
        var orderId = resp.data.data
        console.log(orderId)
        var obj = {
          payId: param.param.mealId,
          orderId: orderId,
          redUse: false
        }
        commen.payMoney(obj, () => {
          wx.navigateTo({
            url: '/pages/ucenter/room/info?id=' + orderId
          })
        });
      });
    })

  }

})