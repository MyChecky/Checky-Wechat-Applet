// pages/tab/tasks/superiseDetail/superisetaskDetail.js
const util = require("../../../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    info: [],
    checkId: "",
    taskId: "",
    image: [],
    content: "",
    lastPageFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    // this.setData({
    //   taskId: options.taskId,
    //   checkId: options.checkId
    // })
  },
  // 格式化重复日期
  formatInfo: function(newInfo) {
    newInfo[0].value = util.formatBiDate(newInfo[0].value)
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
    wx.request({// 获取任务信息
      // url
      url: app.globalData.base + ':' + app.globalData.port + '/task/querytask',
      method: 'POST',
      data: {
        taskId: this.data.taskId
      },
      success(res) {
        console.log(res)
        // that.formatInfo(res.data.info)
        // wx.setNavigationBarTitle({
        //   title: res.data.taskTitle
        // })
      }
    })
    wx.request({// 获取记录
      url: app.globalData.base + ":" + app.globalData.port + '/record/checkRecords',
      method: 'POST',
      data: {
        checkId: this.data.checkId
      },
      success(res) {
        console.log(res.data)
        that.setData({
          image: res.data.image,
          content: res.data.text.recordContent,
          date: res.data.text.recordTime
        })
      }
    })
    // wx.request({// 获取监督状态列表
    //   url: app.globalData.base + ':' + app.globalData.port + 'supervise//querySupervisorState',
    //   data: {
    //     taskId: that.data.taskId,
    //     checkId: that.data.checkId
    //   },
    //   success(res) {
    //     that.getSupNum(res.data.supList)
    //   }
    // })
  },

  // superise: function(e) {
  //   // 已打卡情况
  //   wx.navigateTo({
  //     url: '../checky/checky?checkId=' + this.data.checkId + '&lastPage=superisetaskDetail',
  //   })
  // }
})