// pages/tab/personal/newFriend/newfriend.js
// pages/tab/personal/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '好友申请',
    icon: 'fa-address-book-o',
    friendList: [
    ] // userName, userAvatar, latestMessage, latestMessageTime
    // content, subContent, date, opration, avatarUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    req = {
      url: '/friend/queryNewFriend',
      method: 'POST',
      data: {
        userId: app.globalData.openId
      },
      success: res => {
        console.log("申请列v表:", res.data)
        this.setData({
          friendList: res.data.friendList,
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

  gotoIndex: function (e) {
    console.log("个人主页");
    console.log(e.target.dataset);
    var userid = e.target.dataset.userid;
    var usernickname = e.target.dataset.usernickname;
    var useravatar = e.target.dataset.useravatar;
    console.log(app.globalData.openId)
    if (userid != app.globalData.openId) {
      wx.navigateTo({
        url: '../../essay/essayPersonalIndex/essayPersonalIndex?userid=' + userid + '&userNickName=' + usernickname + '&userAvatar=' + useravatar,
      })
    } else {
      wx.navigateTo({
        url: '../essay/essay',
      })
    }
  },
 
  agreeNewFriend: function (e) {
    console.log("同意", e.target.dataset);
    var targetUserId = e.target.dataset.userid;
    req = {
      url: '/friend/opNewFriend',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        targetUserId: targetUserId,
        op: "1",
      },
      success: res => {
        console.log(res.data)
        // this.back()
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  refuseNewFriend: function (e) {
    console.log("拒绝", e.target.dataset);
    var targetUserId = e.target.dataset.userid;
    req = {
      url: '/friend/opNewFriend',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        targetUserId: targetUserId,
        op: "2",
      },
      success: res => {
        console.log(res.data)
        // this.back()
      },
      fail: err => {
        console.log(err)
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
      title: '处理成功',
      icon: 'success',
      duration: 2000
    })
    wx.navigateBack({
      delta: 2,
      success: function (res) { }
    })
  },
})