// pages/partner/partner.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',
    address: '',
    checked: false
  },
  changeusername({ detail}) {
    this.setData({
      username: detail
    })
  },
  changenumber({ detail}) {
    this.setData({
      phone: detail
    })
  },
  changeaddress({ detail }) {
    this.setData({
      address: detail
    })
  },
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  submitForm() {
    var that = this;
    if (that.data.username.length == 0) {
      wx.showToast({
        title: '请输入名字！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (that.data.phone.length != 11) {
      wx.showToast({
        title: '请填正确手机号码！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (that.data.address == 0) {
      wx.showToast({
        title: '请输入代理地址！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else {
      let params = {
        name: that.data.username,
        mobile: that.data.phone,
        address: that.data.address,
        has_license: that.data.checked
      }

      util.request('GET', 'add_my_partner', params, function (res) {
        wx.showToast({
          title: '提交成功，等待工作人员联系您！',
          icon: 'none',
          duration: 3000,
          mask: true
        })
      });
      console.log(params);
    }
  }
})