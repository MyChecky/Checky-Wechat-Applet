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
    title: "打卡记录",
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
          height: res.windowHeight,
          width: res.windowWidth,
        })
      },
    })
    var that = this
    req = {
      url: '/check/listCheck',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        cPage: that.data.cPage
      },
      success: res => {
        console.log("历史返回值", res.data)
        console.log("width", that.data.width)
        if (res.data.length < 10) {
          that.setData({
            infomation: "nomore"
          })
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].url = app.getAbsolutePath() + "/"
            res.data[i].check.checkState = util.dataEN2CN(res.data[i].check.checkState)
          }
          that.setData({
            historyList: res.data,
            cPage: that.data.cPage + 1
          })
        } else {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].url = app.getAbsolutePath() + "/"
            res.data[i].check.checkState = util.dataEN2CN(res.data[i].check.checkState)
            if(that.data.width < 350){
              if (res.data[i].text.recordContent.length > 8) {
                res.data[i].text.recordContent = res.data[i].text.recordContent.substring(0, 8) + '...';
              }
              if (res.data[i].check.taskTitle.length > 7) {
                res.data[i].check.taskTitle = res.data[i].check.taskTitle.substring(0, 7) + '...';
              }
            }else{
              if (res.data[i].text.recordContent.length > 10) {
                res.data[i].text.recordContent = res.data[i].text.recordContent.substring(0, 10) + '...';
              }
              if (res.data[i].check.taskTitle.length > 9) {
                res.data[i].check.taskTitle = res.data[i].check.taskTitle.substring(0, 9) + '...';
              }
            }
           
          }
          that.setData({
            historyList: res.data,
            cPage: that.data.cPage + 1
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
    console.log("loadmore");
    var that = this;
    req = {
      url: '/check/listCheck',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        cPage: that.data.cPage
      },
      success: res => {
        console.log("listCheck", res.data)
        if (res.data.length == 0) {
          that.setData({
            infomation: "nomore"
          })
        } else {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].url = app.getAbsolutePath() + "/"
            res.data[i].check.checkState = util.dataEN2CN(res.data[i].check.checkState)
            
            if (res.data[i].text.recordContent.length > 10) {
              res.data[i].text.recordContent = res.data[i].text.recordContent.substring(0, 10) + '...';
            }
            if (res.data[i].check.taskTitle.length > 9) {
              res.data[i].check.taskTitle = res.data[i].check.taskTitle.substring(0, 9) + '...';
            }
          }
          that.setData({
            historyList: that.data.historyList.concat(res.data),
            cPage: that.data.cPage + 1
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