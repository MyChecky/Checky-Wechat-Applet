// pages/tab/essay/essay.js
const app = getApp()
var util = require("../../../utils/util.js")
Page({
  data: {
    path: "",
    essays: [
    ]
  },
  onLoad: function(){
    this.setData({
      path: app.globalData.base+':'+app.globalData.port+'/'
    })
  },
  onShow: function() {
    this.requestEssayList()
  },

  //获取动态列表
  requestEssayList: function() {
    var that = this
    req ={
      url: app.globalData.base + ":" + app.globalData.port + '/essay/displayEssay',
      method: 'POST',
      data: {
        "userId": app.globalData.openId
      },
      success(res) {
        console.log(res.data)
        that.setData({
          essays: res.data
        })
      }
    }
    app.requestWithAuth(req)
    .then(req.success)
    .catch(req.fail)
  },

  //记录点赞情况
  isLike: function(e) {
    var index = e.target.dataset.index
    console.log(index)
    if (this.data.essays[index].like){
      req = {
        url: app.globalData.base + ":" + app.globalData.port + '/essay/unlike',
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
    else{
      req = {
        url: app.globalData.base + ":" + app.globalData.port + '/essay/like',
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
  essayClick: function(e) {
    var essayId = e.target.dataset.essayid
    var userId = app.globalData.openId
    console.log(essayId)
    wx.navigateTo({
      url: './essayDetail/essayDetail?essayId=' + essayId + '&userId=' + userId,
    })
  },
  //创建打卡
  essayNew: function() {
    wx.navigateTo({
      url: './essayNew/essayNew',
    })
  },
  // 预览
  essayPic: function(e){
    console.log(e.target.dataset.index)
  }
})