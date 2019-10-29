var util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    phoneNumber: '',
    showNumber: true,
    space: 130,
    focusphone: false,
    commentNumber: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  onShow: function () {
    this.isBind();
    // 获取数据
    this.getuserData();
    this.getCommentNumber();
  },
  getCommentNumber() {
    var that = this;
    util.request('GET', 'get_user_no_read_comment_num', {}, function (res) {
      console.log(res)
      that.setData({
        commentNumber: res.data.data
      });
    });
  },
  // 是否绑定数据
  isBind() {
    let isBindFlag = wx.getStorageSync('is_bind');
    if (isBindFlag==0) {
      wx.navigateTo({
        url: "../../pages/bind/bind?id=" + 'me'
      })
    }
  },
  // 获取数据
  getuserData() {
    var that = this;
    util.request('GET', 'get_user', {}, function (res) {
      console.log(res);
      that.setData({
        userInfo: res.data.data
      });
    });
  },
  // 手机号input框改变双向数据流
  bindMobileNumber: function (e) {
    console.log(e)
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  noNumber() {
    this.setData({
      showNumber: true,
      focusphone: false
    });
  },
  // 绑定手机号
  bindNumber: function () {
    this.setData({
      showNumber: false,
      focusphone: true
    });
  },
  yesNumber() {
    var that = this;
    if (that.data.phoneNumber.length == 11) {
      let param = {
        mobile: that.data.phoneNumber
      }
      util.request('GET', 'update_user_job', param, function (res) {
        let obj = that.data.userInfo;
        obj.mobile = that.data.phoneNumber;
        that.setData({
          userInfo: obj
        });
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        that.setData({
          showNumber: true,
          focusphone: false
        });
      }, true, function () {
        that.setData({
          showNumber: true,
          focusphone: false
        });
      });
    } else {
      wx.showToast({
        title: '填写正确手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      that.setData({
        showNumber: true,
        focusphone: false
      });
    }
  },
  goOrder() {
    wx.navigateTo({
      url: "../payedlist/payedlist"
    });
  },
  goComment() {
    wx.navigateTo({
      url: "../comment/comment"
    });
  },
  goCooperation() {
    wx.navigateTo({
      url: "../partner/partner"
    });
  }
})