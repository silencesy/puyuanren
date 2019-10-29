// pages/paylist/paylist.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setParam(options);
    this.getdata();
  },
  setParam(options) {
    var that = this;
    that.setData({
      article: options
    });
  },
  getdata() {
    var that = this;
    util.request('GET', 'get_pay_item', {}, function (res) {
      console.log(res);
      that.setData({
        payData: res.data.data
      });
    });
  },
  pay(e) {
    var that = this;
    let param = {
      pay_item_id: e.currentTarget.dataset.id,
      need_fp: 0
    }
    util.request('GET', 'create_order', param, function (res) {
      // console.log(res);
      let order_id = res.data.data;
      util.request('GET', 'pay_order', { order_id: order_id}, function (response) {
        var payParam = response.data.data;
        wx.requestPayment(
          {
            'timeStamp': payParam.timeStamp,
            'nonceStr': payParam.nonceStr,
            'package': payParam.package,
            'signType': payParam.signType,
            'paySign': payParam.paySign,
            'success': function (res) {
              util.request('GET', 'query_pay_result', 
              { order_id: order_id,
                title: that.data.article.title,
                description: that.data.article.description,
                user_phone: that.data.article.user_phone,
                cate_id: that.data.article.cate_id,
                img_src1: that.data.article.img_src1,
                img_src2: that.data.article.img_src2 || '',
                img_src3: that.data.article.img_src3 || ''
              }, function (res) {
                console.log(res);
                var tip = res.data.message;
                wx.showToast({
                  title: tip,
                  icon: 'none',
                  duration: 3000,
                  mask: true
                })
                setTimeout(function(){
                  wx.navigateTo({
                    url: "../../pages/payedlist/payedlist?id=1"
                  });
                },3000);
              });
            },
            'fail': function (res) {
              util.request('GET', 'query_pay_result',
                {
                  order_id: order_id,
                  title: that.data.article.title,
                  description: that.data.article.description,
                  user_phone: that.data.article.user_phone,
                  cate_id: that.data.article.cate_id,
                  img_src1: that.data.article.img_src1,
                  img_src2: that.data.article.img_src2 || '',
                  img_src3: that.data.article.img_src3 || ''
                }, function (res) {
                  console.log(res);
                  var tip = res.data.message;
                  wx.showToast({
                    title: tip,
                    icon: 'none',
                    duration: 3000,
                    mask: true
                  })
                  setTimeout(function () {
                    wx.navigateTo({
                      url: "../../pages/payedlist/payedlist?id=0"
                    });
                  }, 3000);
                });


              
            },
            'complete': function (res) { }
          })
      });
    });
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