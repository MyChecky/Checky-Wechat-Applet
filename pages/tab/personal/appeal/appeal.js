// pages/tab/personal/appealreport/appealreport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '申诉',
    icon: 'fa-exclamation-circle',
    appealList: [
      {
        date: '2019-07-09',
        processDate: '',
        content: 'XXX故意不通过',
        state: '待审核',
        result: ''
      },
      {
        date: '2019-07-09',
        processDate: '',
        content: 'XXX故意不通过',
        state: '待审核',
        result: ''
      },
      {
        date: '2019-07-09',
        processDate: '2019-07-11',
        content: 'XXX故意不通过',
        state: '已审核',
        result: '申诉成功'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})