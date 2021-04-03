// pages/tab/personal/switch/switch.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    resultList: [] // userName, userAvatar, latestMessage, latestMessageTime
    // content, subContent, date, opration, avatarUrl
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

  // 切换到对应的用户
  switchUser: function(e){
    console.log("切换到对应的用户", e);
    var userid = e.target.dataset.userid;
    var usernickname = e.target.dataset.usernickname;
    // var useravatar = e.target.dataset.useravatar;

    app.globalData.switchUserIdChosen = userid;
    app.globalData.switchUserNameChosen = usernickname;
    if(userid != app.globalData.openId){
      this.selectComponent("#toast").toastShow("成功切换为："+usernickname, "fa-check", 1000)
      app.globalData.switchStatus = true;
    }else{
      this.selectComponent("#toast").toastShow("切换为自己："+usernickname, "fa-check", 1000)
      app.globalData.switchStatus = false;
    }
    
  },

  searchInput: function () {
    var that = this
    console.log("searchVal", that.data.inputVal)

    req = {
      url: '/friend/queryUserByNickname',
      method: 'POST',
      data: {
        userId: app.globalData.openId,
        nickName: that.data.inputVal,
      },
      success: res => {
        console.log("查询结果", res.data)
        that.setData({
          resultList: res.data.friendList,
        })
        console.log(this.data)
      },
      fail: err => {
        console.log(err)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})