// pages/search/search.js
var app = getApp();
var http = app.config.http
var shop_page = 1;
var cdFlag = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: http,
    list: [],
    nav_index: 0,
    id_: '',
    lat: '',
    lon: '',
    shop_list: [],
    keyWord: "",
    bs: ""

  },
  goShopDetail: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  getKey: function(e) {
    this.setData({
      keyWord: e.detail.value
    });
  },
  // 搜索
  searchBtn: function() {
    var that = this;
    if (that.data.keyWord == '') {
      wx.showToast({
        title: '请输入店铺',
        icon: 'none'
      });
      return false;
    }

    wx.showLoading({
      title: '搜索中',
    });
    wx.request({
      url: http + '/home/Category/search_shop', // 仅为示例，并非真实的接口地址
      data: {
        longitude: that.data.lon,
        latitude: that.data.lat,
        page: 1,
        cate_id: that.data.id_,
        name: that.data.keyWord,
        city:wx.getStorageSync('city_')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.code == 1) {
          that.setData({
            shop_list: res.data.date
          });
          cdFlag = false;
          shop_page = 1;
        } else {
          wx.showToast({
            title: '找不到店铺',
            icon: 'none'
          })
        }
      }
    })



  },

  // 切换导航
  tog_nav: function(e) {
    var that = this;
    this.setData({
      id_: e.currentTarget.dataset.id
    });
    this.get_shop(that.data.lon, that.data.lat, 1, that.data.id_);
    cdFlag = true;
    that.setData({
      keyWord: ''
    });
  },
  // 获取商铺
  get_shop: function(longitude, latitude, page, cate_id) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: http + '/home/Category/search_shop', // 仅为示例，并非真实的接口地址
      data: {
        longitude: longitude,
        latitude: latitude,
        page: page,
        cate_id: cate_id,
        city: wx.getStorageSync('city_')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          that.setData({
            shop_list: res.data.date
          });
          shop_page = 1;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      id_: options.id,
      lat: options.lat,
      lon: options.lon
    });

    var that = this;
    // 获取分类
    wx.request({
      url: `${http}/home/Category/shop_cate`, // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            list: res.data.date,
          })
          res.data.date.map((i, v) => {

            if (i.id == options.id) {
              if (v != 0) {
                that.setData({
                  bs: res.data.date[v - 1].id

                })
              } else {
                that.setData({
                  bs: options.id

                })
              }


            }


          })


        }
      }
    })

    this.get_shop(that.data.lon, that.data.lat, 1, that.data.id_);



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
    var that = this;
    that.setData({
      keyWord: ''
    });
    this.get_shop(that.data.lon, that.data.lat, 1, that.data.id_);
    cdFlag = true;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (cdFlag == false) {
      return false;
    }
    wx.showLoading({
      title: '正在加载更多',
    });



    var that = this;

    shop_page++;
    wx.request({
      url: http + '/home/Category/search_shop', // 仅为示例，并非真实的接口地址
      data: {
        longitude: that.data.lon,
        latitude: that.data.lat,
        page: shop_page,
        cate_id: that.data.id_,
        city: wx.getStorageSync('city_')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading();

        if (res.data.code == 1) {

          that.setData({
            shop_list: that.data.shop_list.concat(res.data.date)
          });
          if (res.data.date.length <= 0) {
            wx.showToast({
              title: '没有更多数据',
              icon: 'none'
            })
          }

        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})