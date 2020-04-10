//index.js 
//获取应用实例 
const app = getApp()

Page({
  data: {
    motto: 'Checky, check everyday!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ifAgree: true,
  },
  // 事件处理函数
  // 向后台发送用户信息
  sendInfo: function () {
    if(this.data.ifAgree){
      this.login_in();
    }else{
      this.selectComponent("#toast").toastShow("未同意服务条款", "fa-remove", 1000)
    }
  },
  login_in:function(){
    console.log("准备发送的数据：")
    console.log(app.globalData)
    this.selectComponent("#toast").toastShow2("稍等", "fa-spinner fa-pulse")
    // 向后台发送
    wx.request({
      url: app.getAbsolutePath() + '/wechat/login',
      method: 'POST',
      data: {
        "code": app.globalData.code,
        "userInfo": app.globalData.userInfo,
        "location": app.globalData.location,
        "baseIp": app.getAbsolutePath(),
      },
      success: (res) => {
        console.log(res.data)
        app.globalData.notLoged = false
        app.globalData.ifHasUserInfo = true
        app.globalData.openId = res.data.states
        app.globalData.sessionKey = res.data.sessionKey
        app.globalData.userInfo.gender = res.data.userGender
        app.globalData.userInfo.nickName = res.data.userNickname
        app.globalData.userInfo.avatarUrl = res.data.userAvatar
        console.log("globaldate", app.globalData)
        // 这里是登陆后的一些页面/控件可见性信息
        app.globalData.ifTrueMoneyAccess = res.data.ifTrueMoneyAccess
        app.globalData.ifNewTaskHighSettingAccess = res.data.ifNewTaskHighSettingAccess
        if (app.globalData.openId != "0") {
          this.selectComponent("#toast").toastShow("登录成功", "fa-check", 1000)
            wx.navigateBack({
              delta: 2,
            })
        }
        else {
          this.selectComponent("#toast").toastShow("登陆失败", "fa-remove", 1000)
        }
      },
      fail: (err) => {
        this.selectComponent("#toast").toastShow("登陆失败", "fa-remove", 1000)
      }
    })
  },
  openServiceContent: function () {
    wx.navigateTo({
      url: '../tab/personal/serviceContent/serviceContent',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log("已有信息")
      // this.sendInfo()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 
      // 所以此处加入 callback 以防止这种情况 
      console.log("已授权，无信息")
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      // this.sendInfo()
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理 
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function(){
    // var toast = this.selectComponent("#toast")
    // var i = 0
    // while(toast==null){
    //   var toast = this.selectComponent("#toast")
    //   console.log(i++)
    // }
    // console.log(toast)
  },
  getUserInfo: function (e) {
    console.log("点击授权，可是不一定点击同意授权了🐶🐶", e.detail)
    if (e.detail.errMsg === "getUserInfo:fail auth deny") {
      this.selectComponent("#toast").toastShow("授权失败", "fa-remove", 1000)
    } else if (e.detail.errMsg === "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  checkboxChange: function(e){
    this.data.ifAgree= !this.data.ifAgree
    console.log(this.data.ifAgree)
  }
}) 