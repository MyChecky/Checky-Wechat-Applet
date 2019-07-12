Page({
  data: {
    
    essays: [{
      userId: "用户123",
      essaysText: "背单词好快乐dhufjiodnushjnbfnkffsdjifsmknjmknjkmsjkmsljnkmsljn oikmsljnkbkljklnsjbkljsbhgjnlkdsbhgndlskban",
      essayTime: "7月2日 13:45",
      likeSum: "20"
    }],
    comment: [
      { 
        comId:"yonghu",
        comment: "6666666" },
      { 
        comId: "abc",
        comment: "厉害了" },
      { 
        comId: "123",
        comment: "发表了一条评论" },
      {
        comId: "123",
        comment: "发表了一条评论"
      },
      {
        comId: "123",
        comment: "发表了一条评论"
      },
      {
        comId: "123",
        comment: "发表了一条评论"
      },
    ]
  },

  report: function () {
    wx.navigateTo({
      url: '../report/report',
    })
  },

  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})