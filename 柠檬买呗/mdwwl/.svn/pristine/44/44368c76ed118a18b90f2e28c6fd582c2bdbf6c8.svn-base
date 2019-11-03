// pages/seller/withdrawalCenter/withdrawalCenter.js
var app = getApp();
var http = app.config.http;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    left: 0,
    order_list: [],
    infoData:{}
  },
  tog_nav: function(e) {
    console.log(e)
    var that=this;
    this.setData({
      left: e.currentTarget.dataset.index * 33
    });
    console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index == 0) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: `${http}/home/order/tixian_order`, // 仅为示例，并非真实的接口地址
        data: {
          uid: wx.getStorageSync('uid')
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading();
          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.date
            })
          }
          console.log(res.data)
        }
      })
    } else if (e.currentTarget.dataset.index == 1) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: `${http}/home/shop/tixian_list`, // 仅为示例，并非真实的接口地址
        data: {
          uid: wx.getStorageSync('uid'),
          state: 0
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading();
          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.date
            })
          }
          console.log(res.data)
        }
      })

    }else{
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: `${http}/home/shop/tixian_list`, // 仅为示例，并非真实的接口地址
        data: {
          uid: wx.getStorageSync('uid'),
          state: 1
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading();
          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.date
            })
          }
          console.log(res.data)
        }
      })

    }




  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: `${http}/home/shop/basic_data`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
          if(res.data.code==1){
              that.setData({
                infoData:res.data.date
              })
          }
      }
    });

    // 获取待提现列表
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/order/tixian_order`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            order_list: res.data.date
          })
        }
        console.log(res.data)
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
    var that=this;
    if (that.data.left == 0) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: `${http}/home/order/tixian_order`, // 仅为示例，并非真实的接口地址
        data: {
          uid: wx.getStorageSync('uid')
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.date
            })
          }
          console.log(res.data)
        }
      })
    } else if (that.data.left == 33) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: `${http}/home/shop/tixian_list`, // 仅为示例，并非真实的接口地址
        data: {
          uid: wx.getStorageSync('uid'),
          state: 0
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading();
          wx.stopPullDownRefresh();

          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.date
            })
          }
          console.log(res.data)
        }
      })

    } else {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: `${http}/home/shop/tixian_list`, // 仅为示例，并非真实的接口地址
        data: {
          uid: wx.getStorageSync('uid'),
          state: 1
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading();
          wx.stopPullDownRefresh();

          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.date
            })
          }
          console.log(res.data)
        }
      })

    }

    wx.request({
      url: `${http}/home/shop/basic_data`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            infoData: res.data.date
          })
        }
      }
    });
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