// pages/tab/hot/hot.js
const app = getApp()
var util = require("../../../utils/util.js")
Page({

  /**
   * Page initial data
   */
  data: {
    inputShowed: false,

    imgs: [
      'https://img.yzcdn.cn/vant/cat.jpeg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      'https://img.yzcdn.cn/vant/apple-1.jpg'
    ],
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

  // 页面跳转
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
  },

  // 搜索任务标签
  searchTag: function(){
    var that = this;
    req = {
      url: '/tag/queryByKeyword',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        keyword: that.data.inputVal,
      },
      success: res => {
        console.log("查询结果", res.data)
        that.setData({
          tagSearchList: res.data.tagList,
        })
        console.log(this.data)
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  // 搜索动态话题
  searchTopic: function(){
    var that = this;

    req = {
      url: '/topic/queryByKeyword',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        keyword: that.data.inputVal,
      },
      success: res => {
        console.log("查询结果", res.data)
        that.setData({
          topicCountSearchList: res.data.TopicList,
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

  // 搜索相关
  searchInput: function () {
    var that = this
    console.log("searchInput", that.data.inputVal)
    that.searchTopic();
    that.searchTag();
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    var topicListAll = this.data.topicListAll;
    this.setData({
      inputVal: "",
      topicList: topicListAll,
      inputShowed: false,
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})