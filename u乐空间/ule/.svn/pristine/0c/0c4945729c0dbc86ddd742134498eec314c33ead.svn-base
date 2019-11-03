const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();

Page({
  data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI()  
  },
  onShareAppMessage() {
    return app.globalData.shareMessage
  },
  onLoad(e) {
    if (e.scene) {
      var param = e.scene
      param = param.replace("%253A", ":")
      var arr = param.split(":")
      console.log(arr[0])
      this.setData({
        id: arr[1]
      })
      if (arr[0] == 'Uid' && (arr[1] != undefined && arr[1] != null && arr[1] != '')) {
        wxReq.get(API.UserPuOrder,{
          id: arr[1]
        }).then(res => {
          console.log(res)
          if (res.data.errno==0){
            console.log(res)
            if (!res.data.data.order){
              commen.showError("订单不存在");
            }
            this.setData({
              order: res.data.data.order,
              user: res.data.data.user
            })
          }else{
            commen.showError(res.data.errMsg);
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1,
              })
            },3000)            
          }
        })        
      }
    }
  },
  ChanelUserOrder(){
    wxReq.get(API.ChanelUserOrder, {
      id:this.data.id
    }).then(res => {
      if (res.data.errno == 0) {
        console.log(res)     
        wx.showToast({
          title: '取消成功',
          icon: 'none',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 3000)
      }
    })
  }
});