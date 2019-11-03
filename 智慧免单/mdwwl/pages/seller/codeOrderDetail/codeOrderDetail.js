// pages/seller/codeOrderDetail/codeOrderDetail.js
var app=getApp();
var http=app.config.http;
var page_=1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
    myClass:{},
    allClass:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    // 获取我的排队
    wx.request({
      url: `${http}/home/order/qrcode_order_list`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        type:2
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            myClass: res.data.date
          })
        }
      }
    });

    this.get_all();

  },
  // 封装获取所有排队
  get_all:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that=this;
    wx.request({
      url: `${http}/home/order/qrcode_order_list`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        type: 1,
        page:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          that.setData({
            allClass: res.data.date
          });
          page_=1;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.get_all();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.showLoading({
      title: '加载更多',
    });
    page_++;
    wx.request({
      url: `${http}/home/order/qrcode_order_list`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        type: 1,
        page: page_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            allClass: that.data.allClass.concat(res.data.date)
          });
       
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})