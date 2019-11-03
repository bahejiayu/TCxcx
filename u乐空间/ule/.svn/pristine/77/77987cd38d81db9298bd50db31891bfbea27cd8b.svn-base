const app = getApp();
const API = require('../../utils/api')
const wxReq = require('../../utils/wxRequest')
const commen = require('../../utils/commen')
Page({
  data: {
    HOST_URI: API.getSERVERURI(),
    cartGoods: [],
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      "checkedGoodsCount": 0,
      "checkedGoodsAmount": 0.00
    },
    isEditCart: false,
    checkedAllStatus: true,
    editCartList: [],
  },
  onShareAppMessage() {
    return app.globalData.shareMessage
  },
  onShow(e) {
    this.getCartList();
  },
  getCartList() {
    let that = this;
    wxReq.get(API.cartList).then(res => {
      if (res.data.errno === 0) {
        this.setData({
          cartGoods: res.data.data,
        });
      } else {
        commen.showError(res.data.errMsg);
      }
    })
    wxReq.get(API.cartTotal).then(res => {
      if (res.data.errno === 0) {
        this.setData({
          cartTotal: res.data.data,
          checkedAllStatus: that.isCheckedAll()
        });
      } else {
        commen.showError(res.data.errMsg);
      }
    })
  },
  isCheckedAll() {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  checkedItem(e) {
    let id = e.currentTarget.dataset.id;
    let itemIndex = e.currentTarget.dataset.index;

    let check = e.currentTarget.dataset.checked;
    let that = this;
    if (!this.data.isEditCart) {
      let ids = []
      ids[0] = parseInt(id)
      wxReq.post(API.cartEdit, {
        ids: ids,
        increment: 0,
        check: check
      }).then(res => {
        if (res.data.errno === 0) {
          that.getCartList();
        } else {
          commen.showError(res.data.errMsg);
        }
        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let tmpCartData = this.data.cartGoods.map(function(element, index, array) {
        if (index == itemIndex) {
          element.checked = !element.checked;
        }
        return element;
      });
      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },
  checkedAll() {
    let that = this;
    if (!this.data.isEditCart) {
      var ids = this.data.cartGoods.map(v => {
        return v.id;
      });
      wxReq.post(API.cartEdit, {
        ids: ids,
        increment: 0,
        check: that.isCheckedAll() ? 0 : 1
      }).then(res => {
        if (res.data.errno === 0) {
          that.getCartList();
        } else {
          commen.showError(res.data.errMsg);
        }
        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function(v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },
  editCart() {
    var that = this;
    if (this.data.isEditCart) {
      this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function(v) {
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList: this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },
  getCheckedGoodsCount() {
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number;
      }
    });
    console.log(checkedGoodsCount);
    return checkedGoodsCount;
  },
  countNumber(e) {
    let id = e.currentTarget.dataset.id;
    let ids = []
    let that = this;
    if (e.currentTarget.dataset.number == 1) {
      return false
    }
    ids[0] = parseInt(id)
    wxReq.post(API.cartEdit, {
      ids: ids,
      increment: e.currentTarget.dataset.type == 'add' ? 1 : -1,
      check: e.currentTarget.dataset.checked
    }).then(res => {
      if (res.data.errno === 0) {
        that.getCartList();
      } else {
        commen.showError(res.data.errMsg);
      }
      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });
  },
  deleteCart() {
    //获取已选择的商品
    let that = this;
    let ids = this.data.cartGoods.filter(function(element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
    if (ids.length <= 0) {
      return false;
    }
    console.log(ids);
    ids = ids.map(function(element, index, array) {
      if (element.checked == true) {
        return element.id;
      }
    });
    wx.showModal({
      title: '提示',
      content: '确定删除商品吗？',
      showCancel: true,
      success: res => {
        if (res.confirm) {
          wxReq.post(API.cartDel, {
            ids: ids
          }).then(res => {
            if (res.data.errno === 0) {
              that.getCartList();
            } else {
              commen.showError(res.data.errMsg);
            }
            that.setData({
              checkedAllStatus: that.isCheckedAll()
            });
          });
        }
      },
    })
  },
  checkoutOrder(){
    wx.navigateTo({
      url: 'checkout',
    })
  }
})