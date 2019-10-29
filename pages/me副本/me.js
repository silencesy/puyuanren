var util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    array: ['','企业主', '店主', '管理者', '设计师', '工艺师', '制版师', '打样师傅', '横机师傅', '套口师傅', '平车师傅', '验片师傅', '手工师傅', '店员','会计','其他'],
    array2: ['在职','离职'],
    index: 0,
    index2: null,
    showNumber: true,
    showJog: true,
    showCompany: true,
    phoneNumber: '',
    focusphone: false,
    jop: '',
    focusjob: false,
    company: '',
    focuscompany: false,
    space: 130,
    commentNumber: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
      that.bindWorkStatus();
    });
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
  // 绑定职业
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 绑定工作状态
  bindPickerChange2: function (e) {
    console.log(e.detail.value);
    var that = this;
    let param = {
      'work_status': e.detail.value
    }
    util.request('GET', 'update_user_job', param, function (res) {
      console.log(res);
      that.setData({
        index2: e.detail.value
      });
    },true);
  },
  // 加载绑定工作状态
  bindWorkStatus() {
    var that = this;
    console.log(that.data.userInfo.work_status);
    if (that.data.userInfo.work_status == 1 || that.data.userInfo.work_status==0) {
      that.setData({
        index2: that.data.userInfo.work_status
      });
    } else {
      that.setData({
        index2: 0
      });
    }
  },
  // 手机号input框改变双向数据流
  bindMobileNumber: function (e) {
    console.log(e)
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  // 职业号input框改变双向数据流
  bindJopinfo: function (e) {
    this.setData({
      jop: e.detail.value
    })
  },
  // 工作单位input框改变双向数据流
  bindCompanyinfo: function (e) {
    this.setData({
      company: e.detail.value
    })
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
  noNumber() {
    this.setData({
      showNumber: true,
      focusphone: false
    });
  },
  // 绑定职位
  bindJop: function() {
    this.setData({
      showJog: false,
      focusjob: true
    });
  },
  yesJop() {
    var that = this;
    if (that.data.jop.length!=0) {
      let param = {
        job: that.data.jop
      }
      util.request('GET', 'update_user_job', param, function (res) {
        console.log(res);
        let obj = that.data.userInfo;
        obj.job = that.data.jop;
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
          showJog: true
        });
      }, true, function () {
        that.setData({
          showJog: true
        });
      });
    } else {
      wx.showToast({
        title: '请填写我的职业',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      that.setData({
        showJog: true
      });
    }
    
  },
  noJob() {
    this.setData({
      showJog: true
    });
  },
  // 绑定公司
  bindCompany: function() {
    this.setData({
      showCompany: false,
      focuscompany: true
    });
  }, 
  yesCompany() {
    var that = this;
    if (that.data.company.length!=0) {
      let param = {
        company: that.data.company
      }
      util.request('GET', 'update_user_job', param, function (res) {
        let obj = that.data.userInfo;
        obj.company = that.data.company;
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
          showCompany: true
        });
      }, true, function () {
        that.setData({
          showCompany: true
        });
      });
    } else {
      wx.showToast({
        title: '请填写我的工作单位',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      that.setData({
        showCompany: true
      });
    }
    
  },
  noCompany() {
    this.setData({
      showCompany: true
    });
  },
  // 评论
  comment() {
    wx.navigateTo({
      url: "../comment/comment"
    });
  },
  // 订单列表
  orderList() {
    wx.navigateTo({
      url: "../orderlist/orderlist"
    });
  },
  // 浏览记录
  browse() {
    wx.navigateTo({
      url: "../browse/browse"
    });
  },
  pay() {
    wx.navigateTo({
      url: "../payedlist/payedlist"
    });
  },
  goAddress() {
    wx.navigateTo({
      url: "../address/address"
    });
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
    this.isBind();
    // 获取数据
    this.getuserData();
    // 获取未读评论
    this.getCommentNumber();
  },
  dyfunc(){
    wx.requestSubscribeMessage({
      tmplIds: ['Wq2-oL1VPKS1eUwRm8Ify49GsUf5WmsHeNiasiomiGI'],
      success(res) { }
    })
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