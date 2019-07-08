// pages/tab/tasks/tasks.js
const app = getApp()
var util = require("../../../utils/util.js")

Page({
  data: {
    userInfo: {},
    date: "",
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
        background: '#3e3e3e'
      }
    ],
    isHid: false,
    selectedItem: [false, false, false, false],
    unknown: [{
        taskId: "123",
        checkId: '123',
        taskTitle: "背单词计划",
        taskContent: "每天背40个加油！"
      },
      {
        taskId: "321",
        checkId: '123',
        taskTitle: "背单词计划",
        taskContent: "每天背50个加油！长文本测试啊啊啊啊啊啊啊啊啊啊啊啊啊"
      }
    ],
    checked: [{
        taskId: "123",
        checkId: '123',
        taskTitle: "背单词计划",
        taskContent: "每天背40个加油！"
      },
      {
        taskId: "321",
        checkId: '123',
        taskTitle: "背单词计划",
        taskContent: "每天背50个加油！长文本测试啊啊啊啊啊啊啊啊啊啊啊啊啊"
      }
    ],
    toCheck: [{
        taskId: "123",
        taskTitle: "背单词计划",
        taskContent: "每天背40个加油！"
      },
      {
        taskId: "321",
        taskTitle: "背单词计划",
        taskContent: "每天背50个加油！长文本测试啊啊啊啊啊啊啊啊啊啊啊啊啊"
      }
    ],
    toSupvise: [{
        taskTitle: '背单词',
        taskContent: "每天背50个加油！长文本测试啊啊啊啊啊啊啊啊啊啊啊啊啊",
        date: '2019-07-02',
        checkId: '123',
        taskId: '123'
      },
      {
        taskTitle: '健身',
        taskContent: "每天背50个加油！长文本测试啊啊啊啊啊啊啊啊啊啊啊啊啊",
        date: '2019-07-01',
        checkId: '321',
        taskId: '321'
      }
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
  },
  onShow: function(){
    this.requestList()
  },
  requestList: function(){
    var that = this
    this.setData({
      date: app.globalData.date,
    })
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '/check/listDayCheck',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
        "date": app.globalData.date
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
  //给点击的日期设置一个背景颜色
  dayClick: function(event) {
    let clickDay = event.detail.day
    console.log(clickDay)
    let changeDay = `dayStyle[1].day`
    let changeBg = `dayStyle[1].background`
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "#333"
    })
    // wx.request({
    //   url: '',
    //   data:{
    //   }
    // })
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