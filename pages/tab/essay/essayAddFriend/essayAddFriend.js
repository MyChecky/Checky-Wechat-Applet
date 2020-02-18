// pages/tab/essay/essayAddFriend/essayAddFriend.js
// pages/tab/personal/suggest/suggest.js
const util = require("../../../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetUserId: "",
    targetUserName: '',
    content: "",
    currentLength: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      targetUserId: options.targetUserId,
      targetUserName: options.targetUserName,
    })
    console.log(this.data)
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

  // 文本长度监督
  lengthChange: function (e) {
    var length = e.detail.value.length
    var text = e.detail.value
    this.setData({
      currentLength: length,
      content: text
    })
  },

  // 发送建议
  sendContent: function (e) {
    var that = this;
    const toast = this.selectComponent("#toast")
    req = {
      url: '/friend/tryAddFriend',
      method: 'POST',
      header: {
        "sessionKey": app.globalData.sessionKey,
        "userId": app.globalData.openId
      },
      data: {
        "userId": app.globalData.openId,
        "addContent": this.data.content,
        'targetUserId': this.data.targetUserId,
      },
      success(res) {
        console.log(res)
        // 返回
        that.back();
      },
      fail(err) {
        console.log(err)
        toast.toastShow('添加失败', 'fa-exclamation-circle', 1000)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  // 发送后返回页面
  back: function () {
    var arr = getCurrentPages()
    arr[arr.length - 2].setData({
      checkId: this.data.checkId
    })
    wx.showToast({
      title: '发送成功',
      icon: 'success',
      duration: 2000
    })
    wx.navigateBack({
      delta: 2,
      success: function (res) { }
    })
  },
})