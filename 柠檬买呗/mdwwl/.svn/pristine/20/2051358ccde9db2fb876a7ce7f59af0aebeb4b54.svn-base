// pages/city/auditingDetail/auditingDetail.js
var app = getApp();
var http = app.config.http;
var shopId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
    shop_info: {},
    comLoading: false
  },
  ckBtn: function(e) {
    var txt_ = '';
    if (e.currentTarget.dataset.index == 2) {
      txt_ = '驳回';

    } else {
      txt_ = '审核通过';

    }

    wx.showModal({
      title: '提示',
      content: `请确定是否${txt_}该商家`,
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍等',
          });

          wx.request({
            url: `${http}/home/agent/shenhe_shop`, // 仅为示例，并非真实的接口地址
            data: {
              shop_id :shopId,
              status: e.currentTarget.dataset.index
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.hideLoading();
                  if(res.data.code==1){
                        wx.showToast({
                          title: '操作成功',
                          icon:'none'
                        });
                    setTimeout(()=>{
                          wx.navigateBack({
                            detal:1
                          });

                    },1500)

                  }else{
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none'
                    });
                  }
              console.log(res.data)
            }
          })
         
         
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  lookImg: function(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.img, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  bohao: function() {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.shop_info.lx_phone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    shopId = options.id;
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: `${http}/home/agent/wait_info`, // 仅为示例，并非真实的接口地址
      data: {
        shop_id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            shop_info: res.data.date,
            comLoading: true
          });
        }
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})