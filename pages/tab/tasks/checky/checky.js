// pages/tab/tasks/checky/checky.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkId:"",
    taskId:"",
    image:[],
    content:"",
    state:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      taskId: options.taskId,
      checkId: options.checkId
    })
    var that = this
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '',
      data:{
        taskId: this.data.taskId,
        checkId: this.data.checkId,
        userId: app.globalData.openId
      },
      success(res){
        console.log(res)
        that.setData({
          image: res.data.image,
          content: res.data.content,
          state: res.data.state
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})