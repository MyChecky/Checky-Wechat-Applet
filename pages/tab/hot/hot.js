// pages/tab/hot/hot.js
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
      },
    })
  },
  //获取动态列表
  reqHotTag: function () {
    req = {
      url: '/tag/rank',
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (res.data.length == 0) {
          that.setData({
            infomation: "nomore"
          })  
        } else {
          that.setData({
            infomation: "loading",
            essays: that.data.essays.concat(res.data),
            cPage: that.data.cPage + 1
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