// pages/tab/tasks/tasks.js
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#e83015' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#3e3e3e' }
    ]
  },

  //给点击的日期设置一个背景颜色
  dayClick: function (event) {
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "#3e3e3e"
    })
    wx.request({
      url: '',
      data:{

      }
    })
  },

// <<<<<<< HEAD
//     /** 
//      * 获取系统信息 
//      */
//     wx.getSystemInfo({
//       success: function (res) {
//         that.setData({
//           winWidth: res.windowWidth,
//           winHeight: res.windowHeight
//         });
// =======
 //点击新建打卡事项跳转
 gotoPage: function(){
   wx.navigateTo({
     url: '../newtask/newtask',
   })
 },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
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
    * 滑动切换tab 
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },  
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
    swichNav: function (e) {

    var that = this;
    if (this.data.currentTab == 0) {
      wx.navigateTo({
        url: './tasks',
      })
    }
    if (this.data.currentTab == 1) {
      that.setData({
        currentTab: e.target.dataset.current,
      })
      wx.navigateTo({
        url: './newtask/newtask',
      })
    }
  },  
  newtask: function(){
    wx.navigateTo({
      url: './newtask/newtask',
    })
  }
  
})
