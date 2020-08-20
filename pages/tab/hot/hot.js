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
    hotTopic:[],
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
        console.log(res.data)
        if (!res.data.rankList) {
          that.setData({
            infomation: "nomore"
          })
        } else {
          that.setData({
            infomation: "loading",
            hotTag: res.data.rankList,
          })
        }
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
      url: '/topicRank/rank',
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (!res.data) {
          that.setData({
            infomation: "nomore"
          })
        } else {
          that.setData({
            infomation: "loading",
            hotTopic: res.data,
          })
        }
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})