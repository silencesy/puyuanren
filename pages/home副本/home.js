var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],
    value: '',
    getArticleListParam: {
      page_num: 0,
      page_size: 10,
      cate_id: '1000'
    },
    totalPage: -1,
    articleListData: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiper();
    this.getArticleList(false);
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
  // 获取文章
  getArticleList: function (flag) {
    var that = this;
    if (that.data.getArticleListParam.page_num != that.data.totalPage && that.data.totalPage != 0) {
      that.data.getArticleListParam.page_num++;
      util.request('GET', 'get_article_list', that.data.getArticleListParam, function (res) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        that.setData({
          totalPage: res.data.data.page_data.total_page,
          articleListData: flag ? res.data.data.article_list : that.data.articleListData.concat(res.data.data.article_list)
        });
      }, !flag);
    }
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
    this.getArticleList();
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
  
})