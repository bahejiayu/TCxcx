// pages/keFu/keFu.js
var app=getApp();
var http=app.config.http;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: "w",
    questionList:[],
    keInfo:''
  },
  boHao:function(){
    var that=this;
    wx.makePhoneCall({
      phoneNumber:that.data.keInfo[0] // 仅为示例，并非真实的电话号码
    })
  },
  togContent: function(e) {
    if (e.currentTarget.dataset.index == this.data.curIndex) {
      this.setData({
        curIndex: 'w'
      });
    } else {
      this.setData({
        curIndex: e.currentTarget.dataset.index
      });
    }

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
      url: `${http}/home/Article/news_list`, // 仅为示例，并非真实的接口地址
      data: {
        type: 3
  
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);

        if (res.data.code == 1) {
          that.setData({
            questionList: res.data.date
          });
        }


      }
    });


    wx.request({
      url: `${http}/home/Article/index`, // 仅为示例，并非真实的接口地址
      data: {
        type:5
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
              that.setData({
                keInfo:res.data.date
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