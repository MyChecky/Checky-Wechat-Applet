// pages/tab/personal/searchFriend/searchFriend.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    resultList: [] // userName, userAvatar, latestMessage, latestMessageTime
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
    console.log("即将跳转个人主页", e);

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

  searchInput: function () {
    var that = this
    console.log("searchVal", that.data.inputVal)

    req = {
      url: '/friend/queryUserByNickname',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        nickName: that.data.inputVal,
      },
      success: res => {
        console.log("查询结果", res.data)
        that.setData({
          resultList: res.data.friendList,
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
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})