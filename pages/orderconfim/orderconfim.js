// pages/orderconfim/orderconfim.js
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrData: [],
    data: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
    console.log(app.globalData.addressId)
    if (app.globalData.addressId) {
      this.setData({
        addrData: [app.globalData.addressId]
      });
    } else {
      this.getDataAddress();
      console.log(123123123123)
    }
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

  },
  getData() {
    var that = this;
    let goods_list = [];
    console.log(app.globalData.goodsList);
    app.globalData.goodsList.forEach((v)=>{
      let item = {};
      item.goods_id = v.id;
      item.sl = v.sl;
      goods_list.push(item);
    });
    that.setData({
      goods_list: goods_list
    });
    let params = {
      goods_list: goods_list
    }
    util.request('GET', 'get_multi_goods_detail', params, function (res) {
      that.setData({
        data: res.data.data
      });
    }, true);
 
  },
  getDataAddress() {
    var that = this;
    util.request('GET', 'get_user_address', {}, function (res) {
      console.log(res)
      if (res.data.data.length > 0) {
        that.setData({
          addrData: [res.data.data[0]],
          address_id: res.data.data[0].id
        });
      } else {
        that.setData({
          addrData: []
        });
      }
    }, true);
  },
  bindAddress() {
    wx.navigateTo({
      url: '../address/address?flag=true',
    })
  },
  bindChooseAddress() {
    wx.navigateTo({
      url: '../address/address?flag=true',
    })
  },
  bindBuyNow() {
    var that = this;
    if (that.data.addrData.length>0) {
      let params = {
        goods_list: that.data.goods_list,
        address_id: that.data.addrData[0].id
      }
      util.request('GET', 'create_shop_order', params, function (res) {
        var payParam = res.data.data.pay_info;
        var order_id = res.data.data.order_data.order_id;
        // console.log(res.data.data);
        wx.requestPayment(
          {
            'timeStamp': payParam.timeStamp,
            'nonceStr': payParam.nonceStr,
            'package': payParam.package,
            'signType': payParam.signType,
            'paySign': payParam.paySign,
            'success': function (res) {
              util.request('GET', 'query_shop_pay_result',
                {
                  order_id: order_id,
                }, function (res) {
                    wx.navigateTo({
                      url: "../orderlist/orderlist"
                    });
                });
            },
            'fail': function (res) {
              util.request('GET', 'query_shop_pay_result',
                {
                  order_id: order_id,
                }, function (res) {
                });
            },
            'complete': function (res) { }
          })
      }, true);
    } else {
      wx.showToast({
        title: '请选择地址！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    }
    
  }
})