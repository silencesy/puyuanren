// pages/partner/partner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',
    address: ''
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
      console.log('提交');
    }
  }
})