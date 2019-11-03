const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
const date = new Date()
const year = date.getFullYear();
const monthDay = []; //月日
const monthDay2 = [];
const time = [] //时
const time2 = []
const min = [] //分
const min2 = []
//获取当前月日时分
let y = date.getMonth() + 1;
y = y <= 9 ? '0' + y + '月' : y + '月';
let r = date.getDate();
r = r <= 9 ? '0' + r + '日' : r + '日';
const s = date.getHours();
const f = date.getMinutes();
let idx; //默认月日的索引值


//判断每个月有多好天，以及是否闰年
for (let i = 1; i <= 12; i++) {
	if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) {
		dayData(i, 31)

	} else if (i == 4 || i == 6 || i == 9 || i == 11) {
		dayData(i, 30)

	} else if (i == 2 && year % 4 != 0) {
		dayData(i, 28)

	} else if (i == 2 && year % 4 == 0) {
		dayData(i, 29)
	}
}
//将月日push到数组中
function dayData(i, sky) {
	for (let j = 1; j <= sky; j++) {
		let yue = i <= 9 ? '0' + i + '月' : i + '月';
		let r = j <= 9 ? '0' + j + '日' : j + '日';
		monthDay.push(yue + r)
		let yue2 = i <= 9 ? '0' + i : i;
		let r2 = j <= 9 ? '0' + j : j;
		monthDay2.push(yue2 + '-' + r2)
	}
}
//找出今日月日与滚动月日匹配的索引值
for (let i = 1; i <= monthDay.length; i++) {
	if (monthDay[i] == (y + r)) {
		idx = i;
	}
}
//时
for (let i = 0; i <= 23; i++) {
	time.push(i <= 9 ? '0' + i + '点' : i + '点')
	time2.push(i <= 9 ? '0' + i : i)
}
//分
for (let i = -4; i <= 55; i++) {
	min.push((i += 4) <= 9 ? '0' + i + '分' : i + '分')
}
for (let i = -4; i <= 55; i++) {
	min2.push((i += 4) <= 9 ? '0' + i : i)
}

var interval;

const app = getApp();
Page({
	data: {
		time: '',
		multiArray: [monthDay, time, min],
		multiIndex: [idx, 0, 0],
		order: {},
		useRed: true,
    cDiscountRate: 0, 
    showMoney:0
	},
	onShareAppMessage() {
		return app.globalData.shareMessage
	},
	onLoad: function(options) {
		var self = this
		commen.getSetConfig((data) => {
			self.setData({
				cDiscountRate: 100 - data.discountRate
			})
		})
		console.log(options)
		var getReq = wxReq.get(API.getOrderById(), {
			id: options.id
		})
		getReq.then(resp => {
			var order = resp.data.data
			self.setData({
				order: order
			})

			self.calculationMoney()

			//计时器
      var str = commen.Millisecond2HHMMSS(commen.getMillisecond(new Date(order.uoCreateTime), new Date()));
			self.setData({
				clock: str
			})
			interval = setInterval(() => {
				var timeStr = commen.mainTimeStart(self.data.clock);
				self.setData({
					clock: timeStr
				})
			}, 1000);
		})
	},
	calculationMoney: function() {
		var self = this
		var order = self.data.order
		var time = new Date()
		if (self.data.time) {
			time = self.data.time
		}
    // + ":00"
    var num = commen.getInervalHour(new Date(order.uoCreateTime), time )


		var param = {}
		param.size = num*1
		param.type = order.uoType*1
		param.id = order.uoCommodityId*1
    console.log('size='+ param.size + ',数据类型是：' + typeof param.size);
    console.log('type='+ param.type + ',数据类型是：' + typeof param.type);
    console.log('id=' +param.id + ',数据类型是：' + typeof param.id);


		var showMoneyReq = wxReq.get(API.getCalculationMoney(), param)
		showMoneyReq.then(resp => {
      console.log('...'+resp.data.data)
      console.log(resp.data)
			self.setData({
				showMoney: commen.formatMoney(resp.data.data)
			})
		})
	},
	bindMultiPickerChange: function(e) {
		//点击确认获取时间
		let arr = e.detail.value;
		let time = year + '-' + monthDay2[arr[0]] + ' ' + time2[arr[1]] + ':' + min2[arr[2]];
		if (commen.getMillisecond(new Date(), commen.YYYYMMDD2time(time + ':00')) <= 0) {
			commen.showMessage("所选时间必须大于当前时间")
			return false
		}
		this.setData({
			time: time
		})
		this.calculationMoney()
	},
	toIndent: function() {
		var self = this
		var param = {
			payId: this.data.order.uoCommodityId,
			orderId: this.data.order.uoId,
			redUse: this.data.useRed
		}
		if (self.data.time != '') {
			var endTime = commen.YYYYMMDD2time(self.data.time + ":00").getTime()
			console.log(endTime)
			param.endTime = endTime
		}
		commen.payMoney(param, (res) => {
			commen.showMessage("支付成功")
			setTimeout(() => {
				wx.reLaunch({
					url: '/pages/home/home',
				})
			}, 1500)
    }, () => { }, () => { 
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/home/home',
        })
      }, 1500)

    })
	},
	switch1Change: function(e) {
		this.setData({
			useRed: e.detail.value
		})
	}
})
