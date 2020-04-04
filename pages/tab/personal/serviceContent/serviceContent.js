// pages/tab/personal/serviceContent/serviceContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceTermsContent:'',
    aa:"健康\n会u黑色忽\n然呼呼",
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
    req = {
      url: '/userAndHobby/getServiceTerms',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
      },
      success: res => {
        // console.log("结果", res.data)
        this.setData({
          serviceTermsContent: res.data.serviceTermsContent,
        })
        // console.log(this.data.serviceTermsContent)
        // this.data.serviceTermsContent.replace(/\\n/g, '\n')
        console.log(this.data.serviceTermsContent)
        console.log(this.data.aa)
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