var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
    this.getCateList();
    this.isBind();
  },
  // 是否绑定数据
  isBind() {
    let isBindFlag = wx.getStorageSync('is_bind');
    if (isBindFlag == 0) {
      wx.navigateTo({
        url: "../../pages/bind/bind?id=" + 'class'
      })
    }
  },
  // 获取分类数据
  getCateList: function () {
    var that = this;
    util.request('GET', 'get_cate_list', that.data.getCateListParam, function (res) {
      console.log(res);
      that.setData({
        cateListData: res.data.data
      });
    });
  },
  // 进入分类列表页
  cateArticleList(e) {
    let isBindFlag = wx.getStorageSync('is_bind');
    if (isBindFlag == 0) {
      wx.navigateTo({
        url: "../../pages/bind/bind?id=" + 'home'
      })
    } else {
      wx.navigateTo({
        url: "../../pages/category/category?id=" + e.currentTarget.dataset.id
      })
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
    
  }
})