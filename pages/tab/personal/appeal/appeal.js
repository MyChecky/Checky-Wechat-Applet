// pages/tab/personal/appealreport/appealreport.js
const app = getApp()
const util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '申诉',
    icon: 'fa-exclamation-circle',
    appealList: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    req = {
      url: '/appeal/queryUserAppeal',
      method: 'POST',
      data:{
        userId: app.globalData.openId
      },
      success: res=>{
        console.log(res.data)
        for (var i=0;i<res.data.length;i++){
          res.data[i].processResult = util.dataEN2CN(res.data[i].processResult)
        }
        this.setData({
          appealList: res.data
        })
      },
      fail: err=>{
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