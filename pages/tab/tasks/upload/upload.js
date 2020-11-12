// pages/tab/tasks/upload/upload.js
const app = getApp()
rm = wx.getRecorderManager()
//录音停止时调用
rm.onStop(function(e) {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var that = currentPage;
  wx.showLoading({
    title: "正在识别..."
  });
  console.log("录音结束", e)
  var url = e.tempFilePath
  var n = that.data.index
  that.setData({
    ['recor[' + n + '].URL']: url,
    index: n + 1,
    currentNum: n + 1,
    fileTypeChoosing: "recor",
    showRecording: false,
  })
  wx.hideLoading()
})

Page({

  /** 
   * 页面的初始数据
   */
  data: {
    isTopicSelected: false,

    checkId: "",
    nickname: "",
    taskname: "",
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
    }],
    recor: [{
      "URL": "",
      "NICKNAME": "",
      "TASKNAME": "",
    }],
    index: 0,
    content: "",
    share: false,

    showRecording: false,
    hasRecord: false,
    isDot: "block",
    isPausing: false,
    isTouchStart: false,
    isTouchEnd: false,
    value: 100,
    touchStart: 0,
    touchEnd: 0,
    timerPointNow: 300,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("uploadOnload", options)
    this.setData({
      taskId: options.taskId,
      taskname: options.taskname,
      nickname: app.globalData.userInfo.nickName,
    })
    this.checkDate(options.ymd);
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // innerAudioContext.destroy();
  },

  
  // 检查日期
  checkDate: function(ymd) {
    var that = this;
    req = {
      url: '/check/checkDate',
      method: 'POST',
      data: {
        ymd: ymd,
      },
      success(res) {
        console.log("checkDateRes", res);
        if (res.data.state != "ok") {
          that.selectComponent("#toast").toastShow('时间不合法，请同步本机时间后重试！', 'fa-exclamation-circle', 1000);
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail(err) {
        console.log("checkDateErr", err);
        that.selectComponent("#toast").toastShow('未知错误！', 'fa-exclamation-circle', 3000);

        wx.navigateBack({
          delta: 1
        })
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
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
        console.log("chooseImageFileRes", res);
        temp = res.tempFilePaths
        for (var i = 0; i < temp.length; i++) {
          var n = that.data.index
          var url = temp[i]
          if (n < 4 && res.tempFiles[i].size < app.globalData.maxPostFileSize) {
            that.setData({
              ['image[' + n + '].URL']: url,
              index: n + 1,
              currentNum: n + 1
            })
          } else if (n < 4 && res.tempFiles[i].size >= app.globalData.maxPostFileSize) {
            that.selectComponent("#toast").toastShow('图片过大，请重新选择！', 'fa-exclamation-circle', 1000);
          } else {
            break
          }
        }
        that.setData({
          fileTypeChoosing: "image"
        })
      },
      fail: function(res) {}
    })
  },
  //选择视频
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
        console.log("chooseVideoFileRes", res)
        var url = res.tempFilePath
        var n = that.data.index
        if (res.size < app.globalData.maxPostFileSize) {
          that.setData({
            ['video[' + n + '].URL']: url,
            index: n + 1,
            currentNum: n + 1,
          })
          console.log(that.data.video)
          that.setData({
            fileTypeChoosing: "video"
          })
        } else {
          that.selectComponent("#toast").toastShow('视频过大，请重新选择！', 'fa-exclamation-circle', 1000)
        }


      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  // 开始录音
  chooseRecorFile: function() {
    this.setData({
      showRecording: true,
      fileTypeChoosing: 'recording',
    })
  },
  //上传音频
  chooseAudioFile: function() {},
  // 取消录音文件
  cancelRecor: function(e) {
    var n = this.data.index - 1
    var p = e.target.dataset.index
    console.log(p + ":" + this.data.recor[p].URL)
    var temp = []
    var j = 0
    for (var i = 0; i < this.data.recor.length; i++) {
      if (i != p) {
        temp[j] = this.data.recor[i]
        j++
      }
    }
    this.setData({
      fileTypeChoosing: "init",
      recor: temp,
      index: n,
      currentNum: n
    })
  },
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
          // toast.toastShow('上传视频失败', 'fa-exclamation-circle', 1000)
          done++
        }
      })
    }
  },
  // 提交录音文件
  submitRecord: function(essayId) { // type essayID还是checkID
    var that = this;
    var essayId = essayId
    var done = 0;
    for (var i = 0; i < that.data.index; i++) {
      console.log(that.data.recor)
      console.log(that.data.recor[i].URL)
      wx.uploadFile({
        url: app.getAbsolutePath() + '/check/file/upload',
        filePath: that.data.recor[i].URL,
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
          // toast.toastShow('上传音频失败', 'fa-exclamation-circle', 1000)
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
          // toast.toastShow('上传图片失败', 'fa-exclamation-circle', 1000)
          done++
        }
      })
    }
  },
  // 文本上传到record
  submitText2Record: function(essayId) {
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
        } else if (that.data.fileTypeChoosing == "recor") {
          that.submitRecord(essayId)
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
        // toast.toastShow('上传打卡失败', 'fa-exclamation-circle', 1000)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  // 提交
  submit: function() {
    const toast = this.selectComponent("#toast")
    // toast.toastShow2('稍等，请勿重复提交', 'fa-spinner fa-pulse')
    var that = this
    /* 这里改变原有逻辑：文本上传record，文件上传到record(仅有checkId),判断是否要分享->文本上传到essay，获得essayId,
       文件重复上传到record(仅有essayId)*/
    /* 文本上传到essayId, 返回essayId->文本与文件上传到record(含checkId, 可能含essayId)*/
    if (this.data.share) {
      that.setLocationData();
      that.submitText2Essay();
    } else {
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
  },

  // 点击录音按钮
  onRecordClick: function() {
    wx.getSetting({
      success: function(t) {
        console.log(t.authSetting), t.authSetting["scope.record"] ? console.log("已授权录音") : (console.log("未授权录音"),
          wx.openSetting({
            success: function(t) {
              console.log(t.authSetting);
            }
          }));
      }
    });
  },
  //
  pauseRecording: function(e) {
    var that = this;
    console.log("暂停！")
    rm.pause()
    that.setData({
      isPausing: true,
      isTouchStart: false,
    })
    clearInterval(this.timer);
  },
  /**
   * 开始录音或者继续录音
   */
  recordStart: function(e) {
    var that = this;
    that.setData({
      touchStart: e.timeStamp,
      isTouchEnd: false,
      isTouchStart: true,
    })
    if (that.data.isPausing) { // 暂停中
      console.log("继续！")
      that.setData({
        isPausing: false,
      })
      rm.resume();
    } else { //第一次开始录音
      console.log("开始：")
      rm.start({
        format: "mp3",
        sampleRate: 32e3,
        encodeBitRate: 192e3,
        maxDuration: 600000,
        timerPointNow: 300,
      })
    }
    var a = that.data.timerPointNow; // 时长 s, 后期从数据库请求得到
    var o = 10;
    this.timer = setInterval(
      function() {
        that.setData({
            value: that.data.value - 100 / 30000,
            timerPointNow: a,
          }),
          (o += 10) >= 1e3 && o % 1e3 == 0 &&
          (a--, console.log(a),
            a <= 0 && (rm.stop(), clearInterval(that.timer))
          );
      },
      10);
  },
  /**
   * 录音结束
   */
  recordTerm: function(e) {
    rm.stop();
    this.setData({
      isTouchEnd: true,
      isTouchStart: false,
      touchEnd: e.timeStamp,
      value: 100,
      timerPointNow: 300,
    });
    clearInterval(this.timer);
  },
  getTopic:function(){
    wx.navigateTo({
      url: '../../essay/topicSelect/topicSelect',
    })
  }
})