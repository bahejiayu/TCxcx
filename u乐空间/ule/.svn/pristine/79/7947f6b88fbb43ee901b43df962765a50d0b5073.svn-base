const API = require('../../utils/api')
const request = require('../../utils/request')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();

Page({
	data: {
		HOST_URI: API.getHOSTURI(),
		SERVER_URI: API.getSERVERURI(),
		money: '0',
		inputName: '',
		inputAccount: '',
		inputMoney: 0,
		putMinimum: 0,
		userInfo: null,
		formData: [{
			title: '姓名',
			placeholder: '请输入正确的姓名',
			eve: 'inputName',
			length: 20
		}, {
			title: '账号',
			placeholder: '请输入正确的微信号',
			eve: 'inputAccount',
			length: 50
		}]
	},
	onShareAppMessage() {
		return app.globalData.shareMessage
	},
	onLoad(options) {
		let self = this;
		self.setData({
			money: options.money
		})
		wx.setNavigationBarTitle({
			title: '申请提现'
		})
		commen.updateAndGetUserInfo((userInfo) => {
			self.setData({
				userInfo: userInfo
			})
			var getReq = wxReq.get(API.getSetInfo(), {})
			getReq.then(resp => {
				self.setData({
					putMinimum: resp.data.data.putMinimum
				})
			})
		})
	},
	withdraw: function() {
		var self = this
		if (self.data.inputMoney.length <= 0 || self.data.inputMoney == 0) {
			commen.showError("请填金额")
			return false
		}
		commen.updateAndGetUserInfo((userInfo) => {
			let {
				userId,
				userMobile
			} = userInfo;
			console.log(self.data)
			let {
				inputName,
				inputAccount
			} = self.data;
			let money = self.data.inputMoney * 1;
			// console.log(userId, inputName, userMobile, userMobile, inputAccount)
			request({
				url: self.data.HOST_URI + '/user/applyMomey',
				method: 'POST',
				data: {
					userId: userId,
					userName: inputName,
					userMobile: userMobile,
					putMoney: money,
					putType: 3,
					putCard: inputAccount,
					putRemarks: ''
				},
				success: (res) => {
					console.log(res)
					if (res.data.errno != 0) {
						commen.showError("提现失败")
					} else {
						this.setData({
							modalName: 'DoneModal'
						})
						setTimeout(() => {
							wx.navigateBack({
								number: 1
							})
						}, 1500)
					}
				}
			})
		})
	},
	inputMoney: function(e) {
		this.setData({
			inputMoney: e.detail.value
		})
	},
	getCash() {
		this.setData({
			modalName: 'DoneModal'
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
});
