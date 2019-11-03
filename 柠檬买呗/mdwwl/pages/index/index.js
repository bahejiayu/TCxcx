var app = getApp();
var http = app.config.http;
var lat = '';
var lon = '';
var addFlag = false;
var shop_type = 1;
var shop_page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    once: false,
    http: http,
    nav_list: [],
    nav_index: 1,
    address_txt: "获取位置",
    banner_list: [],
    shop_list: [],
    enterNub: '',
    current_city: '',
    showModule: false,
    mou_index: 0,
    sort_list: [{
      txt: "距离最近",
      id: 1
    }, {
      txt: "销量最高",
      id: 2
    }, {
      txt: "智能排序",
      id: 3
    }],
    sort_type: 1,
    area_: "全部",
    area_list: [],
    moneyData:null
  },
  getMoneyData: function () {
    var that = this;
    wx.request({
      url: `${http}/home/user/user_info`, // 仅为示例，并非真实的接口地址
      data: {
        uid: wx.getStorageSync('uid')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          that.setData({
            moneyData: res.data.date
          });
        }

      }
    })
  },
  tog_date: function(e) {
    var that = this;
    if (e.currentTarget.dataset.txt) {
      that.setData({
        area_: e.currentTarget.dataset.txt,

      });
    } else {
      that.setData({
        sort_type: e.currentTarget.dataset.id
      });
    };
    that.get_shop();
    this.setData({
      showModule: false
    })

  },
  togModIndex: function(e) {
    this.setData({
      mou_index: e.currentTarget.dataset.index
    });
  },
  get_areaList: function() {
    var that = this;
    this.setData({
      sort_type: 1,
      area_: "全部",
    })
    wx.request({
      url: `${http}/home/index/get_area_ajax`, // 仅为示例，并非真实的接口地址
      data: {
        city: that.data.current_city
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            area_list: res.data.date,

          });
        }
      }
    })
  },
  cancel_moud: function() {
    this.setData({
      showModule: false
    });
  },
  clkMoud: function(e) {
    this.setData({
      showModule: true,
      mou_index: e.currentTarget.dataset.index
    });
  },
  sel_city: function() {
    var that = this;

    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          wx.navigateTo({
            url: '../switchcity/switchcity',
          })
        } else {
          wx.openSetting({
            success(res) {
              console.log(res.authSetting['scope.userLocation'])
              if (res.authSetting['scope.userLocation']) {
                addFlag = true;
                // 获取经纬度
                wx.getLocation({
                  type: 'wgs84',
                  success: function(res) {
                    console.log(res)
                    lat = res.latitude
                    lon = res.longitude
                    that.get_shop();
                  },
                  fail: function() {}
                })

                wx.navigateTo({
                  url: '../switchcity/switchcity',
                })
              }
            }
          })

        }
      }
    })
  },
  goShopDetail: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  saoma: function() {
    wx.scanCode({
      success(res) {
        if (res) {

          if (!res.path || res.path.indexOf("pay/pay") == -1) {
            wx.showToast({
              title: '无法识别二维码',
              icon: 'none'
            })
            return false
          }
          console.log(111)
          wx.navigateTo({
            url: '/' + res.path
          })
        }
      }
    })
  },
  get_enter: function() {
    var that = this;
    wx.request({
      url: http + '/home/Article/index', // 仅为示例，并非真实的接口地址
      data: {
        type: 7
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 1) {
          that.setData({
            enterNub: res.data.date
          });
        }
      }
    })

  },
  go_enter: function() {
    if (!wx.getStorageSync('token')) {
      wx.reLaunch({
        url: '../login/login'
      });
      return false;
    };

    console.log(this.data.moneyData);
    var that = this;
    var my_data = this.data.moneyData;
    if (my_data.vip == 0) {
      wx.navigateTo({
        url: '../buy_bao/buy_bao',
      });
    } else if (my_data.vip == 1 && my_data.level == 1) {
      wx.navigateTo({
        url: '../seller/setUpShop/setUpShop',
      });
    } else if (my_data.vip == 1 && my_data.level == 2) {

      wx.navigateTo({
        url: '../buy_bao/buy_bao',
      });
    }


  },
  go_btn: function(e) {
    wx.navigateTo({
      url: '../search/search?id=' + e.currentTarget.dataset.id + '&lat=' + lat + '&lon=' + lon,
    })
  },
  go_search: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../search/search?id=0' + '&lat=' + lat + '&lon=' + lon,
    })
  },

  // 封装请求店铺方法
  get_shop: function(longitude, latitude, page, type) {

    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: http + '/home/index/nearby_shop', // 仅为示例，并非真实的接口地址
      data: {
        longitude: lon,
        latitude: lat,
        page: 1,
        type: that.data.sort_type,
        city: that.data.current_city,
        area: that.data.area_
      },

      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data)
        wx.stopPullDownRefresh();
        if (res.data.code == 1) {
          that.setData({
            shop_list: res.data.date,
            once: true
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
    console.log(options);
    // if (options.share_code) {
    //   wx.setStorageSync('share_code', options.share_code);
    //   if (!wx.getStorageSync('uid')) {
    //     wx.reLaunch({
    //       url: '../login/login'
    //     })
    //   }

    // } else {
    //   wx.removeStorageSync('share_code');
    // }
    var that = this;


    // 获取轮播图
    wx.request({
      url: http + '/home/index/sowing', // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 1) {
          that.setData({
            banner_list: res.data.date
          })
        }
      }
    });
    // 获取导航分类
    wx.request({
      url: http + '/home/index/shop_cate', // 仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 1) {
          that.setData({
            nav_list: res.data.date
          })
        }
      }
    });



    // 获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        lat = res.latitude
        lon = res.longitude
        wx.request({
          url: http + '/home/index/change_address', // 仅为示例，并非真实的接口地址
          data: {
            longitude: lon,
            latitude: lat
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            if (res.data.code == 1) {
              that.setData({
                address_txt: res.data.uid.result.address_component.street,
              });
              if (wx.getStorageSync('city_')) {
                console.log(111)
                that.setData({
                  current_city: wx.getStorageSync('city_')
                })
              } else {
                console.log(222)
                wx.setStorageSync('city_', res.data.uid.result.address_component.city)
                that.setData({
                  current_city: res.data.uid.result.address_component.city
                })
              }
              // 获取区
              that.get_areaList();

              // 地理位置获取成功，获取首页商铺数据
              that.get_shop();
            }
          }
        })
      },
      fail: function() {
        wx.showToast({
          title: '未授权地理',
          icon: 'none'
        });
        // 地理位置获取成功，获取首页商铺数据
        that.get_shop();

      }
    })

    this.get_enter();









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
    this.getMoneyData();

    // console.log('show', addFlag)
    // if (addFlag){
    //     wx.showToast({
    //       title: '正在获取商品',
    //     })
    //   addFlag=false;
    //   }
    var that = this;
    if (wx.getStorageSync('city_') && that.data.current_city != wx.getStorageSync('city_')) {
      that.setData({
        current_city: wx.getStorageSync('city_')
      });
      if (that.data.once) {
        that.get_areaList();

        that.get_shop();
      }


      // 获取区
    }
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
    this.getMoneyData();

    var that = this;
    this.setData({
      sort_type: 1,
      area_: "全部",
    });
    that.get_shop();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    wx.showLoading({
      title: '正在加载更多',
    });
    var that = this;
    shop_page++;
    wx.request({
      url: http + '/home/index/nearby_shop', // 仅为示例，并非真实的接口地址
      data: {

        longitude: lon,
        latitude: lat,
        page: shop_page,
        type: that.data.sort_type,
        city: that.data.current_city,
        area: that.data.area_

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