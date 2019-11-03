const request = require('../../utils/request');
const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops:[]
  },

	onShareAppMessage() {
		return app.globalData.shareMessage
	},
  onLoad: function (options) {
    var getReq = wxReq.get(API.getAllShop(), {})
    getReq.then(resp => {
      console.log(resp)
      this.setData({
        shops: resp.data.data
      })
      console.log(this.data.shops)
    })
  },
  toLocation: function (e) {
    var self = this
    // wx.navigateTo({
    //   url: '/pages/order/map/map?lat=' + this.data.lat + '&lng=' + this.data.lng + '&name=' + this.data.shop,
    // })

    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log(res.errMsg);//用户授权后执行方法
      },
      fail(res) {
        //用户拒绝授权后执行
      },
      complete(res) {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              console.log('没有授权')
              wx.openSetting({
              })
            } else {
              //打开选择地址
              console.log(e.currentTarget.dataset)
              return wx.getLocation({//获取当前经纬度
                type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信 
                success: function (res) {
                  wx.openLocation({//​使用微信内置地图查看位置。
                    latitude: parseFloat(e.currentTarget.dataset.lat),//要去的纬度-地址
                    longitude: parseFloat(e.currentTarget.dataset.lng),//要去的经度-地址
                    name: e.currentTarget.dataset.shopname,
                    address: e.currentTarget.dataset.location
                  })
                }
              })
            }
          },
          fail(res) {
            console.log('调用失败')
          }
        })
      }
    })
  },
  saveShowShopId:function(e){
    var id = e.currentTarget.dataset.id
    commen.setValueToStorage("showShopId",id)
    wx.navigateBack(1)
  }
})