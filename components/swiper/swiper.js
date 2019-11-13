// components/base/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 轮播图配置参数
    swiperParam: {
      indicatorDots: false,
      indicatorColor: '#FFF',
      indicatorActiveColor: '#F9421E',
      autoplay: true,
      circular: true
    },
    swiperCurrent: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange: function (e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },
    goDetails(e) {
      console.log(123);
      let { currentTarget: { dataset: { flag,id } } } = e;
      if (flag==1) {
        wx.navigateTo({
          url: "../../pages/details/details?id=" + id
        });
      } else if (flag == 2 ) {
        wx.navigateTo({
          url: "../../pages/companydetails/companydetails?id=" + id
        });
      }
    }
  }
})
