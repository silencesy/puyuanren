// pages/pay/pay.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPayParam();
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
  pay() {
    var that = this;
    wx.requestPayment(
      {
        'timeStamp': that.data.payParam.timeStamp,
        'nonceStr': that.data.payParam.nonceStr,
        'package': that.data.payParam.package,
        'signType': that.data.payParam.signType,
        'paySign': that.data.payParam.paySign,
        'success': function (res) {
          console.log(res);
         },
        'fail': function (res) { },
        'complete': function (res) { }
      })
  },
  getPayParam: function () {
    var that = this;
    util.request('GET', 'create_wx_pay',{},function(res) {
      console.log(res);
      that.setData({
        payParam: res.data.data.data
      });
    });
  },
  getPayParam: function () {
    var that = this;
    util.request('GET', 'create_wx_pay', {}, function (res) {
      console.log(res);
      that.setData({
        payParam: res.data.data.data
      });
    });
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