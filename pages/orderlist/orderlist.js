// pages/orderlist/orderlist.js
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: false
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
    this.getData();
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
    let params = {
      status: 1
    }
    util.request('GET', 'get_shop_order', params, function (res) {
      that.setData({
        data: res.data.data
      })
    }, true);
  },
  // 确认收货
  bindConfirm(e) {
    console.log(e);
    let id = e.currentTarget.dataset.id;
    var that = this;
    let data = this.data.data;
    let params = {
      order_id: id
    }
    util.request('GET', 'confirm_shop_order_receive', params, function (res) {
      // that.setData({
      //   data: res.data.data
      // })
      data.forEach((v)=>{
        if(v.id == id) {
          v.shipping_status = 2;
        }
      });
      that.setData({
        data: data
      })
    }, true);
  },
  payAgain(e) {
    let id = e.currentTarget.dataset.id;
    let data = this.data.data;
    let goods_list = [];
    data.forEach((v)=>{
      if(id == v.id) {
        // app.globalData.goodsList = v.goods_list;
        // v.
        v.goods_list.forEach((vv)=>{
          let item = {};
          item.id = vv.goods_id;
          item.sl = vv.sl;
          goods_list.push(item);
        });
      }
    });
    app.globalData.goodsList = goods_list;
    console.log(app.globalData.goodsList);
    wx.navigateTo({
      url: '../../pages/orderconfim/orderconfim',
    });
  }
})