// pages/tab/personal/searchFriend/searchFriend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    contentSend: '',
    friendList: [] // userName, userAvatar, latestMessage, latestMessageTime
    // content, subContent, date, opration, avatarUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  // 查看个人主页
  gotoIndex: function(e) {
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
  sendClick: function(e) {
    this.searchFriend(e.detail.value);
  },

  contentChange: function(e) {
    var text = e.detail.value
    this.setData({
      contentSend: text
    })
  },

  sendButton: function(e) {
    this.searchFriend(this.data.contentSend);
  },

  // 查询好友
  searchFriend: function(nickName) {
    req = {
      url: '/friend/queryUserByNickname',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        nickName: nickName
      },
      success: res => {
        console.log("查询结果",res.data)
        this.setData({
          friendList: res.data.friendList,
        })
        console.log(this.data)
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  }
})