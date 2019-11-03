// pages/pay/pay.js
var app = getApp();
var http = app.config.http;
var shopId;
var hashb = '0.00';
var zk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
    ag: true,
    shopInfo: {},
    hbdk: 0,
    xzf: 0,
    payMoney: '',
    hbTog: false
  },
  goxy: function () {
    wx.navigateTo({
      url: '../write/write?title=付款前协议&type=7',
    })
  },
  getHb: function () {
    var that = this;
    if (that.data.hbTog) {
      wx.request({
        url: `${http}/home/user/deduction_money`, // 仅为示例，并非真实的接口地址
        data: {
          uid: wx.getStorageSync('uid'),
          shop_id: shopId,
          money: that.data.payMoney
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          that.setData({
            hbdk: res.data.date.beat_money,
            xzf: res.data.date.money
          });
        }
      })
    } else {
      that.setData({
        hbdk: 0,
        xzf: that.data.payMoney
      });

    }


  },

  tog_hb: function () {
    var that = this;
    this.setData({
      hbTog: !that.data.hbTog,
    })
    that.getHb();

  },
  get_txt: function (e) {
    var that = this;



    this.setData({
      payMoney: e.detail.value,
    });
    that.getHb();

  },
  togRad: function () {
    console.log(1)
    var that = this;
    this.setData({
      ag: !that.data.ag
    })
  },
  payBtn: function () {

    var that = this;
    if (that.data.ag == false) {
      wx.showToast({
        title: '请勾选付款协议',
        icon: 'none'
      });
      return false;
    }

    if (that.data.payMoney == '') {
      wx.showToast({
        title: '请输入支付金额',
        icon: 'none'
      });
      return false;
    }
    var is_de;
    if (that.data.hbTog) {
      is_de = 1
    } else {
      is_de = ''
    }
    console.log(that.data.payMoney)
    wx.request({
      url: `${http}/home/api/add_order`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid'),
        shop_id: shopId,
        money: that.data.payMoney,
        is_deduction: is_de
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          wx.requestPayment({
            timeStamp: res.data.date.timeStamp,
            nonceStr: res.data.date.nonceStr,
            package: res.data.date.package,
            signType: res.data.date.signType,
            paySign: res.data.date.paySign,
            success(res) {
              wx.showToast({
                title: '支付成功',
              });
              setTimeout(function () {
            
                wx.switchTab({
                  url: '../index/index'
                });
              }, 1500)




            },
            fail(res) {
              wx.showToast({
                title: '支付失败',
                icon: 'none'
              })

            }
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
  goxy: function () {
    wx.navigateTo({
      url: '../write/write?title=付款前协议&type=8',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    shopId = options.shop_id;

    if (!wx.getStorageSync('uid')) {
      wx.reLaunch({
        url: '../login/login?shop_id=' + shopId
      })
    }


    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/shop/shop_info`, // 仅为示例，并非真实的接口地址
      data: {
        id: shopId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            shopInfo: res.data.date
          });
          zk = that.data.shopInfo.max_deduction / 100;
        }

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