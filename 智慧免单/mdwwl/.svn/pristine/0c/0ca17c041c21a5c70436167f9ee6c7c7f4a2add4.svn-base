// pages/verification/verification.js
var app = getApp();
var http = app.config.http;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone_: '',
    codeTxt: '获取验证码',
    code: ""
  },
  getCode: function(e) {
    this.setData({
      code: e.detail.value
    });
  },
  getPhone: function(e) {
    this.setData({
      phone_: e.detail.value
    });
  },
  sureBtn: function() {
    var that=this;
    if (that.data.phone_ == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return false;
    }
    if (that.data.code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return false;
    }
    wx.showLoading({
      title: '绑定中',
    })
    wx.request({
      url: `${http}/home/user/bind_phone`, // 仅为示例，并非真实的接口地址
      data: {
        phone: that.data.phone_,
        code: that.data.code,
        uid:wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
          if(res.data.code==1){
                  wx.showToast({
                    title: '绑定成功',
                  });
            setTimeout(()=>{
                  wx.navigateBack({
                    delta:1
                  })

            },1500)


          }else{
                wx.showToast({
                  title: res.data.msg,
                  icon:'none'
                })
          }

      }
    })



  },
  codeBtn: function() {
    var that = this;
    if (that.data.codeTxt != '获取验证码') {
      return false;
    }


    if (that.data.phone_ == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return false;
    }
    wx.showLoading({
      title: '正在发生验证码',
      icon: 'none'
    })
    wx.request({
      url: `${http}/home/user/send_code`, // 仅为示例，并非真实的接口地址
      data: {
        phone: that.data.phone_,
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '短信验证码已发送',
            icon: 'none'
          })
          var min_ = 60;
          var dsq;
          dsq = setInterval(function() {
            if (min_ == 0) {
              clearInterval(dsq);
              that.setData({
                codeTxt: '获取验证码'
              })
              return false;
            }
            min_--;
            that.setData({
              codeTxt: `${min_}s后重新获取`
            })



          }, 1000)

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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