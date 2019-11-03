// pages/myOrder/myOrder.js
var app = getApp();
var http = app.config.http;
var orderType = 2;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: http,
    nav_index: 0,
    order_list: [],
  },
  tog_nav: function (e) {
    
  },
  goOrder: function (e) {
   

  },
  // 封装获取列表数据
  getOrder: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: `${http}/home/order/order_bonus_list`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid') || "",
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data)
        if (res.data.code == 1) {
          wx.stopPullDownRefresh();
          that.setData({
            order_list: res.data.date
          })
        }

      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder();




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
    this.getOrder();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})