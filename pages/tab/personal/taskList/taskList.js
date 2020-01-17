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

  },

  catchStateTap: function(e) {
    console.log(e)
    this.setData({
      taskIdTaping: e.currentTarget.dataset.taskid,
      taskStateTaping: e.currentTarget.dataset.state
    })
    if (e.currentTarget.dataset.state == "save") {
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
    var data = {
      "taskId": this.data.taskIdTaping,
      "userId": app.globalData.openId
    }
    console.log(data)
    req = {
      url: '/task/publicSavedTask',
      method: 'POST',
      data: data,
      success: res => {
        console.log(res)
        if (res.data == "addTaskSuccess") { //本来pubTaskSuccess比较好，但是为了减少写相似代码。。
          this.selectComponent("#toast").toastShow("发布成功", "fa-check", 1500)
        } else if (res.data == "noEnoughTestMoney") {
          this.selectComponent("#toast").toastShow("发布失败，试玩余额不足", "fa-check", 1500)
        } else if (res.data == "noEnoughUserMoney") {
          this.selectComponent("#toast").toastShow("发布失败，账户余额不足", "fa-check", 1500)
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
      fail: err => {
        console.log(err)
        this.selectComponent("#toast").toastShow("新建失败", "fa-remove", 1500)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  bindTaskTap: function(e) {
    // 跳转任务详情页,涉及文件界面还没写
    // wx.navigateTo({
    //   url: '../../taskDetail/taskDetail',
    // })
  }
})