const app = getApp()
Page({
  data: {
    height:0,
    path: "",
    userName: "",
    visitorId: "",
    essayUserId: "",
    userAvatar: "",
    like: false,
    likeNum: 0,
    essay: {},
    essayFileRecords: [],
    essayFileRecordsLength: 0,
    commentContent: "",
    commentNum: 0,
    comments: [],
    currentImg: 0
  },
  //举报跳转
  report: function (e) {
    if (app.globalData.openId === "") {
      wx.navigateTo({
        url: '../../../index/index'
      })
    }else{
      var essayId = e.target.dataset.essayid
      var userId = app.globalData.openId
      console.log(essayId)
      wx.navigateTo({
        url: '../report/report?essayId=' + essayId + '&userName=' + this.data.userName + '&essaysText=' + this.data.essay.essayContent,
      })
    }
  },

  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      },
    })
    this.setData({
      path: app.getAbsolutePath() + '/',
      essayId: options.essayId,
      visitorId: app.globalData.openId,
    })
    req = {
      url: '/essay/queryEssayById',
      method: 'POST',
      header: {
        "sessionKey": app.globalData.sessionKey,
        "userId": app.globalData.openId
      },
      data: {
        userId: app.globalData.openId,
        essayId: options.essayId
      },
      success: res => {
        console.log(res)
        this.setData({
          essayFileRecords: res.data.fileRecord,
          essay: res.data.essay,
          essayUserId: res.data.userId,
          userAvatar: res.data.userAvatar,
          userName: res.data.userName,
          like: res.data.like,
          likeNum: res.data.essay.likeNum,
          topicId: res.data.essay.topicId,
          topicName: res.data.essay.topicName,
          essayFileRecordsLength: res.data.fileRecord.length
        })
      },
      fail: err => {
        console.log(err)
      }
    }
    if (app.globalData.ifHasUserInfo) {
      app.requestWithAuth(req)
        .then(req.success)
        .catch(req.fail)
    } else {
      app.requestWithoutAuth(req)
        .then(req.success)
        .catch(req.fail)
    }
  },

  onReady: function () { },

  onShow: function () {
    this.requestEssayComment()
  },

  //· 获取评论信息
  requestEssayComment: function () {
    var that = this
    req = {
      // url
      url: '/essay/queryComments',
      method: 'POST',
      data: {
        essayId: that.data.essayId
      },
      success(res) {
        console.log(res.data)
        that.setData({
          comments: res.data,
          commentNum: res.data.length
        })
      }
    }
    if (app.globalData.openId != "") {
      app.requestWithAuth(req)
        .then(req.success)
        .catch(req.fail)
    } else {
      app.requestWithoutAuth(req)
        .then(req.success)
        .catch(req.fail)
    }
  },

  //记录点赞情况
  isLike: function (e) {
    if (app.globalData.openId === "") {
      wx.navigateTo({
        url: '../../../index/index'
      })
    }
    if (this.data.like) {
      req = {
        url: '/essay/unlike',
        method: 'POST',
        data: {
          "essayId": this.data.essay.essayId,
          "userId": app.globalData.openId
        },
        success: (res) => {
          console.log(res)
          this.setData({
            like: !this.data.like,
            likeNum: this.data.like ? this.data.likeNum - 1 : this.data.likeNum + 1
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
          "essayId": this.data.essay.essayId,
          "userId": app.globalData.openId
        },
        success: (res) => {
          console.log(res)
          this.setData({
            like: !this.data.like,
            likeNum: this.data.like ? this.data.likeNum - 1 : this.data.likeNum + 1
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

  // 获取评论
  essaysComment: function (e) {
    this.setData({
      commentContent: e.detail.value
    })
  },
  // 发送评论
  sendComment: function () {
    if (app.globalData.openId === "") {
      wx.navigateTo({
        url: '../../../index/index'
      })
    }else{
      if (this.data.commentContent == "") {
        this.selectComponent("#toast").toastShow('不能发送空的评论', 'fa-exclamation-circle', 2000)
      } else {
        req = {
          url: '/essay/addComment',
          method: 'POST',
          data: {
            userId: app.globalData.openId,
            essayId: this.data.essay.essayId,
            commentContent: this.data.commentContent
          },
          success: res => {
            console.log(res)
            this.setData({
              comments: res.data.comments,
              commentNum: res.data.comments.length,
              commentContent: ""
            })
          },
          fail: err => {
            console.log(err)
          }
        }
        app.requestWithAuth(req)
        .then(req.success)
        .catch(req.fail)
      }
    }
  },
  // 删除评论
  delComment: function (e) {
    if (app.globalData.openId === "") {
      wx.navigateTo({
        url: '../../../index/index'
      })
    }else{
      console.log("comId:"+e.target.dataset.commentid)
      req = {
        url: '/essay/delComment',
        method: 'POST',
        data: {
          commentId: e.target.dataset.commentid,
          essayId: this.data.essay.essayId
        },
        success: res => {
          console.log(res)
          this.setData({
            comments: res.data.comments,
            commentNum: res.data.comments.length,
          })
  
        },
        fail: err => {
          console.log(err)
        }
      }
      app.requestWithAuth(req)
        .then(req.success)
        .catch(req.fail)
    }
  },
  //输入聚焦
  foucus: function (e) {
    var that = this;
    that.setData({
      bottom: e.detail.height
    })
  },

  //失去聚焦
  blur: function (e) {
    var that = this;
    that.setData({
      bottom: 0
    })
  },
  // 滑动图片
  slide: function (e) {
    this.setData({
      currentImg: e.detail.current
    })
  },
  // 页面滚动
  scroll: function (e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    })
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