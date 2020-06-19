// pages/tab/tasks/superiseDetail/superisetaskDetail.js
const util = require("../../../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar: "",
    date: "",
    info: [],
    checkId: "",
    taskId: "",
    fileRecords: [],
    content: "",
    lastPageFlag: true,
    userName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      taskId: options.taskId,
      checkId: options.checkId,
      path: app.getAbsolutePath() + '/'
    })
  },
  // 格式化重复日期
  formatInfo: function(newInfo) {
    newInfo.checkFrec = util.formatBiDate(newInfo.checkFrec)
    this.setData({
      info: newInfo
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
    req = {// 获取任务信息
      // url
      url: '/task/queryTask',
      method: 'POST',
      data: {
        taskId: this.data.taskId
      },
      success:(res)=> {
        console.log('任务信息:')
        console.log(res.data)
        that.formatInfo(res.data.task)
        this.setData({
          userName: res.data.userName,
          userAvatar: res.data.userAvatar
        })
        wx.setNavigationBarTitle({
          title: res.data.task.taskTitle
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      
    req = {// 获取记录
      url: '/record/checkRecords',
      method: 'POST',
      data: {
        checkId: this.data.checkId
      },
      success(res) {
        console.log("checkRecords返回结果：")
        console.log(res.data)
        that.setData({
          fileRecords: res.data.fileRecords,
          content: res.data.textRecord.recordContent,
          date: res.data.textRecord.recordTime
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
  },

  report: function(e){
    console.log("report", e)
    wx.navigateTo({
      url: '../../essay/report/report?checkId=' + e.target.dataset.checkid + '&taskId=' + e.target.dataset.taskid + '&userName=' + e.target.dataset.username ,
    })
  },

  pass: function(e){
    this.selectComponent("#toast").toastShow2("正在提交，请稍等","fa-spinner fa-pulse")
    var state = e.target.dataset.flag
    req = {
      url: '/supervise/addSupervise',
      method: 'POST',
      data: {
        superviseState: state,
        supervisorId: app.globalData.openId,
        checkId: this.data.checkId,
        superviseTime: util.formatTime(new Date())
      },
      success: res=>{
        this.selectComponent("#toast").toastShow("成功","fa-check",1500)
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },1500)
      },
      fail: err=>{
        this.selectComponent("#toast").toastShow("失败，请稍后重试", "fa-remove", 1500)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  bindPlay: function () {
    this.videoContext.play()
  },
  bindPause: function () {
    this.videoContext.pause()
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  // 预览图片
  previewPic: function (e) {
    console.log(e.target.dataset.index);
    console.log(e.target.dataset.essayid);
    let urls_ = [];
    for (var i = 0; i < this.data.fileRecords.length; i++) {
      urls_.push(this.data.path + this.data.fileRecords[i].fileAddr);
    }
    wx.previewImage({
      current: urls_[e.target.dataset.index], // 当前显示图片的http链接
      urls: urls_ // 需要预览的图片http链接列表
    })
  },
})