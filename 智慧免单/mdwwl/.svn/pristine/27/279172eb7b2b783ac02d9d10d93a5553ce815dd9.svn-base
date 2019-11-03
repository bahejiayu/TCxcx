// // pages/seller/Free sheet/Free sheet.js
var app = getApp();
var http = app.config.http;
var shopId;
var speed_=1000;

import NumberAnimate from "../../../utils/util.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Findex: 0,
    shopInfo: {},
    num1: 0.00,
    num2:0.00,
    num3: 0,
    keInfo:{}
  },

  boHao: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.keInfo[0] // 仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    shopId = options.id
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: `${http}/home/shop/index`, // 仅为示例，并非真实的接口地址
      data: {
        uid:wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            shopInfo: res.data.date
          })
          that.setData({
            num1: '',
            num2: '',
            num3: '',
          });

          let num1 = that.data.shopInfo.month_turnover;
          let n1 = new NumberAnimate({
            from: num1, //开始时的数字
            speed: speed_, // 总时间
            refreshTime: 100, //  刷新一次的时间
            decimals: 2, //小数点后的位数
            onUpdate: () => { //更新回调函数
              that.setData({
                num1: n1.tempValue
              });
            },
            onComplete: () => { //完成回调函数
              that.setData({
                num1Complete: " 完成了"
              });
            }
          });

          let num2 = that.data.shopInfo.turnover;
          let n2 = new NumberAnimate({
            from: num2,
            speed: speed_,
            decimals: 2,
            refreshTime: 100,
            onUpdate: () => {
              that.setData({
                num2: n2.tempValue
              });
            },
            onComplete: () => {
              that.setData({
                num2Complete: " 完成了"
              });
            }
          });

          let num3 = that.data.shopInfo.order_number; 
          let n3 = new NumberAnimate({
            from: num3,
            speed: speed_,
            refreshTime: 100,
            decimals: 0,
            onUpdate: () => {
              that.setData({
                num3: n3.tempValue
              });
            },
            onComplete: () => {
              that.setData({
                num3Complete: " 完成了"
              });
            }
          });
        }
      }
    })

      // 获取客服电话
    wx.request({
      url: `${http}/home/Article/index`, // 仅为示例，并非真实的接口地址
      data: {
        type: 5
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            keInfo: res.data.date
          })
        }
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: `${http}/home/shop/index`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            num1: res.data.date.month_turnover,
            num2: res.data.date.turnover,
            num3: res.data.date.order_number,
            shopInfo: res.data.date

          })
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})