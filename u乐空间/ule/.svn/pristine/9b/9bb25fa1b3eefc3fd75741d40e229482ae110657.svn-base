const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
Page({
	data: {
		list: [{
			title: '预定商品什么时候可以到货？',
			desc: '商品如果是预定的状态，需要向供货商采购，入库后才能发货，部分商品页面会显示预计到货时间，如无相应的到货时间提示，建议您关注商品页面库存信息或优先购买其他有现货的同类商品。'
		}, {
			title: '在加入购物车后，是不是该商品已被我预定了?',
			desc: '商品加入购物车后，此商品不属于被预定，需要以成功提交订单为准。'
		}, {
			title: '预定商品什么时候可以到货？',
			desc: '商品如果是预定的状态，需要向供货商采购，入库后才能发货，部分商品页面会显示预计到货时间，如无相应的到货时间提示，建议您关注商品页面库存信息或优先购买其他有现货的同类商品。'
		}],
		showId: 100
	},
  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  onShow: function () {
    //从本地获取用户信息
    let self = this;

    commen.updateAndGetUserInfo((data) => {
      let { userHeadIcon, userName, userId, userYearType, userYearEnd, userType,qrImg } = data;
      self.setData({
        userHeadIcon: userHeadIcon,
        userName: userName,
        userId: userId,
        userYearEnd: userYearEnd != null ? commen.formatTime(userYearEnd) : '',
        userYearType: userYearType,
        userType: userType
      });
      if (qrImg==null){
        wxReq.post(API.getCreateTwoIndex(), {
          page: 'pages/ucenter/done',
          sc: "Uid:" + userId,
          tag: "F"
        }).then(res => {
          console.log("success")
          //let src = 'data:image/jpeg;base64,' + res.data.data;
          let src = API.getSERVERURI() + res.data.data;
          self.setData({
            src: src
          })
        });
      }else{
        self.setData({
          src: API.getSERVERURI()+qrImg
        });
      }
      
    });
    this.goodsMine();
  },
	toggle(e) {
		this.setData({
			showId: e.currentTarget.dataset.id
		})
	}
})
