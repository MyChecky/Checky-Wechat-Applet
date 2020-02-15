// pages/tab/personal/money/money.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "账户余额",
    icon: "fa-rmb",
    item: [{
        "name": "充值",
        "url": "./recharge/recharge",
        "param": "",
        "icon": "fa-address-book-o"
      },
      {
        "name": "提现",
        "url": "./recharge/recharge",
        "param": "",
        "icon": "fa-globe"
      }
    ],
    userMoney: 0,
    testMoney: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
      url: '/money/queryMoneyLeft',
      method: 'POST',
      data: {
        userId: app.globalData.openId
      },
      success: res => {
        console.log(res.data)
        this.setData({
          userMoney: res.data.userMoney.toFixed(2),
          testMoney: res.data.testMoney.toFixed(2)
        })
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
  turnToFlowList: function() {
    wx.navigateTo({
      url: '../moneyFlowList/moneyFlowList',
    })
  },
  // 充值界面
  turnToRecharge: function() {
    wx.navigateTo({
      url: '../recharge/recharge?opIndex=0&moneyLeft='+this.data.userMoney,
    })
  },
  // 提现界面
  turnToWithdraw: function() {
    wx.navigateTo({
      url: '../recharge/recharge?opIndex=1&moneyLeft='+this.data.userMoney,
    })
  },

})