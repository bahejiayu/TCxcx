

const request = ({url, method, data, success}) => {
	wx.request({
	  url: url,
	  method: method,
	  data: data,
	  header: {
	  	'content-type': 'application/json',//默认json格式
      'X-Litemall-Token': wx.getStorageSync("token")
	  },
	  success: success
	})
}

module.exports = request;