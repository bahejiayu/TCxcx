const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({
	data: {
		swiperCur: 0,
		modalName: null,
    goods: {},
    comment: {},
    selectIndex: null,
    number:1,
    SERVER_URI: API.getSERVERURI(),
    dataInfo:''
	},
  onShareAppMessage() {
    return app.globalData.shareMessage
  },
	swiperChange(e) {
		this.setData({
			swiperCur: e.detail.current
		})
	},
	showModal(e) {
		this.setData({
			modalName: e.currentTarget.dataset.modal
		})
	},
	closeModal(e) {
		this.setData({
			modalName: null
		})
	},
  onLoad(opt){
    console.log(opt)
    var data = {id:opt.goodsId}
    var getReq = wxReq.get(API.getGoodsDetail(), data);
    getReq.then(resp => {
      console.log(resp)
      var goods = resp.data.data.goods
      var comment = resp.data.data.comment
      var dataInfo = resp.data.data.goods.detail
      dataInfo = dataInfo.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
      dataInfo = dataInfo.replace(/\<p/gi, '<p class="p"');
      if(comment){
        comment.picUrls = JSON.parse(comment.picUrls)
      }
      goods.gallery = JSON.parse(goods.gallery)
      goods.spec = JSON.parse(goods.spec)
      console.log(goods)
      this.setData({
        goods:goods,
        comment:comment,
        commentSize: resp.data.data.commentSize,
        dataInfo: dataInfo
      })
    })
  },
  selectSpec(e){
    this.setData({
      selectIndex: e.currentTarget.dataset.index
    })
  },
  cutNumber(e){
    if(this.data.number == 1){
      return false
    }
    let number = this.data.number - 1
    this.setData({
      number: number
    })
  },
  addNumber(e){
    this.setData({
      number: this.data.number + 1
    })
  },
  addCart(e){
    if (this.data.selectIndex==null){
      commen.showError("请选择规格")
      return false;
    }
    let data = this.createCart()
    var postReq = wxReq.post(API.cartAdd, data);
    postReq.then(resp=>{
      console.log(resp)
      if(resp.data.errno==0){
        this.closeModal()
        wx.showToast({
          title: '添加成功'
        });
      }else{
        commen.showError("错误")
      }
    })
  },
  showSelectModel(e){

  },
  createCart(){
    var data = {}
    data.goodsId = this.data.goods.id
    data.goodsSn = this.data.goods.goodsSn
    data.goodsName = this.data.goods.name
    data.price = this.data.goods.retailPrice
    data.checked = 1
    data.picUrl = this.data.goods.picUrl
    data.spec = this.data.goods.spec[this.data.selectIndex]
    data.number = this.data.number
    return data
  },
  toSubmit(e){
    if (this.data.selectIndex == null) {
      commen.showError("请选择规格")
      return false;
    }
    var data = this.createCart();
    var postReq = wxReq.post(API.cartFastAdd, data);
    postReq.then(resp => {
      console.log(resp)
      if (resp.data.errno == 0) {
        this.closeModal()
        console.log("success")
        // 如果storage中设置了cartId，则是立即购买，否则是购物车购买
        try {
          // console.log("success CartFastAdd")
          wx.setStorageSync('cartId', resp.data.data);
          // wx.setStorageSync('grouponRulesId', checkedGroupon.id);
          // wx.setStorageSync('grouponLinkId', that.data.grouponLink.id);
          wx.navigateTo({
            url: '/pages/cart/checkout'
          })
        } catch (e) { 
          console.log(e)
        }
      } else {
        commen.showError("错误")
      }
    })
  },
  toCommentList(){
    wx.navigateTo({
      url: '/pages/shop/commentList?goodsId='+this.data.goods.id,
    })
  },
  toMallHome(){
    commen.toMallHome()
  },
  toMallCart(){
    commen.toMallCart()
  }

})
