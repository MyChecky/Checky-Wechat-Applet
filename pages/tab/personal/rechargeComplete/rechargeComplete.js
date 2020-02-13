// pages/tab/personal/rechargeComplete/rechargeComplete.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opType: ["充值", "提现"],
    opMoney: 0,
    opIndex: 0,
    opTime: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var opIndex = options.opIndex;
    var opMoney=options.opMoney;
    var opTime= options.opTime;
    that.setData({
      opIndex: opIndex,
      opMoney: opMoney,
      opTime: opTime,
    });
    console.log(that.data)
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
  bindBack: function(e){
    wx.navigateBack({
      delta: 2,
      success: function (res) {
      }
    })
  }
})