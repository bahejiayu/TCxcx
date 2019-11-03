// pages/seller/ModifiPay/ModifiPay.js
var app=getApp();
var http=app.config.http;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoValue:{}
  },
  submit:function(e){
    var fomrData = e.detail.value;
    fomrData.uid = wx.getStorageSync('uid');
    wx.showLoading({
      title: '修改中',
    })
    wx.request({
      url: `${http}/home/shop/pro_edit`, // 仅为示例，并非真实的接口地址
      data: fomrData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '修改成功',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/shop/basic_data`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            infoValue: res.data.date
          })
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