var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId: 1,
    cateListData: [],
    getArticleListParam: {
      page_num: 0,
      page_size: 10,
      cate_id: ''
    },
    swiperData: [],
    totalPage: -1,
    articleListData: [],
    bigClassId: ''
  },
  tabClick(e) {
    var tabIndex = e.currentTarget.dataset.id;
    var param = this.data.getArticleListParam;
    param.cate_id = tabIndex;
    param.page_num = 0;
    this.setData({
      articleListData: [],
      currentId: tabIndex,
      
    });
    this.getArticleList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bigClassId: options.id
    });
    this.getClass();
    
    // this.getUserLocation();
  },
  onShow: function () {
    
  },
  getClass() {
    var that = this;
    util.request('GET', 'get_cate_list', {
      page_num: 1,
      page_size: 10,
      advert_cates: that.data.bigClassId
    }, function (res) {
      var data = that.data.getArticleListParam;
      data.cate_id = res.data.data.cate_list[0].id;
      that.setData({
        cateListData: res.data.data.cate_list,
        getArticleListParam: data,
        currentId: data.cate_id
      });
      // 获取第一个分类的数据
      that.getArticleList();
    });
  },
  // 获取文章
  getArticleList: function() {
    console.log(this.data.getArticleListParam)
    var that = this;
    if (that.data.getArticleListParam.page_num != that.data.totalPage && that.data.totalPage != 0) {
      that.data.getArticleListParam.page_num++;
      util.request('GET', 'get_article_list', that.data.getArticleListParam, function (res) {
        // console.log(res);
        that.setData({
          totalPage: res.data.data.page_data.total_page,
          articleListData: that.data.articleListData.concat(res.data.data.article_list)
        });
      }, true);
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
    
  }
})