var app = getApp();
var http = app.config.http;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
    img_list1: [],
    img_list2: [],
  },
  upImage1: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
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



        console.log(tempFilePaths)

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

  upImage2: function () {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
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
                img_list2: that.data.img_list2.concat(data_.img)
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
  delList2: function (e) {
    var list_ = this.data.img_list2;
    list_.splice(e.target.dataset.index, 1);
    this.setData({
      img_list2: list_
    });
  },
  subF: function (e) {
    var formData = e.detail.value;
    console.log(formData);
    formData.uid = wx.getStorageSync('uid');
    wx.showLoading({
      title: '添加中',
    })
    wx.request({
      url: `${http}/home/item/add_item`, // 仅为示例，并非真实的接口地址
      data: formData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })

        }
      }
    })







  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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