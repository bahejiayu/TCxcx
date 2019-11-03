// pages/city/modifyZk/modifyZk.js
var app=getApp();
var http=app.config.http;
var shop_id;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
      shop_data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    shop_id = options.id;

  wx.showLoading({
    title: '加载中',
  });
  var that=this;
    wx.request({
      url: `${http}/home/shop/shop_info`, // 仅为示例，并非真实的接口地址
      data: {
        id: shop_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if(res.data.code==1){
          that.setData({
            shop_data: res.data.date
          });
        }
      }
    })









  },
  subFrom:function(e){
      var data_=e.detail.value;
    data_.uid=wx.getStorageSync('uid');
    data_.shop_id  = shop_id;
    console.log(data_)
    wx.showLoading({
      title: '提交中',
    });
    wx.request({
      url: `${http}/home/agent/save_discount`, // 仅为示例，并非真实的接口地址
      method:"POST",
      data: data_ ,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if(res.data.code==1){
              wx.showToast({
                title: '修改成功',
              });
          setTimeout(function () {
            wx.navigateBack({
              detal: 1
            });

          }, 1500)
        }else{
              wx.showToast({
                title: res.data.msg,
                icon:"none"
              });
        }
        console.log(res.data)
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