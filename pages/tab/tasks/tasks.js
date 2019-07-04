// pages/tab/tasks/tasks.js
const app = getApp()
var util = require("../../../utils/util.js")

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#e83015' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#3e3e3e' }
    ],
    isHid:false,
    list01: [
      { item_id: 1 }, { item_id: 11 }, { item_id: 11 },
    ],
    list02: [
      { item_id: 1 }, { item_id: 11 }, { item_id: 11 },
    ],
    list03: [
      { item_id: 11 }, { item_id: 11 }
    ],
    selectedItem: [false, false, false]
  },
  
  hidCal: function () {
    this.setData({
      isHid: !this.data.isHid,
    })
  },

//item展开
  // 展开折叠选择  
  changeToggle: function (e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedItem[index]) {
      this.data.selectedItem[index] = false;
    } else {
      this.data.selectedItem[index] = true;
    }

    this.setData({
      selectedItem: this.data.selectedItem
    })
  },
  onLoad: function () {
    var that = this;
    var time = util.formatTime(new Date());
    this.setData({
      time: Time,
    });  

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
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
  //顶部切换页面
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onPageScroll: function (e) {//监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  //跳转到新建打卡
    newtask1: function () {
    wx.navigateTo({
      url: './newtask/newtask',
    })
  },

    //跳转到打卡详情
    detail_btn: function () {
    wx.navigateTo({
      url: './taskDetail/taskDetail',
    })
  },
  //跳转到监督详情
  detail_btn_s: function () {
    wx.navigateTo({
      url: './superiseDetail/superisetaskDetail',
    })
  }
})
