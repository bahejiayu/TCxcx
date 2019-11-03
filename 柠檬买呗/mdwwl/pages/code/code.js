// pages/code/code.js
var app = getApp();
var http = app.config.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,

  },
  saoma: function() {
    wx.scanCode({
      success(res) {
        if (res) {
            console.log(res)
            return false;

          if (!res.path || res.path.indexOf("pay/pay") == -1) {
            wx.showToast({
              title: '无法识别二维码',
              icon: 'none'
            })
            return false
          }
          console.log(111)
          wx.navigateTo({
            url: '/' + res.pathd
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

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