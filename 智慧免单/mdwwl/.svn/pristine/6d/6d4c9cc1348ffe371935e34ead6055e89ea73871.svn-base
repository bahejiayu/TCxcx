// pages/seller/goodsList/goodsList.js
var app = getApp();
var http = app.config.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
    goods_list: []
  },
  gobj: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  del_goods: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: `确定要将商品“${e.currentTarget.dataset.title}”删除`,
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除',
          })
          wx.request({
            url: `${http}/home/item/del_item`, // 仅为示例，并非真实的接口地址
            data: {
              uid: wx.getStorageSync('uid'),
              item_id: e.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
              if (res.data.code == 1) {
                wx.showToast({
                  title: '删除成功',
                })
                that.getList();
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
              console.log(res.data)
            }
          })



        } else if (res.cancel) { }
      }
    })
  },
  addShop: function () {
    wx.navigateTo({
      url: '../addGoods/addGoods',
    })
  },
  getList: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: `${http}/home/item/item_list`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          that.setData({
            goods_list: res.data.date
          });
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    this.getList();

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
    this.getList();

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