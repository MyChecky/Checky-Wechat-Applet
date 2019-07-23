//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var that = this
        // 获取code
        that.globalData.code=res.code
        console.log("获取到code：" +res)
        // 获取地址
        wx.getLocation({
          type: 'gcj02',
          success: function(res) {
            console.log("获取到经纬度："+res)
            that.globalData.location = res
          },
        })
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
              console.log("再次登陆获取信息" + res)
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
  
  request: function(url,method,data,callback,error){
    wx.request({
      url: this.base+url,
      method:method==null?'POST':method,
      data:data,
      success: res=>{
        callback(res.data)
      },
      fail: err=>{
        error(err)
      }
    })
  },

  requestWithAuth: (url,method,data,callback,error,header) => {
    if(!header){
      header = {} 
    }
    header['sessionKey'] = getApp().globalData.sessionKey
    header['userId'] = getApp().globalData.userId
    wx.request({
      url: this.base+url,
      method: method?'POST':method,
      data: data,
      header: header,      
      success: res=>{
        if (res.statusCode == 403) dealForbid()
        callback(res)
      },
      fail: res=>{
        error(res)
      }
    })
  },

  dealForbid: ()=>{

  },

  globalData: {
    code:null,
    userInfo: null,
    base: "http://192.168.1.106",
    port: "8080",
    curPages: null,
    location:{},
    openId:"",
    sessionKey:"",
    types: [],
    date: util.formatTime(new Date())
  }
})