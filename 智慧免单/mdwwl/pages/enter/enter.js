// pages/enter/enter.js
var app = getApp();
var http = app.config.http;


Page({

  /**
   * 页面的初始数据
   */
  data: {
      trimValue:''
  },
  formSubmit4: function(e) {
    console.log(e)
    var that=this;
    var fomrData = e.detail.value;
    if (fomrData.lx_name == '') {
      wx.showToast({
        title: '请输入您的称呼',
        icon: 'none'
      });
      return false;
    }
    if (fomrData.lx_phone == '') {
      wx.showToast({
        title: '请输入您的联系方式',
        icon: 'none'
      });
      return false;
    }

    if (fomrData.shop_name == '') {
      wx.showToast({
        title: '请输入店铺名称',
        icon: 'none'
      });
      return false;
    }
    if (fomrData.address == '') {
      wx.showToast({
        title: '请输入店铺详细地址',
        icon: 'none'
      });
      return false;
    }
    fomrData.uid = wx.getStorageSync('uid');
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: `${http}/home/shop/add_shop`, // 仅为示例，并非真实的接口地址
      data: fomrData,
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
            that.setData({
              trimValue:""
            })
          wx.showModal({
            title: '提示',
            content: '提交成功,请耐心等待申请结果',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.navigateBack({
                    delta:1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }else{
              wx.showToast({
                title: res.data.msg,
                icon:'none'
              })
        }
        console.log(res.data)
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