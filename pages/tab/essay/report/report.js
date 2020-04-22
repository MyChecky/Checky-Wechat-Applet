const app = getApp()

Page({
  data: {
    userName: "",
    checkboxItems: [{
        name: '举报整个任务',
        value: '0',
        checked: true
      },
      {
        name: '举报此次打卡',
        value: '1'
      }
    ],
    type: 0, // 0: essay 1:task 2:sup 3:check
    inputNum: 0, // 字数
    reportContent: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("reportOnload", options)
    if (options.checkId != null) {
      this.setData({
        checkId: options.checkId,
        taskId: options.taskId,
        userName: options.userName,
        type: 1,
      })
    } else if (options.essayId != null) {
      this.setData({
        essayId: options.essayId,
        userName: options.userName,
        type: 0,
      })
    } else if (options.supervisorId != null) {
      this.setData({
        supervisorId: options.supervisorId,
        taskId: options.taskId,
        userName: options.userName,
        type: 2,
      })
    }

  },

  bindContentInput: function (e) {
    this.setData({
      reportContent: e.detail.value,
      inputNum: e.detail.value.length,
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

  checkboxChange: function(e) {
    console.log('checkboxChange', e);

    var checkboxItems = this.data.checkboxItems;
    var valueLen = e.detail.value.length;

    if (valueLen === 2) {
      checkboxItems[0].checked = !checkboxItems[0].checked;
      checkboxItems[1].checked = !checkboxItems[1].checked;
      if (checkboxItems[0].checked === true){
        this.setData({
          type: 1,
        })
      } else if(checkboxItems[1].checked === true){
        this.setData({
          type: 3,
        })
      }
    } else{
      console.log("nochange")
    }

    this.setData({
      checkboxItems: checkboxItems
    });
    console.log("afteChage", this.data);
  },

  // 发送举报
  send: function() {
    var that = this;
    this.selectComponent("#toast").toastShow2("请稍后", "fa-spinner fa-pulse")
    console.log("send", this.data)

    req = {
      url: '/report/addReport',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        reportContent: this.data.reportContent,
        essayId: this.data.essayId,
        taskId: this.data.taskId,
        checkId: this.data.checkId,
        supervisorId: this.data.supervisorId,
        reportType: this.data.type,
      },
      success: res => {
        if (res.data.state == "ok") {
          that.selectComponent("#toast").toastShow("提交成功", "fa-check", 1000)
          wx.navigateBack({
            delta: 1
          })
        } else {
          that.selectComponent("#toast").toastShow("提交失败", "fa-remove", 1000)
        }
      },
      fail: err => {
        that.selectComponent("#toast").toastShow("提交失败", "fa-remove", 1000)
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  }

})