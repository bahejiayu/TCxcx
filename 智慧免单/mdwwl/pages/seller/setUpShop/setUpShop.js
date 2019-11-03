// pages/seller/setUpShop/setUpShop.js
var app = getApp();
var http = app.config.http;
var catList;
var lng = '';
var lat = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sjlxValue: '',
    sjflValue: '',
    imgValue1: "",
    imgValue2: "",
    imgValue3: "",
    lxrType: "法人",
    array1: ['企业', '个人工商户'],
    txt1: "---请选择---",
    array2: [],
    array3: ['法人', '实际控制人', '代理人', '其他'],
    txt2: "---请选择---",
    address_txt: "",
    time_list: [],
    start: "06:00",
    end: "22:00",
    up1img: "/images/upimg.png",
    up2img: "/images/upimg.png",
    up3img: "/images/upimg.png",
  },
  // 提交申请
  submit_: function(e) {
    var formData = e.detail.value;
    formData.uid = wx.getStorageSync('uid');
    formData.star_tsection = this.data.start;
    formData.end_tsection = this.data.end;
    formData.lng = lng;
    formData.lat = lat;
    console.log(formData);
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: `${http}/home/shop/perfect_info`, // 仅为示例，并非真实的接口地址
      data: formData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data)
        if (res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: '申请成功,请耐心等待申请结果,可在消息中心查看审核结果。',
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta:1
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })


        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })

        }
      }
    })

  },
  // 上传店铺首页
  bindUp1: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          up1img: tempFilePaths
        });
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: `${http}/home/shop/dyUpload`, // 仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            user: 'file'
          },
          success(res) {
            console.log(res.data)
            wx.hideLoading();
            var data_ = JSON.parse(res.data)
            if (data_.status == 1) {

              that.setData({
                imgValue1: data_.img
              })
            }else{
                  wx.showToast({
                    title: '上传失败',
                    icon:'none'
                  })
            }
          }
        })
      }
    })
  },
  // 上传营业照
  bindUp2: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          up2img: tempFilePaths
        });
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: `${http}/home/shop/dyUpload`, // 仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            user: 'file'
          },
          success(res) {
            wx.hideLoading();

            console.log(res.data)
            var data_ = JSON.parse(res.data)

            if (data_.status == 1) {
              that.setData({
                imgValue2: data_.img
              })
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },
  // 上传营业执照
  bindUp3: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          up3img: tempFilePaths
        });
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: `${http}/home/shop/dyUpload`, // 仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            user: 'file'
          },
          success(res) {
            console.log(res.data)
            wx.hideLoading();

            var data_ = JSON.parse(res.data)
            if (data_.status == 1) {
              that.setData({
                imgValue3: data_.img
              })
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },
  // 营业开始时间
  startTime: function(e) {
    var that = this;
    this.setData({
      start: that.data.time_list[e.detail.value]
    });
  },
  // 营业结束时间
  endTime: function(e) {
    var that = this;
    this.setData({
      end: that.data.time_list[e.detail.value]
    });
  },
  // 选择商家类型
  bindPickerChange1: function(e) {
    console.log(e);
    var that = this;
    this.setData({
      txt1: that.data.array1[e.detail.value],
    });
    if (that.data.array1[e.detail.value]=='企业'){
        that.setData({
          sjlxValue:1
        })
    }else{
      that.setData({
        sjlxValue: 2
      })
    }

   

  },
  // 选择商家分类
  bindPickerChange2: function(e) {
    console.log(e);
    var that = this;
    this.setData({
      txt2: that.data.array2[e.detail.value]
    });

    var curObj = catList.filter((i, v) => {
      return that.data.array2[e.detail.value] == i.title;

    })
    console.log(curObj)
    this.setData({
      sjflValue: curObj[0].id
    })

  },
  // 选择联系人类型
  bindPickerChange3: function(e) {
    console.log(e);
    var that = this;
    this.setData({
      lxrType: that.data.array3[e.detail.value]
    });



  },
  // 获取用户地址详情
  getLoction: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          // address_txt: res.address,
          lng_lat: res.longitude + ',' + res.latitude
        });
        lng = res.longitude;
        lat = res.latitude;
      },
      fail: function(err) {
        console.log(err);
        wx.getSetting({
          success(res) {
            console.log(res.authSetting);
            if (!res.authSetting['scope.userLocation']) {
              console.log('未授权')
              wx.openSetting({
                success(res) {
                  console.log(res.authSetting)

                }
              })

            } else {
              console.log('授权')

            }

          }
        })

      }
    });





  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var list_ = [];
    // 生成时间
    for (var i = 0; i < 24; i++) {
      if (i < 10) {
        list_.push('0' + i + ':00');
        list_.push('0' + i + ':30');
      } else {
        list_.push(i + ':00');
        list_.push(i + ':30');
      }

    }
    this.setData({
      time_list: list_
    });
    // 获取商户类型
    var that = this;
    wx.request({
      url: `${http}/home/shop/shop_cate`, // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {

          var list_ = res.data.date.map((i, v) => {
            return i.title

          })
          catList = res.data.date;
          that.setData({
            array2: list_
          })
        }

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