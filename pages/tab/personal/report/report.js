// pages/tab/personal/report/report.js
const app = getApp()
const util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '举报',
    icon: 'fa-exclamation-circle',
    reportList: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.base + ':' + app.globalData.port + '/report/queryUserReports',
      method: 'POST',
      data: {
        userId: app.globalData.openId
      },
      success: res => {
        console.log(res.data)
        for(item in res.data){
          item.reportType = util.dataEN2CN(item.reportType)
        }
        this.setData({
          reportList: res.data
        })
      },
      fail: err => {
        console.log(err)
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