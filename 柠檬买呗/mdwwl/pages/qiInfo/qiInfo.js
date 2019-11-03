// pages/qiInfo/qiInfo.js
var app = getApp();
var http = app.config.http;
var page_ = 1;
var shop_id;
var order_id;
var index_;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
    showHb: false,
    all_data: {},
    list: [],
    money_:0
  },
  sure_:function(){
    wx.setStorageSync('tuiIndex', index_);
        wx.navigateBack({
          detal:1
        });
  },
  tui_: function() {
    var that=this;
    wx.showModal({
      title: '退出队列',
      content: '退出分红队列您将获得双倍消费红包',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.showLoading({
            title: '退出中',
          })
          wx.request({
            url: `${http}/home/user/change_hongbao`, // 仅为示例，并非真实的接口地址
            data: {
              uid :wx.getStorageSync('uid'),
              order_id: order_id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data);
                if(res.data.code==1){
                          wx.hideLoading();
                    that.setData({
                      money_: res.data.money,
                      showHb:true
                    });
                }else{
                      wx.showToast({
                        title: res.data.msg,
                        icon:'none'
                      })
                }


            }
          })



        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		    page_ = 1
    shop_id = options.shopid;
    order_id = options.id;
    index_ = options.index;

    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: `${http}/home/order/order_bonus_info`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        shop_id: options.shopid,
        order_id: options.id,
        page: 1

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            all_data: res.data.date,
            list: res.data.date.list
          });
        }
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
    page_++;
    wx.showLoading({
      title: '加载更多',
    })
    var that = this;
    wx.request({
      url: `${http}/home/order/order_bonus_info`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        shop_id: shop_id,
        order_id: order_id,
        page: page_

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          console.log(that.data.list);
          if (res.data.date.list.length <= 0) {
            wx.showToast({
              title: '没有更多队列',
              icon: 'none'
            });
            return false;

          }
          that.setData({
            list: that.data.list.concat(res.data.date.list)
          });
        }
        console.log(res.data)
      }
    });


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})