// pages/retail/invite_code/invite_code.js
var app = getApp();
var http = app.config.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
    code_: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/user/user_info`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            code_: res.data.date
          });
        }
      }
    })
  },
  saveImg: function(e) {
    var _this = this;

    console.log("长按");
    var imgUrl = http + _this.data.code_.share_qrcode; //图片地址
    wx.showLoading({
      title: '请稍等',
    })
    wx.downloadFile({ //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
      url: imgUrl,
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        // 下载成功后再保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath, //返回的临时文件路径，下载后的文件会存储到一个临时文件
          success: function(res) {
            wx.showToast({
              title: '图片已保存到本地',
              icon: 'none'
            })

          }
        });
      }
    })
  },
  copy_code: function() {
    var that = this;
    wx.setClipboardData({
      data: that.data.code_.share_code,
      success(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'none'
        })
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
    return {
      title: '柠檬买呗',
      desc: '有福同享,真壕友',
      path: '/pages/index/index?share_code=' + this.data.code_.share_code
    }

  }
})