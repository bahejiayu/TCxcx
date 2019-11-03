// pages/login/login.js
var app = getApp();
var http = app.config.http;
var tgl = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  LoginBtn: function(e) {
    console.log(e)
    var that = this;
    var userInfo = e.detail.userInfo;
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    if (!userInfo) {
      return false;
    }
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res);
          wx.showLoading({
            title: '登录中',
          })
          wx.request({
            url: `${http}/home/index/register`, // 仅为示例，并非真实的接口地址
            data: {
              encryptedData: encryptedData,
              iv:iv,
              js_code: res.code,
              userInfo: userInfo,
              wxname: userInfo.nickName,
              wximg: userInfo.avatarUrl,
              tj_id: tgl||""
              // share_code: wx.getStorageSync('share_code')||""
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
              console.log(res.data);
              if (res.data.code == 1) {
                console.log(res.data.date.userInfo)
                wx.setStorageSync('token', userInfo);
                wx.setStorageSync('uid', res.data.date.id);
                that.setData({
                  userInfo: userInfo
                })
                if (wx.getStorageSync('share_code')){
                  wx.removeStorageSync('share_code')
                }
                if (tgl) {
                  wx.reLaunch({
                    url: '../pay/pay?shop_id=' + tgl
                  })

                } else {
                  wx.switchTab({
                    url: '../userCenter/userCenter'
                  })
                }


              } else {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
              }

            }
          })



        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    if (options.shop_id) {
      tgl = options.shop_id

    }
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