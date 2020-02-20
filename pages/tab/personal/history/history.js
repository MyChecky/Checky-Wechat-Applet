// pages/tab/personal/history/history.js
const app = getApp()
const util = require("../../../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    path: "",
    title: "历史记录",
    icon: "fa-history",
    infomation: "loading",
    cPage: 1,
    historyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      path: app.getAbsolutePath() + '/'
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      },
    })
    var that = this
    req = {
      url: '/check/listCheck',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        cPage: this.data.cPage
      },
      success: res => {
        console.log("历史返回值", res.data)
        if (res.data.length < 10) {
          that.setData({
            infomation: "nomore"
          })
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].url = app.getAbsolutePath() + "/"
            res.data[i].check.checkState = util.dataEN2CN(res.data[i].check.checkState)
          }
          this.setData({
            historyList: res.data,
            cPage: this.data.cPage + 1
          })
        } else {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].url = app.getAbsolutePath() + "/"
            res.data[i].check.checkState = util.dataEN2CN(res.data[i].check.checkState)
          }
          this.setData({
            historyList: res.data,
            cPage: this.data.cPage + 1
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
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
  loadMore: function() {
    req = {
      url: '/check/listCheck',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        cPage: this.data.cPage
      },
      success: res => {
        console.log(res.data)
        if (res.data.length == 0) {
          that.setData({
            infomation: "nomore"
          })
        } else {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].url = app.getAbsolutePath() + "/"
            res.data[i].check.checkState = util.dataEN2CN(res.data[i].check.checkState)
          }
          this.setData({
            historyList: res.data,
            cPage: this.data.cPage + 1
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  checkDetail: function(options) {
    checkid = options.target.dataset.checkid;
    checkstate = options.target.dataset.checkstate;
    taskid = options.target.dataset.taskid;
    console.log("checkDetail", options.target.dataset)
    wx.navigateTo({
      url: '../../tasks/taskDetail/taskDetail?taskId=' + taskid + '&checkState=' + checkstate + '&checkId=' + checkid,
    })
  }
})