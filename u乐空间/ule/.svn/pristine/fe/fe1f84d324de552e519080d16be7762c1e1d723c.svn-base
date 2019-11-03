const app = getApp();
const API = require('../../../utils/api')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
Page({
  data: {
    SERVER_URI: API.getSERVERURI(),
  },
  onShareAppMessage() {
    return app.globalData.shareMessage
  },
  onLoad(e) {
    wxReq.get(API.refundList).then(res => {
      console.log(res)
      this.setData({
        list: res.data.data,
      })
    })
  },

})