// pages/retail/income/income.js
var app = getApp();
var http = app.config.http;
var today;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['按日期', '按月份'],
    yao_txt: "按日期",
    fields: 'day',
    date: "",
    chk_date: "请选择",
    all: false,
    today_: {},
    cha_data: {}
  },
  bindPickerChange: function(e) {
    var that = this;
    console.log(e.detail.value)
    this.setData({
      yao_txt: that.data.array[e.detail.value],
      chk_date: "请选择",
      cha_data:{}
    });

    if (that.data.yao_txt == '按日期') {
      that.setData({
        fields: 'day'
      })
    } else {
      that.setData({
        fields: 'month'
      })
    }
  },
  bindDateChange: function(e) {
    console.log(e)
    console.log(e.detail.value);
    this.setData({
      chk_date: e.detail.value
    });
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: `${http}/home/vip/appoint_manage_info`, // 仅为示例，并非真实的接口地址
      data: {
        type: that.data.yao_txt == '按日期' ? 2 : 1,
        time: that.data.chk_date,
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            cha_data: res.data.date
          });
        }
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type == 'all') {
      this.setData({
        all: true
      })
    }
    var date_ = new Date();
    console.log(date_.getFullYear(), date_.getMonth() + 1, date_.getDate())
    this.setData({
      date: `${date_.getFullYear()}-${date_.getMonth() + 1}-${date_.getDate()}`
      // chk_date: `${date_.getFullYear()}-${date_.getMonth() + 1}-${date_.getDate()}`
    });
    today = this.data.date;
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/vip/appoint_manage_info`, // 仅为示例，并非真实的接口地址
      data: {
        type: 2,
        time: today,
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            today_: res.data.date
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