const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({
  data: {
    HOST_URL: API.getHOSTURI(),
    shipSn:0
  },
  onLoad(e) {
    // if (e.id) {
      this.setData({
        shipSn: e.shipSn,
        shipChannel: e.shipChannel,
      })
    // }
    this.GetExpress();
  },
  GetExpress() {
    let that = this;
    wxReq.get(API.GetExpress, {
      shipSn: that.data.shipSn,
      shipChannel:that.data.shipChannel
    }).then(function(res) {
      console.log(res)
      if (res.data.errno === 0) {
        that.setData({
          express: res.data.data
        });
      } else {
        util.showErrorToast(res.errmsg);
      }
    });
  }
})