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

    list02: [
      { item_id: 1 }, { item_id: 11 }, { item_id: 11 },
    ],
    list03: [
      { item_id: 11 }, { item_id: 11 }
    ],
    selectedItem: [false, false, false],
    unknown: [
      {
        taskId: 120,
        taskTitle: "背单词",
        taskContent: "每天被50个",
      },
      {
        taskId: 111,
        taskTitle: "背单词",
        taskContent: "每天被20个",
      },
      {
        taskId: 129,
        taskTitle: "背单词",
        taskContent: "每天被30个",
      },
    ],
    checked: [{
      taskId: 100,
      taskTitle: "运动",
      checkState:1,
    },
    {
      taskId: 190,
      taskTitle: "不运动",
      checkState: 0,
    }],
    toCheck: [
      {
        taskId: 122,
        taskTitle: "好好学习",
        taskContent: "每天看书4小时",
      },
      {
        taskId: 123,
        taskTitle: "不学习",
        taskContent: "每天玩耍"
      },
    ]
  },
  
  hidCal: function () {
    this.setData({
      isHid: !this.data.isHid,
    })
  },

  onLoad: function () {
    var that = this;
    var time = util.formatTime(new Date());
    this.setData({
      time: time,
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

    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '/check/listDayCheck',
      method: 'POST',
      data:{
        "userId":app.globalData.openId,
        "date": app.globalData.date
      },
      success(res){
        console.log(res.data)
        that.setData({
          unknown: res.data.unknown,
          toCheck: res.data.toCheck,
          checked: res.data.checked
        })
      }
    })
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
    detail_btn: function (e) {
      var id = e.currentTarget.id
      if(this.data.checkId){
        this.data.checkId = e.currentTarget.dataset.checkId;
        wx.navigateTo({
          url: './taskDetail/taskDetail?id=' + id + '&checkId' + checkId,
        })

      }else{
        this.data.checkId = null;
        wx.navigateTo({
          url: './taskDetail/taskDetail?id=' + id,
        })
      }
      
  },
  //跳转到监督详情
  detail_btn_s: function () {
    wx.navigateTo({
      url: './superiseDetail/superisetaskDetail',
    })
  }
  
})
