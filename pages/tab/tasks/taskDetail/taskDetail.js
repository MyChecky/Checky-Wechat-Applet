// pages/tab/tasks/taskDetail/taskDetail.js
const util = require("../../../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modal:{
      isHidden: true,
      message: 'msg',
      title: '申诉理由'
    },
    title: "",
    checkId: "",
    taskId: "",
    taskState: "未上传",
    checkState: "待认证",
    numOfSup: 0,
    numOfSuped: 0,
    supList: [
    ],
    info: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.checkId != undefined) {
      this.setData({
        checkId: options.checkId,
        checkState: util.dataEN2CN(options.checkState),
        taskState: '已上传'
      })
      var modal = this.selectComponent('#modal')
      modal.setData({
        checkId: options.checkId
      })
    }
    this.setData({
      taskId: options.taskId
    })
    console.log(this.data.taskId+''+this.data.checkId)
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
      list[i].content = util.dataEN2CN(this.data.supList[i].supState)
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
    var that = this
    wx.request({// 获取任务信息
      // url
      url: app.globalData.base+':'+app.globalData.port+'task/querytask',
      data: {
        taskId: that.data.taskId
      },
      success(res) {
        that.getSupNum(res.data.supList)
        that.formatInfo(res.data.info)
        wx.setNavigationBarTitle({
          title: res.data.taskTitle
        })
      }
    })
    wx.request({// 获取监督状态列表
      url: app.globalData.base + ':' + app.globalData.port + 'supervise//querySupervisorState',
      data: {
        taskId: that.data.taskId,
        checkId: that.data.checkId
      },
      success(res) {
        that.getSupNum(res.data.supList)
      }
    })
    // 本地测试
    console.log(this.data.info)
    console.log(this.data.supList)
  },
  // 打卡或查看打卡内容
  upload: function() {
    if(this.data.checkId==''){// 未打卡情况
      wx.navigateTo({
        url: '../upload/upload?taskId='+this.data.taskId,
      })
    }
    else{// 已打卡情况
      wx.navigateTo({
        url: '../checky/checky?checkId=' + this.data.checkId + '&lastPage=taskDetail',
      })
    }
  },
  appeal: function(){
    var temp = this.data.modal
    temp.isHidden = false
    this.setData({
      modal: temp
    })
    wx.request({
      url: app.globalData.base+':'+app.globalData.port+'',
      data: {
        userId:app.globalData.openId,
        checkId: this.data.checkId
      },
      success(res){}
    })
  },
});