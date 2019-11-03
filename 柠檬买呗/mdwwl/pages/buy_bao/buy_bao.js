// pages/buy_bao/buy_bao.js
var app=getApp();
var http=app.config.http;
var flag_;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
    txt_:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    flag_=true;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/Article/index`, // 仅为示例，并非真实的接口地址
      data: {
        type: 9,
        uid:wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data)

        if (res.data.code == 1) {
            that.setData({
              txt_: res.data.date.openshop_info.split(','),
              total_price: res.data.date.qr_code_money,
              is_sq: res.data.date.level,
              is_gm: res.data.date.vip
            })
        }
      }
    })
  },
  pay_: function () {
    var that = this;
    if(flag_==false){
        return false;
    };
    flag_=false;
    wx.request({
      url: `${http}/home/api/add_qr_order`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
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
                setTimeout(()=>{
                  wx.redirectTo({
                    url:'../seller/setUpShop/setUpShop'
                        });
                        

                },1500)
            },
            fail(res) {
              flag_=true;
              wx.showToast({
                title: '支付失败',
                icon: 'none'
              })

            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }

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