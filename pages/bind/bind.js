//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goBackUrl: '',
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    if (options.id == 'me'){
      this.setData({
        goBackUrl: '../me/me'
      });
    } else if (options.id == 'fb') {
      this.setData({
        goBackUrl: '../release/release'
      });
    } else if (options.id == 'shop') {
      this.setData({
        goBackUrl: '../deliverhome/deliverhome'
      });
    } else {
      this.setData({
        goBackUrl: '../home/home'
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
    
  },
  getUserInfo: function (e) {
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
    util.request('GET','update_user',param,function(res){
      wx.setStorageSync('is_bind', 1);
      if(that.data.id == 'shop') {
        wx.navigateBack({
          delta: 1
        });
      } else {
        wx.switchTab({
          url: that.data.goBackUrl
        });
      }
    });
  }
})