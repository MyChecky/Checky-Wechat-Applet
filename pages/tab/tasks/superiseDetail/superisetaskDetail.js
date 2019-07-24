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
    image: [],
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
      checkId: options.checkId
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
      url: app.globalData.base + ':' + app.globalData.port + '/task/queryTask',
      method: 'POST',
      data: {
        taskId: this.data.taskId
      },
      success:(res)=> {
        console.log(res.data)
        that.formatInfo(res.data.task)
        this.setData({
          userName: res.data.userName,
          userAvatar: res.data.userAvatar
        })
        wx.setNavigationBarTitle({
          title: res.data.taskTitle
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      
    req = {// 获取记录
      url: app.globalData.base + ":" + app.globalData.port + '/record/checkRecords',
      method: 'POST',
      data: {
        checkId: this.data.checkId
      },
      success(res) {
        console.log(res.data)
        for(item in res.data.image){
          res.data.image[item].fileAddr = app.globalData.base + ":" + app.globalData.port + '/' + res.data.image[item].fileAddr
        }
        that.setData({
          image: res.data.image,
          content: res.data.text.recordContent,
          date: res.data.text.recordTime
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      
  },
  pass: function(e){
    this.selectComponent("#toast").toastShow2("正在提交，请稍等","fa-spinner fa-pulse")
    var state = e.target.dataset.flag
    req = {
      url: app.globalData.base + ":" + app.globalData.port+'/supervise/addSupervise',
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
  }
})