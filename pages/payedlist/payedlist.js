// pages/payedlist/payedlist.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["未支付", "已支付"],
    active: 0,
    showBuyBotton: true
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == 1) {
      this.setData({
        active: options.id
      });
      this.getData(false);
    } else {
      this.getData(true);
    }
  },
  getData(flag) {
    var that = this;
    util.request('GET', 'get_user_order_list', { status: that.data.active}, function (res) {
      console.log(res);
      that.setData({
        payData: res.data.data,
        showBuyBotton: flag
      });
    }, true);
  },
  onChange(event) {
    console.log(event.detail.index);
    this.setData({
      active: event.detail.index
    });
    if (event.detail.index==1) {
      this.getData(false);
    } else if (event.detail.index == 0) {
      this.getData(true);
    }
    
  },
  pay(e) {
    // console.log(e.currentTarget.dataset.id);
    var article_id = e.currentTarget.dataset.articleid;
    var that = this;
    var order_id = e.currentTarget.dataset.id;
    util.request('GET', 'pay_order', { order_id: order_id }, function (response) {
      console.log(response);
      var payParam = response.data.data;
      wx.requestPayment(
        {
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.nonceStr,
          'package': payParam.package,
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function (res) {
            util.request('GET', 'query_pay_result', { order_id: order_id, article_id: article_id, not_article: 1 }, function (res) {
              var tip = res.data.message;
              wx.showToast({
                title: tip,
                icon: 'none',
                duration: 1000,
                mask: true
              });
              that.setData({
                active: 1
              });
              that.getData();
            });
          },
          'fail': function (res) { },
          'complete': function (res) { }
        })
    },true);
  },
  showBigImg(e) {
    var src = e.currentTarget.dataset.srcone;//获取data-src
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
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