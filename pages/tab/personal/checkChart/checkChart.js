// pages/tab/personal/checkChart/checkChart.js
const app = getApp()
var wxCharts = require('../../../../utils/wxcharts.js') //引入wxChart文件
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seriesTime: [],
    seriesType: [],

    taskTotalNum: 0,
    taskPassNum: 0,
    checkShouldNum: 0,
    checkTotalNum: 0,
    checkPassNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 屏幕宽度
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    });
    console.log(this.data.imageWidth);
    //计算屏幕宽度比列
    windowW = this.data.imageWidth / 375;
    console.log(windowW);
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
    var that = this;

    req = {
      url: '/check/checkChart',
      method: 'POST',
      data: {
        userId: app.globalData.openId
      },
      success: res => {
        console.log("checkChartRet", res.data)
        that.setData({
          seriesTime: res.data.seriesTime,
          taskPassNum: res.data.taskPassNum,
          taskTotalNum: res.data.taskTotalNum,
          checkPassNum: res.data.checkPassNum,
          checkTotalNum: res.data.checkTotalNum,
          checkShouldNum: res.data.checkShouldNum,
        })

        that.buildChart();
      },
      fail: err => {
        console.log("checkChartErr", err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
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

  buildChart: function() {
    // pieCanvasForCheckTime
    new wxCharts({
      animation: true, //是否有动画
      canvasId: 'pieCanvasTime',
      type: 'pie',
      series: this.data.seriesTime,
      width: (375 * windowW),
      height: (250 * windowW),
      dataLabel: true,
    });

    // pieCanvasForTaskType
    // new wxCharts({
    //   animation: true, //是否有动画
    //   canvasId: 'pieCanvasType',
    //   type: 'pie',
    //   series: this.data.seriesType,
    //   width: (375 * windowW),
    //   height: (250 * windowW),
    //   dataLabel: true,
    // });
  }
})