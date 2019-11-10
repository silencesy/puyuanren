const app = getApp();
Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    articleListData: {            // 属性名
      type: Array,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: []    // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    isShowBottom: {
      type: Boolean,
      value: true
    },
    isShowDelete: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打电话
    callPhone(e) {
      console.log(e.currentTarget.dataset.title);
      let text = e.currentTarget.dataset.title;
      var phone_list = this.checkPhone(text);
      var yse_phone = []
      for (var i = 0; i < phone_list.length; i++) {
        if (phone_list[i].length == 8 || phone_list[i].length == 7 || phone_list[i].length == 11) {
          yse_phone.push(phone_list[i])
        }
      }
      if (yse_phone.length == 1) {
        wx.makePhoneCall({
          phoneNumber: yse_phone[0]
        })
      } else {
        if (yse_phone.length != 0) {
          wx.makePhoneCall({
            phoneNumber: yse_phone[0]
          })
        }
      }
      console.log(yse_phone);
    },
    checkPhone(text) {
      return text.match(/\d{11}/g);
    },
    // 展示大图
    showBigImg(e) {
      console.log(e);
      var src = e.currentTarget.dataset.srcone;//获取data-src
      var src2 = e.currentTarget.dataset.srctwo;//获取data-src
      var src3 = e.currentTarget.dataset.srcthree;//获取data-src
      var index = e.currentTarget.dataset.index;//获取data-src
      var imgList = [];//获取data-list
      if (src) {
        imgList.push(src);
      } 
      if (src2) {
        imgList.push(src2);
      }
      if (src3) {
        imgList.push(src3);
      }
      //图片预览
      wx.previewImage({
        current: imgList[index], // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    },
    showBigAvatar(e) {
      var src = e.currentTarget.dataset.url;
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src] // 需要预览的图片http链接列表
      })
    },
    // 删除文章
    deleteArticle(e) {
      let id = e.currentTarget.dataset.id;
      let index = e.currentTarget.dataset.index;
      this.triggerEvent('myevent', {id,index})
    },
    // 进入文章详情
    goDetails(e) {
      let isBindFlag = wx.getStorageSync('is_bind');
      if (isBindFlag == 0) {
        wx.navigateTo({
          url: "../../pages/bind/bind"
        })
      } else {
        if (this.properties.isShowBottom) {
          wx.navigateTo({
            url: "../../pages/details/details?id=" + e.currentTarget.dataset.id
          });
        }
      }
      // console.log(e.currentTarget.dataset.id);
      
    }
  }
})