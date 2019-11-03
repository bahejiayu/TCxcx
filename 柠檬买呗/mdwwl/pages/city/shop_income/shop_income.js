// pages/city/shop_income/shop_income.js

var app=getApp();
var http=app.config.http;
var shopId;
var page_=1;
Page({

  /**
   * 页面的初始数据
   */
  data: { 

    detail_info:{},
    list_:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    shopId = options.id;
		    page_ = 1
    // 获取分润折扣
    this.get_Detail();
    this.get_list();
  },
  get_Detail:function(){
    var that=this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/agent/shop_profit`, // 仅为示例，并非真实的接口地址
      data: {
        shop_id: shopId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if(res.data.code==1){
            that.setData({
              detail_info:res.data.date
            });
        }
        console.log(res.data)
      }
    })
  },
  get_list:function(){
    var that=this;
    wx.request({
      url: `${http}/home/agent/shop_order_list`, // 仅为示例，并非真实的接口地址
      data: {
        shop_id: shopId,
        page:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            list_: res.data.date
          });
          page_=1;
        }
        console.log(res.data)
      }
    });


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
    this.get_Detail();
    this.get_list();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.showLoading({
      title: '加载更多',
    })
  page_++;
    wx.request({
      url: `${http}/home/agent/shop_order_list`, // 仅为示例，并非真实的接口地址
      data: {
        shop_id: shopId,
        page: page_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          wx.hideLoading();
          if (res.data.date.length<=0){
                wx.showToast({
                  title: '没有更多数据',
                  icon:'none'
                });
                return false;
          }
          that.setData({
            list_: that.data.list_.concat(res.data.date) 
          });
        }
        console.log(res.data)
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})