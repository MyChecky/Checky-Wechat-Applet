// pages/tab/tasks/checky/checky.js
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
    console.log("checkyOnload", options)
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
    req = { // 获取任务信息
      // url
      url: '/task/queryTask',
      method: 'POST',
      data: {
        taskId: this.data.taskId
      },
      success: (res) => {
        console.log('任务信息:')
        console.log(res.data)
        that.formatInfo(res.data.task)
        that.setData({
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

    req = { // 获取记录
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

  bindPlay: function() {
    this.videoContext.play()
  },

  bindPause: function() {
    this.videoContext.pause()
  },

  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

  // 预览图片
  previewPic: function(e) {
    console.log(e.target.dataset.index);
    console.log(e.target.dataset.essayid);
    console.log(e.target.dataset.src);
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: [e.target.dataset.src, ] // 需要预览的图片http链接列表
    })
  }
})