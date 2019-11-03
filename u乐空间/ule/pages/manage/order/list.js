
const app = getApp();
Page({

  data: {
  },
  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  onLoad: function (options) {

  },

})