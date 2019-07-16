// pages/tab/tasks/checky/checky.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    console.log(options)
    if (options.lastPage == 'taskDetail')
      this.setData({
        lastPageFlag: false
      })
    this.setData({
      taskId: options.taskId,
      checkId: options.checkId
    })
    var that = this
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '',
      data: {
        checkId: this.data.checkId
      },
      success(res) {
        console.log(res)
        that.setData({
          image: res.data.image,
          content: res.data.content
        })
      }
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

  },
  pass: function(e) {
    var state = e.target.dataset.flag
    wx.request({
      url: app.globalData.base + ':' + app.globalData.port + '',
      data: {
        state: state,
        checkId: this.data.checkId,
        userId: app.globalData.openId
      },
      success: res => {
        this.selectComponent("#toast").toastShow("谢谢监督", "fa-handshake-o", 1000)
        wx.navigateBack({
          delta: 2,
          success: function (res) {
          }
        })
      },
      fail: err =>{
        this.selectComponent("#toast").toastShow("请求超时", "fa-exclamation-circle", 1000)
      }
    })
  }
})