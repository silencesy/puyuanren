// components/company_item/company_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    companyListData: {            // 属性名
      type: Array,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: []    // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    isShow: {
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
    goDetails(e) {
      console.log(e);
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "../../pages/companydetails/companydetails?id=" + id
      });
    },
    deleteCompany(e) {
      let id = e.currentTarget.dataset.id;
      let index = e.currentTarget.dataset.index;
      console.log(id,index);
      this.triggerEvent('deleteCompany', {id,index})
    },
    editCompany(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "../../pages/release/edit?id=" + id
      })
      
    }
  }
})
