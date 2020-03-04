// pages/tab/personal/moneyFlowList/moneyFlowList.js
const app = getApp()
var Charts = require('../../../../utils/wxcharts.js') //引入wxChart文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["试玩资金记录", "充值资金记录", "全部资金记录"],
    icon: "fa-rmb",
    moneyTypeIndex: 2, // 表缺省显示全部记录
    displayTypeIndex: 0, // 默认列表
    lineChart: '',
    displayMoneyList: [],
    displayMoneyOut: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    displayMoneyIn: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalRecharge: 0,
    totalWithdraw: 0,
    totalMoneyOut: 0,
    totalMoneyIn: 0,
    date: '',
    startTime: "1970-01-01", // 取全部数据
    endTime: app.globalData.date, // 取全部数据
    year: 2020,
    yearIndex: -1, // 这里的 -1 表试默认值（默认列表不需要这个值）

    ifTrueMoneyAccess: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      ifTrueMoneyAccess: app.globalData.ifTrueMoneyAccess,
    })
    if(! app.globalData.ifTrueMoneyAccess){
      this.setData({
        title: ["资金记录"],
        moneyTypeIndex: 0,
      })
    }
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
    req = {
      url: '/money/queryMoneyRecord',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        startTime: this.data.startTime,
        endTime: this.data.endTime,
        yearIndex: parseInt(this.data.yearIndex),
        moneyTypeIndex: parseInt(this.data.moneyTypeIndex), // 1：充值，0：试玩，2：全部
        displayTypeIndex: parseInt(this.data.displayTypeIndex) // 0: 列表，1：图表
      },
      success: res => {
        console.log(res.data)
        if (this.data.displayTypeIndex == 0) {
          this.setData({
            displayMoneyList: res.data.displayMoneyList,
          })
        }
        if (this.data.displayTypeIndex == 1) {
          this.setData({
            displayMoneyOut: res.data.displayMoneyOut,
            displayMoneyIn: res.data.displayMoneyIn,
            totalMoneyOut: res.data.totalMoneyOut,
            totalMoneyIn: res.data.totalMoneyIn,
            year: res.data.year
          })
          if (this.data.moneyTypeIndex == 0 || this.data.moneyTypeIndex == 2) {
            this.setData({
              totalRecharge: res.data.totalRecharge,
              totalWithdraw: res.data.totalWithdraw,
            })
          }
        }
        console.log(this.data)
        var windowWidth = '',
          windowHeight = ''; //定义宽高
        try {
          var res1 = wx.getSystemInfoSync(); //试图获取屏幕宽高数据
          windowWidth = res1.windowWidth * 700 / 750
          windowHeight = res1.windowWidth * 500 / 750
        } catch (e) {
          console.error('getSystemInfoSync failed!'); //如果获取失败
        }

        this.data.lineChart = new Charts({
          canvasId: 'lineCanvas',
          type: 'line',
          animation: true, //是否开启动画
          categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          series: [{
            name: '支出情况',
            data: this.data.displayMoneyOut,
            format: function(val) {
              return val.toFixed(2);
            }
          }, {
            name: '收入情况',
            data: this.data.displayMoneyIn,
            format: function(val) {
              return val.toFixed(2);
            }
          }, ],
          xAxis: { //是否隐藏x轴分割线
            disableGrid: true,
          },
          yAxis: {
            title: '单位(元)',
            format: function(val) {
              return val.toFixed(2);
            },
          },
          width: windowWidth, //图表展示内容宽度
          height: windowHeight, //图表展示内容高度
          dataLabel: true, //是否在图表上直接显示数据
          dataPointShape: true, //是否在图标上显示数据点标志
          extra: {
            lineStyle: 'curve' //曲线
          },
        });
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

  // 资金记录页面
  getMoneyType: function() {
    wx.navigateTo({
      url: '../moneyType/moneyType',
    })
  },

  /**
   * 点击数据点显示对应的数据
   */
  touchHandler: function(e) {
    this.data.lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + '月 ' + item.name + ':' + item.data
      }
    });
  }
})