const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();
var interval;
Page({
	data: {
		sec: 5,
		state: 1,
		isShowPage: false,
		HOST_URL: API.getHOSTURI(),
	},

  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
	onLoad: function(options) {
		let self = this;
		// var userInfo = commen.getValueInStorage("userInfo")
		if (!commen.checkUseIsComeDoor(options)) {
			return
		}
		commen.updateAndGetUserInfo((userInfo) => {
			if (userInfo.userType == 4) {
				commen.showMessageAndToPage("您还没有注册，请先注册", '/pages/login/login')
				return
			}
			var shopId = commen.getValueInStorage("shopId");
			var data = {};
			data.uoUserCode = userInfo.userCode;
			data.uoType = 0;
			data.uoCommodityId = 0;
			data.uoNumber = 1;
			data.uoSiId = shopId;
			var getReq = wxReq.post(API.getCheckOrderCanCreate(), data);
			getReq.then(resp => {
				if (!resp.data.data.type) {
					commen.showMessageAndToPage(resp.data.data.message, '/pages/home/home')
				} else {
					var commentReq = wxReq.get(API.getCommentStart(), {
						userId: userInfo.userId,
						shopId: shopId
					});
					if (commentReq.data != -1) {
						self.time()
					}
				}
			})
		})
	},
	time: function() {
		//开门倒计时
		let idx = 5;
		clearInterval(interval)
		interval = setInterval(() => {
			idx--
			if (idx <= 0) {
				clearInterval(interval);
				wx.reLaunch({
					url: '/pages/home/home'
				})
			}
			this.setData({
				state: 2,
				sec: idx
			})
		}, 1000)
	}
})
