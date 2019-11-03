// pages/shopDetail/shopDetail.js
var app = getApp();
var http = app.config.http;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: http,
    tpUrl: app.myConfig.tpUrl,
    shop_data:{}
  },

  go_Pay: function () {
    var that = this;
    wx.navigateTo({
      url: '../pay/pay?shop_id=' + that.data.shop_data.id,
    })
  },
  bohao:function(e){
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.phone,
        })
  },
  lookAddress: function() {
    var that=this;
    wx.openLocation({
      latitude: parseFloat(that.data.shop_data.lat),
      longitude: parseFloat(that.data.shop_data.lng),
      name: that.data.shop_data.shop_name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      var that=this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `${http}/home/shop/shop_info`, // 仅为示例，并非真实的接口地址
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.code == 1) {
              that.setData({
                shop_data:res.data.date
              });
        }

      }
    });
    console.log(wx.getStorageSync('uid'))
    //  增加店铺访问量
    wx.request({
      url: `${http}/home/index/shop_flow`, // 仅为示例，并非真实的接口地址
      data: {
        shop_id : options.id,
        uid: wx.getStorageSync('uid')||""
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      
       

      }
    });

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