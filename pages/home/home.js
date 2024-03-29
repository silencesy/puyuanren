// pages/releasecolumn/releasecolumn.js

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getArticleListParam: {
      page_num: 0,
      page_size: 10
    },
    totalPage: -1,
    companyListData: [],
    swiper: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleList(false);
    this.getClass();
    this.getSwiper();
  },
  getSwiper() {
    var that = this;
    util.request('GET', 'get_index_advert', {}, function (res) {
      console.log(res);
      let swiper_list = res.data.data;
      that.setData({
        swiper: swiper_list
      })
    });
  },
  getClass() {
    var that = this;
    util.request('GET', 'get_hor_cat_list', {}, function (res) {
      console.log(res);
      let cate_list = res.data.data;
      that.setData({
        cate_list
      })
    });
  },
  // 获取文章
  getArticleList: function (flag) {
    var that = this;
    if (that.data.getArticleListParam.page_num != that.data.totalPage && that.data.totalPage != 0) {
      that.data.getArticleListParam.page_num++;
      util.request('GET', 'get_enterprise_list', that.data.getArticleListParam, function (res) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log(res);
        that.setData({
          totalPage: res.data.data.page_data.total_page,
          companyListData: flag ? res.data.data.article_list : that.data.companyListData.concat(res.data.data.article_list)
        });
      }, !flag);
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
    var goTop = wx.getStorageSync('goTop');
    if (goTop == 1) {
      wx.pageScrollTo({
        scrollTop: 0
      });
      this.onPullDownRefresh();
      setTimeout(function () {
        wx.setStorageSync('goTop', 0);
      }, 400);
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
    wx.showNavigationBarLoading();
    var param = {
      page_num: 0,
      page_size: 10,
      cate_id: ''
    }
    this.setData({
      getArticleListParam: param
    })
    this.getArticleList(true);
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
  goListPage(e) {
    console.log(e);
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../../pages/category/category?id=" + id
    });
  }
})