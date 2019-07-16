// pages/tab/tasks/newtask/newtask.js
const app = getApp()
var util = require("../../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:"",
    numOfSus:[
      { "value": 0 }, { "value": 1 }, { "value": 3 }, { "value": 5 }
      ],
    num:0,
    types: [],
    repeatDate:[
      { "name": "日", "value": 0 },
      { "name": "一", "value": 1 },
      { "name": "二", "value": 2 },
      { "name": "三", "value": 3 },
      { "name": "四", "value": 4 },
      { "name": "五", "value": 5 },
      { "name": "六", "value": 6 }
    ],
    chooseRepeat:null,
    index:-1,
    array:[],
    startTime: app.globalData.date,
    endTime: app.globalData.date,
    money:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新建任务',
    })
    this.setData({
      types: app.globalData.types
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
  // 获取类型
  getType: function(){
    wx.navigateTo({
      url: '../type/type',
    })
  },
  bindPickerChange: function(e){
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerStartTime: function(e){
    this.setData({
      startTime: e.detail.value
    })
  },
  bindPickerEndTime: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindNum: function(e){
    this.setData({
      num: e.detail.value
    })
  },
  bindRepeatDate:function(e){
    this.setData({
      chooseRepeat: e.detail.value
    })
  },
  bindTitle: function(e){
    this.setData({
      title: e.detail.value
    })
  },
  bindContent: function(e){
    this.setData({
      content: e.detail.value
    })
  },
  bindMoney: function(e){
    this.setData({
      money: e.detail.value
    })
  },
  sendForm: function(){
    if (this.data.title == "" || this.data.index < 0 || this.data.startTime == "" || this.data.endTime == "" || this.data.chooseRepeat == null || this.data.money<=0){
      this.selectComponent("#toast").toastShow('必要信息不可为空', 'fa-exclamation-circle', 2000)
    }
    else{
      var data = {
        "userId": app.globalData.openId,
        "taskTitle": this.data.title,
        "taskContent": this.data.content,
        "supervisorNum": this.data.num,
        "typeId": this.data.types[this.data.index].typeId,
        "taskStartTime": this.data.startTime,
        "taskEndTime": this.data.endTime,
        "checkFrec": util.formatRepeatDate(this.data.chooseRepeat),
        "taskMoney": this.data.money,
      }
      console.log(data)
      wx.request({
        url: app.globalData.base + ":" + app.globalData.port + '/task/addTask',
        method: 'POST',
        data: data,
        success: function(res){
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '创建成功',
            showCancel: false,
            success(res) {},
            fail(err){}
          })
        }
      })
    }
  }
})