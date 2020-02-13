// pages/tab/tasks/upload/upload.js
const app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    checkId: "",
    currentLength: 0, // 文本长度
    currentNum: 0,
    fileTypeChoosing: "init",
    longitude: 0,
    latitude: 0,
    image: [{
        "URL": ""
      },
      {
        "URL": ""
      },
      {
        "URL": ""
      },
      {
        "URL": ""
      }
    ],
    video: [{
      "URL": ""
    }],
    audio: [{
        "URL": ""
      },
      {
        "URL": ""
      },
    ],
    index: 0,
    content: "",
    share: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      taskId: options.taskId
    })
  },
  // 文本长度监督
  lengthChange: function(e) {
    var length = e.detail.value.length
    var text = e.detail.value
    this.setData({
      currentLength: length,
      content: text
    })
  },
  // 选择图片
  chooseImageFile: function() {
    var that = this
    var temp = []
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res);
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
          } else break
        }
        that.setData({
          fileTypeChoosing: "image"
        })
      },
      fail: function(res) {}
    })
  },
  //上传视频
  chooseVideoFile: function() {
    var that = this
    var temp = []
    wx.chooseVideo({ //考虑以后可能上传多条视频，此处格式保留
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function(res) {
        console.log(res)
        var url = res.tempFilePath
        var n = that.data.index
        that.setData({
          ['video[' + n + '].URL']: url,
          index: n + 1,
          currentNum: n + 1,
        })
        console.log(that.data.video)
        that.setData({
          fileTypeChoosing: "video"
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  //上传音频
  chooseAudioFile: function() {},
  // 取消上传视频
  cancelVideo: function(e) {
    var n = this.data.index - 1
    var p = e.target.dataset.index
    console.log(p + ":" + this.data.video[p].URL)
    var temp = []
    var j = 0
    for (var i = 0; i < this.data.video.length; i++) {
      if (i != p) {
        temp[j] = this.data.video[i]
        j++
      }
    }
    this.setData({
      fileTypeChoosing: "init",
      video: temp,
      index: n,
      currentNum: n
    })
  },
  // 取消上传图片
  cancelImage: function(e) {
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
      fileTypeChoosing: "init",
      image: temp,
      index: n,
      currentNum: n
    })
  },
  // 提交视频文件
  submitVideo: function(essayId) { // type essayID还是checkID
    var that = this;
    var essayId = essayId
    var done = 0;
    for (var i = 0; i < that.data.index; i++) {
      console.log(that.data.video)
      console.log(that.data.video[i].URL)
      wx.uploadFile({
        url: app.getAbsolutePath() + '/check/file/upload',
        filePath: that.data.video[i].URL,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data",
          "sessionKey": app.globalData.sessionKey,
          "userId": app.globalData.openId
        },
        formData: {
          'userId': app.globalData.openId,
          'type': that.data.fileTypeChoosing,
          'checkId': that.data.checkId,
          'essayId': essayId,
        },
        success(res) {
          console.log(res)
          done++
        },
        fail(err) {
          console.log(err)
          toast.toastShow('上传视频失败', 'fa-exclamation-circle', 1000)
          done++
        }
      })
    }
  },
  // 提交图片文件
  submitImage: function(essayId) { // type essayID还是checkID
    var that = this;
    var essayId = essayId;
    var done = 0;
    for (var i = 0; i < that.data.index; i++) {
      console.log(that.data.image[i].URL)
      wx.uploadFile({
        url: app.getAbsolutePath() + '/check/file/upload',
        filePath: that.data.image[i].URL,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data",
          "sessionKey": app.globalData.sessionKey,
          "userId": app.globalData.openId,
        },
        formData: {
          'userId': app.globalData.openId,
          'type': that.data.fileTypeChoosing,
          'checkId': that.data.checkId,
          "essayId": essayId,
        },
        success(res) {
          console.log(res)
          done++
        },
        fail(err) {
          console.log(err)
          toast.toastShow('上传图片失败', 'fa-exclamation-circle', 1000)
          done++
        }
      })
    }
  },
  // 文本上传到record
  submitText2Record: function(essayId){
    var essayId = essayId;
    var that = this;
    const toast = this.selectComponent("#toast");
    req = {
      url: '/check/addCheck',
      method: 'POST',
      data: {
        "checkInfo": {
          "userId": app.globalData.openId,
          "taskId": this.data.taskId,
          "checkTime": app.globalData.date,
        },
        "content": this.data.content,
        "essayId": essayId,
      },
      success(res) {
        console.log(res)
        var checkId = res.data.checkId
        that.setData({
          checkId: checkId
        })
        console.log(that.data.fileTypeChoosing)
        if (that.data.fileTypeChoosing == "image") {
          that.submitImage(essayId);
        } else if (that.data.fileTypeChoosing == "video") {
          that.submitVideo(essayId);
        }
        that.back(checkId);
      },
      fail(err) {
        console.log(err)
        toast.toastShow('上传打卡失败', 'fa-exclamation-circle', 1000)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  // 文本上传到essay,会调用文本上传到record,此时没有checkId
  submitText2Essay: function() {
    var that = this;
    const toast = this.selectComponent("#toast")
    req = {
      url: '/essay/addEssay',
      method: 'POST',
      header: {
        "sessionKey": app.globalData.sessionKey,
        "userId": app.globalData.openId
      },
      data: {
        "userId": app.globalData.openId,
        "essayContent": this.data.content,
        "longitude": this.data.longitude + "",
        "latitude": this.data.latitude + "",
      },
      success(res) {
        console.log("上传essay成功:")
        console.log(res)
        that.setData({
          essayId: res.data.essayId,
        })
        // 上传到record
        that.submitText2Record(res.data.essayId);
      },
      fail(err) {
        console.log(err)
        toast.toastShow('上传打卡失败', 'fa-exclamation-circle', 1000)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  // 提交
  submit: function() {
    const toast = this.selectComponent("#toast")
    toast.toastShow2('稍等，请勿重复提交', 'fa-spinner fa-pulse')
    var that = this
    /* 这里改变原有逻辑：文本上传record，文件上传到record(仅有checkId),判断是否要分享->文本上传到essay，获得essayId,
       文件重复上传到record(仅有essayId)*/
    /* 文本上传到essayId, 返回essayId->文本与文件上传到record(含checkId, 可能含essayId)*/
    if (this.data.share) {
      that.setLocationData();
      that.submitText2Essay();
    }else{
      that.submitText2Record("noEssay");
    }
  },
  // 分享
  share: function(e) {
    this.setData({
      share: e.detail.value
    })
    console.log(this.data.share ? "同步" : "不同步")
  },
  // 经纬度
  setLocationData: function() {
    var that = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      },
    })
  },
  // 回退
  back: function(checkId) {
    // 分享到动态

    var arr = getCurrentPages()
    arr[arr.length - 2].setData({
      checkId: this.data.checkId
    })
    wx.navigateBack({
      delta: 2,
      success: function(res) {}
    })
  }
})