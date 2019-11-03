// pages/buy/order_detail/order_detail.js
var app = getApp();
var http = app.config.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.getUserInfo({
      success: function(res) {
        console.log(res)

        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxb7a8c7a427e4c42b&secret=4b66f483adc6a5375e5039e76a6b9825&js_code='+res.code+'&grant_type=authorization_code', // 仅为示例，并非真实的接口地址

        //   header: {
        //     'content-type': 'application/json' // 默认值
        //   },
        //   success(res) {
        //     console.log(res.data)
        //   }
        // })
      }
    })

    wx.login({
      success: function(res) {
        console.log(res)
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxb7a8c7a427e4c42b&secret=4b66f483adc6a5375e5039e76a6b9825&js_code=' + res.code + '&grant_type=authorization_code', // 仅为示例，并非真实的接口地址

        //   header: {
        //     'content-type': 'application/json' // 默认值
        //   },
        //   success(res) {
        //     console.log(res.data)
        //   }
        // })
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