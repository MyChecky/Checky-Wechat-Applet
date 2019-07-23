const app = getApp()

Page({
  data: {
    essReason: [{
      "text": "垃圾营销",
      "check": false
    }, {
      "text": "涉黄信息",
      "check": false
    }, {
      "text": "人身攻击",
      "check": false
    }, {
      "text": "不实信息",
      "check": false
    }, {
      "text": "有害信息",
      "check": false
    }, {
      "text": "内容抄袭",
      "check": false
    }, {
      "text": "违法信息",
      "check": false
    }, {
      "text": "诈骗信息",
      "check": false
    }, {
      "text": "其他原因",
      "check": false
    }],
    essayId: "",
    userName: "",
    essaysText: "",
    reason: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      essayId: options.essayId,
      essaysText: options.essaysText,
      userName: options.userName
    })
  },
  // 选择原因
  reasonClick: function(e) {
    // -----多选需求注释此段并修改请求函数
    var that = this.data.essReason
    that.map(function(item) {
      item.check = false
    })
    this.setData({
      essReason: that
    })
    // -----至此
    var statement = "essReason[" + e.target.dataset.index + "].check"
    this.setData({
      [statement]: !this.data.essReason[e.target.dataset.index].check
    })
    this.setData({
      reason: this.data.essReason[e.target.dataset.index].text
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

  },
  // 发送举报
  send: function() {
    this.selectComponent("#toast").toastShow2("请稍后", "fa-spinner fa-pulse")
    if (this.data.reason == "") {
      this.selectComponent("#toast").toastShow("请选择一个类型", "fa-exclamation-circle", 1500)
    } else {
      wx.request({
        url: app.globalData.base + ':' + app.globalData.port + '/report/addReport',
        method: 'POST',
        data: {
          userId: app.globalData.openId,
          reportContent: this.data.reason,
          essayId: this.data.essayId,
          reportType: 0
        },
        success: res => {
          if(res.statusCode==200){
            this.selectComponent("#toast").toastShow("提交成功", "fa-check", 1000)
            wx.navigateBack({
              delta:1
            })
          }
          else{
            this.selectComponent("#toast").toastShow("提交失败", "fa-remove", 1000)
          }
        },
        fail: err => {
          this.selectComponent("#toast").toastShow("提交失败", "fa-remove", 1000)
          console.log(err)
        }
      })
    }
  }
})