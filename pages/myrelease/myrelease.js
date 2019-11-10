// pages/myrelease/myrelease.js
var util = require('../../utils/util.js');
import Dialog from '../../dist/dialog/dialog';
Page({
  data: {
    active: 0,
    articleListData: [],
    totalPage: -1,
    param: {
      page_num: 5
    },
    deleteParams: {

    }
  },
  onLoad: function (options) {
    this.getMyArticleList();
  },
  getMyArticleList: function () {
    var that = this;
    if (that.data.param.page_num != that.data.totalPage && that.data.totalPage != 0) {
      that.data.param.page_num++;
      util.request('GET', 'get_my_article', that.data.param, function (res) {
        that.setData({
          totalPage: res.data.data.page_data.total_page,
          articleListData: that.data.articleListData.concat(res.data.data.article_list)
        });
      }, true);
    }
  },
  onReachBottom: function () {
    this.getMyArticleList();
  },
  deleteArticle(val) {
    let that = this;
    this.setData({
      deleteParams: val.detail
    })
    Dialog.confirm({
      title: '确认删除当前文章',
      message: '   '
    }).then(() => {
      that.deleteArticleAjax();
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  deleteArticleAjax() {
    let that = this;
    let article_id = that.data.deleteParams.id;
    let index = that.data.deleteParams.index;
    let articleListData = that.data.articleListData;
    let params = {
      article_id: article_id
    }
    util.request('GET', 'delete_my_article', params, function (res) {
      articleListData.splice(index, 1);
      that.setData({
        articleListData: articleListData
      })
    }, true);
  },
  onChange() {
    console.log(123);
  }
})