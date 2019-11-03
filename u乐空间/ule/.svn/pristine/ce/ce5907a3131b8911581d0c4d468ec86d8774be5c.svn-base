const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    orderInfo:null,
    orderId:null,
    userId:null,
    loginUser:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = commen.getValueInStorage('userInfo');
    this.setData({
      orderId: options.orderId,
      userId: options.id,
      loginUser:userInfo
    });
    this.scanReviewOrder();
  },
  //扫码核销查找订单信息
  scanReviewOrder(){
    var _param={uoId:this.data.orderId};
    var getReq = wxReq.get(API.scanReviewOrder(), _param);
    getReq.then(resp => {
      this.setData({
        orderInfo: resp.data.data
      })
    })
  },
  //核销
  review(){
    var _userId=this.data.userId;
    var _orderId=this.data.orderId;
    var req = wxReq.get(API.getOverAndInsertOrder(), {
      id: _userId,
      orderId: _orderId
    });
  req.then(resp => {
      if (resp.data.errno == 0) {
        commen.showMessage("核销成功")
        var self=this;
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/manage/done?userId=' + self.data.loginUser.userId,
          })
        }, 1500)
      } else {
        commen.showMessage(resp.data.msg)
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