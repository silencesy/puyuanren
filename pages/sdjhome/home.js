var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],
    value: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiper();
    this.getShopData();
    this.getUserLocation();
  },
  onShow: function () {
    
  },
  // 获取轮播图
  getSwiper: function () {
    var that = this;
    util.request('GET', 'get_index_advert',{}, function (res) {
      console.log(res)
      that.setData({
        swiperData: res.data.data
      });
    },true);
  },
  // 获取地址信息
  getUserLocation: function() {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        var verticalAccuracy = res.verticalAccuracy;
        var horizontalAccuracy = res.horizontalAccuracy;
        var altitude = res.altitude;
        var param = {
          latitude: latitude,
          longitude: longitude,
          altitude: altitude,
          speed: speed,
          accuracy: accuracy,
          vertical_accuracy: verticalAccuracy,
          horizontal_accuracy: horizontalAccuracy
        }
        util.request('GET','update_user_location',param,function(res){
          // console.log(res)
        });
      }
    })
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
  goclass(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../../pages/bigclass/bigclass?id=" + e.currentTarget.dataset.id
    });
  },
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onSearch(event) {
    if (this.data.value) {
      wx.navigateTo({
        url: "../../pages/browse/browse?id=" + this.data.value
      });
    }
  },
  // 获取商户列表
  getShopData() {
    let that = this;
    util.request('GET', 'get_shop_list', {}, function (res) {
      console.log(res)
      that.setData({
        shopData: res.data.data
      });
    }, true);
  },
  goShop(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../deliverhome/deliverhome?id=' + id
    });
  }
})