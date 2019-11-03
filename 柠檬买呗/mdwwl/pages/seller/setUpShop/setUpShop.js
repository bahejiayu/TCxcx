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
    imgValue2: "",
    array1: ['企业', '个人工商户'],
    txt1: "",
    array2: [],
    txt2: "",
    address_txt: "",
    time_list: [],
    up2img: "/images/jhx_03.png",
    address_des:'',
    log_txt:"",
    mr_data:{},
    sjzk_:"",
    array3:[
      ['9', '8', '7', '6', '5', '4', '3', '2', '1'],
      ['点'],
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      ['折'],

    ],
    array4:[],
    hbdk_:""
  },
  bindPickerChange4:function(e){
    var that=this;
          this.setData({
            hbdk_: that.data.array4[e.detail.value]
          })
  },
  show_sj:function(){
    if (this.data.array4.length<=0){
              wx.showToast({
                title: '请先选择商家折扣',
                icon:'none'
              });
        }
  },
  bindPickerChange3:function(e){
      console.log(e.detail.value+1);
 
    var lp_ = this.data.array3[0][e.detail.value[0]] + '.' + this.data.array3[2][e.detail.value[2]];
    console.log(lp_)
    this.setData({
      sjzk_: lp_
    });
    console.log((100 - (lp_ * 10))/2);
    var dk_range = (100 - (lp_ * 10)) / 2;
    var dk_list=[];
    for (var i = 1; i <= dk_range;i++){
      dk_list.push(i);
    }
    console.log(dk_list);
    this.setData({
      array4: dk_list,
      hbdk_:""
    });


  },
  lookImg:function(){
    wx.previewImage({
      current: `${http}/public/home/yyzz.jpg`, // 当前显示图片的http链接
      urls: [`${http}/public/home/yyzz.jpg`] // 需要预览的图片http链接列表
    })
  },
  // 获取地址
  getAddress:function(e){
      console.log(e.detail.value);
    var data_ = e.detail.value;
        this.setData({
          address_des: `${data_[0]}-${data_[1]}-${data_[2]}`
        });
  },
  // 提交申请
  submit_: function(e) {
    console.log(e)
    if (this.data.mr_data.status==2){
        return false;
    }
    var form_id = e.detail.formId;

    var formData = e.detail.value;
    formData.uid = wx.getStorageSync('uid');
    // formData.star_tsection = this.data.start;
    // formData.end_tsection = this.data.end;
    formData.lng = lng;
    formData.lat = lat;
    formData.form_id=form_id;
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
          // wx.showModal({
          //   title: '提示',
          //   content: '申请成功,请耐心等待申请结果,可在消息中心查看审核结果。',
          //   success(res) {
          //     if (res.confirm) {
          //       wx.navigateBack({
          //         delta:1
          //       })
          //     } else if (res.cancel) {
          //       wx.navigateBack({
          //         delta: 1
          //       })
          //     }
          //   }
          // })

          wx.redirectTo({
            url: '../../from_suc/from_suc',
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })

        }
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

  // 获取用户地址详情
  getLoction: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          address_txt: res.address,
          log_txt: res.longitude + ',' + res.latitude
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
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
     new Promise(function(solive,reject){
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
             solive(res.data.date)
             if (res.data.date.length>0){
               var list_ = res.data.date.map((i, v) => {
                 return i.title
               })
             }else{
               var list_ =[];
             }
           
             catList = res.data.date;
             that.setData({
               array2: list_
             })
           }

         }
       })
     }).then(function (solive){
       console.log(solive)
       wx.request({
         url: `${http}/home/shop/info`, // 仅为示例，并非真实的接口地址
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
             var new_sm = solive.filter((i, v) => {
               return i.id == res.data.date.cate_id;
             })
             console.log(new_sm)
             if (res.data.date.type){
              that.setData({
                mr_data: res.data.date,
              })

               that.setData({
                 sjlxValue: res.data.date.type,
                 txt1: res.data.date.type == 1 ? "企业" : "个人工商户",
                 sjflValue: res.data.date.cate_id,
                 txt2: new_sm[0].title || "",
                 address_des: `${res.data.date.province}-${res.data.date.city}-${res.data.date.area}`,
                 log_txt: `${res.data.date.lng},${res.data.date.lat}`,
                 up2img: http + res.data.date.yyzz,
                 imgValue2: res.data.date.yyzz,
                 sjzk_: res.data.date.discount,
                 hbdk_: res.data.date.max_deduction
               });
             }
        
             lng = res.data.date.lng;
             lat = res.data.date.lat;
           }

         }
       })

     });
    

  



    
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