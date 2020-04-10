// pages/tab/tasks/tasks.js
const app = getApp()
var util = require("../../../utils/util.js")

Page({
  data: {
    height: 0,
    supHeight: 0,
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
    selectedItem: [true, true, true, true],
    unknown: [],
    checked: [],
    toCheck: [],
    toSupvise: [],
    supOutDay: 2
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
    if(app.globalData.ifHasUserInfo){
      console.log("with userinfor")
      this.requestCheckList(this.data.chooseDate)
      this.requestSupList(this.data.date)
    }else{
      console.log("no userinfor")
      app.globalData.userId = "visitor"
      this.initVisitor()
    }
    wx.getSystemInfo({
      success: (res) => {
        var tempHeight = res.windowHeight + this.data.unknown.length * 50 + this.data.toCheck.length * 50 + this.data.checked.length * 50
        this.setData({
          height: tempHeight
        })
      }
    })
  },
  initVisitor: function(){
    // nothing to do
  },
  // 请求列表
  // 打卡
  requestCheckList: function(chooseDate) {
    console.log(chooseDate)
    var that = this
    req = {
      url: '/check/listDayCheck',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
        "date": chooseDate
      },
      success: res => {
        console.log(res.data)
        that.setData({
          unknown: res.data.unknown,
          toCheck: res.data.toCheck,
          checked: res.data.checked,
          supOutDay: res.data.supOutDay,
        })
        console.log(res);
        console.log(that.data);
      },
      fail: err => {
        console.log(err)
      }
    }
    console.log(req)
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  // 监督
  requestSupList: function(chooseDate) {  // 调用时chooseDate是当前日期（今天）
    var startDate = new Date(Date.parse(chooseDate.replace(/-/g, '/'))); //字符串格式转换为日期格式
    var day = this.data.supOutDay; //定义过期天数​
    // 计算结束日期                   
    var value = startDate.getTime(); //将开始时间转为毫秒            
    value -= day * (24 * 3600 * 1000); //将天数转换成毫秒后与开始时间相加得到结束时间的毫秒数         
    var endDate = new Date(value); //将得到的毫秒数转换为日期
    endDate = util.formatTime(endDate)
    console.log(chooseDate)
    console.log(endDate)
    var that = this
    req = {
      url: '/supervise/needToSupervise',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
        "startDate": endDate,
        "endDate": chooseDate
      },
      success(res) {
        console.log(res.data)
        that.setData({
          toSupvise: res.data
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
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
    var tempDate = [year, month, day].map(util.formatNumber).join('-')
    var that = this
    this.setData({
      chooseDate: tempDate
    })
    this.requestCheckList(this.data.chooseDate)
  },
  // 月份跳转
  prev: function(event) {
    console.log(event.detail)
    var month = this.data.nowDate.getMonth() + 1
    var year = this.data.nowDate.getFullYear()
    if (event.detail.currentMonth == month && event.detail.currentYear == year) {
      this.dayClickStyle(this.data.nowDate.getDate())
    } else {
      this.dayClickStyle(0)
    }
  },
  dateChange: function(event) {
    console.log(event.detail)
    var month = this.data.nowDate.getMonth() + 1
    var year = this.data.nowDate.getFullYear()
    if (event.detail.month == month && event.detail.year == year) {
      this.dayClickStyle(this.data.nowDate.getDate())
    } else {
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
  next: function(event) {
    console.log(event.detail)
    var month = this.data.nowDate.getMonth() + 1
    var year = this.data.nowDate.getFullYear()
    if (event.detail.currentMonth == month && event.detail.currentYear == year) {
      this.dayClickStyle(this.data.nowDate.getDate())
    } else {
      this.dayClickStyle(0)
    }
  },
  dateChange: function(event) {
    console.log(event.detail)
    var month = this.data.nowDate.getMonth() + 1
    var year = this.data.nowDate.getFullYear()
    if (event.detail.month == month && event.detail.year == year) {
      this.dayClickStyle(this.data.nowDate.getDate())
    } else {
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
    var that = this
    that.setData({
      currentTab: e.detail.current
    })
    if (this.data.currentTab == 1) {}
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
  // onPageScroll: function(e) { //监听页面滚动
  //   console.log(e.scrollTop)
  //   this.setData({
  //     scrollTop: e.scrollTop
  //   })
  // },

  //跳转到新建打卡
  newTask: function() {
    if (app.globalData.ifHasUserInfo === false) {
      wx.navigateTo({
        url: '../../index/index'
      })
    }
    wx.navigateTo({
      url: './newtask/newtask',
    })
  },
  // 跳转到打卡详情
  // -已打卡情况
  detail: function(e) {
    var taskId = e.target.dataset.taskid
    var checkId = e.target.dataset.checkid
    var checkState = e.target.dataset.checkstate
    wx.navigateTo({
      url: './taskDetail/taskDetail?taskId=' + taskId + '&checkState=' + checkState + '&checkId=' + checkId,
    })
  },
  // -未打卡情况
  toCheck: function(e) {
    console.log(e.target.dataset)
    var taskId = e.target.dataset.taskid;
    var taskname = e.target.dataset.taskname;
    wx.navigateTo({
      url: './taskDetail/taskDetail?taskId=' + taskId + '&taskname=' + taskname,
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