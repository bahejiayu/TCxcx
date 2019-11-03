const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    SERVER_URI: API.getSERVERURI(),
    goodsId:"",
    page:0,
    size:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      goodsId: options.goodsId
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
    var param = {}
    param.page = this.data.page
    param.size = this.data.size
    param.goodsId = this.data.goodsId
    wxReq.get(API.commentList,param).then(resp=>{
      console.log(resp)
      if (resp.data.errno==0){
        if(resp.data.data.length>0){
          var conList = []
          for (var index in resp.data.data){
            var model = resp.data.data[index]
            model.picUrls = JSON.parse(model.picUrls)
            conList[conList.length]=model
          }
          var comments = this.data.comments.concat(conList)
          this.setData({
            comments:comments,
            page:this.data.page+1
          })
        }
      }else{
        commen.showError("系统错误，请联系管理员")
      }
    })
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