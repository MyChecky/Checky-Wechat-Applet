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
    essaysPic: [],
    picLength: 0,
    commentContent: "",
    commentNum: 0,
    comments: [],
    currentImg: 0
  },
  //举报跳转
  report: function (e) {
    var essayId = e.target.dataset.essayid
    var userId = app.globalData.openId
    console.log(essayId)
    wx.navigateTo({
      url: '../report/report?essayId=' + essayId + '&userName=' + this.data.userName + '&essaysText=' + this.data.essay.essayContent,
    })
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
      path: app.globalData.base + ':' + app.globalData.port + '/',
      essayId: options.essayId,
      visitorId: app.globalData.openId
    })
    req = {
      url: app.globalData.base + ':' + app.globalData.port + '/essay/queryEssayById',
      method: 'POST',
      header: {
        "sessionKey": app.globalData.sessionKey,
        "userId": app.globalData.openId
      },
      data: {
        userId: app.globalData.openId,
        essayId: this.data.essayId
      },
      success: res => {
        console.log(res)
        this.setData({
          essaysPic: res.data.img,
          essay: res.data.essay,
          essayUserId: res.data.userId,
          userAvatar: res.data.userAvatar,
          userName: res.data.userName,
          like: res.data.like,
          likeNum: res.data.essay.likeNum,
          picLength: res.data.img.length
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

  onReady: function () { },

  onShow: function () {
    this.requestEssayComment()
  },

  //· 获取评论信息
  requestEssayComment: function () {
    var that = this
    req = {
      // url
      url: app.globalData.base + ':' + app.globalData.port + '/essay/queryComments',
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
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  //记录点赞情况
  isLike: function (e) {


    if (this.data.like) {
      req = {
        url: app.globalData.base + ":" + app.globalData.port + '/essay/unlike',
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
        url: app.globalData.base + ":" + app.globalData.port + '/essay/like',
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
    if (this.data.commentContent == "") {
      this.selectComponent("#toast").toastShow('不能发送空的评论', 'fa-exclamation-circle', 2000)
    } else {
      req = {
        url: app.globalData.base + ':' + app.globalData.port + '/essay/addComment',
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
  },
  // 删除评论
  delComment: function (e) {
    req = {
      url: app.globalData.base + ':' + app.globalData.port + '/essay/delComment',
      method: 'POST',
      data: {
        commentId: e.target.dataset.commentid,
        essayId: this.data.essay.essayId
      },
      success: res => {
        console.log(res)
        this.setData({
          comments: res.data.comments,
          commenNum: res.data.comments.length
        })

      },
      fail: err => {
        console.log(err)
      }
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
  }
})