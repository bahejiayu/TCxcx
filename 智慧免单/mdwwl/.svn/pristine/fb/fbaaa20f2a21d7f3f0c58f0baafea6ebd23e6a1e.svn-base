// pages/myOrder/myOrder.js
var app = getApp();
var http = app.config.http;
var messageType = 1;
var messagePage = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_index: 0,
    message_list: []

  },
  tog_nav: function (e) {
    this.setData({
      nav_index: e.target.dataset.o
    })
    if (e.target.dataset.o == 0) {
      messageType = 1
    } else {
      messageType = 2

    }
    this.getMessage(messageType, messagePage);

  },
  getMessage: function (type, page) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/Article/news_list`, // 仅为示例，并非真实的接口地址
      data: {
        type: type,
        page: page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data);

        if (res.data.code == 1) {
          messagePage = 1;
          that.setData({
            message_list: res.data.date
          });
        }


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessage(messageType, messagePage);
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
    this.getMessage(messageType, messagePage);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载更多',
    });
    var that = this;
    messagePage++;

    wx.request({
      url: `${http}/home/Article/news_list`, // 仅为示例，并非真实的接口地址
      data: {
        type: messageType,
        page: messagePage
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data);

        if (res.data.code == 1) {
          if (res.data.date.length <= 0) {
            wx.showToast({
              title: '没有更多数据',
              icon: 'none'
            })
          }
          that.setData({
            message_list: that.data.message_list.concat(res.data.date)
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