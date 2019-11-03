const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({

	data: {
    HOST_URI: API.getHOSTURI(),
    SERVER_URI: API.getSERVERURI(),
    userHeadIcon: API.getHOSTURI() + '/picture/centre_gray.png',
    userName: '',
    userId: null,
    userYearType: 0,
    userYearEnd: "",
    idx: 0,
    template: '',
    num: 1200,
    acId: '',
    acName: '',
    acType:'',
    memberData: [],
		card: 0,
	},
  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  onLoad: function (options) {
    let self = this;
    self.getMemberData(self)

    function template(title, template) {
      wx.setNavigationBarTitle({
        title: '年卡会员'
      })
    }
    commen.updateAndGetUserInfo((userInfo) => {
      self.setData({
        userInfo: userInfo
      })
    })
  },
  //获取年卡类型
  getMemberData: function (self) {
    request({
      url: API.getSelectAnnualCardList(),
      method: 'GET',
      data: {},
      success: function (res) {
        self.setData({
          memberData: res.data.data,
        })
        if (res.data.data.length > 0) {
          self.setData({
            num: res.data.data[0].acMoney,
            acId: res.data.data[0].acId,
            acName: res.data.data[0].acName,
          })
        }
      }
    })
  },
  seasonMember: function (e) {
    let arr = e.currentTarget.dataset.idx;
    this.setData({
      idx: arr[0],
      num: arr[1],
      acId: arr[2],
      acName: arr[3],
      acType: arr[4]
    })
  },
  yearMember: function () {
    this.setData({
      year: true,
      season: false
    })
  },
  showDetails: function () {
    this.setData({
      isShowDetails: true
    })
  },
  hideDetails: function () {
    this.setData({
      isShowDetails: false
    })
  },
  toPay: function () {
    if (this.data.acId == null) {
      commen.showError("请选择年卡")
    }
    var self = this
    let _uoType = self.data.acType==1?6:2;
    var param = {
      uoUserCode: self.data.userInfo.userCode,
      uoType: _uoType,
      uoCommodityId: this.data.acId,
      uoNumber: 1,
      uoUnit: this.data.num,
      uoCommodityName: this.data.acName,
      uoSiId: this.data.userInfo.userShopId
    }
    var orderReq = wxReq.post(API.postOrderCreate(), param)
    orderReq.then(resp => {
      if (resp.data.errno == 0) {
        var param = {
          payId: self.data.acId,
          orderId: resp.data.data,
          redUse: false
        }
        commen.payMoney(param, () => {
          wx.showModal({
            title: '提示',
            content: '购买成功',
          })
          var giftReq = wxReq.get(API.getByOrderId(), { id: resp.data.data })
          giftReq.then(resp => {
            if (resp.data.data == null) {
              return false;
            }
            commen.getAdress((obj) => {
              wx.showLoading({
                title: '更新中',
              })
              var req = wxReq.post(API.getGiftupdate(), {
                "ugId": resp.data.data.ugId,
                "ugPlace": obj.place,
                "ugReceiverName": obj.name,
                "ugReceiverPhone": obj.phone,
                "ugPostcodes": obj.postalCode
              })
              req.then(resp => {
                wx.hideLoading()
                wx.navigateTo({
                  url: '/pages/gift/gift',
                })
              })
            })
          })
        })
      }
    })
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
	chooseCard(e) {
		this.setData({
			card: e.currentTarget.dataset.card
		})
	}
})
