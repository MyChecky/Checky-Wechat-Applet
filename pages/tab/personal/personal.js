// pages/tab/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    ifAgree: true,
    hasUserInfo: false,
    loged: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    "itemList": [{
        "subItemList": [{
            "name": "好友",
            "url": "./friend/friend",
            "param": "",
            "icon": "fa-address-book-o"
          },
          {
            "name": "动态",
            "url": "./essay/essay",
            "param": "",
            "icon": "fa-globe"
          },
          {
            "name": "账户余额",
            "url": "./money/money",
            "param": "",
            "icon": "fa-rmb"
          },
          {
            "name": "打卡统计",
            "url": "./checkChart/checkChart",
            "param": "",
            "icon": "fa-bar-chart"
          }
        ]
      },
      {
        "subItemList": [{
            "name": "任务列表",
            "url": "./taskList/taskList",
            "param": "",
            "icon": "fa-reorder"
          },
          {
            "name": "打卡记录",
            "url": "./history/history",
            "param": "",
            "icon": "fa-history"
          },
          {
            "name": "监督记录",
            "url": "./supHistory/supHistory",
            "param": "",
            "icon": "fa-check-square-o"
          }
        ]
      },
      {
        "subItemList": [{
            "name": "申诉",
            "url": "./appeal/appeal",
            "param": "",
            "icon": "fa-exclamation-circle"
          },
          {
            "name": "举报",
            "url": "./report/report",
            "param": "",
            "icon": "fa-hand-paper-o"
          },
          {
            "name": "设置",
            "url": "./setting/setting",
            "param": "",
            "icon": "fa-cog"
          },
          {
            "name": "反馈",
            "url": "./suggest/suggest",
            "param": "",
            "icon": "fa-pencil-square-o"
          }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log("personal已有信息")
      // this.sendInfo()
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 
      // 所以此处加入 callback 以防止这种情况 
      console.log("personal已授权，无信息")
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let loged = app.globalData.openId != ""
    this.setData({
      loged: loged,
      userInfo: app.globalData.userInfo,
    })
    console.log(this.data.hasUserInfo, this.data.loged, this.data.canIUse)
  },

  login_in: function() {
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
        console.log("log_inRes", res.data)
        if (res.data.state == "ok") {
          app.globalData.openId = res.data.openId
          app.globalData.sessionKey = res.data.sessionKey
          app.globalData.userInfo.gender = res.data.userGender
          app.globalData.userInfo.nickName = res.data.userNickname
          app.globalData.userInfo.avatarUrl = res.data.userAvatar
          console.log("globaldate", app.globalData)
          // 这里是登陆后的一些页面/控件可见性信息
          app.globalData.ifTrueMoneyAccess = res.data.ifTrueMoneyAccess
          app.globalData.ifNewTaskHighSettingAccess = res.data.ifNewTaskHighSettingAccess
          if (app.globalData.openId != "0") {
            this.setData({
              loged: true
            })
            this.selectComponent("#toast").toastShow("登录成功", "fa-check", 1000)
          } else {
            this.selectComponent("#toast").toastShow("登陆失败", "fa-remove", 1000)
          }
        } // end state == "ok"
        else if (res.data.state == "fail") {
          this.selectComponent("#toast").toastShow("未知错误，请稍后重试", "fa-remove", 1000)
        } else if (res.data.state == "insertFail") {
          this.selectComponent("#toast").toastShow("注册失败", "fa-remove", 1000)
        } else if (res.data.state == "updateFail") {
          this.selectComponent("#toast").toastShow("登陆失败", "fa-remove", 1000)
        }
      },
      fail: (err) => {
        console.log("Login_inErr", err);
        this.selectComponent("#toast").toastShow("登陆失败", "fa-remove", 1000);
      }
    })
  },

  getUserInfo: function(e) {

    if (this.data.ifAgree) {
      console.log("点击授权，可是不一定点击同意授权了", e.detail)
      if (e.detail.errMsg === "getUserInfo:fail auth deny") {
        this.selectComponent("#toast").toastShow("授权失败", "fa-remove", 1000)
      } else if (e.detail.errMsg === "getUserInfo:ok") {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        this.login_in()
      }
    } else {
      this.selectComponent("#toast").toastShow("未同意服务条款", "fa-remove", 1000)
    }
  },

  openServiceContent: function() {
    wx.navigateTo({
      url: './serviceContent/serviceContent',
    })
  },

  checkboxChange: function(e) {
    this.data.ifAgree = !this.data.ifAgree
    console.log(this.data.ifAgree)
  },

  // 跳转
  jumpTo: function(e) {
    if (app.globalData.openId === "") {
      wx.navigateTo({
        url: '../../index/index'
      })
    }
    var url = e.target.dataset.url
    var param = e.target.dataset.param
    console.log(url + '?' + param)
    wx.navigateTo({
      url: url + '?' + param,
    })
  }
})