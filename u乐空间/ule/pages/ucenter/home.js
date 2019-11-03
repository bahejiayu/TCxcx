const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();

Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    userName: '',
    userId: '',
    userYearType: 0,
    userYearEnd: "",
    unGetSize: 0,
    unPaySize: 0,
    unSendSize: 0
  },
  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  onShow: function () {
    //从本地获取用户信息
    let self = this;
   
    commen.updateAndGetUserInfo((data) => {
      let { userHeadIcon, userName, userId, userYearType, userYearEnd, userType,qrImg } = data; 
      self.setData({
        userHeadIcon: userHeadIcon,
        userName: userName,
        userId: userId,
        userYearEnd: userYearEnd != null ? commen.formatTime(userYearEnd) : '',
        userYearType: userYearType,
        userType: userType
      });
      if (qrImg == null) {
        wxReq.post(API.getCreateTwoIndex(), {
          page: 'pages/home/home',
          sc: "pId:" + userId,
          tag: "H"
        }).then(res=>{
          console.log("success")
          //let src = 'data:image/jpeg;base64,' + res.data.data;
          let src = API.getSERVERURI() + res.data.data;
          self.setData({
            src: src
          })
        })
      }else{
        self.setData({
          src: API.getSERVERURI() + qrImg
        })
      }

      wxReq.get(API.getDistriUser,{
        userId: this.data.userId
      }).then(resp=>{
        self.setData({
          moneyStatus: resp.data.data.moneyStatus
        })
      })
    })
    this.goodsMine();
  },
  showModal(e) {
    this.setData({
        modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
  goodsMine:function(){
    wxReq.get(API.orderGoodsMine).then(resp=>{
      console.log(resp)
      this.setData({
        unGetSize: resp.data.data.unGetSize,
        unPaySize: resp.data.data.unPaySize,
        unSendSize: resp.data.data.unSendSize
      })
    })
  },
  toOrderList:function(e){
    wx.navigateTo({
      url: '/pages/ucenter/order/list?type='+e.currentTarget.dataset.type,
    })
  },
  submitInfo(e){
    if (e.detail.formId.indexOf(" ")!=-1){
      return false
    }
    var param = {}
    param.formId = e.detail.formId
    wxReq.post(API.saveForm,param).then()
  },
  toRefund(){
    wx.navigateTo({
      url: '/pages/ucenter/refund/list'
    })
  },
  toFenXiaoCode(){
    wx.navigateTo({
      url: '/pages/dealer/share',
    })
  },
  toDelaerHome(){
    wx.navigateTo({
      url: '/pages/dealer/home',
    })
  },
  toRoomList(){
    wx.navigateTo({
      url: '/pages/dealer/roomList',
    })
  }
});