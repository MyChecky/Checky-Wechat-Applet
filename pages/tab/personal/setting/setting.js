// pages/tab/personal/setting/setting.js
app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    typyGender: ["女", "男", "未知"],
    typeGenderIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      typeGenderIndex: app.globalData.userInfo.gender
    })
    console.log("onLoad", this.data)
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

  },

  bindChangeAvatar: function(e) {
    console.log("changeAvatar", e)
    wx.chooseImage({
      count: 1, // 默认9,指定一张头像
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        wx.navigateTo({
          url: `../setAvatar/setAvatar?src=${src}`

        })
      }
    })
  },

  bindName: function (e) {
    this.setData({
      "userInfo.nickName": e.detail.value
    })
  },

  bindGenderType(e) {
    this.setData({
      typeGenderIndex: e.detail.value,
      "userInfo.gender": e.detail.value
    })
  },

  makesureInfo(e){
    // 上传文件
    var that = this;
    wx.uploadFile({
      url: app.getAbsolutePath() + '/userAndHobby/uploadAvatar',
      filePath: that.data.userInfo.avatarUrl,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        "sessionKey": app.globalData.sessionKey,
        "userId": app.globalData.openId,
      },
      formData: {
        'userId': app.globalData.openId,
        // 'baseIp': app.getAbsolutePath(),
      },
      success(res) {
        console.log(res);
        resData = JSON.parse(res.data)
        console.log(resData)
        // 上传信息
        req = {
          url: '/userAndHobby/updateUser',
          method: 'POST',
          data: {
            "userId": app.globalData.openId,
            "userGender": that.data.userInfo.gender,
            "userName": that.data.userInfo.nickName,
            "userAvatar": resData.avatarUrl
          },
          success: res => {
            console.log("res.data.hobbies")
            wx.navigateBack({
              delta: 1
            })
          },
          fail: err => {
            console.log(err)
          }
        }
        app.requestWithAuth(req)
          .then(req.success)
          .catch(req.fail)
        console.log("hob", this.data)
      },
      fail(err) {
        console.log(err)
        // 上传信息
        req = {
          url: '/userAndHobby/updateUser',
          method: 'POST',
          data: {
            "userId": app.globalData.openId,
            "userGender": that.data.userInfo.gender,
            "userName": that.data.userInfo.nickName,
            "userAvatar": that.data.userInfo.avatarUrl
          },
          success: res => {
            console.log("res.data.hobbies")
            wx.navigateBack({
              delta: 1
            })
          },
          fail: err => {
            console.log(err)
          }
        }
        app.requestWithAuth(req)
          .then(req.success)
          .catch(req.fail)
      }
    })
  },

  gotoHobby(e) {
    wx.navigateTo({
      url: '../setHobbies/setHobbies',
    })
  }
})