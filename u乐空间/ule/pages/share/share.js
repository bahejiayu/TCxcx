const request = require('../../utils/request');
const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"",
    backpic:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    commen.getSetConfig((setInfo) => {
      console.log(setInfo)
      //生成二维码
      var data = {}
      request({
        url: API.getCreateTwoIndex(),
        method: 'POST',
        data: {
          page: 'pages/home/home',
          sc: "pId:" + options.userId,
          tag: "S"
        },
        success: function (res) {
          //let src = 'data:image/jpeg;base64,' + res.data.data;
          let src = API.getSERVERURI() + res.data.data;
          console.log(API.getSERVERURI() + setInfo.shareBackPic)
          self.setData({
            src: src,
            backpic: API.getSERVERURI() + setInfo.shareBackPic
          })
          wx.hideLoading();
        }
      })
    })
  },
  showPic: function () {
    wx.previewImage({
      urls: [this.data.src]
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