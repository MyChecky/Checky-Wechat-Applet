// pages/tab/personal/history/history.js
const app = getApp()
const util = require("../../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    path:"",
    title: "历史记录",
    icon: "fa-history",
    historyList: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      path: app.globalData.base + ':' + app.globalData.port+'/'
    })
    wx.request({
      url: app.globalData.base + ':' + app.globalData.port + '/check/listCheck',
      method: 'POST',
      data: {
        userId: app.globalData.openId
      },
      success: res => {
        console.log(res.data)
        for(var i=0;i<res.data.length;i++){
          res.data[i].url = app.globalData.base + ':' + app.globalData.port+ "/"
          res.data[i].check.checkState = util.dataEN2CN(res.data[i].check.checkState)
        }
        this.setData({
          historyList: res.data
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