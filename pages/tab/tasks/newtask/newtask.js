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
    types: [
      { "typeId": "5301f10a-2df7-4e72-97ac-8e1cbecf9aec", "typeContent": "健身" },
      { "typeId": "a8179f78-69ac-4723-bf23-7b4c695bdf7f", "typeContent": "学习" }
    ],
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
    startTime: null,
    endTime:null,
    money:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新建任务',
    })
    this.getType()
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
    wx.request({
      url: app.globalData.base+'/taskType/allType',
      data:{
      },
      success: res => {
        this.data.types = res.data.Type
      },
      fail: err=> {
        wx.showModal({
          title: '提示',
          content: '获取类型列表失败',
          showCancel: false,
          success(res) {
            if (res.confirm) {
            }
          }
        })
      }
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
    console.log(
      "title:"+this.data.title+
      "/n content:"+this.data.content+
      "/n num:"+this.data.num+
      "/n type:"+this.data.types[this.data.index].typeId+
      "/n start time:"+this.data.startTime+
      "/n end time:"+this.data.endTime+
      "/n repeat date:"+this.data.chooseRepeat+
      "/n money:"+this.data.money
    )
    var data= {
      "title": this.data.title,
      "content": this.data.content,
      "num": this.data.num,
      "type": this.data.types[this.data.index].typeId,
      "startTime": this.data.startTime,
      "endTime": this.data.endTime,
      "repeatDate": util.formatRepeatDate(this.data.chooseRepeat),
      "money": this.data.money,
    }
    console.log(data)
    wx.request({
      url: app.globalData.base +'/task/addTask',
      data:{
        "title": this.data.title,
        "content": this.data.content,
        "num": this.data.num,
        "type": this.data.types[this.data.index].typeId,
        "startTime": this.data.startTime,
        "endTime": this.data.endTime,
        "repeatDate": util.formatRepeatDate(this.data.chooseRepeat),
        "money": this.data.money,
      },
      success: function(res){
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
})