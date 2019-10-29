// pages/address/address.js
var util = require('../../utils/util.js');
const app = getApp();
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
    console.log(options);
    if (options.flag) {
      this.setData({
        flag: options.flag
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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
  goAddrFrom() {
    wx.navigateTo({
      url: "../addressform/addressform"
    });
  },
  getData() {
    var that = this;
    util.request('GET', 'get_user_address', {}, function (res) {
      console.log(res)
      that.setData({
        addrData: res.data.data
      });
    }, true);
  },
  bindEdit(e) {
    console.log(e);
    var address = e.currentTarget.dataset.address;
    var isdefault = e.currentTarget.dataset.default;
    var id = e.currentTarget.dataset.id;
    var contact = e.currentTarget.dataset.contact;
    var mobile = e.currentTarget.dataset.mobile;
    wx.navigateTo({
      url: '../addressform/addressform?address=' + address + "&isdefault=" + isdefault + "&id=" + id + "&contact=" + contact + "&mobile=" + mobile,
    })
  },
  bindDelete(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    util.request('GET', 'delete_user_address', {
      address_id: id
    }, function (res) {
      if (id == app.globalData.addressId.id ) {
        app.globalData.addressId = false
      }
      var addrData = that.data.addrData;
      addrData.splice(index, 1);
      that.setData({
        addrData: addrData
      });
    }, true);
  },
  bindSetDeafult(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    util.request('GET', 'set_address_is_default', {
      address_id: id
    }, function (res) {
      var addrData = that.data.addrData;
      for (var i = 0; i < addrData.length;i++) {
        addrData[i].is_default = 0;
      }
      addrData[index].is_default = 1;
      that.setData({
        addrData: addrData
      });
    }, true);
  },
  chooseAddress(e) {
    var address = e.currentTarget.dataset.address;
    var id = e.currentTarget.dataset.id;
    var contact = e.currentTarget.dataset.contact;
    var mobile = e.currentTarget.dataset.mobile;
    var addressDetails = {
      address: address,
      contact: contact,
      id: id,
      mobile: mobile
    }
    if(this.data.flag) {
      app.globalData.addressId = addressDetails;
      wx.navigateBack({
        delta: 1
      });
    }
  }
})