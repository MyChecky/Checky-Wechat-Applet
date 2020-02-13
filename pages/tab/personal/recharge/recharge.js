// pages/tab/personal/recharge/recharge.js
const app = getApp()
var util = require('../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opType: ["充值金额:", "取现金额:"],
    opIndex: 0, // 0 充值， 1 取现
    opMoney: '',
    moneyLeft: 0,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var opIndex = options.opIndex;
    var moneyLeft = options.moneyLeft;
    console.log(opIndex)
    that.setData({
      opIndex: opIndex,
      moneyLeft: moneyLeft,
    });
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
  pointNum: function(obj) {
    obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    obj = obj.replace(/^\./g, ""); //验证第一个字符是数字
    obj = obj.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
    obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    return obj;
  },

  bindMoneyInput: function(e) {
    this.setData({
      opMoney: this.pointNum(e.detail.value)
    })
    return // 必加，不然输入框可以输入多位小数
  },

  bindMoney: function(e) {
    this.setData({
      opMoney: e.detail.value
    })
    console.log(this.data)
  },

  createOrder: function(e) {
    if (this.data.opIndex == 0) {
      this.createPayOrder();
    }
    if (this.data.opIndex == 1) {
      this.createWithdrawOrder();
    }
  },

  createWithdrawOrder: function() { // 取现

  },
  formatTimeWithSecond: function(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const da = [year, month, day].map(this.formatNumber).join('-')
    const time = [hour, minute, second].map(this.formatNumber).join(':')

    return [da, time].join(' ')
  },

  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  craeteWithdrawOrder: function() { // 取现
    var that = this;
    console.log(that.data)
    if (parseFloat(that.data.opMoney) > parseFloat(that.data.moneyLeft)) {
      wx.showToast({
        title: '余额不足！',
        duration: 2000,
      });
    } else {
      req = {
        url: '/money/submitWithdraw',
        method: 'POST',
        data: {
          openId: app.globalData.openId,
          amount: that.data.opMoney,
          payTime: that.formatTimeWithSecond(new Date()),
        },
        success: res => {
          console.log(res.data)
          if (res.data.state = "test") {
            wx.navigateTo({
              url: '../rechargeComplete/rechargeComplete?opMoney=' + that.data.opMoney + '&opIndex=' + that.data.opIndex + "&opTime=" + that.formatTimeWithSecond(new Date()),
            });
          }
        },
        fail: err => {
          console.log(err)
          wx.showToast({
            title: '网络异常！err:createProductOrder',
            duration: 2000
          });
        }
      }
      app.requestWithAuth(req)
        .then(req.success)
        .catch(req.fail)
    }
  },

  craetePayOrder: function() { // 充值
    var that = this;
    req = {
      url: '/money/createOrder',
      method: 'POST',
      data: {
        openId: app.globalData.openId,
        amount: that.data.opMoney,
        payTime: that.formatTimeWithSecond(new Date()),
      },
      success: res => {
        console.log(res.data)
        if (res.data.state = "test") {
          wx.navigateTo({
            url: '../rechargeComplete/rechargeComplete?opMoney=' + that.data.opMoney + '&opIndex=' + that.data.opIndex + "&opTime=" + that.formatTimeWithSecond(new Date()),
          });
        }
        if (res.data.state = "ok") {
          that.wxpay(res.data);
        } else {
          wx.showToast({
            title: "支付失败!",
            duration: 2500
          });
        }

      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '网络异常！err:createProductOrder',
          duration: 2000
        });
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  // 调用微信支付
  wxpay: function(order) {
    req = {
      url: '/money/weixinPay',
      method: 'POST',
      data: {
        payId: order.payId,
        nonceStr: order.nonceStr,
        prepay_id: order.prepay_id,
        openId: app.globalData.openId
      },
      success: res => {
        console.log(res.data)
        console.log(order)
        if (res.data.state == "ok") {
          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function(res) {
              wx.showToast({
                title: "支付成功!",
                duration: 2000,
              });
              setTimeout(function() {
                wx.navigateTo({
                  url: '../rechargeComplete/rechargeComplete',
                });
              }, 2500);
            },
            fail: function(res) {
              console.info(res);
              wx.showToast({
                title: res.err_desc,
                duration: 3000
              })
            }
          })
        } else {
          wx.showToast({
            title: "支付失败!",
            duration: 2000
          });
        }
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '网络异常！err:wxpay',
          duration: 2000
        });
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  }

})