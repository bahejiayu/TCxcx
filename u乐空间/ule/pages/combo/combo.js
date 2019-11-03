const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    tmp: "https://www.ulznkj.com/",
    pageSize: 10,
    pageNum: 0,
    comboData: [],
    nub_chk: 0,
    toatl_:0,
    userInfo:null,
    auth:false
  },
  total:function(){
    var that = this;
    var toatl_=0;
    that.data.comboData.map((i, v) => {
      i.goods.map((i2, v2) => {
        if (i2.chk) {
          toatl_+= i2.nub * i2.mealMoney
        }
      })
    });
    that.setData({
      toatl_: toatl_
    })
  },
  buy_go: function() {
    var that=this;
    if (that.data.nub_chk < 1) {
      return false;
    }
    var _goods = [];
    that.data.comboData.map((i, v) => {
      i.goods.map((i2, v2) => {
        if (i2.chk) {
          var _obj =i2;
          _obj.goodNum = i2.nub;
          _goods.push(_obj);
        }
      })
    });
    var _buyGoodsStr = JSON.stringify(_goods);
 
    wx.setStorageSync('buyGoodsStr', _goods)
       wx.navigateTo({
      url: '/pages/combo/packagePay'
    });
    
  },
  tog_rad: function(e) {
    var that = this;
    var list = that.data.comboData;
    if (list[e.currentTarget.dataset.index1].goods[e.currentTarget.dataset.index2].chk) {
      list[e.currentTarget.dataset.index1].goods[e.currentTarget.dataset.index2].chk = false
    } else {
      list[e.currentTarget.dataset.index1].goods[e.currentTarget.dataset.index2].chk = true
    };
    var nub = 0;
    that.data.comboData.map((i, v) => {
      i.goods.map((i2, v2) => {
        if (i2.chk) {
          nub++;
        }
      })
    });
    that.setData({
      nub_chk: nub,
      comboData: list
    });
    that.total();
  },
  countNumber: function(e) {
    var list = this.data.comboData;
  var that=this;
    if (e.currentTarget.dataset.type == 'add') {
      list[e.currentTarget.dataset.index1].goods[e.currentTarget.dataset.index2].nub++;
    } else {
      if (list[e.currentTarget.dataset.index1].goods[e.currentTarget.dataset.index2].nub == 1) {
        wx.showToast({
          title: '不能小于1',
          icon: 'none'
        });
        return false;
      }
      list[e.currentTarget.dataset.index1].goods[e.currentTarget.dataset.index2].nub--;
    }
    this.setData({
      comboData: list
    })

    that.total();

  },
  onShareAppMessage() {
    return app.globalData.shareMessage
  },
  bindGetUserInfo: function (e) {
    this.setData({
      auth: false
    })
    wx.showTabBar({
      aniamtion: true,
    })
    this.getUserInfo();
  },
  onLoad: function(options) {
    //去掉了不进入店不能购买问题
    // var shopId = commen.getShopId();
    // console.log(shopId)
    // if (shopId == null || shopId == '' || shopId == undefined){
    //   return false
    // }
    var that=this;
    if (wx.getStorageSync('token')){
      
    }else{
      that.setData({
        auth: true
      })
    }

    var getReq = wxReq.get(API.getGetByGroupId(), {
      groupId: options.groupId
    })
    getReq.then(resp => {
      this.setData({
        comboData: resp.data.data
      })
    })
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function () {
    var that = this;
    wx.getUserInfo({
      success(res) {
        //判断用户是否存在系统，如果没有则新增
        commen.loginByWeixin(res.userInfo, that.options.redPId).then(res => {
          commen.updateAndGetUserInfo((userInfo) => {
            that.setData({
              userInfo: userInfo
            })
          })
        })
      }
    })
  },
  toBuy: function(e) {
    var param = JSON.stringify(this.data.comboData[e.currentTarget.dataset.index]);
    var nub = this.data.comboData[e.currentTarget.dataset.index].nub;
    wx.navigateTo({
      url: '/pages/home/goods/pay?param=' + param + '&type=' + 3 + '&nub=' + nub,
    })
  }
})