const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const app = getApp();
Page({
  data: {
    HOST_URI: API.getSERVERURI(),
  },
  onLoad(e) {
    if (e.type) {
      this.setData({
        type: e.type
      })
    } else{
      this.setData({
        type: 1
      })
    }
    this.getHome();
  },
  getHome() {
    wxReq.get(API.mallDetailHome,{
      type:this.data.type
    }).then(res => {
      this.setData({
        ads: res.data.data.ads,
        list: res.data.data.goodsList
      })
    })
  },
})