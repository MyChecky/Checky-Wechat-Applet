// pages/tab/tasks/taskDetail/taskDetail.js
const util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "XXX任务",
    checkId: "",
    taskId: "",
    taskState: "未上传",
    supState: "待认证",
    numOfSup: 0,
    numOfSuped: 0,
    supList: [{
        "supId": "1",
        "supName": "Tom",
        "supState": "pass",
        "content": ""
      },
      {
        "supId": "1",
        "supName": "Tom",
        "supState": "fail",
        "content": ""
      },
      {
        "supId": "1",
        "supName": "Tom",
        "supState": "unknown",
        "content": ""
      }
    ],
    info: [{
        "name": "重复",
        "value": "1111111"
      },
      {
        "name": "时间",
        "value": "2019-07-01 2019-08-01"
      },
      {
        "name": "押金",
        "value": "20.00"
      },
      {
        "name": "描述",
        "value": "something...aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options)
    if (options.checkId != undefined) {
      this.setData({
        checkId: options.checkId
      })
    }
    this.setData({
      taskId: options.taskId
    })
    wx.request({
      url: '',
      data: {
        taskId: that.data.taskId,
        checkId: that.data.checkId
      },
      success(res) {
        that.setData({
          taskState: res.data.taskState,
          supState: res.data.supState
        })
        that.getSupNum(res.data.supList)
        that.formatInfo(res.data.info)
        wx.setNavigationBarTitle({
          title: res.data.taskTitle
        })
      }
    })
    // 本地测试
    this.formatInfo(this.data.info)
    this.getSupNum(this.data.supList)
    console.log(this.data.info)
  },
  // 格式化重复周期
  formatInfo: function(newInfo) {
    newInfo[0].value = util.formatBiDate(newInfo[0].value)
    this.setData({
      info: newInfo
    })
  },
  // 获取监督人数和监督数
  getSupNum(list) {
    var done = 0;
    var length = list.length;
    for (var i = 0; i < length; i++) {
      switch (this.data.supList[i].supState) {
        case 'pass':
          list[i].content = '通过'
          done++
          break
        case 'unknown':
          list[i].content = '待认证'
          break
        case 'fail':
          list[i].content = '未通过'
          done++
          break
      }
    }
    this.setData({
      numOfSup: length,
      numOfSuped: done,
      supList: list
    })
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
    if(this.data.checkId!=""){
      this.setData({
        taskState: '已上传'
      })
    }
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
  upload: function() {
    wx.navigateTo({
      url: '../upload/upload?checkId=' + this.data.checkId,
    })
  }
})