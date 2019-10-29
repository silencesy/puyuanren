var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleListData: [],
    article_comment_list: [],
    isShowBottom: false,
    showComment: false,
    searchText: '',
    commentText: '',
    pid: 0,
    name: '',
    btnText: '发布',
    param: {
      page_num: 0,
      page_size: 10,
      article_id: 0
    },
    totalPage: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.isShowTimeAndBrowse);
    // 初始化参数
    var data = this.data.param;
    data.article_id = options.id;
    this.setData({
      param: data
    });
    this.getArticleList();
    this.getCommentList();
  },
  isBind() {
    let isBindFlag = wx.getStorageSync('is_bind');
    if (isBindFlag == 0) {
      console.log(123);
      var that = this;
      app.globalData.userInfo = e.detail.userInfo;
      let data = app.globalData.userInfo;
      let param = {
        avatar_url: data.avatarUrl,
        city: data.city,
        country: data.country,
        gender: data.gender,
        language: data.language,
        nick_name: data.nickName,
        province: data.province
      }
      util.request('GET', 'update_user', param, function (res) {
        wx.setStorageSync('is_bind', 1);
        wx.switchTab({
          url: that.data.goBackUrl
        });
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
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },
  bindMobileNumber() {
    console.log(e.detail.value);
  },
  showCommentFun(e) {
    console.log(123)
    var name = e.currentTarget.dataset.name == "评论" ? "评论" : "回复" + e.currentTarget.dataset.name;
    var btnText = e.currentTarget.dataset.name == "评论" ? "发布" : "回复";
    this.setData({
      showComment: true,
      pid: e.currentTarget.dataset.pid,
      name: name,
      btnText: btnText
    });
  },
  hideComment() {
    this.setData({
      showComment: false,
      searchText: ''
    });
  },
  searchInput(e) {
    console.log(e.detail.value)
    this.setData({
      commentText: e.detail.value
    })
  },
  searchTextFun() {
    var that = this;
    if (that.data.commentText) {
      var param = {
        article_id: that.data.param.article_id,
        content: that.data.commentText,
        pid: that.data.pid
      }
      util.request('GET', 'add_article_comment', param, function (res) {
        console.log(res)
        var data = that.data.param;
        data.page_num = 0;
        that.setData({
          param: data,
          article_comment_list: [],
          totalPage: -1
        });
        that.getCommentList();
        that.setData({
          showComment: false,
          searchText: ''
        });
      }, true);
    } else {
      wx.showToast({
        title: '请填写评论内容',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  // 获取文章
  getArticleList: function () {
    var that = this;
    util.request('GET', 'get_article_detail', { article_id: that.data.param.article_id}, function (res) {
      // console.log(res)
      var info = res.data.data.article;
      var arr = that.data.articleListData;
      arr.push(info)
      that.setData({
        articleListData: arr
      });
    }, true);
  },
  // 获取评论
  getCommentList: function () {
    console.log(this.data.param)
    var that = this;
    if (that.data.param.page_num != that.data.totalPage && that.data.totalPage != 0) {
      that.data.param.page_num++;
      util.request('GET', 'get_article_comment', that.data.param, function (res) {
        console.log(res);
        if(res.data.status!=-1) {
          that.setData({
            totalPage: res.data.data.page_data.total_page,
            article_comment_list: that.data.article_comment_list.concat(res.data.data.article_comment_list)
          });
        }
      }, true);
    }
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
    this.getCommentList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})