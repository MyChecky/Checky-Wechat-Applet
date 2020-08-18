//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that = this;

    // 登录
    wx.login({
      success: res => {
        // 获取code
        that.globalData.code = res.code
        console.log("wx.login获取到code：", res)
        // 获取地址
        wx.getLocation({
          type: 'gcj02',
          success: function(res) {
            console.log("wx.login获取到经纬度：", res)
            that.globalData.location = res
            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      that.globalData.userInfo = res.userInfo
                      console.log("wx.login wx.getSetting获取信息", that.globalData.userInfo)
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (that.userInfoReadyCallback) {
                        console.log("wx.login wx.getSetting返回较慢但即将callback")
                        that.userInfoReadyCallback(res)
                        console.log("wx.login wx.getSetting返回较慢已经callback赋值了", res)
                      }
                    }
                  })
                } else {
                  // 还没有授权过
                  console.log("还没有授权，游客模式一次启动")
                }
              }
            })
          },
        })
      }
    })
  },

  request: function(url, method, data, callback, error) {
    wx.request({
      url: this.getAbsolutePath() + url,
      method: method == null ? 'POST' : method,
      data: data,
      success: res => {
        callback(res.data)
      },
      fail: err => {
        error(err)
      }
    })
  },

  requestWithAuth: (req) => {
    // app = getApp()
    // console.log("s", app.globalData)
    // if (app.globalData.ifHasUserInfo == false){
    //   console.log("visitor")
    //   app.requestWithoutAuth(req)
    // }else{
    url = req.url
    method = req.method ? req.method : 'POST'
    data = req.data ? req.data : {}
    header = req.header
    // callback = req.success?req.success:()=>{}
    // fail = req.fail?req.fail:()=>{}

    return new Promise((resolve, reject) => {
      if (!header) {
        header = {}
      }
      header['sessionKey'] = getApp().globalData.sessionKey
      header['userId'] = getApp().globalData.openId
      wx.request({
        url: getApp().getAbsolutePath() + url,
        method: method ? 'POST' : method,
        data: data,
        header: header,
        success: res => {
          if (res.statusCode == 403) getApp().dealForbid(res)
          typeof resolve == 'function' && resolve(res)
        },
        fail: res => {
          typeof reject == 'function' && reject(res)
        }
      })
    })
    // } 
  },

  requestWithoutAuth: (req) => {
    url = req.url
    method = req.method ? req.method : 'POST'
    data = req.data ? req.data : {}
    header = req.header
    // callback = req.success?req.success:()=>{}
    // fail = req.fail?req.fail:()=>{}

    return new Promise((resolve, reject) => {
      wx.request({
        url: getApp().getAbsolutePath() + url,
        method: method ? 'POST' : method,
        data: data,
        success: res => {
          if (res.statusCode == 403) getApp().dealForbid(res)
          typeof resolve == 'function' && resolve(res)
        },
        fail: res => {
          typeof reject == 'function' && reject(res)
        }
      })
    })
  },

  dealForbid: (res) => {
    console.log("dealForbidHere,", res);
  },

  getAbsolutePath() {
    return this.globalData.base + ":" + this.globalData.port + this.globalData.contextPath;
  },

  globalData: {
    code: null,
    userInfo: null,
    base: "http://127.0.0.1",
    //base: "http://188.131.172.171",
    //base: "https://www.ycloudtech.cn",
    //port: "8090",
    port: "8099",
    contextPath: "/Checky",
    curPages: null,
    location: {},
    openId: "",
    sessionKey: "",
    types: [],
    date: util.formatTime(new Date()),
    appId: "wx5f1aa0197013dad6",
    maxPostFileSize: 50000000, // 最大文件上传字节数

    ifTrueMoneyAccess: false,
    ifNewTaskHighSettingAccess: false
  }
})