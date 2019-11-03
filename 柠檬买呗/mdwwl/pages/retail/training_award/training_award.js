// pages/seller/ManagementInfo/ManagementInfo.js
var app = getApp();
var http = app.config.http;
var page_ = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInof: {},
    toDay: '',
    startDate: "请选择",
    endDate: "请选择",
    cx_info: {},
    time_module: false,
    time_txt: "全部",
    zdy_: 'k',
    down_time: "自定义时间",
    record_list: [],
    other_info: {}
  },
  get_record: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });



    wx.request({
      url: `${http}/home/vip/jintie_list`, // 仅为示例，并非真实的接口地址
      data: {
        time: that.data.time_txt,
        uid: wx.getStorageSync('uid'),
        page: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.code == 1) {
          page_ = 1;
          that.setData({
            record_list: res.data.date.list,
            other_info: res.data.date
          });
        }
      }
    })


  },
  tog_txt: function (e) {
    this.setData({
      time_txt: e.currentTarget.dataset.txt,
      down_time: "自定义时间"

    })
    this.get_record();

    page_ = 1;
  },
  tog_zdy: function (e) {
    this.setData({
      zdy_: e.currentTarget.dataset.type
    })
  },
  cha_time: function () {
    this.setData({
      zdy_: 'k',
      time_module: true,
      startDate: "请选择",
      endDate: "请选择",
    })
  },
  close_timeModule: function () {
    this.setData({
      time_module: false
    })
  },
  bindDateChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      startDate: e.detail.value
    });
    var that = this;
    if (this.data.startDate != '请选择' && this.data.endDate != '请选择') {
      this.setData({
        time_module: false,
        down_time: `${that.data.startDate}到${that.data.endDate}`,
        time_txt: `${that.data.startDate}到${that.data.endDate}`
      });
      page_ = 1;
      this.get_record();

    }

  },
  bindDateChange2: function (e) {
    console.log(e.detail.value);
    this.setData({
      endDate: e.detail.value
    });
    var that = this;
    if (this.data.startDate != '请选择' && this.data.endDate != '请选择') {
      this.setData({
        time_module: false,
        down_time: `${that.data.startDate}到${that.data.endDate}`,
        time_txt: `${that.data.startDate}到${that.data.endDate}`
      })
      this.get_record();

      page_ = 1;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		page_ = 1;

    var toDay = new Date();
    this.setData({
      toDay: `${toDay.getFullYear()}-${toDay.getMonth() + 1}-${toDay.getDate()}`
    })
    this.get_record();

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
  onReachBottom: function () {
    page_++;
    var that = this;
    wx.showLoading({
      title: '加载更多',
    })
    wx.request({
      url: `${http}/home/vip/jintie_list`, // 仅为示例，并非真实的接口地址
      data: {
        time: that.data.time_txt,
        uid: wx.getStorageSync('uid'),
        page: page_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.code == 1) {
          if (res.data.date.list.length <= 0) {
            wx.showToast({
              title: '没有更多数据',
              icon: 'none'
            });
            return false;
          }
          that.setData({
            record_list: that.data.record_list.concat(res.data.date.list),
            other_info: res.data.date
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