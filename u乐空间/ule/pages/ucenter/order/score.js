const API = require('../../../utils/api')
const request = require('../../../utils/request')
const wxReq = require('../../../utils/wxRequest')
const commen = require('../../../utils/commen')
const app = getApp();

Page({
  data: {
    orderGoodsPicUrl:"",
    orderGoodsName:"",
    orderGoodsId:null,
    hasPicture: false,
    picUrls: [],
    files: [],
    stars: [0, 1, 2, 3, 4],
    star: 5,
    starText: '十分满意',
    SERVER_URI: API.getSERVERURI(),
  },

  onShareAppMessage() { 
    return  app.globalData.shareMessage
  },
  bindInputValue(e) {
    this.setData({
      content: e.detail.value,
    })
  },
  chooseImage: function(e) {
    if (this.data.files.length >= 5) {
      commen.showError('只能上传五张图片')
      return false;
    }
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        that.upload(res);
      }
    })
  },
  upload: function(res) {
    var that = this;
    const uploadTask = wx.uploadFile({
      url: API.storageUpload,
      filePath: res.tempFilePaths[0],
      name: 'file',
      success: function(res) {
        var _res = JSON.parse(res.data);
        if (_res.errno === 0) {
          var url = _res.data.url
          that.data.picUrls.push(url)
          that.setData({
            hasPicture: true,
            picUrls: that.data.picUrls
          })
        }
      },
      fail: function(e) {
        wx.showModal({
          title: '错误',
          content: '上传失败',
          showCancel: false
        })
      },
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })

  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectRater: function(e) {
    var star = e.currentTarget.dataset.star + 1;
    var starText;
    if (star == 1) {
      starText = '很差';
    } else if (star == 2) {
      starText = '不太满意';
    } else if (star == 3) {
      starText = '满意';
    } else if (star == 4) {
      starText = '比较满意';
    } else {
      starText = '十分满意'
    }
    this.setData({
      star: star,
      starText: starText
    })

  },
  onPost: function() {
    let that = this;

    if (!this.data.content) {
      commen.showError('请填写评论')
      return false;
    }
    let param = {}
    param = {
      type: 0,
      valueId: that.data.orderGoodsId,
      content: that.data.content,
      star: that.data.star,
      //hasPicture: that.data.hasPicture,
      picUrls: JSON.stringify(that.data.picUrls)
    }
    param.orderId = that.data.orderId
    wxReq.post(API.commentPost, param).then(function(res) {
      if (res.data.errno === 0) {
        wx.showToast({
          title: '评论成功',
          complete: function() {
            wx.navigateBack();
          }
        })
      }
    });
  },
  onLoad:function(opt){
    console.log(opt)
    this.setData({
      orderGoodsPicUrl: opt.url,
      orderGoodsName: opt.name,
      orderGoodsId: opt.id
    })
  }
})