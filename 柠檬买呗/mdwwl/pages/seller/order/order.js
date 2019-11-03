// pages/myOrder/myOrder.js
var app = getApp();
var http = app.config.http;
var page_ = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: http,
    nav_index: 0,
    order_list: [],
  },

  // 封装获取列表数据
  getOrder: function (page) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: `${http}/home/order/shop_order`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid') || "",
        page: page
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
          });
          page_ = 1;
        }

      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		page_ = 1;

    this.getOrder(1);




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
    this.getOrder(1);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    page_++;
    wx.showLoading({
      title: '加载更多',
    });
    var that = this;
    wx.request({
      url: `${http}/home/order/shop_order`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid') || "",
        page: page_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data)
        if (res.data.code == 1) {
          if (res.data.date.length <= 0) {
            wx.showToast({
              title: '没有更多订单',
              icon: 'none'
            });
            return false;
          }
          that.setData({
            order_list: that.data.order_list.concat(res.data.date)
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