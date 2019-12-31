// pages/tab/essay/essay.js
const app = getApp()
var util = require("../../../utils/util.js")
Page({
  data: {
    path: "",
    height: 0,
    cPage: 1,
    infomation: "正在加载",
    essays: [
    ]
  },
  onLoad: function(){
    this.setData({
      path: app.getAbsolutePath() + '/'
    })
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          height: res.windowHeight
        })
      },
    })
  },
  onShow: function() {
    this.refreshEssayList()
  },
  // 刷新列表
  refreshEssayList: function() {
    var that = this
    req = {
      url: '/essay/displayEssay',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
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
  requestEssayList: function() {
    var that = this
    req ={
      url: '/essay/displayEssay',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
        "cPage": that.data.cPage
      },
      success(res) {
        console.log(res.data)
        if(res.data.length==0){
          that.setData({
            infomation: "nomore"
          })
        }
        else{
          that.setData({
            infomation: "loading",
            essays: that.data.essays.concat(res.data),
            cPage: that.data.cPage+1
          })
        }
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
    else{
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
  },
  // 滚动加载
  loadMore: function(){
    console.log("load more")
    this.requestEssayList()
  },
  refresh: function (){
    console.log("refresh")
    this.refreshEssayList()
  }
})