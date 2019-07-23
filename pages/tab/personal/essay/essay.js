// pages/tab/personal/essay/essay.js
const app = getApp()
var util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "动态",
    icon: "fa-globe",
    path: "",
    essays: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      path: app.globalData.base + ':' + app.globalData.port + '/'
    })
  },
  onShow: function () {
    this.requestEssayList()
  },

  //获取动态列表
  requestEssayList: function () {
    var that = this
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '/essay/queryUserEssays',
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
    })
  },

  //记录点赞情况
  isLike: function (e) {
    var index = e.target.dataset.index
    console.log(index)
    if (this.data.essays[index].like) {
      wx.request({
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
      })
    }
    else {
      wx.request({
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
      })
    }
  },

  //查看打卡详情
  essayClick: function (e) {
    var essayId = e.target.dataset.essayid
    var userId = app.globalData.openId
    console.log(essayId)
    wx.navigateTo({
      url: '../../essay/essayDetail/essayDetail?essayId=' + essayId + '&userId=' + userId,
    })
  },
  // 预览
  essayPic: function (e) {
    console.log(e.target.dataset.index)
  },
  delEssay: function (e){
    console.log(e.target.dataset.essayid)
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port+'/essay/deleteEssay',
      method: 'POST',
      data: {
        essayId: e.target.dataset.essayid
      },
      success: res=>{
        console.log(res.data)
        this.setData({
          essays: res.data
        })
      },
      fail: err=>{

      }
    })
  }
})