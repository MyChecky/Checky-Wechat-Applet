// pages/tab/tasks/tasks.js
const app = getApp()
var util = require("../../../utils/util.js")

Page({
  data: {
    userInfo: {},
    date: "",
    chooseDate: "",
    nowDate: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    dayStyle: [{
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#e83015'
      },
      {
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#333'
      }
    ],
    isHid: false,
    selectedItem: [false, false, false, false],
    unknown: [
    ],
    checked: [
    ],
    toCheck: [
    ],
    toSupvise: [
    ]
  },

  hidCal: function() {
    this.setData({
      isHid: !this.data.isHid,
    })
  },

  //item展开
  // 展开折叠选择  
  changeToggle: function(e) {
    var index = e.currentTarget.dataset.index
    this.data.selectedItem[index] = !this.data.selectedItem[index]
    this.setData({
      selectedItem: this.data.selectedItem
    })
  },
  onLoad: function() {
    var t = new Date()
    this.setData({
      nowDate: t,
      chooseDate: app.globalData.date,
      date: app.globalData.date
    })
  },
  onShow: function() {
    this.requestCheckList(this.data.chooseDate)
    this.requestSupList(this.data.date)
  },
  // 请求列表
  // 打卡
  requestCheckList: function(chooseDate) {
    console.log(chooseDate)
    var that = this
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '/check/listDayCheck',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
        "date": chooseDate
      },
      success(res) {
        console.log(res.data)
        that.setData({
          unknown: res.data.unknown,
          toCheck: res.data.toCheck,
          checked: res.data.checked,
          toSupvise: res.data.toSupvise
        })
      }
    })
  },
  // 监督
  requestSupList: function(chooseDate) {
    console.log(chooseDate)
    var that = this
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
        "date": chooseDate
      },
      success(res) {
        console.log(res.data)
        that.setData({
          toSupvise: res.data.toSupvise
        })
      }
    })
    this.requestCheckList(this.data.chooseDate)
  },
  // 点击日期
  dayClick: function(event) {
    let clickDay = event.detail.day
    console.log(event.detail)
    // 给点击的日期设置一个背景颜色
    let changeDay = `dayStyle[1].day`
    let changeBg = `dayStyle[1].background`
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "#333"
    })
    // 请求点击的日期的数据
    var year = event.detail.year + ''
    var month = event.detail.month + ''
    var day = event.detail.day + ''
    var that = this
    this.setData({
      chooseDate: year + '-' + month + '-' + day
    })
    this.requestCheckList(this.data.chooseDate)
  },
  // 月份跳转
  prev: function(event) {
    console.log(event.detail)
    var month = this.data.nowDate.getMonth()+1
    var year = this.data.nowDate.getFullYear()
    if (event.detail.currentMonth == month && event.detail.currentYear == year) {
      this.dayClickStyle(this.data.nowDate.getDate())
    }
    else {
      this.dayClickStyle(0)
    }
  },
  dateChange: function (event) {
    console.log(event.detail)
    var month = this.data.nowDate.getMonth() + 1
    var year = this.data.nowDate.getFullYear()
    if (event.detail.month == month && event.detail.year == year) {
      this.dayClickStyle(this.data.nowDate.getDate())
    }
    else {
      this.dayClickStyle(0)
    }
  },
  // 样式修改
  dayClickStyle: function (day) {
    // 给点击的日期设置一个背景颜色
    let changeDay0 = `dayStyle[0].day`
    let changeDay1 = `dayStyle[1].day`
    this.setData({
      [changeDay0]: day,
      [changeDay1]: day
    })
  },
  next: function(event) {
    console.log(event.detail)
    var month = this.data.nowDate.getMonth()+1
    var year = this.data.nowDate.getFullYear()
    if (event.detail.currentMonth == month && event.detail.currentYear == year) {
      this.dayClickStyle(this.data.nowDate.getDate())
    }
    else {
      this.dayClickStyle(0)
    }
  },
  dateChange: function(event) {
    console.log(event.detail)
    var month = this.data.nowDate.getMonth()+1
    var year = this.data.nowDate.getFullYear()
    if (event.detail.month == month && event.detail.year == year) {
      this.dayClickStyle(this.data.nowDate.getDate())
    }
    else {
      this.dayClickStyle(0)
    }
  },
  // 样式修改
  dayClickStyle: function(day) {
    // 给点击的日期设置一个背景颜色
    let changeDay0 = `dayStyle[0].day`
    let changeDay1 = `dayStyle[1].day`
    this.setData({
      [changeDay0]: day,
      [changeDay1]: day
    })
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //顶部切换页面
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onPageScroll: function(e) { //监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  //跳转到新建打卡
  newTask: function() {
    wx.navigateTo({
      url: './newtask/newtask',
    })
  },
  // 跳转到打卡详情
  // -已打卡情况
  detail: function(e) {
    var taskId = e.target.dataset.taskid
    var checkId = e.target.dataset.checkid
    wx.navigateTo({
      url: './taskDetail/taskDetail?taskId=' + taskId + '&checkId=' + checkId,
    })
  },
  // -未打卡情况
  toCheck: function(e) {
    var taskId = e.target.dataset.taskid
    wx.navigateTo({
      url: './taskDetail/taskDetail?taskId=' + taskId,

    })
  },
  //跳转到监督详情
  superise: function(e) {
    var taskId = e.target.dataset.taskid
    var checkId = e.target.dataset.checkid
    console.log(taskId)
    wx.navigateTo({
      url: './superiseDetail/superisetaskDetail?taskId=' + taskId + '&checkId=' + checkId,
    })
  }
})