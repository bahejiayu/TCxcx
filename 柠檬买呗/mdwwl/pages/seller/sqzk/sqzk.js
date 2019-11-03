// pages/seller/ModifiPay/ModifiPay.js
var app = getApp();
var http = app.config.http;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoValue: {},
    trimeValue:'',
    array3: [
      ['9', '8', '7', '6', '5', '4', '3', '2', '1'],
      ['点'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      ['折'],

    ],
    array4: [],
    sjzk_: "",
    hbdk_:"",
  },
  bindPickerChange4: function (e) {
    var that = this;
    this.setData({
      hbdk_: that.data.array4[e.detail.value]
    })
  },
  bindPickerChange3: function (e) {
    console.log(e.detail.value + 1);
    var lp_ = this.data.array3[0][e.detail.value[0]] + '.' + this.data.array3[2][e.detail.value[2]];
    console.log(lp_)
    this.setData({
      sjzk_: lp_
    });
    console.log((100 - (lp_ * 10)) / 2);
    var dk_range = (100 - (lp_ * 10)) / 2;
    var dk_list = [];
    for (var i = 1; i <= dk_range; i++) {
      dk_list.push(i);
    }
    console.log(dk_list);
    this.setData({
      array4: dk_list,
      hbdk_: ""
    });


  },
  subFrom: function (e) {
    var that=this;
    console.log(e);
    var fomrData = e.detail.value;
    fomrData.uid = wx.getStorageSync('uid');
    wx.showLoading({
      title: '正在提交',
    })
    wx.request({
      url: `${http}/shop/discount_apply`, // 仅为示例，并非真实的接口地址
      data: fomrData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '申请提交成功',
            icon:'none'
          });
          that.setData({
            trimeValue:'',
            sjzk_: "",
            hbdk_: ""
          });

          setTimeout(function(){
                wx.navigateBack({
                  detal:1
                });

          },1500)

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${http}/home/shop/basic_data`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            infoValue: res.data.date
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})