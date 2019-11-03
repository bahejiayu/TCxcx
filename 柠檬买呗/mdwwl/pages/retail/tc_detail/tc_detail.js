// pages/getCenter/getCenter.js
var app = getApp();
var http = app.config.http;
var page_ = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 1,
    detailInfo: {},
    fr_list: [],
    tx_list: []
  },
  btnOnce: function() {
    wx.navigateTo({
      url: '../getMoney/getMoney',
    })
  },
  togNav: function(e) {
    var that = this;
    this.setData({
      navIndex: e.currentTarget.dataset.index
    });


    that.gettx();

  },


  gettx: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/vip/tixian_list`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
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
            tx_list: res.data.date
          });
          page_ = 1;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		page_ = 1;

    this.gettx();
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
    var that = this;

    that.gettx();



  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    page_++;
    wx.showLoading({
      title: '加载更多',
    });
    if (that.data.navIndex == 0) {
      wx.request({
        url: `${http}/home/vip/tixian_list`, // 仅为示例，并非真实的接口地址
        data: {
          uid: wx.getStorageSync('uid'),
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
              fr_list: that.data.fr_list.concat(res.data.date)
            })
          }
        }
      })
    } else {
      wx.request({
        url: `${http}/home/vip/tixian_list`, // 仅为示例，并非真实的接口地址
        data: {
          uid: wx.getStorageSync('uid'),
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
              tx_list: that.data.tx_list.concat(res.data.date)
            })
          }
        }
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})