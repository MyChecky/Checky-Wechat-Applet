// pages/tab/tasks/tag.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentTab: 0,
    hotTopic: [
      {
        'index': 1,
        'url': '#',
        'param': '话题',
        'name': '今天你上岸了吗',
      },
      {
        'index': 2,
        'url': '#',
        'param': '话题',
        'name': '托福分手',
      },
      {
        'index': 3,
        'url': '#',
        'param': '话题',
        'name': '雅思冲！',
      },
    ],
    hotTag: [
      {
        'index': 1,
        'url': '#',
        'param': '标签',
        'name': '跑步',
      },
      {
        'index': 2,
        'url': '#',
        'param': '标签',
        'name': '考研',
      },
      {
        'index': 3,
        'url': '#',
        'param': '标签',
        'name': '单词',
      }, {
        'index': 4,
        'url': '#',
        'param': '标签',
        'name': '英语',
      },
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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

  },
  //顶部切换页面
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})