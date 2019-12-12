// pages/releasecolumn/releasecolumn.js

var util = require('../../utils/util.js');

Page({
  data: {
    getArticleListParam: {
      page_num: 0,
      page_size: 10,
      cate_id: ''
    },
    indexNumber: 0,
    totalPage: -1,
    articleListData: [],
    cate_list: [],
    showLeft: false
  },
  onLoad: function (options) {
    this.getArticleList(false);
    this.getClass();
  },
  chooseClass(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.onPullDownRefresh(id);
    this.setData({
      showLeft: false,
      indexNumber: index
    })
    if (index == 0) {
      wx.setNavigationBarTitle({
        title: '濮院即时信息栏'
      })
    } else {
      wx.setNavigationBarTitle({
        title: this.data.cate_list[index-1].name
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    });
  },
  getClass() {
    var that = this;
    util.request('GET', 'get_cate_list', {}, function (res) {
      let cate_list = res.data.data.cate_list;
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
      util.request('GET', 'get_article_list', that.data.getArticleListParam, function (res) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        that.setData({
          totalPage: res.data.data.page_data.total_page,
          articleListData: flag ? res.data.data.article_list:that.data.articleListData.concat(res.data.data.article_list)
        });
        if (that.data.getArticleListParam.cate_id == '' || that.data.getArticleListParam.cate_id == 'all') {
          wx.setNavigationBarTitle({
            title: '濮院即时信息栏'
          })
        }
      }, !flag);
    }
  },
  onShow: function (options) {
    var goTop = wx.getStorageSync('goTop');
    if (goTop == 1) {
      wx.pageScrollTo({
        scrollTop: 0
      });
      this.setData({
        indexNumber: 0
      });
      this.onPullDownRefresh('all');
      setTimeout(function() {
        wx.setStorageSync('goTop', 0);
      },400);
    }
  },
  onPullDownRefresh: function (cate_id) {
    wx.showNavigationBarLoading();
    var param = {
      page_num: 0,
      page_size: 10,
      cate_id: cate_id ? cate_id : this.data.getArticleListParam.cate_id
    }
    this.setData({
      getArticleListParam: param
    })
    this.getArticleList(true);
  },
  show() {
    this.setData({
      showLeft: !this.data.showLeft
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
  onReachBottom: function () {
    this.getArticleList();
  },
  onShareAppMessage: function () {

  }
})