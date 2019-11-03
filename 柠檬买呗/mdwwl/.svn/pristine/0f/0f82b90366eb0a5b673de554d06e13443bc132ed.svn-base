// pages/city/auditing/auditing.js
var app = getApp();
var http = app.config.http;
var page_ = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: "",
    list_: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.get_data();
    page_ = 1;
  },
  getKey: function(e) {
    this.setData({
      keyWord: e.detail.value
    });
  },
  searchBtn: function(e) {
    var that = this;
    this.setData({
      keyWord: e.detail.value.key
    });
    // if (that.data.keyWord == '') {
    //   wx.showToast({
    //     title: '请输入搜索关键字',
    //     icon: 'none'
    //   });
    //   return false;
    // };
    this.get_data();

  },
  get_data: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `${http}/home/agent/wait_shop`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        shop_name: that.data.keyWord,
        page: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          that.setData({
            list_: res.data.date
          });
          page_ = 1;
        }
      }
    });
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
    var that=this;
    wx.request({
      url: `${http}/home/agent/wait_shop`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        shop_name: that.data.keyWord,
        page: page_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          that.setData({
            list_: res.data.date
          });
        }
      }
    });
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
    this.setData({
      keyWord: ''
    });
    this.get_data();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that=this;
    wx.showLoading({
      title: '加载中',
    });
    page_++;
    wx.request({
      url: `${http}/home/agent/wait_shop`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        shop_name: that.data.keyWord,
        page: page_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.code == 1) {
          if (res.data.date.length <= 0) {
            wx.showToast({
              title: '没有更多数据',
              icon: 'none'
            });
            return false;
          }
          that.setData({
            list_: that.data.list_.concat(res.data.date)
          });
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})