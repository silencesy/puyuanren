// pages/release/release.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    describe: '',
    phone: '',
    index: 0,
    title: '濮院人',
    images: [],
    right: false,
    imgType: 'sytstem'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList();
    this.getdata();
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
    this.setData({
      right: false
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  getdata() {
    var that = this;
    util.request('GET', 'get_article_image_v2', {}, function (res) {
      // https://www.keaiywl.com//puyuan/public/static/upload/article///
      var data = res.data.data;
      data.forEach((item)=>{
        item.img_src1 = 'https://www.keaiywl.com//puyuan/public/static/upload/article///' + item.img_src1;
      })
      that.setData({
        articleImage: data
      });
    });
  },
  goPayList() {
    var that = this;
    let isBindFlag = wx.getStorageSync('is_bind');
    if (isBindFlag == 0) {
      wx.navigateTo({
        url: "../../pages/bind/bind?id=" + 'fb'
      })
    } else {
      if (that.data.describe.length == 0) {
        wx.showToast({
          title: '请填写你的需求！',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      }
      // else if (that.data.index == 0) {
      //   wx.showToast({
      //     title: '请选择分类！',
      //     icon: 'none',
      //     duration: 1000,
      //     mask: true
      //   });
      // } 
      else if (that.data.phone.length != 11) {
        wx.showToast({
          title: '请填正确手机号码！',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      } else if (that.data.images.length == 0) {
        wx.showToast({
          title: '请选择图片！',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      } else {
        var param = {
          title: that.data.title,
          description: that.data.describe,
          user_phone: that.data.phone,
          cate_id: that.data.index,
          img_src1: that.data.images[0],
          img_src2: that.data.images[1] || '',
          img_src3: that.data.images[2] || ''
        }
        wx.navigateTo({
          url: "../../pages/paylist/paylist?title=" + param.title + '&description=' + param.description + '&user_phone=' + param.user_phone + '&cate_id=' + param.cate_id + '&img_src1=' + param.img_src1 + '&img_src2=' + param.img_src2 + '&img_src3=' + param.img_src3
        });
        setTimeout(function(){
          that.reset();
        },2000);
      }
    }
  },
  chooseImage() {
    const that = this;
    wx.chooseImage({
      count: that.data.imgType == 'sytstem' ? 3 : 3-that.data.images.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var imgData = that.data.imgData;
        var tempFilePaths = res.tempFilePaths;
        const promiseArr = []
        tempFilePaths.map(path => {
          let filePath = path;
          let suffix = /\.[^\.]+$/.exec(filePath)[0];
          promiseArr.push(new Promise((reslove, reject) => {
            wx.uploadFile({
              url: 'https://www.keaiywl.com/puyuan/public/index.php/Index/Api/upload_file',
              filePath: path,
              name: 'img_src',
              success(res) {
                reslove(JSON.parse(res.data).data)
              }
            })
          }))
        })
        Promise.all(promiseArr).then(res => {
          var images = that.data.images;
          var imgType = that.data.imgType;
          if (imgType==='diy') {
            images = images.concat(res);
          } else {
            images = res;
          }
          
          that.setData({
            images: images,
            imgType: 'diy',
            index: 0
          })
        })
        
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      describe: '',
      phone: '',
      index: 0,
      title: '濮院人',
      images: [],
      right: false,
      imgType: 'sytstem'
    },function(){
      wx.stopPullDownRefresh();
    })
    
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
  // 获取分类数据
  getCateList: function () {
    var that = this;
    util.request('GET', 'get_cate_list', that.data.getCateListParam, function (res) {
      var lastData = res.data.data.cate_list;
      var arr = [''];
      for (var i = 0; i < lastData.length; i++) {
        arr.push(lastData[i].name);
      }
      that.setData({
        cateListData: arr
      });
    });
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    });
  },
  checkPhone(text) {
    return text.match(/\d{11}/g);
  },
  describe(value) {
    let text = value.detail.value;
    var phone_list = this.checkPhone(text) || '';
    var yse_phone = []
    for (var i = 0; i < phone_list.length; i++) {
      if (phone_list[i].length == 8 || phone_list[i].length == 7 || phone_list[i].length == 11) {
        yse_phone.push(phone_list[i])
      }
    }
    if (yse_phone.length > 0) {
      this.setData({
        describe: value.detail.value,
        phone: yse_phone[0]
      })
    } else {
      this.setData({
        describe: value.detail.value
      })
    }
      
  },
  phone(value) {
    this.setData({
      phone: value.detail
    })
  },
  deleteImg(e) {
    var index = e.currentTarget.dataset.id;
    var iamgesCopy = this.data.images;
    iamgesCopy.splice(index,1);
    this.setData({
      images: iamgesCopy
    })
  },
  chooseImg(e) {
    var id = e.currentTarget.dataset.id;
    var src = e.currentTarget.dataset.src;
    var iamgesCopy = [];
    iamgesCopy.push(src);
    this.setData({
      images: iamgesCopy,
      index: id,
      right: false,
      imgType: 'sytstem'
    })
  },
  toggleRightPopup() {
    console.log(123);
  },
  deleteImg(e) {
    console.log(e.target.dataset.index);
    let index = e.target.dataset.index;
    let images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    })
  },
  showImg() {
    var images = this.data.images;
    if (images.length<3) {
      this.setData({
        right: true
      })
    }
    
  },
  reset() {
    this.setData({
      describe: '',
      phone: '',
      index: 0,
      images: []
    })
  },
  submit() {
    var that = this;
    let isBindFlag = wx.getStorageSync('is_bind');
    if (isBindFlag == 0) {
      wx.navigateTo({
        url: "../../pages/bind/bind?id=" + 'fb'
      })
    } else {
      if (that.data.describe.length == 0) {
        wx.showToast({
          title: '请填写你的需求！',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      } 
      // else if (that.data.index == 0) {
      //   wx.showToast({
      //     title: '请选择分类！',
      //     icon: 'none',
      //     duration: 1000,
      //     mask: true
      //   });
      // } 
      else if (that.data.phone.length != 11) {
        wx.showToast({
          title: '请填正确手机号码！',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      } else if (that.data.images.length == 0) {
        wx.showToast({
          title: '请选择图片！',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      } else {
        var param = {
          title: that.data.title,
          description: that.data.describe,
          user_phone: that.data.phone,
          cate_id: that.data.index,
          img_src1: that.data.images[0],
          img_src2: that.data.images[1] || '',
          img_src3: that.data.images[2] || ''
        }
        util.request('GET', 'add_user_article', param, function (res) {
          console.log(res);
          if(res.data.status == -2) {
            wx.showToast({
              title: '亲，每天只能免费发布一条信息哟！',
              icon: 'none',
              duration: 5000,
              mask: true
            });
          } else {
            wx.setStorageSync('goTop', 1);
            wx.showToast({
              title: '发布成功！',
              icon: 'none',
              duration: 3000,
              mask: true
            });
            setTimeout(function () {
              that.reset();
              wx.switchTab({
                url: '/pages/releasecolumn/releasecolumn'
              })
            }, 3000);
          }
        });
      }
    }
   
  }
})