const app = getApp();
const API = require('../../../utils/api')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
Page({
  data: {},
  onShareAppMessage() {
    return app.globalData.shareMessage
  },
  onLoad(e) {
    wxReq.get(API.refundDetail,{
      id:e.id
    }).then(res => {
     console.log(res)
     this.setData({
       refund:res.data.data,
       createTime: this.changeTime(res.data.data.createTime),
     })
    })
  },
  //将毫秒转时间
  changeTime: function (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    month = month <= 9 ? '0' + month : month;
    day = day <= 9 ? '0' + day : day;
    return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
  },
})