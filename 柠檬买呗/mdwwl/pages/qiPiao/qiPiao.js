// pages/qiPiao/qiPiao.js
var list = []
list.length = 200;
var app = getApp();
var http = app.config.http;
var page_=1;
var status_=2;
var shopId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_index: 0,
    listY: list,
    orderList:[],
    success_:true,
    success_index:0

  },
  goDetail: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url

    })
  },
  tog_nav: function(e) {
    this.setData({
      nav_index: e.target.dataset.o
    })
    if (e.target.dataset.o==0){
      status_=2
      }else{
      status_ = 1

      }

    this.get_list(status_,1)
  },
  get_list: function(status, page) {
    wx.showLoading({
      title: '加载中',
    });
    var that=this;
   
    wx.request({
      url: `${http}/order/order_bonus_list_detailed`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        r_status: status,
        page: page,
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
              orderList:res.data.date,
              success_index: that.data.nav_index
            });
        page_=1;
      }
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		    page_ = 1;
    status_=2;
    shopId = options.id;
    this.get_list(2,1)
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
    this.get_list(2, 1)
  
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
    this.get_list(status_, 1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    page_++;
    wx.showLoading({
      title: '加载更多',
    });
    var that = this;
    wx.request({
      url: `${http}/order/order_bonus_list_detailed`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        r_status: status_,
        page: page_,
        shop_id: shopId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          if (res.data.date.length<=0){
                      wx.showToast({
                        title: '没有更多数据',
                        icon:'none'
                      });
                      return false;
              }

          that.setData({
            orderList: that.data.orderList.concat(res.data.date) 
          })
        }
        console.log(res.data)
      }
    })








  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})