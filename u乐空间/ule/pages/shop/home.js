const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const app = getApp();
Page({
  data: {
    HOST_URI: API.getSERVERURI(),
  },
  onLoad (options) {
    this.getHome();
    console.log(app.globalData.shareMessage.path)
  },
	
	onShareAppMessage() { 
	  return  app.globalData.shareMessage
	},
  getHome () {
    wxReq.get(API.mallHome).then(res => {
      this.setData({
        ads: res.data.data.ads
      })
    })
  },
  submitInfo(e) {
    if (e.detail.formId.indexOf(" ") != -1) {
      return false
    }
    var param = {}
    param.formId = e.detail.formId
    wxReq.post(API.saveForm, param).then()
  },
  abouts(){
    wx.navigateTo({
      url: '/pages/aboutUsp/aboutUsp',
    })
  }
})