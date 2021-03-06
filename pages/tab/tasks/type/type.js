// pages/tab/tasks/type/type.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    isNew: false,
    out: "off",
    move: "",
    flag: true,
    newType: "",

    selectedTypeId: "",
    selectedTagsId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectComponent("#toast").toastShow2("正在获取类型请稍后", "fa-spinner fa-pulse")
    // 获取类型
    req = {
      url: '/taskType/allType',
      data: {
      },
      success: res => {
        console.log(res.data)
        app.globalData.types = res.data
        this.setData({
          types: app.globalData.types
        })
        this.selectComponent("#toast").toastStop()
      },
      fail: err => {
        this.selectComponent("#toast").toastShow("获取类型失败", "fa-remove", 1000)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
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
    console.log("taskTypeChoose", choice)
    var arr = getCurrentPages()
    arr[arr.length - 2].setData({
      type: choice,
      typeContent: text,
      index: 0
    })
    console.log(arr[arr.length - 2].data)
    wx.navigateBack({
      delta: 1,
      success: function (res) {
      }
    })
  },
  // 显示输入框
  getOut: function (e) {
    this.setData({
      out: this.data.flag ? 'on' : 'off',
      move: this.data.flag ? 'move' : '',
      flag: !this.data.flag
    })
  },
  // 获取新的建议文本
  cancelBack: function (e) {
    this.setData({
      newType: e.detail.value
    })
  },
  // 发送新的建议
  confirmNewTpye: function () {
    if (this.data.newType != "") {
      req = {
        url: '/suggestion/addSuggestion',
        method: 'POST',
        data: {
          "suggestionContent": this.data.newType,
          "suggestionTime": app.globalData.date,
          "userId": app.globalData.openId
        },
        success(res) {
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
      }
      app.requestWithAuth(req)
        .then(req.success)
        .catch(req.fail)
    }
  },
  selectTypeId: function (e) {
    console.log("selectTypeId", e.currentTarget.dataset.id);
    console.log("e", e);
    this.setData({
      selectedTypeId:  e.currentTarget.dataset.id
    })
  },
  checkboxChange: function (e) {
    var that = this;
    console.log("e", e);
    that.setData({
      selectedTagsId: e.detail.value
    })
  },
  back:function(e){
    var that = this;
    var selectedTypeId = that.data.selectedTypeId;
    var selectedTypeName = "";
    var selectedTagsId = that.data.selectedTagsId;
    var selectedTagsName = [];
    var selectedTagsNameStr = "";

    var that = this;
    for(var i=0; i< that.data.types.length; ++i){
      if(that.data.types[i].typeId == selectedTypeId){
        selectedTypeName = that.data.types[i].typeContent;
        var tags = that.data.types[i].tags;
        for(var j = 0; j < selectedTagsId.length && selectedTagsId.length != selectedTagsName.length; ++j){
          for(var k = 0; k<tags.length; ++k){
            if(selectedTagsId[j] == tags[k].tagId){
              selectedTagsName.push(tags[k].tagContent);
              selectedTagsNameStr= selectedTagsNameStr+"  "+tags[k].tagContent;
              break;
            }
          }
        }
        break;
      }
    }

    var arr = getCurrentPages()
    arr[arr.length - 2].setData({
      type: selectedTypeId,
      typeContent: selectedTypeName,
      selectedTagsId: selectedTagsId,
      selectedTagsName: selectedTagsName,
      selectedTagsNameStr: selectedTagsNameStr,
      index: 0
    })
    console.log(arr[arr.length - 2].data)
    wx.navigateBack({
      delta: 1,
      success: function (res) {
      }
    })
  },
  newType: function () {

  }
})