// pages/tab/hot/hot.js
const app = getApp()
var util = require("../../../utils/util.js")
Page({

  /**
   * Page initial data
   */
  data: {
    imgs: [
      'https://img.yzcdn.cn/vant/cat.jpeg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      'https://img.yzcdn.cn/vant/apple-1.jpg'
    ],
    infomation: "正在加载",
    hotTopic: [],
    hotTag: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    var that = this;
    this.setData({
      path: app.getAbsolutePath() + '/',
    })
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          height: res.windowHeight
        })
        that.reqHotTag()
        that.reqHotTopic()
      },
    })
  },
  //获取热门标签
  reqHotTag: function () {
    var that = this
    req = {
      url: '/tag/rank',
      method: 'POST',
      success(res) {
        console.log("tag_rank", res.data)
        that.setData({
          tagList: res.data.rankList,
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  //获取热门话题
  reqHotTopic: function () {
    var that = this
    req = {
      url: '/topic/hotFive',
      method: 'POST',
      success(res) {
        console.log('/topic/hotFive', res.data)
        that.setData({
          topicCountList: res.data.topicCountList,
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  gotoTopic: function (e) {
    console.log("goToTopic", e);
    var topicId = e.currentTarget.dataset.topicid;
    var topicName = e.currentTarget.dataset.topicname;
    wx.navigateTo({
      url: '../essay/essayTopic/essayTopic?topicId=' + topicId + '&topicName=' + topicName,
    })
  },
  gotoTag: function (e) {
    console.log("gotoTag", e);
    var tagId = e.currentTarget.dataset.tagid;
    var tagName = e.currentTarget.dataset.tagname;
    wx.navigateTo({
      url: './hotTag/hotTag?tagId=' + tagId + '&tagName=' + tagName,
    })
  }
})