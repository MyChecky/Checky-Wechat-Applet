// pages/tab/personal/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '好友',
    icon: 'fa-address-book-o',
    friendList: [
    ] // userName, userAvatar, latestMessage, latestMessageTime
    // content, subContent, date, opration, avatarUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    req = {
      url: '/friend/queryUserAllFriend',
      method: 'POST',
      data: {
        userId: app.globalData.openId
      },
      success: res => {
        console.log(res.data)
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
  //发送私信
  sendMessage: function (e) {
    console.log("发送私信")
    console.log(e.target.dataset)
    var targetUserId = e.target.dataset.targetuserid;
    var targetUserName = e.target.dataset.targetusername;
    var targetUserAvatar = e.target.dataset.targetuseravatar;
    wx.navigateTo({
      url: '../../essay/essaySendMessage/essaySendMessage?targetUserId=' + targetUserId + '&targetUserName=' + targetUserName + '&targetUserAvatar=' + targetUserAvatar,
    })
  },
  // 查询好友
  searchFriend: function(e){
    wx.navigateTo({
      url: '../searchFriend/searchFriend',
    })
  },
  newFriend: function(e){
    wx.navigateTo({
      url: '../newFriend/newfriend',
    })
  }
})