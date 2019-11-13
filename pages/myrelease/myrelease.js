// pages/myrelease/myrelease.js
var util = require('../../utils/util.js');
import Dialog from '../../dist/dialog/dialog';
Page({
  data: {
    active: 0,
    articleListData: [],
    totalPage: -1,
    param: {
      page_num: 0
    },
    companyListData: [],
    totalPage2: -1,
    param2: {
      page_num: 0
    },
    deleteParams: {

    }
  },
  onShow() {
    this.setData({
      articleListData: [],
      totalPage: -1,
      param: {
        page_num: 0
      },
      companyListData: [],
      totalPage2: -1,
      param2: {
        page_num: 0
      }
    })
    this.getMyArticleList();
    this.getMycompanyList();
  },
  onLoad: function () {
    
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
  getMycompanyList: function () {
    var that = this;
    if (that.data.param2.page_num != that.data.totalPage2 && that.data.totalPage2 != 0) {
      that.data.param2.page_num++;
      util.request('GET', 'get_my_enterprise', that.data.param2, function (res) {
        console.log(res);
        that.setData({
          totalPage2: res.data.data.page_data.total_page,
          companyListData: that.data.companyListData.concat(res.data.data.enterprise_list)
        });
      }, true);
    }
  },
  onReachBottom: function () {
    this.getMyArticleList();
    this.getMycompanyList();
  },
  deleteCompany(val) {
    console.log(123);
    let that = this;
    this.setData({
      deleteParams: val.detail
    })
    Dialog.confirm({
      title: '确认删除当前企业',
      message: '   '
    }).then(() => {
      that.deleteCompanyAjax();
    }).catch(() => {
      // on cancel
    });
  },
  deleteCompanyAjax() {
    let that = this;
    let enterprise_id = that.data.deleteParams.id;
    let index = that.data.deleteParams.index;
    let companyListData = that.data.companyListData;
    let params = {
      enterprise_id: enterprise_id
    }
    util.request('GET', 'delete_my_enterprise', params, function (res) {
      companyListData.splice(index, 1);
      that.setData({
        companyListData: companyListData
      })
    }, true);
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