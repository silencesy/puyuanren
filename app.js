//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 如果获取code成功则发送后台实现用户注册和登录
        console.log(res.code);
        if (res.code) {
          wx.request({
            // 调用后台地址获取openId, sessionKey, unionId
            url: 'https://www.keaiywl.com/puyuan/public/index.php/Index/Api/auth_user_by_code',
            method: 'GET',
            data: {
              authorization_code: res.code
            },
            success: function (res) {
              // console.log(res);
              if (res.data.status == 1) {
                // 设置token
                wx.setStorageSync('token', res.data.data.token);
                wx.setStorageSync('is_bind', res.data.data.is_bind);
              } else {
                console.log('获取token失败')
              }
            }
          })
        } else {
          // 登录失败
          // console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    addressId: false,
    goodsList: []
  }
})