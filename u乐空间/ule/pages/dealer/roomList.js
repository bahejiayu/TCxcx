const request = require('../../utils/request');
const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp(); 

Page({
  data: {
    TabCur: 0,
	  nav:['空间','物品','商城'],
    mallList:[],
    leftList:[],
    spaceList:[],
    goodsList:[],
    zeroPageNum: 0,
    onePageNum: 0,
    mallPageNum: 0,
    pageSize: 10,
    SERVER_URI: API.getSERVERURI()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  },
	onShareAppMessage() {
		return app.globalData.shareMessage
	},
  onLoad(opt){
    this.indentData(0)
    this.indentData(1)
    this.indentData(2)
  },
  onReachBottom: function () {
    this.indentData(this.data.TabCur)
  },
  indentData: function(type) {
    wx.showLoading({
      title: '加载中',
    })
    let self = this;
    commen.updateAndGetUserInfo((userInfo) => {
      var param = {};
      if(type==0){
        param.pageNum = this.data.zeroPageNum + 1
      }else if(type==1){
        param.pageNum = this.data.onePageNum + 1
      }else{
        param.pageNum = this.data.mallPageNum + 1
      }
      param.pageSize = this.data.pageSize
      param.orderType = type
      param.userId = userInfo.userId
      var getReq = wxReq.get(API.getRedOrder(), param)
      getReq.then(res => {
        console.log(res)
        if (res.data.data.length > 0) {
          var list = []
          if (type == 0) {
            list = self.data.spaceList
            list = list.concat(res.data.data)
            self.setData({
              spaceList: list,
              zeroPageNum: self.data.zeroPageNum + 1,
              leftList: list
            })
          } else if (type==1) {
            list = self.data.goodsList
            list = list.concat(res.data.data)
            self.setData({
              goodsList: list,
              onePageNum: self.data.onePageNum + 1,
              leftList: list
            })
          }else{

            //console.log(res.data.data[0].orderGoodsList)
            list = self.data.mallList
            list = list.concat(res.data.data)
            self.setData({
              mallList:list,
              mallPageNum: self.data.mallPageNum + 1
            })
          }
        }
        wx.hideLoading()
      })
    })
  }
})