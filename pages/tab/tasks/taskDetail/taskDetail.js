// pages/tab/tasks/taskDetail/taskDetail.js
const util = require("../../../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modal: {
      isHidden: true,
      message: 'msg',
      title: '申诉理由'
    },
    title: "",
    checkId: "",
    taskId: "",
    taskState: "未上传",
    checkState: "待认证",
    numOfSup: 0,
    numOfSuped: 0,
    supList: [],
    info: [],
    taskname: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("taskDetailOnload", options)
    var that = this
    if (options.checkId != undefined) {
      this.setData({
        checkId: options.checkId,
        taskState: '已上传',
        taskname: options.taskname,
      })
      var isletter = /^[a-zA-Z]+$/.test(options.checkState);
      if (isletter){
        this.setData({
          checkState: util.dataEN2CN(options.checkState),
        })
      }else{
        this.setData({
          checkState: options.checkState,
        })
      }
      var modal = this.selectComponent('#modal')
      modal.setData({
        checkId: options.checkId,
      })
    }
    this.setData({
      taskId: options.taskId,
      taskname: options.taskname,
      ymd: options.ymd,
    })
    console.log('taskId:' + this.data.taskId + ',checkId:' + this.data.checkId)
  },
  // 格式化重复周期
  formatInfo: function(newInfo) {
    newInfo.checkFrec = util.formatBiDate(newInfo.checkFrec)
    this.setData({
      info: newInfo
    })
  },
  // 获取监督人数和监督数
  getSupNum(list) {
    var done = 0;
    var length = list.length;
    for (var i = 0; i < length; i++) {
      if (this.data.supList[i].supervisorState != 'unknown') {
        done++
      }
      list[i].supervisorState = util.dataEN2CN(this.data.supList[i].supervisorState)
    }
    this.setData({
      numOfSup: length,
      numOfSuped: done,
      supList: list
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
    var that = this
    req = { // 获取任务信息
      // url
      url: '/task/queryTask',
      method: 'POST',
      data: {
        taskId: that.data.taskId
      },
      success(res) {
        console.log(res)
        that.formatInfo(res.data.task)
        wx.setNavigationBarTitle({
          title: res.data.task.taskTitle
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)

    req = { // 获取监督状态列表
      url: '/supervise/querySupervisorState',
      method: 'POST',
      data: {
        taskId: that.data.taskId,
        checkId: that.data.checkId
      },
      success: res => {
        console.log(res.data)
        this.setData({
          supList: res.data
        })
        this.getSupNum(res.data)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
  },
  // 打卡或查看打卡内容
  upload: function() {
    if (this.data.checkId == '') { // 未打卡情况
      wx.navigateTo({
        url: '../upload/upload?taskId=' + this.data.taskId + '&taskname=' + this.data.taskname + '&ymd=' + this.data.ymd,
      })
    } else { // 已打卡情况
      wx.navigateTo({
        url: '../checky/checky?checkId=' + this.data.checkId + '&taskId=' + this.data.taskId,
      })
    }
  },
  appeal: function() {
    var temp = this.data.modal
    temp.isHidden = false
    temp
    this.setData({
      modal: temp
    })
  },
  reportSup: function(e){
    console.log("reportSup", e);
    wx.navigateTo({
      url: '../../essay/report/report?supervisorId=' + e.target.dataset.supervisorid + '&userName=' + e.target.dataset.username,
    })
  },

  sendAppeal: function(e) {
    this.selectComponent("#toast").toastShow2("发送中", "fa-spinner fa-pulse")
    var appealContent = e.detail.content
    req = {
      url: '/appeal/add',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        checkId: this.data.checkId,
        taskId: this.data.taskId,
        appealContent: appealContent
      },
      success: (res) => {
        console.log(res)
        this.selectComponent("#toast").toastShow("发送成功", "fa-check", 1000)
      },
      fail: (err) => {
        console.log(err)
        this.selectComponent("#toast").toastShow("发送失败", "fa-remove", 1000)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  }
});