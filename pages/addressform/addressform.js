// pages/addressform/addressform.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    name: '',
    phone: '',
    addressDetails: '',
    id: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var checked = options.isdefault==1?true:false;
    var name = options.contact;
    var phone = options.mobile;
    var addressDetails = options.address;
    var id = options.id;
    if (name) {
      this.setData({
        checked: checked,
        name: name,
        phone: phone,
        addressDetails: addressDetails,
        id: id
      })
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
  onChange({ detail }) {
    this.setData({ checked: detail });
  },
  bindPhone(value) {
    this.setData({
      phone: value.detail
    })
  },
  bindName(value) {
    this.setData({
      name: value.detail
    })
  },
  bindAddressDetails(value) {
    this.setData({
      addressDetails: value.detail.value
    })
  },
  bindaddAddr() {
    console.log(this.data.phone.length );
    let that = this;
    if ( that.data.name == '' ){
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (that.data.phone.length != 11) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (that.data.addressDetails == '') {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else {
      let params = {
        address: that.data.addressDetails,
        contact: that.data.name,
        mobile: that.data.phone,
        is_default: that.data.checked?1:0,
        address_id: that.data.id
      }
      if (that.data.id == -1) {
        util.request('GET', 'add_user_address', params, function (res) {
          console.log(res)
          // that.setData({
          //   swiperData: res.data.data
          // });
          wx.navigateBack({
            delta: 1
          })
        }, true);
      } else {
        util.request('GET', 'update_user_address', params, function (res) {
          console.log(res)
          // that.setData({
          //   swiperData: res.data.data
          // });
          wx.navigateBack({
            delta: 1
          })
        }, true);
      }
    }
  }
})