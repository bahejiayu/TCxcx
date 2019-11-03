const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({
  data: {
    HOST_URL: API.getHOSTURI(),
    isShowDetails: false,
    pageSize: 10,
    pageNum: 0,
    userId: null,
    list: [],
    showParam: {},
    show_top:false,
    navIndex:0,
    goodInfo:{},
    refundOrderList:[]
  },
  tog_nav:function(e){
    var _index = e.currentTarget.dataset.index;
    this.setData({
      navIndex: _index
    });
    if(_index==0){
      this.getList()
    }else{
      this.refundOrderList();
    }
  },
  showTip: function (e) {
    var that=this;
    var _index = e.currentTarget.dataset.index;
    var _goodInfo = that.data.list[_index];
    this.setData({
      show_top: true,
      goodInfo: _goodInfo
    });
  },
  userRefund:function(){
    var that=this;
    wx.navigateTo({
      url: '/pages/manage/tjsq/tjsq?orderId=' + that.data.goodInfo.cmOrderId,
    })
  },
  close_show_tip:function(){
    this.setData({
      show_top:false
    })
  },
	onShareAppMessage() { 
	  return  app.globalData.shareMessage
	},
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单核销'
    })
    this.setData({
      userId: options.userId
    })
    this.getList()
  },
  onReachBottom: function () {
    this.getList()
  },
  /**
   * 已核销订单列表
   */
  getList: function () {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    var getReq = wxReq.get(API.getSelectCheckListByTime(), {
      userId: this.data.userId,
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum + 1
    })
    getReq.then(resp => {
      if (resp.data.data.length > 0) {
        var list = self.data.list.concat(resp.data.data)
        self.setData({
          list: list,
          pageNum: self.data.pageNum + 1
        })
      }
      wx.hideLoading()
    });
  },
  /**
   * 退款订单列表
   */
  refundOrderList(){
    var that=this;
    wxReq.post(API.refundOrderList(),{}).then(res=>{
      if(res.data.errno==0){
        that.setData({
          refundOrderList: res.data.data.refundOrderList
        });
      }
    });
  },
  showDetails: function (e) {
    this.setData({
      isShowDetails: true,
      showParam: this.data.list[e.currentTarget.dataset.index]
    })

  },
  hideDetails: function () {
    this.setData({
      isShowDetails: false
    })
  }
})