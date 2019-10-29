var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["未读评论","我的评论"],
    commentList: [],
    flag: 0,
    param: {
      page_size: 10,
      page_num: 0
    },
    totalPage: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getComment();
    // this.getCommented();
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
    var that = this;
    if (that.data.flag == 0) {
      that.getComment();
    } else if (that.data.flag == 1) {
      that.getCommented();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  // 获取未读信息
  getComment() {
    var that = this;
    if (that.data.param.page_num != that.data.totalPage && that.data.totalPage != 0) {
      that.data.param.page_num++;
      util.request('GET', 'get_user_no_read_comment', that.data.param, function (res) {
        console.log(res)
        if (res.data.status != -1) {
          that.setData({
            totalPage: res.data.data.page_data.total_page,
            commentList: that.data.commentList.concat(res.data.data.comment_list)
          });
        }
      }, true);
    }
  },
  // 获取已读信息
  getCommented() {
    var that = this;
    if (that.data.param.page_num != that.data.totalPage && that.data.totalPage != 0) {
      that.data.param.page_num++;
      util.request('GET', 'get_user_comment', that.data.param, function (res) {
        console.log(res)
        if (res.data.status != -1) {
          that.setData({
            totalPage: res.data.data.page_data.total_page,
            commentList: that.data.commentList.concat(res.data.data.comment_list)
          });
        }
      }, true);
    }
  },
  commented(article_id) {
    var that = this;
    util.request('GET', 'set_user_comment_read', { article_id: article_id }, function (res) {
      that.setData({
        commentedList: res.data.data
      });
    });
  },
  goDetails(e) {
    this.commented(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../details/details?id=" + e.currentTarget.dataset.id
    });
  },
  onChange(event) {
    var that = this;
    var param = that.data.param;
    param.page_num = 0;
    that.setData({
      flag: event.detail.index,
      commentList: [],
      param: param
    });
    if (that.data.flag == 0){
      that.getComment();
    } else if (that.data.flag == 1) {
      that.getCommented();
    }
  }
})