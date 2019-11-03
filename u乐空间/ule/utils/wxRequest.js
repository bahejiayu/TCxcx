function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        if(res.statusCode!=200){
          wx.showModal({
            title: '提示',
            content: '服务器故障，请与工作人员联系',
          })
          return false
        }
        //成功
        if(res.data.errno!=0){
          if (res.data.errno ==501){
            // wx.showModal({
            //   title: '提示',
            //   content: '请登录',
            // })
            wx.redirectTo({
              url: '/pages/home/home',
            })
            return false
          }
        }
        resolve(res)
        
      }
      obj.fail = function (res) {
        console.log(res)
        //失败
        reject(res)
      }
      fn(obj)
    });
  };
};

// 无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

/**
 * 微信请求 get 方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json',
      'X-Litemall-Token': wx.getStorageSync("token")
    }
  })
};

/**
 * 微信请求 post 方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: url,
    method: 'post',
    data: data,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'X-Litemall-Token': wx.getStorageSync("token")
    },
  })
};


module.exports = {
  'post': postRequest,
  'get': getRequest,
  'chooseImage': chooseImage,
  'uploadFile': uploadFile,
  'getLocation': getLocation
};

//--------------------------
function chooseImage() {
  var chooseImage = wxPromisify(wx.chooseImage)
  return chooseImage({
    count: 1, // 默认9
    sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  })
};
function uploadFile(url, filePath) {
  var uploadFile = wxPromisify(wx.uploadFile)
  return uploadFile({
    url: url,
    filePath: filePath,
    name: "file"
  })
};
function getLocation() {
  var getLocation = wxPromisify(wx.getLocation)
  return getLocation({
    type: "gcj02"
  })
}