// pages/retail/settlement/settlement.js
var app=getApp();
var http=app.config.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http
  },
  go_getnow:function(){
        wx.navigateTo({
          url: '../getMoney/getMoney',
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_money();
  },
  get_money:function(){
    var that = this;
    wx.request({
      url: `${http}/home/user/user_info`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
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
            data_: res.data.date
          });
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
    this.get_money();

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