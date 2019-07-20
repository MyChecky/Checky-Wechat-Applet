// pages/tab/essay/essay.js
var util = require("../../../utils/util.js")
Page({
  data: {
    essay: [],
  },

  onShow: function () {
    this.requestEssayList(this.data.essay)
  },

  //获取动态列表---------------！--需要修改--！-----------------
  requestEssayList:function(essay){
    console.log(essay)
    var that = this
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '/essay/listEssay',
      method: 'POST',
      data: {
        "userId": app.globalData.openId
      },
      success(res) {
        console.log(res.data)
        that.setData({
          essay:res.essay
        })
      }
    })
  },

  //记录点赞情况
  isLike: function (e) {
    var likeNum = e.target.dataset.likenum
    var isLike = e.target.dataset.islike
    console.log(likeNum)
    this.setData({
      isLike: !this.data.isLike,
      likeNum: this.data.isLike ? this.data.likeNum - 1 : this.data.likeNum + 1
    })
  },

  //查看打卡详情
  essayClick: function (e) {
    var essayId = e.target.dataset.essayid
    var userId = e.target.dataset.userid
    console.log(essayId)
    wx.navigateTo({
      url: './essayDetail/essayDetail?essayId=' + essayId + '&userId='+ userId,
    })
  },
  //创建打卡
  essayNew: function () {
    wx.navigateTo({
      url: './essayNew/essayNew',
    })
  },

})