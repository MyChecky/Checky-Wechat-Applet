// pages/tab/personal/taskDetail/taskDetail.js
const app = getApp()
const util = require("../../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: "",

    taskTitle: "",
    taskSups: "",
    taskState: "",
    startTime: "",
    endTime: "",
    taskMoneyType: "",
    taskMoneyState: "",
    checkTimes: "",
    passTimes: "",
    taskType: "",
    taskDescribe: "",
    supList: [{
      "name": "华仞",
      "times": "15",
      "state": "即将奖励￥15"
    }, {
      "name": "华仞",
      "times": "15",
      "state": "即将奖励￥15"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("taskDetail", options);
    this.setData({
      taskId: options.taskId,
    })
    this.getTaskData(options.taskId);

    if (options.from_ === "share") {
      console.log("发现来自分享的用户");
      app.globalData.fromShare = true;
      // app.onLaunch();
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var taskid = this.data.taskId;
    return {
      path: '/pages/tab/personal/taskDetail/taskDetail?taskId=' + taskid + '&from_=share',
    }
  },

  getTaskData: function(taskId) {
    var that = this;
    console.log("getTaskData", taskId);
    req = {
      url: '/task/taskDetail',
      method: 'POST',
      data: {
        taskId: taskId
      },
      success: res => {
        console.log("getTaskDataRes", res.data);
        that.setData({
          taskTitle: res.data.taskTitle,
          // taskSups: res.data.taskSups.join('；'),
          taskState: util.dataEN2CN(res.data.taskState),
          taskMoneyType: res.data.taskMoneyType,
          taskMoneyState: res.data.taskMoneyState,
          // checkTimes: res.data.checkTimes,
          // passTimes: res.data.passTimes,
          taskType: res.data.taskType,
          startTime: res.data.startTime,
          endTime: res.data.endTime,
          taskDescribe: res.data.taskDescribe,
          taskTypePassRate: res.data.taskTypePassRate,
          expectTimes: res.data.expectTimes,
          actualTimes: res.data.actualTimes,
          passTimes: res.data.passTimes,
          checkFrec: util.formatBiDate(res.data.checkFrec),
          supList: res.data.supList,
        })
      },
      fail: err => {
        console.log("getTaskDataResErr", err);
      }
    }
    app.requestWithoutAuth(req)
      .then(req.success)
      .catch(req.fail)
  }
})