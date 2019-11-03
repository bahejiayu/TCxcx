// pages/seller/ManagementInfo/ManagementInfo.js
var app = getApp();
var http = app.config.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInof: {},
    toDay: '',
    startDate: "请选择",
    endDate: "请选择",
    cx_info:{}
  },
  bindDateChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      startDate: e.detail.value
    });
    this.cx_info();

  },
  bindDateChange2: function(e) {
    console.log(e.detail.value);
    this.setData({
      endDate: e.detail.value
    });
    this.cx_info();
  },
  cx_info: function() {
    var that = this;
    if (that.data.startDate == '请选择' || that.data.endDate == '请选择') {
      return false;
    }

    wx.request({
      url: `${http}/home/shop/appoint_manage_info`, // 仅为示例，并非真实的接口地址
      data: {
        beginToday: that.data.startDate,
        endToday: that.data.endDate,
        uid:wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
            if(res.data.code==1){
                  that.setData({
                    cx_info:res.data.date
                  })
            }
      }
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getInfo();
    var toDay = new Date();
    this.setData({
      toDay: `${toDay.getFullYear()}-${toDay.getMonth()+1}-${toDay.getDate()}`
    })


  },
  getInfo: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/shop/manage_info`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            shopInof: res.data.date
          });
        }
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
    this.getInfo();
    this.setData({
      startDate: "请选择",
      endDate: "请选择",
      cx_info: {}
    })
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