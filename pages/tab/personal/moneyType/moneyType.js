// pages/tab/personal/moneyType/moneyType.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneyType: ['充值资金记录', '试玩资金记录', '全部资金记录'],
    moneyTypeIndex: 0,
    displayType: ['列表模式', '图表模式'],
    displayTypeIndex: 0,
    startTime: app.globalData.date,
    endTime: app.globalData.date,
    year: ['2019', '2020', '2021'], // 此处写死了，不是很好！长远考虑最好用后台计算返回的形式
    yearIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data)
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindPickerStartTime: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindPickerEndTime: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindPickerYear: function(e){
    this.setData({
      yearIndex: e.detail.value
    })
  },
  bindMoneyType: function (e) {
    this.setData({
      moneyTypeIndex: e.detail.value
    })
  },
  bindDisplayType: function (e) {
    this.setData({
      displayTypeIndex: e.detail.value
    })
  },
  sendChoice: function(e){
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    prePage.setData({
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      moneyTypeIndex: this.data.moneyTypeIndex,
      displayTypeIndex: this.data.displayTypeIndex,
      yearIndex: this.data.yearIndex
    })
    console.log("moneyTypeData:");
    console.log(this.data);
    console.log("prePageData:");
    console.log(prePage.data);
    wx.navigateBack({
      delta: 1,
      success: function (res) {
      }
    })
  }
})