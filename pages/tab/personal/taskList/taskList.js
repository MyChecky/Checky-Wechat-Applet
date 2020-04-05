// pages/tab/personal/taskList/taskList.js
const app = getApp()
const util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDialogShow: false,
    taskIdTaping: "",
    taskStateTaping: "",
    title: '任务列表',
    icon: 'fa-reorder',
    taskList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    req = {
      url: '/task/queryUserTasks',
      method: 'POST',
      data: {
        userId: app.globalData.openId
      },
      success: res => {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].taskStateContent = util.dataEN2CN(res.data[i].taskState)
        }
        this.setData({
          taskList: res.data
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

  },

  catchStateTap: function(e) {
    console.log(e)
    this.setData({
      taskIdTaping: e.currentTarget.dataset.taskid,
      taskStateTaping: e.currentTarget.dataset.state
    })
    if (e.currentTarget.dataset.state == "save" || e.currentTarget.dataset.state == "nomatch") {
      this.setData({
        isDialogShow: true
      })
    } else {
      // 跳转任务详情页,涉及文件界面还没写
      // wx.navigateTo({
      //   url: '../../taskDetail/taskDetail',
      // })
    }
  },

  dialogCancelEvent: function(e) {
    console.log('点击了取消', e);
    this.setData({
      isDialogShow: false
    })
  },

  dialogConfirmEvent: function(e) {
    console.log('点击了确定', e);
    this.setData({
      isDialogShow: false
    })
    wx.navigateTo({
      url: '../../tasks/newtask/newtask?taskid=' + this.data.taskIdTaping,
    })
  },

  bindTaskTap: function(e) {
    // 跳转任务详情页,涉及文件界面还没写
    // wx.navigateTo({
    //   url: '../../taskDetail/taskDetail',
    // })
  }
})