// pages/paycompany/paycompany.js
var util = require('../../utils/util.js');
Page({
  data: {
    companyData: null
  },
  onLoad: function (options) {
    this.setData({
      companyData: options
    })
  },
  pay() {
    var that = this;
    console.log(that.data.companyData.is_advert);
    console.log(Boolean(that.data.companyData.is_advert));
    let param = {
      pay_item_id: that.data.companyData.is_advert==='true'?10:9,
      need_fp: 0
    }
    util.request('GET', 'create_order', param, function (res) {
      // console.log(res);
      let order_id = res.data.data;
      util.request('GET', 'pay_order', { order_id: order_id }, function (response) {
        var payParam = response.data.data;
        wx.requestPayment(
          {
            'timeStamp': payParam.timeStamp,
            'nonceStr': payParam.nonceStr,
            'package': payParam.package,
            'signType': payParam.signType,
            'paySign': payParam.paySign,
            'success': function (res) {
              // util.request('GET', 'query_pay_result',
              //   {
              //     order_id: order_id,
              //     title: that.data.article.title,
              //     description: that.data.article.description,
              //     user_phone: that.data.article.user_phone,
              //     cate_id: that.data.article.cate_id,
              //     img_src1: that.data.article.img_src1,
              //     img_src2: that.data.article.img_src2 || '',
              //     img_src3: that.data.article.img_src3 || ''
              //   }, function (res) {
              //     console.log(res);
              //     var tip = res.data.message;
              //     wx.showToast({
              //       title: tip,
              //       icon: 'none',
              //       duration: 3000,
              //       mask: true
              //     })
              //     setTimeout(function () {
              //       wx.navigateTo({
              //         url: "../../pages/payedlist/payedlist?id=1"
              //       });
              //     }, 3000);
              //   });
            },
            'fail': function (res) {
              // util.request('GET', 'query_pay_result',
              //   {
              //     order_id: order_id,
              //     title: that.data.article.title,
              //     description: that.data.article.description,
              //     user_phone: that.data.article.user_phone,
              //     cate_id: that.data.article.cate_id,
              //     img_src1: that.data.article.img_src1,
              //     img_src2: that.data.article.img_src2 || '',
              //     img_src3: that.data.article.img_src3 || ''
              //   }, function (res) {
              //     console.log(res);
              //     var tip = res.data.message;
              //     wx.showToast({
              //       title: tip,
              //       icon: 'none',
              //       duration: 3000,
              //       mask: true
              //     })
              //     setTimeout(function () {
              //       wx.navigateTo({
              //         url: "../../pages/payedlist/payedlist?id=0"
              //       });
              //     }, 3000);
              //   });



            },
            'complete': function (res) { }
          })
      });
    });
  },
})