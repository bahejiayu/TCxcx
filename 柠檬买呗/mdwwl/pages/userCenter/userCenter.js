// pages/userCenter/userCenter.js
var app = getApp();
var http = app.config.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    moneyData: null,
    phone: ""
  },
  boHao: function() {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone // 仅为示例，并非真实的电话号码
    })
  },
  go_enter: function() {
    console.log(this.data.moneyData);
    var that = this;
    var my_data = this.data.moneyData;
    if (my_data.vip == 0) {
      wx.navigateTo({
        url: '../buy_bao/buy_bao',
      });
    } else if (my_data.vip == 1 && my_data.level == 1) {
      wx.navigateTo({
        url: '../seller/setUpShop/setUpShop',
      });
    } else if (my_data.vip == 1 && my_data.level == 2) {

      wx.navigateTo({
        url: '../buy_bao/buy_bao',
      });
    }


  },
  goVerif: function() {

    if (!wx.getStorageSync('uid')) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
    }

    if (!this.data.moneyData.phone) {
      wx.navigateTo({
        url: '../verification/verification',
      })
    }

  },
  LoginBtn: function(e) {
    console.log(e)
    var that = this;
    var userInfo = e.detail.userInfo;
    if (!userInfo) {
      return false;
    }
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res);
          wx.showLoading({
            title: '登录中',
          })
          wx.request({
            url: `${http}/home/index/register`, // 仅为示例，并非真实的接口地址
            data: {
              js_code: res.code,
              userInfo: userInfo,
              wxname: userInfo.nickName,
              wximg: userInfo.avatarUrl
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
              console.log(res.data);
              if (res.data.code == 1) {
                console.log(res.data.date.userInfo)
                wx.setStorageSync('token', userInfo);
                wx.setStorageSync('uid', res.data.date.id);
                that.setData({
                  userInfo: userInfo
                })
                that.getMoneyData();

              } else {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
              }

            }
          })



        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },
  getMoneyData: function() {
    var that = this;
    wx.request({
      url: `${http}/home/user/index`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          that.setData({
            moneyData: res.data.date
          });
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    if (wx.getStorageSync('token')) {
      that.setData({
        userInfo: wx.getStorageSync('token')
      })
      this.getMoneyData();
    } else {

      wx.reLaunch({
        url: '../login/login'
      })
    };



    // 获取加盟热线
    wx.request({
      url: `${http}/home/Article/index`, // 仅为示例，并非真实的接口地址
      data: {
        type: 4
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            phone: res.data.date
          })
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
    var that = this
    if (wx.getStorageSync('token')) {

      this.getMoneyData();
    }

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
    this.getMoneyData();

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