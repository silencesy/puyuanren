// pages/browse/browse.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {
      page_num: 0,
      page_size: 10,
      search_keywords: ''
    },
    articleListData: [],
    totalPage: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let params = this.data.param;
    params.search_keywords = options.id;
    this.getBrowse();
  },
  getBrowse() {
    var that = this;
    if (that.data.param.page_num != that.data.totalPage && that.data.totalPage != 0) {
      that.data.param.page_num++;
      util.request('GET', 'get_article_list', that.data.param, function (res) {
        console.log(res);
        that.setData({
          totalPage: res.data.data.page_data.total_page,
          articleListData: that.data.articleListData.concat(res.data.data.article_list)
        });
      }, true);
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
    this.getBrowse();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})