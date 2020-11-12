// pages/tab/essay/essayPersonalIndex/essayPersonalIndex.js
const app = getApp()
var util = require("../../../../utils/util.js")
Page({
  data: {
    targetUserId: '',
    // userId: '', // 目标userId
    userAvatar: '',
    userNickName: '',
    path: "",
    height: 0,
    cPage: 1,
    infomation: "正在加载",
    likeNum: 0,
    commentNum: 0,
    ifFriend: 0,
    essays: [
    ],
    recordTypeNow: "video",
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      path: app.getAbsolutePath() + '/',
      targetUserId: options.userid,
      userAvatar: options.userAvatar,
      userNickName: options.userNickName,
    })
    console.log(this.data)
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      },
    })
    req = {
      url: '/friend/queryIfFriend',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        targetUserId: options.userid,
      },
      success: res => {
        console.log(res.data)
        this.setData({
          ifFriend: res.data.ifFriend
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
  onShow: function () {
    this.refreshEssayList()
  },
  // 刷新列表
  refreshEssayList: function () {
    var that = this
    req = {
      url: '/friend/displayEssaysForSomeone',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
        'targetUserId': that.data.targetUserId,
        "cPage": 1
      },
      success(res) {
        console.log(res.data)
        if (res.data.length < 5) {
          that.setData({
            infomation: "nomore",
            essays: res.data,
            cPage: 2
          })
        }
        else {
          that.setData({
            infomation: "loading",
            essays: res.data,
            cPage: 2
          })
        }
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  //获取动态列表
  requestEssayList: function () {
    var that = this
    req = {
      url: '/friend/displayEssaysForSomeone',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
        'targetUserId': that.data.targetUserId,
        "cPage": that.data.cPage
      },
      success(res) {
        console.log(res.data)
        if (res.data.length == 0) {
          that.setData({
            infomation: "nomore"
          })
        }
        else {
          that.setData({
            infomation: "loading",
            essays: that.data.essays.concat(res.data),
            cPage: that.data.cPage + 1
          })
        }
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  //记录点赞情况
  isLike: function (e) {
    var index = e.target.dataset.index
    console.log(index)
    if (this.data.essays[index].like) {
      req = {
        url: '/essay/unlike',
        method: 'POST',
        data: {
          "essayId": this.data.essays[index].essay.essayId,
          "userId": app.globalData.openId
        },
        success: (res) => {
          console.log(res)
          var statement1 = "essays[" + index + "].like"
          var statement2 = "essays[" + index + "].essay.likeNum"
          this.setData({
            [statement1]: !this.data.essays[index].like,
            [statement2]: this.data.essays[index].like ? this.data.essays[index].essay.likeNum - 1 : this.data.essays[index].essay.likeNum + 1
          })
        },
        fail: (err) => {
          console.log(err)
        }
      }
      app.requestWithAuth(req)
        .then(req.success)
        .catch(req.fail)
    }
    else {
      req = {
        url: '/essay/like',
        method: 'POST',
        data: {
          "essayId": this.data.essays[index].essay.essayId,
          "userId": app.globalData.openId
        },
        success: (res) => {
          console.log(res)
          var statement1 = "essays[" + index + "].like"
          var statement2 = "essays[" + index + "].essay.likeNum"
          this.setData({
            [statement1]: !this.data.essays[index].like,
            [statement2]: this.data.essays[index].like ? this.data.essays[index].essay.likeNum - 1 : this.data.essays[index].essay.likeNum + 1
          })
        },
        fail: (err) => {
          console.log(err)
        }
      }
      app.requestWithAuth(req)
        .then(req.success)
        .catch(req.fail)
    }
  },

  //查看打卡详情
  essayClick: function (e) {
    console.log("afgf")
    console.log(e.target.dataset.essayid)
    var essayId = e.target.dataset.essayid
    var userId = app.globalData.openId
    console.log(essayId)
    wx.navigateTo({
      url: '../essayDetail/essayDetail?essayId=' + essayId + '&userId=' + userId,
    })
  },

  //发送私信
  sendMessage: function (e) {
    console.log("发送私信")
    console.log(e.target.dataset)
    var targetUserId = e.target.dataset.targetuserid
    var targetUserName = e.target.dataset.targetusername
    wx.navigateTo({
      url: '../essaySendMessage/essaySendMessage?targetUserId=' + targetUserId + '&targetUserName=' + targetUserName + '&targetUserAvatar=' + this.data.userAvatar,
    })
  },

  //添加好友
  addFriend: function (e) {
    console.log("添加好友")
    console.log(e.target.dataset)
    var targetUserId = e.target.dataset.targetuserid
    var targetUserName = e.target.dataset.targetusername
    wx.navigateTo({
      url: '../essayAddFriend/essayAddFriend?targetUserId=' + targetUserId + '&targetUserName' + targetUserName,
    })
  },

  // 预览图片
  essayPic: function (e) {
    console.log(e.target.dataset.index);
    console.log(e.target.dataset.essayid);
    console.log(e.target.dataset.src);
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: [e.target.dataset.src,] // 需要预览的图片http链接列表
    })
  },
  // 滚动加载
  loadMore: function () {
    console.log("load more")
    this.requestEssayList()
  },
  refresh: function () {
    console.log("refresh")
    this.refreshEssayList()
  },
  bindPlay: function () {
    this.videoContext.play()
  },
  bindPause: function () {
    this.videoContext.pause()
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  goToTopic: function (e) {
    console.log("goToTopic", e);
    var topicId = e.currentTarget.dataset.topicid;
    var topicName = e.currentTarget.dataset.topicname;
    wx.navigateTo({
      url: '../essayTopic/essayTopic?topicId=' + topicId + '&topicName=' + topicName,
    })
  },

})