// pages/tab/tasks/newtask/newtask.js
const app = getApp()
var util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: '',
    title: "",
    content: "",
    numOfSus: [{
      "value": 1
    }, {
      "value": 3
    }, {
      "value": 5
    }, {
      "value": 7
    }, {
      "value": 9
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
    }, {
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
    supervisorType: ["随机选取", "熟悉的人", "陌生人"],
    ifAreaIndex: 0,
    ifAreaType: ["完全随机", "附近的人", "不在附近"],
    ifHobbyIndex: 0,
    ifHobbyType: ["完全随机", "爱好相似", "不同爱好"],

    ifNewTaskHighSettingAccess: false,
    ifTrueMoneyAccess: false,
    isDialogShow: false,
    isFailDialogShow: false,
    failNum: 0,
    taskPass: "",
    checkPass: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("newTaskOnload", options)
    if (options.taskid != null) {
      this.initTask(options.taskid);
    } else {
      this.initConfig(options.ymd);
    }

    wx.setNavigationBarTitle({
      title: '新建任务',
    })
    this.setData({
      ifNewTaskHighSettingAccess: app.globalData.ifNewTaskHighSettingAccess,
      ifTrueMoneyAccess: app.globalData.ifTrueMoneyAccess
    })
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
    if (app.globalData.ifTrueMoneyAccess == false) {
      this.setData({
        moneyTypeIndex: 1
      })
    }
  },

  // 后台取任务，修改任务时调用
  initTask: function(taskid) {
    var that = this;
    this.setData({
      taskId: taskid,
    })
    req = {
      url: '/task/queryTask',
      method: 'POST',
      data: {
        taskId: taskid,
        ymd: app.globalData.date,
      },
      success: res => {
        console.log("initTask", res)
        if (res.data.state === "ok") {
          that.setData({
            title: res.data.task.taskTitle,
            content: res.data.task.taskContent,
            moneyTypeIndex: res.data.task.ifTest,
            // num: res.data.task.supervisorNum,
            "types[0]": {
              typeId: res.data.task.typeId,
              typeContent: res.data.typeContent
            },
            index: 0,
            typeContent: res.data.typeContent,

            // startTime: res.data.task.taskStartTime, // 存在发布过去时期任务的可能
            // endTime: res.data.task.taskEndTime,
            // "checkFrec": util.formatRepeatDate(this.data.chooseRepeat),
            money: res.data.task.taskMoney,
            minPass: res.data.task.minPass,
            minCheck: res.data.task.minCheck,
            supervisorTypeIndex: res.data.task.supervisorType,
            ifAreaIndex: res.data.task.ifArea,
            ifHobbyIndex: res.data.task.ifHobby
          })
        } else if (res.data.state === "fail") {
          that.selectComponent("#toast").toastShow('时间不合法，请同步本机时间后重试！', 'fa-exclamation-circle', 1000);
          wx.navigateBack({
            delta: 1
          })
        } else {
          that.selectComponent("#toast").toastShow('未知错误，请稍后重试', 'fa-exclamation-circle', 1000);
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail: err => {
        console.log("initTask", err)
        this.selectComponent("#toast").toastShow("未知错误，请稍后重试", "fa-remove", 1500)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  // 后台取参数,不排除未来有更多参数的可能
  initConfig: function(ymd) {
    var that = this;
    req = {
      url: '/task/initConfig',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        ymd: ymd,
      },
      success: res => {
        console.log("initConfig", res);
        if (res.data.state === "ok") {
          that.setData({
            minPass: res.data.minPass,
            minCheck: res.data.minCheck,
          })
        } else {
          that.selectComponent("#toast").toastShow('时间不合法，请同步本机时间后重试！', 'fa-exclamation-circle', 1000);
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail: err => {
        console.log("initConfigErr", err)
        this.selectComponent("#toast").toastShow("未知错误，请稍后重试", "fa-remove", 1500)
        wx.navigateBack({
          delta: 1
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  // 格式化二位数
  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  // 计算结束日期
  getEndLimitDate(date) {
    var that = this;
    var year = date.getFullYear()
    var month = date.getMonth()
    if (month < 9) {
      month = month + 4
    } else {
      year = year + 1;
      month = month - 8;
    }
    const day = date.getDate()
    return [year, month, day].map(this.formatNumber).join('-')
  },
  // 获取类型
  getType: function() {
    wx.navigateTo({
      url: '../tag/tag',
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
  bindMoneyType: function(e) {
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
  bindMinPass: function(e) {
    this.setData({
      minPass: e.detail.value
    })
  },
  bindMinCheckType: function(e) {
    this.setData({
      minCheckTypeIndex: e.detail.value
    })
  },
  bindMinCheck: function(e) {
    this.setData({
      minCheck: e.detail.value
    })
  },
  bindSupervisorType: function(e) {
    this.setData({
      supervisorTypeIndex: e.detail.value
    })
  },
  bindAreaType: function(e) {
    this.setData({
      ifAreaIndex: e.detail.value
    })
  },
  bindHobbyType: function(e) {
    this.setData({
      ifHobbyIndex: e.detail.value
    })
  },

  showDialog: function() {
    req = {
      url: '/task/queryPassPercentage',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
      },
      success: res => {
        console.log(res)
        this.setData({
          checkPass: res.data.passCheck,
          taskPass: res.data.passTask,
          isDialogShow: true,
        })
      },
      fail: err => {
        console.log(err)
        this.selectComponent("#toast").toastShow("新建失败", "fa-remove", 1500)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)

    console.log(this.data.isDialogShow)
  },

  dialogCancelEvent: function(e) {
    console.log('点击了取消');
    this.setData({
      isDialogShow: false
    })
  },

  dialogConfirmEvent: function(e) {
    console.log('点击了确定');
    this.setData({
      isDialogShow: false
    })
    this.sendForm()
  },

  dialogFailCancelEvent: function(e) {
    console.log('dialogFailCancelEvent点击了编辑');
    this.setData({
      isFailDialogShow: false
    })
  },

  dialogFailConfirmEvent: function(e) {
    console.log('dialogFailConfirmEvent点击了确定');
    this.setData({
      isFailDialogShow: false
    })
    wx.navigateBack({
      delta: 1
    })
  },

  // 发送信息,加入条款
  sendForm: function() {
    var that = this;
    this.data.money = 10 * this.data.num
    if (this.data.money <= 0) {
      this.data.money = 10
      // this.selectComponent("#toast").toastShow('无效金额', 'fa-exclamation-circle', 2000)
    }
    if (this.data.title == "" || this.data.index < 0 || this.data.startTime == "" || this.data.endTime == "" || this.data.chooseRepeat == null) {
      this.selectComponent("#toast").toastShow('必要信息不可为空', 'fa-exclamation-circle', 2000)
    } else {
      console.log("seg", this.data)
      var data = {
        "taskId": this.data.taskId,
        "userId": app.globalData.openId,
        "taskTitle": this.data.title,
        "taskContent": this.data.content,
        "ifTest": this.data.moneyTypeIndex,
        "supervisorNum": this.data.num,
        "typeId": this.data.type,
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
      console.log("即将发送", data)
      req = {
        url: '/task/addTask',
        method: 'POST',
        data: data,
        success: res => {
          console.log("sendConfim", res)
          if (res.data.state == "ok") {
            this.selectComponent("#toast").toastShow("新建成功", "fa-check", 1500)
          } else if (res.data.state == "zeroCheckTimes") {
            this.selectComponent("#toast").toastShow("打卡次数不能为0", "fa-check", 1500)
          } else if (res.data.state == "noEnoughTestMoney") {
            this.selectComponent("#toast").toastShow("试玩余额不足，任务已保存", "fa-check", 1500)
          } else if (res.data.state == "noEnoughUserMoney") {
            this.selectComponent("#toast").toastShow("账户余额不足，任务已保存", "fa-check", 1500)
          } else if (res.data.state == "insertFail") {
            this.selectComponent("#toast").toastShow("未知错误", "fa-check", 1500)
          } else if (res.data.state == "insertMoneyFlowError") {
            this.selectComponent("#toast").toastShow("未知错误，请联系管理员", "fa-check", 1500)
          } else if (res.data.state == "matchSupervisorError") {
            this.selectComponent("#toast").toastShow("未知错误，请联系管理员", "fa-check", 1500)
          } else if (res.data.state == "noEnoughSupervisor") {
            that.setData({
              isFailDialogShow: true,
              taskId: res.data.taskId,
              failNum: res.data.matchNum,
            })
            return;
          }
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        },
        fail: err => {
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