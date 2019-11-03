// pages/buy/goods_detail/goods_detail.js
var app=getApp();
var http=app.config.http;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    http,
      cur_swiper:1,
    number:1,
    show_module:false
  },
  show_gg:function(){
      this.setData({
        show_module:true
      })
  },
  sure_btn: function () {
    this.setData({
      show_module: false
    })
  },
  add_:function(){
        console.log(1)
    var that=this;
     that.data.number++;
        this.setData({
          number: that.data.number
        });
  },
  get_nub:function(e){
          this.setData({
            number: e.detail.value*1
          })
  },
  down: function () {
    console.log(1)
    var that = this;
    if (that.data.number==1){
       return false;
    }
      
    that.data.number--;
    this.setData({
      number: that.data.number
    });
  },
  get_swiperIndex:function(e){
    this.setData({
      cur_swiper: e.detail.current+1
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