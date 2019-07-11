// pages/tab/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    "itemList" : [
      {
        "subItemList": [
          { "name": "好友", "url": "./friend/friend", "param": "", "icon": "fa-address-book-o"},
          { "name": "动态", "url": "./essay/essay", "param": "", "icon": "fa-globe"}
        ]
      },
      {
        "subItemList": [
          { "name": "资金记录", "url": "./money/money", "param": "", "icon": "fa-rmb" },
          { "name": "历史记录", "url": "", "param": "", "icon": "fa-history" }
        ]
      },
      {
        "subItemList": [
          { "name": "申诉", "url": "./appeal/appeal", "param": "", "icon": "fa-exclamation-circle" },
          { "name": "举报", "url": "./report/report", "param": "", "icon": "fa-hand-paper-o" },
          { "name": "设置", "url": "", "param": "", "icon": "fa-cog" },
          { "name": "反馈", "url": "", "param": "", "icon": "fa-pencil-square-o" }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
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

  },
  // 跳转
  jumpTo: function(e){
    var url = e.target.dataset.url
    var param = e.target.dataset.param
    console.log(url + '?' + param)
    wx.navigateTo({
      url: url+'?'+param,
    })
  }
})