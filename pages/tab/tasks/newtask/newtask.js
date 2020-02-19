// pages/tab/tasks/newtask/newtask.js
const app = getApp()
var util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    numOfSus: [{
      "value": 0
    }, {
      "value": 1
    }, {
      "value": 3
    }, {
      "value": 5
    }, {
      "value": 7
    }],
    num: 0,
    types: [],
    repeatDate: [{
        "name": "日",
        "value": 0
      },
      {
        "name": "一",
        "value": 1
      },
      {
        "name": "二",
        "value": 2
      },
      {
        "name": "三",
        "value": 3
      },
      {
        "name": "四",
        "value": 4
      },
      {
        "name": "五",
        "value": 5
      },
      {
        "name": "六",
        "value": 6
      }
    ],
    chooseRepeat: null,
    index: -1,
    array: [],
    startlimit: app.globalData.date,
    endlimit: "",
    startTime: app.globalData.date,
    endTime: app.globalData.date,
    moneyType: ['账户余额', '试玩余额'],
    moneyTypeIndex: 0,
    money: 0,

    allowHighChoose: 1,
    minPass: 0.5,
    minPassChoose: [{
      "value": 0.5
    }, {
      "value": 0.6
    }, {
      "value": 0.7
    }, {
      "value": 0.8
    }, {
      "value": 0.9
    },{
      "value": 1.0
    }],
    minCheck: 0.5,
    minCheckChoose: [{
      "value": 0.5
    }, {
        "value": 0.6
      }, {
        "value": 0.7
      }, {
        "value": 0.8
      }, {
        "value": 0.9
      }, {
        "value": 1.0
      }],
    minCheckTypeIndex: 0,
    minCheckTypeChoose: ["proportion", "number"],
    supervisorTypeIndex: 0,
    supervisorType: ["完全随机", "熟悉的人", "陌生人"],
    ifAreaIndex: 0,
    ifAreaType: ["完全随机", "附近的人", "不在附近"],
    ifHobbyIndex: 0,
    ifHobbyType: ["完全随机", "爱好相似", "不同爱好"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '新建任务',
    })
    req = {
      url: '/task/getIfHighSetting',
      method: 'POST',
      data: {
        userId: app.globalData.openId
      },
      success: res => {
        console.log(res.data)
        this.setData({
          allowHighChoose: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
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
    this.setData({
      types: app.globalData.types,
      endlimit: this.getEndLimitDate(new Date()),
    })
  },
  // 格式化二位数
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  // 计算结束日期
  getEndLimitDate(date){
    var that = this;
    var year = date.getFullYear()
    var month = date.getMonth()
    if(month < 9){
      month = month + 4
    }else{
      year = year + 1;
      month = month - 8;
    }
    const day = date.getDate()
    return [year, month, day].map(this.formatNumber).join('-')
  },
  // 获取类型
  getType: function() {
    wx.navigateTo({
      url: '../type/type',
    })
  },
  // 获取数据
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerStartTime: function(e) {
    var endlimit = this.getEndLimitDate(new Date(e.detail.value))
    this.setData({
      startTime: e.detail.value,
      endlimit: endlimit,
    })
  },
  bindPickerEndTime: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindMoneyType: function (e) {
    this.setData({
      moneyTypeIndex: e.detail.value
    })
  },
  bindNum: function(e) {
    this.setData({
      num: e.detail.value
    })
  },
  bindRepeatDate: function(e) {
    this.setData({
      chooseRepeat: e.detail.value
    })
  },
  bindTitle: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  bindMoney: function(e) {
    this.setData({
      money: e.detail.value
    })
  },
  //后期拓展选择
  bindMinPass: function (e) {
    this.setData({
      minPass: e.detail.value
    })
  },
  bindMinCheckType: function (e) {
    this.setData({
      minCheckTypeIndex: e.detail.value
    })
  },
  bindMinCheck: function (e) {
    this.setData({
      minCheck: e.detail.value
    })
  },
  bindSupervisorType: function (e) {
    this.setData({
      supervisorTypeIndex: e.detail.value
    })
  },
  bindAreaType: function (e) {
    this.setData({
      ifAreaIndex: e.detail.value
    })
  },
  bindHobbyType: function (e) {
    this.setData({
      ifHobbyIndex: e.detail.value
    })
  },

  // 发送信息
  sendForm: function() {
    this.data.money=10*this.data.num
    if (this.data.money <= 0) {
      this.data.money = 10
      // this.selectComponent("#toast").toastShow('无效金额', 'fa-exclamation-circle', 2000)
    }
    if (this.data.title == "" || this.data.index < 0 || this.data.startTime == "" || this.data.endTime == "" || this.data.chooseRepeat == null) {
      this.selectComponent("#toast").toastShow('必要信息不可为空', 'fa-exclamation-circle', 2000)
    } 
    else {
      var data = {
        "userId": app.globalData.openId,
        "taskTitle": this.data.title,
        "taskContent": this.data.content,
        "ifTest": this.data.moneyTypeIndex,
        "supervisorNum": this.data.num,
        "typeId": this.data.types[this.data.index].typeId,
        "taskStartTime": this.data.startTime,
        "taskEndTime": this.data.endTime,
        "checkFrec": util.formatRepeatDate(this.data.chooseRepeat),
        "taskMoney": this.data.money,

        "minPass": this.data.minPass,
        "minCheck": this.data.minCheck,
        "minCheckType": this.data.minCheckTypeChoose[this.data.minCheckTypeIndex],
        "supervisorType": this.data.supervisorTypeIndex,
        "ifArea": this.data.ifAreaIndex,
        "ifHobby": this.data.ifHobbyIndex
      }
      console.log(data)
      req = {
        url: '/task/addTask',
        method: 'POST',
        data: data,
        success: res => {
          console.log(res)
          if(res.data == "addTaskSuccess"){
            this.selectComponent("#toast").toastShow("新建成功", "fa-check", 1500)
          } else if (res.data == "noEnoughTestMoney") {
            this.selectComponent("#toast").toastShow("试玩余额不足，任务已保存", "fa-check", 1500)
          } else if (res.data == "noEnoughUserMoney") {
            this.selectComponent("#toast").toastShow("账户余额不足，任务已保存", "fa-check", 1500)
          }else if (res.data == "addTaskFail"){
            this.selectComponent("#toast").toastShow("未知错误", "fa-check", 1500)
          } else if (res.data == "insertMoneyFlowError") {
            this.selectComponent("#toast").toastShow("未知错误，请联系管理员", "fa-check", 1500)
          } else if (res.data == " matchSupervisorError") {
            this.selectComponent("#toast").toastShow("未知错误，请联系管理员", "fa-check", 1500)
          }
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        },
        fail: err=>{
          console.log(err)
          this.selectComponent("#toast").toastShow("新建失败", "fa-remove", 1500)
        }
      }
      app.requestWithAuth(req)
        .then(req.success)
        .catch(req.fail)
    }
  }
})