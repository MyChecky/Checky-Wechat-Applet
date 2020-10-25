// pages/tab/personal/achievement/achieve.js
const app = getApp()
var util = require("../../../../utils/util.js")
Page({

  /**
   * Page initial data
   */
  data: {
    medalNum: 0,
    medals: [
    {
      img:'https://img.yzcdn.cn/vant/cat.jpeg',
      desc:'达人勋章'
    },
    {
      img:'https://img.yzcdn.cn/vant/apple-2.jpg',
      desc:'坚持勋章'
    }],
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
        that.reqAllMedal()
      },
    })
  },
  //获取勋章列表
  reqAllMedal: function () {
    var that = this
    req = {
      url: '/medal/get',
      method: 'POST',
      data:{
        'userId': app.globalData.openId
      },
      success(res) {
        console.log(res.data)
        if (!res.data) {
          that.setData({
            infomation: "nomore"
          })
        } else {
          that.setData({
            infomation: "loading",
            medals: res.data,
            medalNum: that.medals.length
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