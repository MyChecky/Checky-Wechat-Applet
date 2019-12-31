// pages/tab/essays/essaysNew/essaysNew.js
const util = require("../../../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    essayId: "",
    currentLength: 0,
    currentNum: 0,
    image: [
      { "URL": "" },
      { "URL": "" },
      { "URL": "" },
      { "URL": "" }
    ],
    index: 0,
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskId: options.taskId
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
  // 文本长度监督
  lengthChange: function (e) {
    var length = e.detail.value.length
    var text = e.detail.value
    this.setData({
      currentLength: length,
      content: text
    })
  },
  // 选择图片
  chooseFile: function () {
    var that = this
    var temp = []
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        temp = res.tempFilePaths
        for (var i = 0; i < temp.length; i++) {
          var n = that.data.index
          var url = temp[i]
          if (n < 4) {
            that.setData({
              ['image[' + n + '].URL']: url,
              index: n + 1,
              currentNum: n + 1
            })
          }
          else break
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 取消上传图片
  cancel: function (e) {
    var n = this.data.index - 1
    var p = e.target.dataset.index
    console.log(p + ":" + this.data.image[p].URL)
    var temp = []
    var j = 0
    for (var i = 0; i < this.data.image.length; i++) {
      if (i != p) {
        temp[j] = this.data.image[i]
        j++
      }
    }
    this.setData({
      image: temp,
      index: n,
      currentNum: n
    })
  },
  // 提交
  submit: function () {
    this.selectComponent("#toast").toastShow2('发布中', 'fa-spinner fa-pulse')
    
    var that = this
    // 文本上传
    req = {
      url: '/essay/addEssay',
      method: 'POST',
      header: {
        "sessionKey": app.globalData.sessionKey,
        "userId": app.globalData.openId
      },
      data: {
        "userId": app.globalData.openId,
        "essayContent": this.data.content
      },
      success(res) {
        console.log(res)
        var essayId = res.data.essayId
        var done = 0
        that.setData({
          essayId: essayId
        })
        // 附件上传
        for (var i = 0; i < that.data.index; i++) {
          console.log(that.data.image[i].URL)
          wx.uploadFile({
            url: app.getAbsolutePath() + '/essay/file/upload',
            filePath: that.data.image[i].URL,
            name: 'file',
            header: {
              "sessionKey": app.globalData.sessionKey,
              "userId": app.globalData.openId
            },
            formData: {
              'userId': app.globalData.openId,
              'type': 'picture',
              'essayId': that.data.essayId
            },
            success(res) {
              console.log(res)
              done++
            },
            fail(err) {
              console.log(err)
            }
          })
        }
        that.selectComponent("#toast").toastShow('发布成功', 'fa-check', 1000)
        that.back()
      },
      fail(err) {
        console.log(err)
        that.selectComponent("#toast").toastShow('发布失败', 'fa-remove', 1000)
      }
    }
    app.requestWithAuth(req)
    .then(req.success)
    .catch(req.fail)
  },
  back: function () {
    var arr = getCurrentPages()
    arr[arr.length - 2].setData({
      checkId: this.data.checkId
    })
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000
    })
    wx.navigateBack({
      delta: 2,
      success: function (res) {
      }
    })
  }
})