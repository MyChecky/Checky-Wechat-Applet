Page({
  data: {
    userAvatar: "",
    userId: "",
    essaysTime: "",
    essaysText: "",
    essaysPic: "",
    isLike: false,
    likeNum: 0,
    comment: []
  },

  //举报跳转
  report: function() {
    var essayId = e.target.dataset.essayid
    var userId = e.target.dataset.userid
    console.log(essayId)
    wx.navigateTo({
      url: './report/report?essayId=' + essayId + '&userId=' + userId,
    })
  },

  onLoad: function(options) {},

  onReady: function() {},

  onShow: function() {
    this.requestEssayDetail(this.data.essay)
    this.requestEssayComment(this.data.commentList)
  },

  //---------------！--需要修改--！-----------------
  //· 获取动态详情
  requestEssayDetail: function(essay) {
    var that = this
    wx.request({
      // url
      url: app.globalData.base + ':' + app.globalData.port + '/essays/queryEssay',
      method: 'POST',
      data: {
        essayId: that.data.essayId
      },
      success(res) {
        console.log(res.data)
        that.setData({
          essay: res.essay
        })
      }
    })
  },

  //· 获取评论信息
  requestEssayComment: function(commentList) {
    var that = this
    wx.request({
      // url
      url: app.globalData.base + ':' + app.globalData.port + '/essays/queryComment',
      method: 'POST',
      data: {
        essayId: that.data.essayId
      },
      success(res) {
        console.log(res.data)
        that.setData({
          comment: res.comment
        })
      }
    })
  },

  //记录点赞情况
  isLike: function(e) {
    var likeNum = e.target.dataset.likenum
    var isLike = e.target.dataset.islike
    console.log(likeNum)
    this.setData({
      isLike: !this.data.isLike,
      likeNum: this.data.isLike ? this.data.likeNum - 1 : this.data.likeNum + 1
    })
  },

  //评论
  sendComment:function(){
    if (this.data.essaysComment == "") {
      this.selectComponent("#toast").toastShow('不能发送空的评论', 'fa-exclamation-circle', 2000)
    } 
    else{
      var data = {//评论用户、评论内容
        "comId": app.globalData.userId,
        "comment": this.data.comment,
      }
    }
  },

  //输入聚焦
  foucus: function(e) {
    var that = this;
    that.setData({
      bottom: e.detail.height
    })
  },

  //失去聚焦
  blur: function(e) {
    var that = this;
    that.setData({
      bottom: 0
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})