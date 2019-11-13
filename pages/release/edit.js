// pages/release/edit.js
var util = require('../../utils/util.js');
Page({
  data: {
    enterprise_name: '',
    enterprise_culture: '',
    enterprise_scale: '',
    enterprise_desc: '',
    enterprise_address: '',
    enterprise_contact: '',
    enterprise_mobile: '',
    enterprise_demand: '',
    img_src: '',
    enterprise_id: null
  },
  onLoad: function (options) {
    this.setData({
      enterprise_id: options.id
    }, function () {
      this.getData();
    })
  },
  getData() {
    var that = this;
    let params = {
      id: that.data.enterprise_id
    }
    util.request('GET', 'get_enterprise_detail', params, function (res) {
      let { enterprise_name,
        enterprise_culture,
        enterprise_scale,
        enterprise_desc,
        enterprise_address,
        enterprise_contact,
        enterprise_mobile,
        enterprise_demand,
        img_src } = res.data.data;
      that.setData({
        enterprise_name,
        enterprise_culture,
        enterprise_scale,
        enterprise_desc,
        enterprise_address,
        enterprise_contact,
        enterprise_mobile,
        enterprise_demand,
        img_src
      })
    });
  },
  deleteEnterpriseImg() {
    this.setData({
      img_src: ''
    })
  },
  chooseeEnterpriseImage() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://www.keaiywl.com/puyuan/public/index.php/Index/Api/upload_file',
          filePath: tempFilePaths[0],
          name: 'img_src',
          success(res) {
            let img_src = JSON.parse(res.data).data;
            that.setData({
              img_src
            })
          }
        })
      }
    })
  },
  enterprise_name(value) {
    this.setData({
      enterprise_name: value.detail
    })
  },
  enterprise_culture(value) {
    this.setData({
      enterprise_culture: value.detail
    })
  },
  enterprise_scale(value) {
    this.setData({
      enterprise_scale: value.detail
    })
  },
  enterprise_desc(value) {
    this.setData({
      enterprise_desc: value.detail
    })
  },
  enterprise_address(value) {
    this.setData({
      enterprise_address: value.detail
    })
  },
  enterprise_contact(value) {
    this.setData({
      enterprise_contact: value.detail
    })
  },
  enterprise_mobile(value) {
    this.setData({
      enterprise_mobile: value.detail
    })
  },
  enterprise_demand(value) {
    this.setData({
      enterprise_demand: value.detail
    })
  },
  submit2(e) {

    var that = this;
    if (!that.data.enterprise_name) {
      wx.showToast({
        title: '请填写企业名称！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (!that.data.enterprise_culture) {
      wx.showToast({
        title: '请填写企业文化！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (!that.data.enterprise_scale) {
      wx.showToast({
        title: '请填写企业规模！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (!that.data.enterprise_desc) {
      wx.showToast({
        title: '请填写企业简介！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (!that.data.enterprise_address) {
      wx.showToast({
        title: '请填写企业地址！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (!that.data.enterprise_contact) {
      wx.showToast({
        title: '请填写联系人！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (that.data.enterprise_mobile.length != 11) {
      wx.showToast({
        title: '请填写联系电话！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (!that.data.enterprise_demand) {
      wx.showToast({
        title: '请填写当下需求！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else if (!that.data.img_src) {
      wx.showToast({
        title: '请选择企业logo！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    } else {
      let isBindFlag = wx.getStorageSync('is_bind');
      if (isBindFlag == 0) {
        wx.navigateTo({
          url: "../../pages/bind/bind?id=" + 'fb'
        })
      } else {
        // enterprise_name: '',
        // enterprise_culture: '',
        // enterprise_scale: '',
        // enterprise_desc: '',
        // enterprise_address: '',
        // enterprise_contact: '',
        // enterprise_mobile: '',
        // enterprise_demand: '',
        // img_src: ''
        let params = that.data;
        util.request('GET', 'update_my_enterprise', params, function (res) {
          wx.navigateBack({//返回
            delta: 1
          })
        });
      }
    }
  }
})