// pages/tab/tasks/type/type.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:app.globalData.types,
    isNew:false,
    out:"off",
    move:"",
    flag:true,
    newType:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 获取类型
    var that = this
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '/taskType/allType',
      data: {
      },
      success: res => {
        console.log(res.data)
        app.globalData.types = res.data
        this.setData({
          types: app.globalData.types
        })
      },
      fail: err => {
      }
    })
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
  // 获得类别
  getId: function (e) {
    var choice = e.target.dataset.value
    var text = e.target.dataset.text
    console.log(choice)
    var arr = getCurrentPages()
    arr[arr.length - 2].setData({
      type: choice,
      typeContent: text,
      index: 0
    })
    console.log(arr[arr.length - 2].data)
    wx.navigateBack({
      delta: 1,
      success: function(res){
      }
    })
  },
  // 显示输入框
  getOut: function(e){
    this.setData({
      out: this.data.flag?'on':'off',
      move: this.data.flag?'move':'',
      flag: !this.data.flag
    })
  },
  // 获取新的建议文本
  cancelBack: function(e){
    this.setData({
      newType: e.detail.value
    })
  },
  // 发送新的建议
  confirmNewTpye: function(){
    if(this.data.newType!=""){
      wx.request({
        url: app.globalData.base + ":" + app.globalData.port + '/suggestion/addSuggestion',
        method: 'POST',
        data:{
          "suggestionContent": this.data.newType,
          "suggestionTime": app.globalData.date,
          "userId": app.globalData.openId
        },
        success(res){
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '新的类型建议已发送',
            showCancel: false,
            success(res) {
              wx.navigateBack({})
            },
            fail(err) { }
          })
        }
      })
    }
  },
  newType: function(){

  }
})