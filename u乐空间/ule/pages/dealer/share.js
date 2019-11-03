const request = require('../../utils/request');
const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({

  data: {},
  onShareAppMessage: function () {
    // return {
    //   title: "欢迎加入我们",
    //   imageUrl: this.data.HOST_URI + "picture/index_back.png",
    //   path: '/pages/share/share?userId=' + this.data.userId
    // }
    return app.globalData.shareMessage
    
  },
  onLoad() {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    commen.updateAndGetUserInfo((userInfo) => {
      let {
        userId,
        userHeadIcon,
        userName,
        userYearType,
        userYearEnd
      } = userInfo;
      this.setData({
        userHeadIcon: userHeadIcon,
        userName: userName,
        userId: userId,
        userYearType: userYearType
      })
      wx.showLoading({
        title: '正在生成',
      })
      if (userInfo.qrImg==null){
        //生成二维码
        wxReq.post(API.getCreateTwoIndex(), {
          page: 'pages/home/home',
          sc: "pId:" + userInfo.userId,
          tag: "DS"
        }).then(res => {
          //let src = 'data:image/jpeg;base64,' + res.data.data;
          let src = API.getSERVERURI() + res.data.data;
          this.setData({
            src: src
          });
          wx.hideLoading();
        });
      }else{
        wx.hideLoading();

        this.setData({
          src: API.getSERVERURI()+userInfo.qrImg
        });
      };
    });
  },

})