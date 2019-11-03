// pages/myOrder/myOrder.js
var app = getApp();
var http = app.config.http;
var orderType = 2;
var orderPage = 1;
var shopId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: http,
    nav_index: 0,
    order_list: []
  },
  tog_nav: function(e) {
    this.setData({
      nav_index: e.target.dataset.o
    })
    if (e.target.dataset.o == 0) {
      orderType = 2
    } else {
      orderType = 1
    }
    this.getList(shopId, orderPage, orderType);

  },
  getList: function(shop_id, page, type) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/order/line_up`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid') || "",
        shop_id: shop_id,
        page: page,
        type: type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          orderPage = 1;
          that.setData({
            order_list: res.data.date
          });
        }
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    shopId = options.id;

    this.getList(shopId, orderPage, orderType);

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
    this.getList(shopId, orderPage, orderType);

  },  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that=this;
    wx.showLoading({
      title: '加载更多',
    });
    orderPage++;
    wx.request({
      url: `${http}/home/order/line_up`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid') || "",
        shop_id: shopId,
        page: orderPage,
        type: orderType
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
           
          that.setData({
            order_list: that.data.order_list.concat(res.data.date) 
          });
        }
        console.log(res.data)
      }
    })


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})