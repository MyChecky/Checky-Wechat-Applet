// pages/tab/personal/setHobbies/setHobbies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hobbies: null,
    newHobbies: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    req = {
      url: '/userAndHobby/initUserHobbies',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
      },
      success: res => {
        console.log("a", res.data.newHobbiesJson)
        console.log("b", res.data.hobbiesJson)
        var a = JSON.parse(res.data.newHobbiesJson)
        console.log(a)
        var b = JSON.parse(res.data.hobbiesJson)

        console.log(b)
        this.setData({
          newHobbies: a.newHobbies,
          hobbies: b.hobbies
        })
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
    console.log("hob", this.data)
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

  getMoreHobbies(e) {
    req = {
      url: '/userAndHobby/getHobbies',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
      },
      success: res => {
        var a = JSON.parse(res.data.newHobbiesJson)
        this.setData({
          newHobbies: a.newHobbies
        })
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
    console.log("hob", this.data)
  },

  addHobby(e) {
    var that = this
    var hobbyV = e.target.dataset.hobbyvalue
    for (var a = 0; a < that.data.hobbies.length; a++) { 
      var bs = that.data.hobbies[a];
      var flag = 0;
      for (var b = 0; b < bs.subHobbies.length; b++) {
        var cs = bs.subHobbies[b];
        if (cs.hobbyValue == "") {
          var dV = "hobbies[" + a + "].subHobbies[" + b + "].hobbyValue"
          var dI = "hobbies[" + a + "].subHobbies[" + b + "].ifChoose"
          console.log(dV)
          console.log(dI)
          that.setData({
            [dV]: hobbyV,
            [dI]: "1",
          })
          flag=1;
          break;
        }
      }
      if (flag == 1) {
        break;
      }
    }
  },

  subHobby(e) {
    var that = this
    var hobbyV = e.target.dataset.hobbyvalue
    // console.log("0", this.data.hobbies[0])
    // console.log("00", this.data.hobbies[0].subHobbies[0])
    // console.log(this.data.hobbies[0].subHobbies[0].hobbyValue)

    for (var a = 0; a < that.data.hobbies.length; a++) { //遍历json数组时，这么写a为索引，0,1
      var bs = that.data.hobbies[a];
      for (var b = 0; b < bs.subHobbies.length; b++) {
        var cs = bs.subHobbies[b];
        if (cs.hobbyValue == hobbyV) {
          var dV = "hobbies[" + a + "].subHobbies[" + b + "].hobbyValue"
          var dI = "hobbies[" + a + "].subHobbies[" + b + "].ifChoose"
          console.log(dV)
          console.log(dI)
          that.setData({
            [dV]: "",
            [dI]: "0",
          })
        }
      }
    }
  },

  makesureHobby(e) {
    var that = this
    var hobbiesToUpdate = []
    for (var a = 0; a < that.data.hobbies.length; a++) { 
      var bs = that.data.hobbies[a];
      for (var b = 0; b < bs.subHobbies.length; b++) {
        var cs = bs.subHobbies[b];
        if (cs.hobbyValue != "") {
          hobbiesToUpdate.push(cs.hobbyValue)
        }
      }
    }
    console.log("hobbiesToUpdate", hobbiesToUpdate)
    req = {
      url: '/userAndHobby/updateHobbies',
      method: 'POST',
      data: {
        "userId": app.globalData.openId,
        "hobbies": hobbiesToUpdate,
      },
      success: res => {
        wx.navigateBack({
          delta: 1
        })
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  }
})