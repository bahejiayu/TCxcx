const request = require('../../utils/request');
const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
const app = getApp();

let pageNum = 1;
Page({
	data: {
		HOST_URI: API.getHOSTURI(),
		SERVER_URI: API.getSERVERURI(),
		detailsData: [],
		pageSize: 10,
		pageNum: 0
	},
	onShareAppMessage() {
		return app.globalData.shareMessage
	},
	onLoad: function(options) {
		let self = this;
		wx.setNavigationBarTitle({
			title: '分销明细'
		})
		commen.updateAndGetUserInfo((userInfo) => {
			self.setData({
				userInfo: userInfo
			})
			self.detailsData(self)
		})
	},
	//分销明细
	detailsData: function(self) {
		wx.showLoading({
			title: '加载中',
		})
		request({
			url: self.data.HOST_URI + 'user/getUserPutList',
			method: 'GET',
			data: {
				userId: self.data.userInfo.userId,
				pageSize: self.data.pageSize,
				pageNum: self.data.pageNum + 1
			},
			success: (res) => {
				//self.loadState(res)
				if (res.data.data.length > 0) {
					res.data.data.forEach((item) => {
						//支付方式
						if (item.putType === 0) {
							item.putType = '现金'
						} else if (item.putType === 1) {
							item.putType = '银联'
						} else if (item.putType === 2) {
							item.putType = '支付宝'
						} else if (item.putType === 3) {
							item.putType = '微信'
						}
						//审核状态
						if (item.examineType === 0) {
							item.examineType = '待审核'
						} else if (item.examineType === 1) {
							item.examineType = '待打款'
						} else if (item.examineType === 2) {
							item.examineType = '已驳回'
						} else if (item.examineType === 3) {
							item.examineType = '已打款'
						}
						//将毫秒转时间
						item.createTime = self.changeTime(item.createTime)
					})

					self.setData({
						detailsData: self.data.detailsData.concat(res.data.data),
						pageNum: self.data.pageNum + 1
					})
				}
				wx.hideLoading()
			}
		})
	},
	//将毫秒转时间
	changeTime: function(time) {
		let date = new Date(time);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hours = date.getHours();
		let min = date.getMinutes();
		let sec = date.getSeconds();
		month = month <= 9 ? '0' + month : month;
		day = day <= 9 ? '0' + day : day;
		return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
	},
	//上拉生命周期
	onReachBottom: function() {
		let self = this;
		self.detailsData(self)
	},
	loadState: function(res) {
		if (res.data.errno !== 0) {
			wx.showLoading({
				title: '玩命加载中',
			})
		} else if (res.data.errno === 0) {
			wx.hideLoading({
				title: '玩命加载中',
			})
		}
		if (res.data.data.length >= 10) {
			wx.showToast({
				title: '到底啦',
				image: '/images/branch-money.png'
			})
		}
	}
})
