// pages/tab/essays/essays.js
var util = require("../../../utils/util.js")
Page({

  data: {
    isLike: false,
    isComment:false,

    essays: [{
      userId: "用户123",
      essaysText: "背单词好快乐",
      essayTime: "7月2日 13:45",
      likeSum:"20",
      essayPic:"image/pic.jpg"
    },
    {
      userId: "用户231",
      essaysText: "背单词好痛苦,我今天花了10个小时背单词，头都大了，测试一下",
      essayTime: "7月3日 13:45",
      likeSum:"12"
    }
    ],
  },

  isLike: function () {
    this.setData({
      isLike: !this.data.isLike,
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
  essaysNew:function(){
    wx.navigateTo({
      url: './essaysNew/essaysNew',
    })
  },


  onLoad: function (options) {
    
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})