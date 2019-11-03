// pages/feedback/feedback.js
var app = getApp();
var http = app.config.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Cindex: 0,
    trimValue: "",
    strLength:0
  },
  getLength:function(e){
      this.setData({
        strLength:e.detail.value.length
      });
  },
  togStyle: function(e) {
    this.setData({
      Cindex: e.target.dataset.index
    })
  },
  subFrom: function(e) {
    var that = this;
    console.log(e.detail.value);
    var fromData = e.detail.value;
    if (fromData.msg == '') {
      wx.showToast({
        title: '请填写反馈',
        icon: 'none'
      });
      return false;
    }

    if (!wx.getStorageSync('uid')) {
      wx.showToast({
        title: '用户未登录',
        icon: 'none'
      });
      return false;
    }
    // var type_;
    // if (that.data.Cindex == 0) {
    //   type_ = '咨询';
    // } else if (that.data.Cindex == 1) {
    //   type_ = '建议';
    // } else {
    //   type_ = '其他';
    // }
    // fromData.type = type_;
    fromData.uid = wx.getStorageSync('uid');

    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: `${http}/home/Article/feedback`, // 仅为示例，并非真实的接口地址
      method: "POST",
      data: fromData,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            trimValue: "",
            strLength:0
          })
          wx.showToast({
            title: '提交成功',
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
  onLoad: function(options) {

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