// pages/seller/setUpShop/setUpShop.js
var app=getApp();
var http=app.config.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
    array1: ['选择1', '选择2'],
    txt1: "---请选择---",
    array2: ['选择1', '选择2'],
    txt2: "---请选择---",
    address_txt: "",
    time_list: [],
    start: "06:00",
    end: "22:00",
    up1img: "/images/upimg.png",
    up2img: "/images/upimg.png",
    up3img: "/images/upimg.png",
    img_list1: [],
  },
  upImage1: function () {
   
    var that = this;
    if (that.data.img_list1.length>=5){
          wx.showToast({
            title: '最多上传5张',
            icon:"none"
          });
          return false;
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
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

              // that.setData({
              //   imgValue1: data_.img
              // })
              console.log(tempFilePaths)
              that.setData({
                img_list1: that.data.img_list1.concat(data_.img)
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
  delList1: function (e) {
    var list_ = this.data.img_list1;
    list_.splice(e.target.dataset.index, 1);
    this.setData({
      img_list1: list_
    });
  },
  // bindUp1: function () {
  //   var that = this;
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success(res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       var tempFilePaths = res.tempFilePaths[0]
  //       that.setData({
  //         up1img: tempFilePaths
  //       });

  //     }
  //   })
  // },
  bindUp2: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
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

              // that.setData({
              //   imgValue1: data_.img
              // })
              console.log(tempFilePaths)
              that.setData({
                up2img: data_.img
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
  bindUp3: function () {
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

      }
    })
  },
  startTime: function (e) {
    var that = this;
    this.setData({
      start: that.data.time_list[e.detail.value]
    });
  },
  endTime: function (e) {
    var that = this;
    this.setData({
      end: that.data.time_list[e.detail.value]
    });
  },
  bindPickerChange1: function (e) {
    console.log(e);
    var that = this;
    this.setData({
      txt1: that.data.array1[e.detail.value]
    });
  },
  bindPickerChange2: function (e) {
    console.log(e);
    var that = this;
    this.setData({
      txt2: that.data.array2[e.detail.value]
    });
  },
  getLoction: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          address_txt: res.address
        });
      },
      fail: function (err) {
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
  onLoad: function (options) {
    var list_ = [];
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
    var that = this;
    wx.request({
      url: `${http}/home/shop/index`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            shopInfo: res.data.date,
            img_list1: res.data.date.slide_img||[],
            up2img: res.data.date.logo ||'/images/upimg.png'
          })
        }
      }
    })


  },
  submiFrom:function(e){
      console.log(e.detail.value)



    var date_ = e.detail.value;
    date_.uid = wx.getStorageSync('uid');
    if (date_.logo =='/images/upimg.png'){
      date_.logo='';
    }
    console.log(date_);

    wx.showLoading({
      title: '正在修改',
    })
    wx.request({
      url: `${http}/home/shop/edit_shop`, // 仅为示例，并非真实的接口地址
      data: date_,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.code == 1) {
          wx.showToast({
            title: '修改成功',
          })
          setTimeout(function(){
                wx.navigateBack({
                  detal:1
                })

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