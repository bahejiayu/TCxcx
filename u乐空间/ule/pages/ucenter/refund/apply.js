const app = getApp();
const API = require('../../../utils/api')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')

Page({
  data: {
    takeStatus: 0,
    price: '0.00',
    explainIndex: 0,
    explain: '',
    explainList: ["质量问题", "材质与商品描述不符", "尺寸不符", "颜色/款式/图案与描述不符", "卖家发错货", "收到商品少件/破损/污渍等", "快递一直未送到", "空包裹/少货", "其他"],
    explainLength: 140
  },
  onShareAppMessage() {
    return app.globalData.shareMessage
  },
  onLoad(e) {
    console.log(e)
    if (e.id) {
      this.setData({
        orderId: e.id,
        price: e.price
      })
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  takeStatus(e) {
    this.setData({
      takeStatus: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      explainIndex: e.detail.value
    })
  },
  textareaInput(e) {
    this.setData({
      explain: e.detail.value,
      explainLength: 140 - e.detail.value.length
    })
  },
  phoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  save(){
    

    var refundExplain = ""    
    if (this.data.explainIndex == (this.data.explainList.length-1)){
      if (!this.data.explain) {
        commen.showError("请填写说明")
        return false
      }
      refundExplain = this.data.explain;
    }else{
      refundExplain = this.data.explainList[this.data.explainIndex]
    }
    wxReq.post(API.refundAdd,{
      orderId: this.data.orderId,
      takeStatus: this.data.takeStatus,
      refundMoney: this.data.price,
      phone: this.data.phone,
      refundExplain: refundExplain
    }).then(res => {
      wx.redirectTo({
        url: 'info?id=' + res.data.data,
      })
    })
  }
})