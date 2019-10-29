// pages/deliverhome/deliverhome.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 0,
    topNum: 0,
    totalPrice: 0,
    checkedGoodsNumber: 0,
    id: null,
    activeId: null,
    checkedGoodsNumber: 0,
    totalPrice: 0,
    showLayer: false,
    chooseData: [],
    countFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.getData();
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
  // 获取分类
  getData() {
    var that = this;
    let params = {
      shop_id: that.data.id
    }
    util.request('GET', 'get_shop_cate_goods', params, function (res) {
      res.data.data.forEach(function(v) {
        v.cate_id = 'i' + v.cate_id;
      });
      that.setData({
        data: res.data.data,
        activeId: res.data.data[0].cate_id
      });
    }, true);
  },
  // 点击分类
  tapClassify(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.setData({
      classifyViewed: id
    });
    setTimeout(function () {
      that.setData({
        activeId: id
      });
    }, 20);
  },
  // 商品滚动
  onGoodsScroll(e) {
    let top = e.detail.scrollTop;
    let length = this.data.data.length;
    let scrollTop = e.detail.scrollTop * 2;
    let h = 0;
    let classifySeleted;
    this.data.data.forEach(function (classify, i) {
      var _h = 80 + classify.goods_list.length * 222;
      if (scrollTop >= h) {
        classifySeleted = classify.cate_id;
      }
      h += _h;
    });
    this.setData({
      activeId: classifySeleted
    });
  },
  // 改变数量
  onChange(e) {
    let id = e.currentTarget.dataset.id;
    let flag = e.currentTarget.dataset.flag;
    let number = e.detail;
    let data = this.data.data;
    // if(flag) {
    //   this.setData({
    //     countFlag: false
    //   });
    //   this.setData({
    //     countFlag: true
    //   })
    // }
    data.forEach((v)=>{
      v.goods_list.forEach((vv)=>{
        if(vv.id == id){
          vv.sl = number
        }
      });
    });
    this.setData({
      data: data
    });
    this.setPriceAndCount(flag);
  },
  // 计算价格和数量
  setPriceAndCount(flag) {
    let checkedGoodsNumber = 0;
    let totalPrice = 0;
    let data = this.data.data;
    let chooseData = [];
    data.forEach((v) => {
      v.goods_list.forEach((vv) => {
        if (vv.sl>0) {
          checkedGoodsNumber++;
          totalPrice+=vv.price*vv.sl;
          chooseData.push(vv);
        }
      });
    });
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      checkedGoodsNumber: checkedGoodsNumber,
      totalPrice: totalPrice,
      chooseData: chooseData
    });
    // 当选中的商品为零关闭弹出框
    
    if (this.data.chooseData.length == 0) {
      this.setData({
        showLayer: false
      });
    }
    
  },
  // 展示选中商品
  showChooseGoods(){
    if (this.data.chooseData.length > 0) {
      this.setData({
        showLayer: !this.data.showLayer
      });
    }
  },
  hidelayer() {
    this.setData({
      showLayer: false
    });
  },
  // 订单确认页
  goPage() {
    let chooseData = this.data.chooseData;
    let isBindFlag = wx.getStorageSync('is_bind');
    if (chooseData.length!=0) {
      if (isBindFlag == 0) {
        wx.navigateTo({
          url: "../../pages/bind/bind?id=" + 'shop'
        })
      } else {
        app.globalData.goodsList = chooseData;
        wx.navigateTo({
          url: "../../pages/orderconfim/orderconfim"
        });
      }
      
    } else {
      wx.showToast({
        title: '请选择商品！',
        icon: 'none',
        duration: 1000,
        mask: true
      });
    }
    
  }
})