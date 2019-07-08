// pages/tab/tasks/superiseDetail/superisetaskDetail.js
const util = require("../../../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: "",
    checkId: "",
    date: "2019-07-02",
    title: "XXX任务",
    taskState: "已上传",
    supState: "未认证",
    numOfSup: 3,
    numOfSuped: 1,
    supList: [
      { "supId": "1", "supName": "Tom", "supState": "pass", "content": "通过" },
      { "supId": "1", "supName": "Tom", "supState": "fail", "content": "失败" },
      { "supId": "1", "supName": "Tom", "supState": "unknow", "content": "未认证" }
    ],
    info: [
      { "name": "重复", "value": "1111111" },
      { "name": "时间", "value": "2019-07-01 2019-08-01" },
      { "name": "押金", "value": "20.00" },
      { "name": "描述", "value": "something...aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port +'',
      data: {
        userId: app.globalData.openId,
        taskId: options.taskId,
        checkId: options.checkId
      },
      success(res) {
        formatInfo(res)
        wx.setNavigationBarTitle({
          title: this.data.title
        })
      }
    })
    // 本地测试
    this.formatInfo(this.data.info)
    console.log(this.data.info)
  },
  formatInfo: function (newInfo) {
    newInfo[0].value = util.formatBiDate(newInfo[0].value)
    this.setData({
      info: newInfo
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

  },
  superise: function(e){
    // 已打卡情况
    wx.navigateTo({
      url: '../checky/checky?checkId=' + this.data.checkId + '&lastPage=superisetaskDetail',
    })
  }
})