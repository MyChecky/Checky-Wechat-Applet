// pages/tab/essays/essays.js
var util = require("../../../utils/util.js")
Page({
  data: {
    isComment: false,
    likeSum:10,
    essays: [{
      userId: "用户123",
      essaysText: "背单词好快乐",
      essayTime: "7月2日 13:45",
      essayPic: "image/pic.jpg",
      isLike:"false",
    },
    {
      userId: "用户231",
      essaysText: "背单词好痛苦,我今天花了10个小时背单词，头都大了，测试一下",
      essayTime: "7月3日 13:45",
      isLike: "true",
    }
    ],
  },

  isLike: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      isLike: !this.data.isLike,
      likeSum: this.data.isLike ? this.data.likeSum - 1 : this.data.likeSum + 1
    })
  },

  isComment: function () {
    this.setData({
      isComment: !this.data.isComment,
    })
    wx.navigateTo({
      url: './essaysDetail/essaysDetail',
    })
  },
  //查看打卡详情
  essaysClick: function () {
    wx.navigateTo({
      url: './essaysDetail/essaysDetail',
    })
  },
  //创建打卡
  essaysNew: function () {
    wx.navigateTo({
      url: './essaysNew/essaysNew',
    })
  },


  onLoad: function (options) {

  },

  isComment: function () {
    this.setData({
      isComment: !this.data.isComment,
    })
    wx.navigateTo({
      url: './essaysDetail/essaysDetail',
    })
  },
  //查看打卡详情
  essaysClick: function () {
    wx.navigateTo({
      url: './essaysDetail/essaysDetail',
    })
  },
  //创建打卡
  essaysNew: function () {
    wx.navigateTo({
      url: './essaysNew/essaysNew',
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})